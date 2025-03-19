// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const testimonialItems = document.querySelectorAll('.testimonial-item');
const dots = document.querySelectorAll('.dot');
const menuNavItems = document.querySelectorAll('.menu-nav-item');
const header = document.querySelector('.header');

// Mobile Navigation Toggle
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });
}

// Close mobile nav when clicking on a link
if (mobileNav) {
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });
}

// Testimonial Slider
function showTestimonial(index) {
    if (!testimonialItems.length || !dots.length) return;
    
    testimonialItems.forEach(item => item.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonialItems[index].classList.add('active');
    dots[index].classList.add('active');
}

// Add click event to testimonial dots
if (dots.length > 0) {
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });

    // Auto-rotate testimonials
    let currentTestimonial = 0;
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
        showTestimonial(currentTestimonial);
    }, 5000);
}

// Menu Navigation (if on menu page)
if (menuNavItems.length > 0) {
    menuNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all items
            menuNavItems.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Scroll to the section
            const targetId = item.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetSection = document.getElementById(targetId.substring(1));
                
                if (targetSection) {
                    const headerHeight = header ? header.offsetHeight : 0;
                    const menuNavHeight = document.querySelector('.menu-nav') ? 
                        document.querySelector('.menu-nav').offsetHeight : 0;
                    const offsetTop = targetSection.offsetTop - (headerHeight + menuNavHeight);
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Scroll Animation
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    // Header background change on scroll
    if (header) {
        if (scrollPosition > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    }
    
    // Animate elements on scroll
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('animated');
        }
    });
});

// Parallax effect on hero section
const heroSection = document.querySelector('.hero');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition < window.innerHeight) {
            heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    });
}