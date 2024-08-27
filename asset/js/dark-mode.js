// const darkModeSwitch = document.getElementById('darkModeSwitch');
// const iconMode = document.getElementById('icon-mode');

// darkModeSwitch.addEventListener('change', function () {
//     document.body.classList.toggle('dark-mode');
//     if (this.checked) {
//         iconMode.className = 'fa fa-moon';
//         localStorage.setItem('darkMode', 'enabled');
//     } else {
//         iconMode.className = 'fa fa-sun'; 
//         localStorage.setItem('darkMode', 'disabled');
//     }
// });

// if (localStorage.getItem('darkMode') === 'enabled') {
//     document.body.classList.remove('dark-mode');
//     document.body.classList.toggle('dark-mode');

//     darkModeSwitch.checked = true;
//     iconMode.className = 'fa fa-moon';
// } else {
//     iconMode.className = 'fa fa-sun';
// }
document.body.classList.toggle('dark-mode');
