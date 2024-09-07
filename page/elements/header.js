// Highlight current page in navbar
document.addEventListener('DOMContentLoaded', function () {
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    console.log(navLinks);
    console.log(currentLocation);
    
    
    navLinks.forEach(link => {
        console.log(link.getAttribute('href'));
        
        if (link.getAttribute('href') == currentLocation) {
            link.classList.add('active');
        }
    });
});

export default function Header() {
    return `
    <!-- Developed by: Shr3wd - Phạm Minh Trí at 8/2024 -->
    <nav class="navbar navbar-expand-lg navbar-custom fixed-top">
    <div class="header-container">
        <a class="navbar-brand" href="/">
            <img src="/images/logo.jpg" alt="VSL - VKU Security Lab" id="logo-header" width="30" height="30" class="d-inline-block align-text-top">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
    </div>
    <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link" href="/page/about_us/">About Us</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/page/member/">Members</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/page/achievement/">Achievement</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/page/writeups/">Writeups</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/page/history/">History</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/page/event/" >Event</a>
                </li>
                <!--<li class="nav-item">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="darkModeSwitch">
                    </div>
                </li>-->
            </ul>
        </div>
</nav>
`;
}