// ===== Mobile Menu Toggle =====
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// ===== Close menu on link click (mobile) =====
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// ===== Smooth scroll for all anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ===== Form submission (console log) =====
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Form submitted!');
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// ===== Navbar scroll effect =====
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 26, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 26, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// ===== Animation on scroll (simple reveal) =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .portfolio-item, .about-content, .hero-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ===== After page load, trigger animation for visible elements =====
window.addEventListener('load', () => {
    document.querySelectorAll('.service-card, .portfolio-item, .about-content, .hero-content').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
});
