/**
 * ============================================
 * PAMEGER BARBERSHOP — Main JavaScript
 * ============================================
 * Handles all interactive functionality:
 * - Hamburger menu toggle (mobile)
 * - Sticky navbar with scroll effects
 * - Smooth scrolling navigation
 * - Active nav link highlighting
 * - Scroll-triggered animations
 * - Back to top button
 * - Floating WhatsApp button visibility
 */

document.addEventListener('DOMContentLoaded', () => {

    // =============================================
    // DOM Element References
    // =============================================
    const navbar = document.getElementById('navbar');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.navbar__link');
    const backToTopBtn = document.getElementById('backToTop');
    const floatingWA = document.getElementById('floatingWA');
    const sections = document.querySelectorAll('section[id], header[id]');

    // =============================================
    // HAMBURGER MENU — Toggle mobile navigation
    // =============================================
    hamburgerBtn.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('navbar__menu--open');
        hamburgerBtn.classList.toggle('navbar__hamburger--active');
        hamburgerBtn.setAttribute('aria-expanded', isOpen);

        // Prevent body scroll when menu is open
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when a nav link is clicked (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('navbar__menu--open');
            hamburgerBtn.classList.remove('navbar__hamburger--active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
            navMenu.classList.remove('navbar__menu--open');
            hamburgerBtn.classList.remove('navbar__hamburger--active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });

    // =============================================
    // STICKY NAVBAR — Add scrolled class on scroll
    // =============================================
    let lastScrollY = 0;

    function handleNavbarScroll() {
        const currentScrollY = window.scrollY;

        // Add/remove scrolled class for visual changes
        if (currentScrollY > 50) {
            navbar.classList.add('navbar--scrolled');
        } else {
            navbar.classList.remove('navbar--scrolled');
        }

        lastScrollY = currentScrollY;
    }

    // =============================================
    // ACTIVE NAV LINK — Highlight based on scroll
    // =============================================
    function updateActiveNavLink() {
        const scrollPos = window.scrollY + 120; // Offset for navbar height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // =============================================
    // BACK TO TOP BUTTON — Show/hide on scroll
    // =============================================
    function handleBackToTop() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('back-to-top--visible');
        } else {
            backToTopBtn.classList.remove('back-to-top--visible');
        }
    }

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // =============================================
    // FLOATING WHATSAPP — Show after scrolling past hero
    // =============================================
    function handleFloatingWA() {
        if (window.scrollY > 400) {
            floatingWA.classList.add('floating-wa--visible');
        } else {
            floatingWA.classList.remove('floating-wa--visible');
        }
    }

    // =============================================
    // SMOOTH SCROLLING — For all anchor links
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetEl.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =============================================
    // SCROLL ANIMATIONS — Intersection Observer API
    // =============================================
    const animatedElements = document.querySelectorAll(
        '.feature-card, .testimonial-card, .location-info-card, .section-header'
    );

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        el.classList.add('animate-hidden'); // Start hidden
        observer.observe(el);
    });

    // =============================================
    // COMBINED SCROLL HANDLER — Optimized with rAF
    // =============================================
    let ticking = false;

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleNavbarScroll();
                updateActiveNavLink();
                handleBackToTop();
                handleFloatingWA();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Run once on load to set initial states
    handleNavbarScroll();
    updateActiveNavLink();
    handleBackToTop();
    handleFloatingWA();

    // =============================================
    // TESTIMONIAL CARDS — Staggered animation delay
    // =============================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.12}s`;
    });

    // Feature cards stagger
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });
});
