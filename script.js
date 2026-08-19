// ===== EXISTING FUNCTIONALITY =====
// Keep your existing functions (toggleMenu, smooth scroll, form handler, etc.)
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

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

document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Form submitted!');
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

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

// ===== SENTINEL AI HERO FUNCTIONALITY (NEW) =====

// Load Spline 3D Scene
document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.getElementById('spline-wrapper');
    if (!wrapper) return;
    
    const canvasContainer = document.createElement('div');
    canvasContainer.style.width = '100%';
    canvasContainer.style.height = '100%';
    canvasContainer.style.position = 'absolute';
    canvasContainer.style.inset = '0';
    wrapper.appendChild(canvasContainer);
    
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@splinetool/runtime@1.0.1/build/runtime.min.js';
    script.onload = function() {
        try {
            if (typeof SplineRuntime !== 'undefined') {
                const runtime = new SplineRuntime({
                    canvas: canvasContainer,
                    scene: 'https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode'
                });
                console.log('Spline 3D scene loaded successfully!');
            } else {
                showFallback();
            }
        } catch (error) {
            console.error('Error loading Spline:', error);
            showFallback();
        }
    };
    script.onerror = function() {
        showFallback();
    };
    document.head.appendChild(script);
    
    function showFallback() {
        const fallback = wrapper.querySelector('.spline-fallback');
        if (fallback) {
            fallback.style.display = 'block';
            fallback.style.background = 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #0a0a1a 100%)';
            fallback.style.backgroundSize = '400% 400%';
            fallback.style.animation = 'gradientMove 8s ease infinite';
        }
    }
});

// ===== DRAWER CLICK HANDLERS =====
document.addEventListener('DOMContentLoaded', function() {
    const drawers = document.querySelectorAll('.drawer');
    
    drawers.forEach(drawer => {
        drawer.addEventListener('click', function() {
            const title = this.querySelector('h4')?.textContent || 'Drawer';
            const icon = this.querySelector('.drawer-icon')?.textContent || '📦';
            const desc = this.querySelector('p')?.textContent || 'Feature details coming soon.';
            
            const popup = document.createElement('div');
            popup.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #1a1a2e;
                padding: 2rem 3rem;
                border-radius: 1rem;
                border: 1px solid #77ff77;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
                z-index: 1000;
                text-align: center;
                max-width: 400px;
                animation: fade-in 0.3s ease-out;
            `;
            popup.innerHTML = `
                <div style="font-size: 3rem; margin-bottom: 1rem;">${icon}</div>
                <h3 style="color: #fff; margin-bottom: 0.5rem; font-family: Sora, sans-serif;">${title}</h3>
                <p style="color: #999; font-size: 0.9rem; margin-bottom: 1.5rem; font-family: Sora, sans-serif;">
                    ${desc}
                </p>
                <button onclick="this.closest('div').remove(); document.querySelector('.popup-overlay')?.remove();" 
                        style="
                            padding: 0.5rem 2rem;
                            background: #77ff77;
                            color: #000;
                            border: none;
                            border-radius: 0.5rem;
                            cursor: pointer;
                            font-weight: 600;
                            font-family: Sora, sans-serif;
                        ">
                    Close
                </button>
            `;
            
            const overlay = document.createElement('div');
            overlay.className = 'popup-overlay';
            overlay.style.cssText = `
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.7);
                z-index: 999;
                backdrop-filter: blur(8px);
                animation: fade-in 0.3s ease-out;
            `;
            overlay.addEventListener('click', function() {
                this.remove();
                document.querySelector('[style*="fixed"][style*="50%"]')?.remove();
            });
            
            document.body.appendChild(overlay);
            document.body.appendChild(popup);
        });
    });
});

// ===== HERO CTA BUTTON HANDLERS =====
document.addEventListener('DOMContentLoaded', function() {
    const bookCallBtn = document.querySelector('.btn-hero-primary');
    const ourWorkBtn = document.querySelector('.btn-hero-secondary');
    
    if (bookCallBtn) {
        bookCallBtn.addEventListener('click', function() {
            alert('📞 Book a Call\n\nThank you for your interest!\nOur team will reach out within 24 hours.\n\nCall us directly: +1 (555) 123-4567');
        });
    }
    
    if (ourWorkBtn) {
        ourWorkBtn.addEventListener('click', function() {
            alert('🛡️ Our Work\n\nWe\'ve deployed security systems for:\n\n🏢 Enterprise Corporations\n🏥 Healthcare Facilities\n🏫 Educational Institutions\n🏭 Industrial Complexes\n\nContact us for case studies!');
        });
    }
});

// ===== KEYBOARD SHORTCUT: ESC to close popups =====
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('[style*="fixed"][style*="50%"]').forEach(el => el.remove());
        document.querySelectorAll('.popup-overlay').forEach(el => el.remove());
    }
});

// ===== ADD FADE-IN ANIMATION =====
(function addKeyframes() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fade-in {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
            100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes slide-up {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
})();

console.log('🛡️ Sentinel AI - Enterprise Security Platform');
console.log('🔐 Zero-Trust Architecture | 🤖 AI Surveillance | 📊 Security Analytics');
