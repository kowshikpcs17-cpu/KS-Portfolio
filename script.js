// EmailJS Setup - GET FROM emailjs.com dashboard
emailjs.init("YOUR_PUBLIC_KEY");

// Smooth scroll function
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Typing Animation
const typingTexts = ["KOWSHIK C", "Data Analyst", "SQL Expert", "Power BI Pro", "KOWSHIK C"];
let textIndex = 0, charIndex = 0, isDeleting = false;

function typeWriter() {
    const typingElement = document.querySelector('.typing-text');
    const fullText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = fullText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = fullText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 30 : 100;
    if (!isDeleting && charIndex === fullText.length) {
        typeSpeed = 1500; isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Projects Carousel
let projIndex = 0;
document.addEventListener('DOMContentLoaded', () => {
    const projects = document.querySelectorAll('.project-item');
    setInterval(() => {
        projects[projIndex].classList.remove('active');
        projIndex = (projIndex + 1) % projects.length;
        projects[projIndex].classList.add('active');
    }, 2500);
});

// Counter Animation
function animateCounters() {
    document.querySelectorAll('.stat-num').forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                setTimeout(updateCounter, 30);
            } else {
                counter.textContent = target;
            }
        };
        updateCounter();
    });
}

// Navbar Functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('show');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('show');
        });
    });
});

// Navbar scroll effects
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active nav link
    let current = '';
    document.querySelectorAll('section[id]').forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Contact Form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = document.querySelector('.submit-hero');
    const btnText = submitBtn.querySelector('.btn-text');
    const loader = submitBtn.querySelector('.btn-loader');
    
    btnText.textContent = 'Sending...';
    loader.style.opacity = '1';
    submitBtn.disabled = true;
    
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(() => {
            alert('🎉 Message sent! I\'ll reply within 24hrs.');
            this.reset();
        }, (error) => {
            alert('❌ Please email me directly: kowshiksamy1711@gmail.com');
            console.error('EmailJS error:', error);
        })
        .finally(() => {
            btnText.textContent = 'Launch Message';
            loader.style.opacity = '0';
            submitBtn.disabled = false;
        });
});

// Scroll Observer (Timeline + Skills)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            if (entry.target.hasAttribute('data-width')) {
                entry.target.style.width = entry.target.getAttribute('data-width') + '%';
            }
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.timeline-item-hero, .skill-fill, .progress-fill').forEach(el => {
    observer.observe(el);
});

// INIT
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 500);
    setTimeout(animateCounters, 2000);
});

// ★★★ REPLACE THESE 3 VALUES ★★★
emailjs.init("3LyOZ9q-6rW3ej139");

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const button = this.querySelector('.submit-hero');
    const btnText = button.querySelector('.btn-text');
    const btnLoader = button.querySelector('.btn-loader');
    const originalText = btnText.textContent;
    const form = this;  // ✅ SAVE FORM REFERENCE
    
    btnText.textContent = 'Sending...';
    btnLoader.style.opacity = '1';
    button.disabled = true;
    
    emailjs.sendForm('service_wlxr7b3', 'template_rie9hc9', form)
        .then(function(response) {
            console.log('✅ SUCCESS:', response.status, response.text);
            // ✅ NO 'this.reset()' - use saved 'form'
            form.reset();
            btnText.innerHTML = '✅ Message Sent!';
            setTimeout(() => { 
                btnText.textContent = originalText; 
            }, 3000);
        })
        .catch(function(error) {  // ✅ Use .catch() not 2nd param
            console.error('❌ ERROR:', error);
            btnText.innerHTML = '❌ Try Again';
            setTimeout(() => { 
                btnText.textContent = originalText; 
            }, 2000);
        })
        .finally(function() {
            btnLoader.style.opacity = '0';
            button.disabled = false;
        });
});