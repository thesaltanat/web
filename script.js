// Mobile menu functionality
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Stop observing once animation is triggered
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('reveal');
    observer.observe(section);
});

// Form validation and submission handling
const contactForm = document.querySelector('#contact form');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(name, email, message) {
    let isValid = true;
    const errors = [];

    if (name.length < 2) {
        isValid = false;
        errors.push('Name must be at least 2 characters long');
    }

    if (!emailRegex.test(email)) {
        isValid = false;
        errors.push('Please enter a valid email address');
    }

    if (message.length < 10) {
        isValid = false;
        errors.push('Message must be at least 10 characters long');
    }

    return { isValid, errors };
}

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validate form
    const { isValid, errors } = validateForm(name, email, message);
    
    if (!isValid) {
        alert(errors.join('\n'));
        return;
    }

    // Here you would typically send this data to a server
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'text-green-600 mt-4 text-center animate-fade-in';
    successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
    
    contactForm.appendChild(successMessage);
    contactForm.reset();
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}); 