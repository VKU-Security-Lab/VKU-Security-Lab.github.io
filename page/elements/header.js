document.addEventListener('DOMContentLoaded', function () {
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation) {
            link.classList.add('active');
        }
    });
});

export default function Header() {
    return `
    <nav class="navbar navbar-expand-lg navbar-custom fixed-top">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">
                <img src="/images/logo.jpg" alt="VSL">
                <span>VSL</span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
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
                        <a class="nav-link" href="/page/event/">Event</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
`;
}
