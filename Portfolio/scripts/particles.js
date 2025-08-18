// Tech-inspired dynamic glowing particles background
const canvas = document.getElementById('tech-particles');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const PARTICLE_COUNT = 70;
const LINE_DISTANCE = 140;
const particles = [];

let mouse = { x: null, y: null, active: false };

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
});
canvas.addEventListener('mouseleave', () => {
    mouse.active = false;
});

function randomBetween(a, b) {
    return a + Math.random() * (b - a);
}

function neonColor(t, offset = 0) {
    // Cycle through neon hues
    const hue = (t * 60 + offset) % 360;
    return `hsl(${hue}, 100%, 60%)`;
}

class Particle {
    constructor(i) {
        this.x = randomBetween(0, width);
        this.y = randomBetween(0, height);
        this.radius = randomBetween(2.5, 5.5);
        this.speed = randomBetween(0.3, 1.2);
        this.angle = randomBetween(0, 2 * Math.PI);
        this.dx = Math.cos(this.angle) * this.speed;
        this.dy = Math.sin(this.angle) * this.speed;
        this.glow = randomBetween(18, 32);
        this.colorOffset = i * 5;
    }
    move() {
        // Cursor attraction
        if (mouse.active) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 180) {
                // Move slightly toward the cursor
                this.x += dx * 0.015;
                this.y += dy * 0.015;
            }
        }
        this.x += this.dx;
        this.y += this.dy;
        if (this.x < 0 || this.x > width) this.dx *= -1;
        if (this.y < 0 || this.y > height) this.dy *= -1;
    }
    draw(t) {
        const color = neonColor(t, this.colorOffset);
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.shadowColor = color;
        ctx.shadowBlur = this.glow;
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.98;
        ctx.fill();
        ctx.restore();
    }
}

function connectParticles(t) {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < LINE_DISTANCE) {
                const color = neonColor(t, (particles[i].colorOffset + particles[j].colorOffset) / 2);
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = color;
                ctx.lineWidth = 1.5 - dist / LINE_DISTANCE;
                ctx.globalAlpha = 0.7 - dist / (LINE_DISTANCE * 1.2);
                ctx.shadowColor = color;
                ctx.shadowBlur = 10;
                ctx.stroke();
                ctx.restore();
            }
        }
    }
}

function animate(t) {
    ctx.clearRect(0, 0, width, height);
    connectParticles(t / 1000);
    for (let i = 0; i < particles.length; i++) {
        particles[i].move();
        particles[i].draw(t / 1000);
    }
    requestAnimationFrame(animate);
}

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

window.addEventListener('resize', resize);

// Initialize particles
particles.length = 0;
for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle(i));
}

animate(0); 