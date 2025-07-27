(function(html) {

    'use strict';

    /* ✍️ Signature-style Preloader */
    const ssPreloader = function() {
        const siteBody = document.querySelector('body');
        const preloader = document.querySelector('#preloader');
        if (!preloader) return;

        html.classList.add('ss-preload');

        window.addEventListener('load', function () {
            html.classList.remove('ss-preload');
            html.classList.add('ss-loaded');

            // Signature animation duration (3.5s)
            setTimeout(function () {
                siteBody.classList.add('ss-show');
                preloader.style.display = 'none';
            }, 1500);
        });
    };

    /* Move Header */
    const ssMoveHeader = function () {
        const hdr = document.querySelector('.s-header');
        const hero = document.querySelector('#intro');
        let triggerHeight;

        if (!(hdr && hero)) return;

        setTimeout(function() {
            triggerHeight = hero.offsetHeight - 170;
        }, 300);

        window.addEventListener('scroll', function () {
            let loc = window.scrollY;

            if (loc > triggerHeight) hdr.classList.add('sticky');
            else hdr.classList.remove('sticky');

            if (loc > triggerHeight + 20) hdr.classList.add('offset');
            else hdr.classList.remove('offset');

            if (loc > triggerHeight + 150) hdr.classList.add('scrolling');
            else hdr.classList.remove('scrolling');
        });
    };

    /* Mobile Menu */
    const ssMobileMenu = function() {
        const toggleButton = document.querySelector('.s-header__menu-toggle');
        const mainNavWrap = document.querySelector('.s-header__nav');
        const siteBody = document.querySelector('body');

        if (!(toggleButton && mainNavWrap)) return;

        toggleButton.addEventListener('click', function(e) {
            e.preventDefault();
            toggleButton.classList.toggle('is-clicked');
            siteBody.classList.toggle('menu-is-open');
        });

        mainNavWrap.querySelectorAll('.s-header__nav a').forEach(function(link) {
            link.addEventListener("click", function(event) {
                if (window.matchMedia('(max-width: 900px)').matches) {
                    toggleButton.classList.toggle('is-clicked');
                    siteBody.classList.toggle('menu-is-open');
                }
            });
        });

        window.addEventListener('resize', function() {
            if (window.matchMedia('(min-width: 901px)').matches) {
                siteBody.classList.remove('menu-is-open');
                toggleButton.classList.remove('is-clicked');
            }
        });
    };

    /* Scroll Spy */
    const ssScrollSpy = function() {
        const sections = document.querySelectorAll('.target-section');
        if (!sections) return;

        window.addEventListener('scroll', navHighlight);

        function navHighlight() {
            let scrollY = window.pageYOffset;

            sections.forEach(function(current) {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 50;
                const sectionId = current.getAttribute('id');

                const link = document.querySelector('.s-header__nav a[href*=' + sectionId + ']');
                if (!link) return;

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    link.parentNode.classList.add('current');
                } else {
                    link.parentNode.classList.remove('current');
                }
            });
        }
    };

    /* GLightbox */
    const ssGLightbox = function() {
        const lightbox = GLightbox({
            selector: '.glightbox',
            zoomable: false,
            touchNavigation: true,
            loop: false,
            autoplayVideos: true
        });
    };

    /* Swiper */
    const ssSwiper = function() {
        const testimonialsSwiper = new Swiper('.s-testimonials__slider', {
            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                401: { slidesPerView: 1, spaceBetween: 20 },
                801: { slidesPerView: 2, spaceBetween: 50 },
                1181: { slidesPerView: 3, spaceBetween: 48 }
            }
        });
    };

    /* Alert Boxes */
    const ssAlertBoxes = function() {
        const boxes = document.querySelectorAll('.alert-box');

        boxes.forEach(function(box){
            box.addEventListener('click', function(e) {
                if (e.target.matches('.alert-box__close')) {
                    e.stopPropagation();
                    e.target.parentElement.classList.add('hideit');
                    setTimeout(function() {
                        box.style.display = 'none';
                    }, 500)
                }
            });
        });
    };

    /* Back to Top */
    const ssBackToTop = function() {
        const pxShow = 900;
        const goTopButton = document.querySelector(".ss-go-top");
        if (!goTopButton) return;

        if (window.scrollY >= pxShow) goTopButton.classList.add("link-is-visible");

        window.addEventListener('scroll', function() {
            if (window.scrollY >= pxShow) {
                if (!goTopButton.classList.contains('link-is-visible'))
                    goTopButton.classList.add("link-is-visible");
            } else {
                goTopButton.classList.remove("link-is-visible");
            }
        });
    };

    /* Smooth Scroll */
    const ssMoveTo = function() {
        const easeFunctions = {
            easeInOutCubic: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t*t + b;
                t -= 2;
                return c/2*(t*t*t + 2) + b;
            }
        };

        const triggers = document.querySelectorAll('.smoothscroll');
        const moveTo = new MoveTo({
            tolerance: 0,
            duration: 1200,
            easing: 'easeInOutCubic',
            container: window
        }, easeFunctions);

        triggers.forEach(function(trigger) {
            moveTo.registerTrigger(trigger);
        });
    };

    /* 🔁 Init All */
    (function ssInit() {
        ssPreloader();
        ssMoveHeader();
        ssMobileMenu();
        ssScrollSpy();
        ssGLightbox();
        ssSwiper();
        ssAlertBoxes();
        ssMoveTo();
        ssBackToTop();
    })();

})(document.documentElement);