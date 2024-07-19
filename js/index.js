document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        const loadingContainer = document.getElementById('loading-container');loadingContainer.style.opacity = 0;
        loadingContainer.classList.add('hidden');
        const container = document.getElementById('container');
        container.classList.remove('hidden');
    }, 3000);
});

// Navbar ---------------------------------------------------
let selectedNav = document.getElementById("nav-home");

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

            console.log(navLink.parentElement);
            selectNav(navLink.parentElement);
        }
    });
}, observerNav);

sections.forEach(section => {
    observer.observe(section);
});

// Scroll to section ----------------------------------------
navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
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