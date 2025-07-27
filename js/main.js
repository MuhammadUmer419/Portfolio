(function(html) {

    'use strict';

    const ssPreloader = function() {
        const siteBody = document.querySelector('body');
        const preloader = document.querySelector('#preloader');
        const typingEl = document.querySelector('.typing-name');

        if (!preloader) return;

        const hasVisited = localStorage.getItem("hasVisited");

        if (hasVisited) {
            // Skip preloader if already visited
            html.classList.remove('ss-preload');
            html.classList.add('ss-loaded');
            preloader.style.display = 'none';
            siteBody.classList.add('ss-show');
            return;
        }

        html.classList.add('ss-preload');

        if (typingEl) typingEl.textContent = "Muhammad Umer";

        window.addEventListener('load', function() {
            setTimeout(function() {
                html.classList.remove('ss-preload');
                html.classList.add('ss-loaded');

                preloader.addEventListener('transitionend', function afterTransition(e) {
                    if (e.target.matches('#preloader')) {
                        siteBody.classList.add('ss-show');
                        e.target.style.display = 'none';
                        preloader.removeEventListener(e.type, afterTransition);
                    }
                });

                // Save visited status
                localStorage.setItem("hasVisited", "true");

            }, 7000); // Show preloader for 7 seconds
        });
    };

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
            hdr.classList.toggle('sticky', loc > triggerHeight);
            hdr.classList.toggle('offset', loc > triggerHeight + 20);
            hdr.classList.toggle('scrolling', loc > triggerHeight + 150);
        });
    };

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
            link.addEventListener("click", function() {
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

    const ssScrollSpy = function() {
        const sections = document.querySelectorAll('.target-section');
        if (!sections) return;

        window.addEventListener('scroll', function navHighlight() {
            let scrollY = window.pageYOffset;

            sections.forEach(function(current) {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 50;
                const sectionId = current.getAttribute('id');
                const navLink = document.querySelector('.s-header__nav a[href*=' + sectionId + ']');
                if (!navLink) return;
                const navItem = navLink.parentNode;
                navItem.classList.toggle('current', scrollY > sectionTop && scrollY <= sectionTop + sectionHeight);
            });
        });
    };

    const ssGLightbox = function() {
        GLightbox({
            selector: '.glightbox',
            zoomable: false,
            touchNavigation: true,
            loop: false,
            autoplayVideos: true
        });
    };

    const ssSwiper = function() {
        new Swiper('.s-testimonials__slider', {
            slidesPerView: 1,
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: {
                401: { slidesPerView: 1, spaceBetween: 20 },
                801: { slidesPerView: 2, spaceBetween: 50 },
                1181: { slidesPerView: 3, spaceBetween: 48 }
            }
        });
    };

    const ssAlertBoxes = function() {
        document.querySelectorAll('.alert-box').forEach(function(box) {
            box.addEventListener('click', function(e) {
                if (e.target.matches('.alert-box__close')) {
                    e.stopPropagation();
                    e.target.parentElement.classList.add('hideit');
                    setTimeout(function() {
                        box.style.display = 'none';
                    }, 500);
                }
            });
        });
    };

    const ssBackToTop = function() {
        const pxShow = 900;
        const goTopButton = document.querySelector(".ss-go-top");
        if (!goTopButton) return;

        if (window.scrollY >= pxShow) goTopButton.classList.add("link-is-visible");

        window.addEventListener('scroll', function() {
            goTopButton.classList.toggle("link-is-visible", window.scrollY >= pxShow);
        });
    };

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

    (function ssInit() {
        ssPreloader();
        ssMoveHeader();
        ssMobileMenu();
        ssScrollSpy();
        ssGLightbox();
        ssSwiper();
        ssAlertBoxes();
        ssBackToTop();
        ssMoveTo();
    })();

})(document.documentElement);


  document.addEventListener("DOMContentLoaded", function () {
    const text = "Umer .";
    const target = document.getElementById("typedName");
    let index = 0;

    function typeNextLetter() {
      if (index < text.length) {
        target.textContent += text.charAt(index);
        index++;
        setTimeout(typeNextLetter, 300); // SLOWER speed: 300ms per character
      } else {
        target.style.borderRight = "none";
      }
    }

    typeNextLetter();
  });
