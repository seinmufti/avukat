document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth'
            });
            navLinks.classList.remove('active');
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
    let currentLang = 'en';
    let savedTexts = {};

    document.getElementById('langToggle').addEventListener('click', function (e) {
        e.preventDefault();

        // Switch language
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        document.documentElement.lang = currentLang;
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

        try {
            // Update all elements with data-translate attribute
            document.querySelectorAll('[data-translate]').forEach(element => {
                const key = element.getAttribute('data-translate');
                const currentText = element.textContent.trim().replace(/\s+/g, ' ');

                if (!savedTexts[key]) {
                    savedTexts[key] = {
                        en: currentText,
                        ar: translations[currentText]
                    };
                }

                // Use the normalized text for lookup and translation
                const translatedText = currentLang === 'ar' ? savedTexts[key].ar : savedTexts[key].en;
                if (translatedText) {
                    element.textContent = translatedText;
                }
            });

            // Update all placeholders
            document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
                const key = element.getAttribute('data-translate-placeholder');
                if (!savedTexts[key + '_placeholder']) {
                    savedTexts[key + '_placeholder'] = {
                        en: element.placeholder,
                        ar: translations[element.placeholder]
                    };
                }
                element.placeholder = currentLang === 'ar' ? savedTexts[key + '_placeholder'].ar : savedTexts[key + '_placeholder'].en;
            });

            // Form alert messages
            const message = currentLang === 'ar' ? translations['Thank you for your message. We will get back to you soon!'] : 'Thank you for your message. We will get back to you soon!';
            contactForm.onsubmit = (e) => {
                e.preventDefault();
                alert(message);
                contactForm.reset();
            };
        } catch (error) {
            console.error('Error during translation:', error);
        }
    });
});
