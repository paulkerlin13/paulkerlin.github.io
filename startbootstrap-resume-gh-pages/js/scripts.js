/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

// === Natural Cross-Fade Tagline ===
document.addEventListener("DOMContentLoaded", function () {
    const taglines = [
        "Cybersecurity Student at Penn State",
        "Security+ & AWS Certified",
        "Learning by Building, Testing, and Breaking",
        "Exploring Emerging Tech & Finance",
        "Always Learning, Always Improving"
    ];

    const a = document.getElementById("taglineA");
    const b = document.getElementById("taglineB");

    // timings (tweak to taste)
    const holdMs = 2400;   // time fully visible
    const fadeMs = 900;    // matches CSS transition
    const gapMs  = 300;    // tiny breathing room between swaps
    const cycleMs = holdMs + fadeMs + gapMs;

    let i = 0;
    let useA = true;

    // initialize first line visible
    a.textContent = taglines[i % taglines.length];
    a.classList.add("visible");
    i++;

    function swap() {
        const current = useA ? a : b;
        const next    = useA ? b : a;

        // prepare next text (hidden layer)
        next.textContent = taglines[i % taglines.length];

        // cross-fade: show 'next', hide 'current'
        requestAnimationFrame(() => {
            next.classList.add("visible");
            current.classList.remove("visible");
        });

        useA = !useA;
        i = (i + 1) % taglines.length;
    }

    // schedule: hold → cross-fade → small gap → repeat
    setTimeout(function run() {
        swap();
        setTimeout(run, cycleMs);
    }, holdMs);
});
