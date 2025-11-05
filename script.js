

// Personal Info
const INFO = {
    name: 'Hiba Tariq',
    email: 'faqihatariq466@gmail.com'
};

// Magic Particles
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.color = Math.random() > 0.5 ? '#ff00c8' : '#00f2ff';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

const particles = Array.from({ length: 120 }, () => new Particle());

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    // Connect particles
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.hypot(dx, dy);

            if (distance < 150) {
                ctx.strokeStyle = `rgba(255, 0, 200, ${1 - distance / 150})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animateParticles);
}
animateParticles();

// Cursor Magic
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    follower.style.left = e.clientX + 'px';
    follower.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .project-card, .skill-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(3)';
        follower.style.transform = 'scale(2)';
        follower.style.borderColor = '#ffd700';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        follower.style.transform = 'scale(1)';
        follower.style.borderColor = '#ff00c8';
    });
});

// Navbar Scroll
window.addEventListener('scroll', () => {
    document.querySelector('nav').classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Typewriter - Magic Edition
const phrases = [
    'Weaving Digital Spells',
    'Animating the Impossible',
    'Crafting UI Enchantments',
    'Summoning Pixel Magic'
];

let i = 0, j = 0, isDeleting = false;

function type() {
    const current = phrases[i];
    document.getElementById('typewriter').textContent = current.substring(0, j);

    if (!isDeleting && j === current.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % phrases.length;
        setTimeout(type, 700);
    } else {
        j += isDeleting ? -1 : 1;
        setTimeout(type, isDeleting ? 70 : 130);
    }
}
type();

// Scroll Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.animate').forEach(el => observer.observe(el));

// Skill Bars
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-fill').forEach(fill => {
                setTimeout(() => {
                    fill.style.width = fill.dataset.width + '%';
                }, 300);
            });
            skillObserver.unobserve(entry.target);
        }
    });
});

skillObserver.observe(document.querySelector('#skills'));

// Contact Form - Magic Send
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;

    const mailto = `mailto:${INFO.email}?subject=Magic Request from ${name}&body=Name: ${name}%0AEmail: ${email}%0A%0ASpell:%0A${message}`;
    
    window.location.href = mailto;

    // Magic feedback
    const btn = this.querySelector('.submit-btn');
    const original = btn.textContent;
    btn.innerHTML = '<i class="fas fa-hat-wizard"></i> Casting...';
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-sparkles"></i> Spell Sent!';
        setTimeout(() => {
            btn.textContent = original;
            this.reset();
        }, 2500);
    }, 1500);
});

// contact.js

document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const form = e.target;

  fetch(form.action, {
    method: 'POST',
    body: new FormData(form)
  }).then(response => {
    if (response.ok) {
      Swal.fire({
        title: '🔮 Summon Complete!',
        text: 'Your magical message has been sent through the ether 💌',
        icon: 'success',
        background: 'rgba(10, 0, 31, 0.95)',
        color: '#e6e6ff',
        confirmButtonColor: '#ff00c8',
        confirmButtonText: '✨ Awesome!',
        backdrop: `
          rgba(0,0,0,0.6)
          radial-gradient(circle at 20% 20%, rgba(255,0,200,0.3), transparent 40%)
          radial-gradient(circle at 80% 80%, rgba(0,242,255,0.3), transparent 40%)
        `
      });
      form.reset();
    } else {
      Swal.fire({
        title: '⚡ Spell Failed!',
        text: 'The message couldn’t pass through the portal. Try again.',
        icon: 'error',
        background: 'rgba(10, 0, 31, 0.95)',
        color: '#e6e6ff',
        confirmButtonColor: '#00f2ff',
        confirmButtonText: 'Retry'
      });
    }
  });
});
