document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        links.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        burger.classList.toggle('toggle');
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.05)';
        }
    });

    // Active Link Highlighter
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.nav-links li a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        navLi.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href') === `#${current}`) {
                li.classList.add('active');
            }
        });
    });

    // Skill Animation
    const skillItems = document.querySelectorAll('.skill-item');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('skill-animate');
            }
        });
    }, { threshold: 0.5 });
    skillItems.forEach(item => observer.observe(item));

    // Project Card Animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => card.classList.add('project-hover'));
        card.addEventListener('mouseleave', () => card.classList.remove('project-hover'));
    });

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            if (name && email && subject && message) {
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill all fields');
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                if (navLinks.classList.contains('nav-active')) {
                    navLinks.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    links.forEach(link => link.style.animation = '');
                }
                window.scrollTo({ top: targetElement.offsetTop - 70, behavior: 'smooth' });
            }
        });
    });

    // Typing effect for hero name
    const typeTarget = document.querySelector('.hero-name');
    if (typeTarget) {
        const text = "Ajay Vijayaraj V S";
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                typeTarget.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 200); // Adjust speed here (200ms per letter)
            }
        }
        setTimeout(typeWriter, 1000); // Delay before starting
    }

    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.3}s`;
    });

    // Add animation classes when elements in viewport
    const animateOnScroll = function() {
        const animatedElements = document.querySelectorAll('.achievement-card, .workshop-card, .timeline-item');
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Add CSS animations for elements
    const addCSSAnimations = () => {
        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerText = `
            @keyframes navLinkFade {
                from { opacity: 0; transform: translateX(50px); }
                to { opacity: 1; transform: translateX(0); }
            }
            .toggle .line1 { transform: rotate(-45deg) translate(-5px, 6px); }
            .toggle .line2 { opacity: 0; }
            .toggle .line3 { transform: rotate(45deg) translate(-5px, -6px); }
            .skill-animate .skill-progress { animation: skillProgress 1s ease-out forwards; }
            @keyframes skillProgress { from { width: 0; } }
            .project-hover { transform: translateY(-10px); box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1); }
            .timeline-item { opacity: 0; transform: translateX(-30px); animation: fadeInLeft 0.5s ease-out forwards; }
            @keyframes fadeInLeft { to { opacity: 1; transform: translateX(0); } }
            .achievement-card, .workshop-card { opacity: 0; transform: translateY(20px); transition: all 0.5s ease; }
            .achievement-card.animate, .workshop-card.animate { opacity: 1; transform: translateY(0); }
        `;
        document.head.appendChild(styleSheet);
    };
    addCSSAnimations();

    // Add additional CSS for mobile responsiveness
    const addResponsiveCSS = () => {
        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerText = `
            @media screen and (max-width: 900px) {
                .about-content, .skills-container, .contact-content { grid-template-columns: 1fr; gap: 2rem; }
                .skills-grid { grid-template-columns: repeat(2, 1fr); }
                .projects-container { grid-template-columns: 1fr; }
                .hero-name { font-size: 2.5rem; }
                .section-title { font-size: 1.8rem; }
            }
            @media screen and (max-width: 768px) {
                .skills-grid, .achievements-container, .workshops-container { grid-template-columns: 1fr; }
                .hero-name { font-size: 2rem; }
                .hero-quote { font-size: 1.3rem; }
                section { padding: 3rem 0; }
            }
        `;
        document.head.appendChild(styleSheet);
    };
    addResponsiveCSS();

    // Minimal Mouse Tail Effect
    const canvas = document.getElementById('mouse-tail');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let dots = [];

    class Dot {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = 2;
            this.life = 1;
            this.color = body.getAttribute('data-theme') === 'light' ? 'rgba(0, 123, 255, 0.5)' : 'rgba(255, 255, 255, 0.5)';
        }

        update() {
            this.life -= 0.02;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.life;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function animateDots() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = dots.length - 1; i >= 0; i--) {
            dots[i].update();
            dots[i].draw();
            if (dots[i].life <= 0) dots.splice(i, 1);
        }
        requestAnimationFrame(animateDots);
    }

    window.addEventListener('mousemove', (e) => {
        dots.push(new Dot(e.x, e.y));
        if (dots.length > 20) dots.shift();
    });

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    animateDots();
});