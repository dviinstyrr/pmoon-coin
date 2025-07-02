document.addEventListener("DOMContentLoaded", function() {
    
    // --- Hamburger Menu Logic ---
    const nav = document.querySelector('.main-nav');
    const navOpenBtn = document.querySelector('.nav-open-btn');
    const navCloseBtn = document.querySelector('.nav-close-btn');

    if (navOpenBtn) {
        navOpenBtn.addEventListener('click', () => {
            nav.classList.add('nav-open');
        });
    }

    if (navCloseBtn) {
        navCloseBtn.addEventListener('click', () => {
            nav.classList.remove('nav-open');
        });
    }

    // --- Scroll Animation Logic ---
    const animatedElements = document.querySelectorAll('.roadmap-phase, .principle-box');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

});