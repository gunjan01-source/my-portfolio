// =====================================
// 1. Neural Network Canvas Animation
// =====================================
function createNetwork(canvasId, { numberPoints = 60, maxDistance = 100, particleSize = 2 } = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const maxDistanceSq = maxDistance * maxDistance;

    let particlesArray = [];

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = particleSize;
            this.speedX = (Math.random() - 0.5) * 0.8;
            this.speedY = (Math.random() - 0.5) * 0.8;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        for (let i = 0; i < numberPoints; i++) {
            particlesArray.push(new Particle());
        }
    }

    function connect() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a + 1; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) ** 2 +
                               (particlesArray[a].y - particlesArray[b].y) ** 2);
                if (distance < maxDistanceSq) {
                    ctx.strokeStyle = `rgba(255, 214, 221, ${1 - distance / maxDistanceSq})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(p => { p.update(); p.draw(); });
        connect();
        requestAnimationFrame(animate);
    }

    init();
    animate();
}

createNetwork('networkCanvas', { numberPoints: 60, maxDistance: 100, particleSize: 2 });
createNetwork('aboutCanvas', { numberPoints: 26, maxDistance: 70, particleSize: 2 });

// =====================================
// 2. Mouse Glow Movement
// =====================================
const glow = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

// =====================================
// 3. Typing Effect
// =====================================
const typingText = document.getElementById('typing');
const text = "Turning Data into Decisions.";
let idx = 0;

function type() {
    if (idx < text.length) {
        typingText.innerHTML += text.charAt(idx);
        idx++;
        setTimeout(type, 100);
    }
}
typingText.innerHTML = ""; // Clear existing
type();

// =====================================
// 4. Scroll Reveal & Counters
// =====================================
const observerOptions = { threshold: 0.2 };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            if (entry.target.classList.contains('counter')) {
                startCounter(entry.target);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-card, .project-card, .section-title, .counter').forEach(el => {
    el.classList.add('reveal'); // Add reveal class dynamically
    observer.observe(el);
});

function startCounter(el) {
    const target = +el.getAttribute('data-target');
    const suffix = el.getAttribute('data-suffix') || '';
    let count = 0;
    const speed = target / 50;
    const updateCount = () => {
        if (count < target) {
            count += speed;
            el.innerText = Math.ceil(count);
            setTimeout(updateCount, 30);
        } else {
            el.innerText = target + suffix;
        }
    };
    updateCount();
}