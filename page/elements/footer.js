export default function Footer() {
    const currentYear = new Date().getFullYear();

    return `
<footer class="site-footer">
    <div class="container">
        <div class="row g-4">
            <div class="col-md-4">
                <h5>VKU Security Lab</h5>
                <p>Vietnam-Korea University of Information and Communication Technology</p>
                <p>Advancing knowledge and passion in cybersecurity.</p>
            </div>
            <div class="col-md-4">
                <h5>Quick Links</h5>
                <ul class="nav flex-column">
                    <li class="nav-item"><a href="/page/about_us/" class="nav-link">About Us</a></li>
                    <li class="nav-item"><a href="/page/event/" class="nav-link">Events</a></li>
                    <li class="nav-item"><a href="/page/recruitment/" class="nav-link">Join Us</a></li>
                    <li class="nav-item"><a href="/page/member/" class="nav-link">Members</a></li>
                </ul>
            </div>
            <div class="col-md-4">
                <h5>Contact</h5>
                <p>Email: <a href="mailto:vsl@vku.udn.vn">vsl@vku.udn.vn</a></p>
                <p>470 Tran Dai Nghia, Ngu Hanh Son, Da Nang</p>
                <p>
                    <a href="https://facebook.com/vkuseclab" target="_blank"><i class="fab fa-facebook"></i></a>&nbsp;&nbsp;
                    <a href="https://github.com/VKU-Security-Lab" target="_blank"><i class="fab fa-github"></i></a>&nbsp;&nbsp;
                    <a href="https://discord.gg/PSvX9EwtDR" target="_blank"><i class="fab fa-discord"></i></a>&nbsp;&nbsp;
                    <a href="https://ctftime.org/team/284373" target="_blank"><i class="fas fa-flag"></i></a>
                </p>
            </div>
        </div>
        <div class="footer-bottom">
            &copy; ${currentYear} VKU Security Lab &mdash; All Rights Reserved
        </div>
    </div>
</footer>
`;
}
