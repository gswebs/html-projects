document.querySelectorAll('.star-rating').forEach(function(ratingEl) {
    const rating = parseFloat(ratingEl.getAttribute('data-rating'));
    const stars = ratingEl.querySelectorAll('i');

    stars.forEach((star, index) => {
        if (index + 1 <= Math.floor(rating)) {
            star.classList.add('filled');
        } else if (index < rating && rating % 1 !== 0) {
            star.classList.add('half');
        }
    });
});


const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
button.addEventListener('click', () => {
    // Remove active classes
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanels.forEach(panel => panel.classList.remove('active'));

    // Activate clicked tab and panel
    button.classList.add('active');
    document.getElementById(button.dataset.tab).classList.add('active');
});
});

function gsflip(selector, className, interval = 2000) {
    const elements = document.querySelectorAll(selector);
    let index = 0;

    return setInterval(() => {
        elements[index].classList.toggle(className); // toggle: add/remove depending on current state

        index++;
        if (index >= elements.length) {
        index = 0;
        }
    }, interval);
}

const toggler1 = gsflip('.flip .card', 'active', 2000);
const toggler2 = gsflip('.grid-item', 'active', 2000);

document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
    const item = header.parentElement;
    item.classList.toggle('active');
    });
});

let lastScrollY = window.scrollY;
const header = document.getElementById('siteheader');

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
        // Scrolling down
        header.classList.add('header-bg');
    } else {
        // Scrolling up
        header.classList.remove('header-bg');
    }
    lastScrollY = window.scrollY;
});


const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const fullscreenMenu = document.getElementById('fullscreen-menu');

menuToggle.addEventListener('click', () => {
    fullscreenMenu.classList.add('open');
});

menuClose.addEventListener('click', () => {
    fullscreenMenu.classList.remove('open');
});
