document.addEventListener('DOMContentLoaded', () => {
    // Initialize language
    let currentLang = 'en';
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';

    // Update Burger menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.innerHTML = '<span></span><span></span><span></span>';

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message. We will get back to you soon!');
        contactForm.reset();
    });

    // Language switching functionality
    function updateLanguage() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            element.textContent = translations[currentLang][key];
        });

        const placeholders = document.querySelectorAll('[data-translate-placeholder]');
        placeholders.forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            element.placeholder = translations[currentLang][key];
            // Add direction for phone input
            if (key === 'phoneInput') {
                element.style.direction = currentLang === 'ar' ? 'rtl' : 'ltr';
                element.style.textAlign = currentLang === 'ar' ? 'right' : 'left';
            }
        });

        // Update HTML direction for RTL support
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = currentLang;
    }

    document.querySelectorAll('.lang-toggle').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            currentLang = currentLang === 'en' ? 'ar' : 'en';
            navLinks.classList.add('active'); // Keep menu open
            updateLanguage();
        });
    });

    // Close menu when clicking navigation links (except language toggle)
    navLinks.querySelectorAll('a:not(.lang-toggle)').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Initial translation
    updateLanguage();
});
