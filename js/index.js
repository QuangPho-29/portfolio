document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        const loadingContainer = document.getElementById('loading-container');loadingContainer.style.opacity = '0';
        loadingContainer.classList.add('hidden');
        const container = document.getElementById('container');
        container.classList.remove('hidden');
    }, 3000);
});

// Navbar ---------------------------------------------------
let selectedNav = document.getElementById("nav-home");
// let selectedNavMenu = document.getElementById("menu-home");

function selectNav(nav) {
    selectedNav.classList.remove('selected');
    nav.classList.add('selected');
    selectedNav = nav;
}

const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.navbar li a');

const observerNav = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
}

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            const navLink = document.querySelector(`.navbar li a[href="#${sectionId}"]`);

            // console.log(navLink.parentElement);
            selectNav(navLink.parentElement);
        }
    });
}, observerNav);

sections.forEach(section => {
    observer.observe(section);
});


// Toggle sidebar  -------------------------------------------
const menuIcon = document.querySelector('.menu-icon');
const menu = document.querySelector('.menu');
const menuButton = document.querySelector('.menu-button');
function toggleSidebar() {
    menu.classList.toggle('active');
    menuIcon.classList.toggle('active');
    menuButton.classList.toggle('active');
}

document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && !menuButton.contains(event.target) && menu.classList.contains('active')) {
        toggleSidebar();
    }
});


// High five ------------------------------------------------
const button = document.querySelector(".high-five");
button.addEventListener("click", (e) => {
    e.preventDefault();
    button.classList.add("animate");
    setTimeout(() => {
        button.classList.remove("animate");
    }, 600);
});

//Loop slider -----------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const sliderItems = slider.querySelectorAll('.img-slider');
    const sliderNav = document.querySelectorAll('.slider-nav a');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    let currentIndex = 0;

    function updateActiveNav() {
        sliderNav.forEach(nav => nav.classList.remove('active'));
        sliderNav[currentIndex].classList.add('active');
    }

    function scrollToSlide(index) {
        slider.scrollTo({
            left: sliderItems[index].offsetLeft,
            behavior: 'smooth'
        });
    }

    function loopSlider() {
        currentIndex = (currentIndex + 1) % sliderItems.length;
        updateActiveNav();
        scrollToSlide(currentIndex);
    }

    let autoSlide = setInterval(loopSlider, 3000);

    function resetInterval() {
        clearInterval(autoSlide);
        autoSlide = setInterval(loopSlider, 3000);
    }

    prevButton.addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + sliderItems.length) % sliderItems.length;
        updateActiveNav();
        scrollToSlide(currentIndex);
        resetInterval();
    });

    nextButton.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % sliderItems.length;
        updateActiveNav();
        scrollToSlide(currentIndex);
        resetInterval();
    });

    sliderNav.forEach((nav, index) => {
        nav.addEventListener('click', function (e) {
            e.preventDefault();
            currentIndex = index;
            updateActiveNav();
            scrollToSlide(currentIndex);
            resetInterval();
        });
    });

    slider.addEventListener('mouseover', function() {
        clearInterval(autoSlide);
    });

    slider.addEventListener('mouseout', function() {
        autoSlide = setInterval(loopSlider, 3000);
    });

    updateActiveNav();
});