// assets/js/navbar.js - Fixed active page detection
document.addEventListener("DOMContentLoaded", function () {

    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".nav-link");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    // ===== Scroll Glass Effect =====
    if (navbar) {
        function navbarScroll() {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }
        window.addEventListener("scroll", navbarScroll);
        navbarScroll();
    }

    // ===== Active Page Detection =====
    // Get the current page filename from the URL
    let path = window.location.pathname;
    // Remove leading slash and any query params
    let currentPage = path.replace(/^\//, '').split('?')[0];
    // If empty or just a slash, it's the homepage
    if (currentPage === '' || currentPage === '/') {
        currentPage = 'index.html';
    }
    // Handle cases like /about/ -> about.html
    if (currentPage.endsWith('/')) {
        currentPage = currentPage.slice(0, -1) + '.html';
    }
    // If no extension, assume .html
    if (!currentPage.includes('.') && currentPage !== '') {
        currentPage = currentPage + '.html';
    }

    navLinks.forEach(function (link) {
        var href = link.getAttribute('href');
        // Remove any leading ./ or /
        var cleanHref = href.replace(/^\.?\//, '');
        // Check if the link matches the current page
        if (cleanHref === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }

        // ===== Mobile Menu Close =====
        link.addEventListener('click', function () {
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                var collapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (collapse) {
                    collapse.hide();
                }
            }
        });
    });

    // Fallback: if no link got active, check by comparing path segments
    var hasActive = false;
    navLinks.forEach(function (link) {
        if (link.classList.contains('active')) {
            hasActive = true;
        }
    });
    if (!hasActive) {
        var pathSegments = path.split('/').filter(function (s) { return s.length > 0 && !s.includes('?'); });
        if (pathSegments.length > 0) {
            var lastSegment = pathSegments[pathSegments.length - 1];
            navLinks.forEach(function (link) {
                var href = link.getAttribute('href');
                var cleanHref = href.replace(/^\.?\//, '');
                if (cleanHref === lastSegment || cleanHref === lastSegment + '.html') {
                    link.classList.add('active');
                }
            });
        }
    }
});