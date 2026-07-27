/* ===========================================================
        THEBLUECRAFTT – FORCE VISIBLE PARTICLES
        Shapes: Circle, Triangle, Square, Diamond, Star
        Colors: Bright Blue, Cyan, Orange
=========================================================== */

(function () {

    // Remove any existing particle canvas
    const existingCanvas = document.getElementById('interactive-particles');
    if (existingCanvas) {
        existingCanvas.remove();
        console.log('🧹 Removed old particle canvas');
    }

    // ========== CREATE CANVAS ==========
    const canvas = document.createElement('canvas');
    canvas.id = 'interactive-particles';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 10;
        pointer-events: none;
        display: block;
        background: transparent;
    `;
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');

    // ========== RESIZE ==========
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // ========== BRIGHT COLORS (Blue, Cyan, Orange) ==========
    const colors = [
        '#2563eb', // Blue
        '#3b82f6', // Light Blue
        '#06f6ff', // Cyan
        '#22d3ee', // Bright Cyan
        '#ff7a00', // Orange
        '#f97316', // Bright Orange
        '#f59e0b', // Amber
        '#60a5fa', // Soft Blue
        '#0ea5e9', // Sky Blue
        '#fb923c', // Light Orange
    ];

    // ========== SHAPES ==========
    const shapes = ['circle', 'triangle', 'square', 'diamond', 'star'];

    // ========== MOUSE ==========
    const mouse = { x: null, y: null, radius: 140 };
    window.addEventListener('mousemove', function (e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // ========== PARTICLE ==========
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 2; // 4-10px
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.shape = shapes[Math.floor(Math.random() * shapes.length)];
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.opacity = Math.random() * 0.3 + 0.6; // 0.6-0.9
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.03;
            this.pulse = Math.random() * 100;
            this.pulseSpeed = 0.02 + Math.random() * 0.03;
            this.glow = Math.random() > 0.3; // 70% glow
            this.glowSize = Math.random() * 25 + 15;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Bounce
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

            // Mouse repulsion
            if (mouse.x !== null && mouse.y !== null) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius && dist > 0) {
                    const force = (mouse.radius - dist) / mouse.radius * 1.5;
                    this.x += (dx / dist) * force;
                    this.y += (dy / dist) * force;
                }
            }

            this.rotation += this.rotationSpeed;
            this.pulse += this.pulseSpeed;
        }

        draw() {
            const size = this.size * (1 + Math.sin(this.pulse) * 0.12);
            ctx.save();

            ctx.globalAlpha = this.opacity;
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);

            // Glow
            if (this.glow) {
                ctx.shadowColor = this.color;
                ctx.shadowBlur = this.glowSize;
            }

            ctx.fillStyle = this.color;
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 1.2;

            // ---- Draw shape ----
            switch (this.shape) {
                case 'circle':
                    ctx.beginPath();
                    ctx.arc(0, 0, size, 0, Math.PI * 2);
                    ctx.fill();
                    break;

                case 'triangle':
                    ctx.beginPath();
                    for (let i = 0; i < 3; i++) {
                        const angle = (i / 3) * Math.PI * 2 - Math.PI / 2;
                        const r = size * 1.3;
                        const x = Math.cos(angle) * r;
                        const y = Math.sin(angle) * r;
                        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                    }
                    ctx.closePath();
                    ctx.fill();
                    break;

                case 'square':
                    const half = size * 0.9;
                    ctx.fillRect(-half, -half, half * 2, half * 2);
                    break;

                case 'diamond':
                    ctx.beginPath();
                    ctx.moveTo(0, -size * 1.2);
                    ctx.lineTo(size * 1.2, 0);
                    ctx.lineTo(0, size * 1.2);
                    ctx.lineTo(-size * 1.2, 0);
                    ctx.closePath();
                    ctx.fill();
                    break;

                case 'star':
                    const pts = 5;
                    const outer = size * 1.3;
                    const inner = size * 0.6;
                    ctx.beginPath();
                    for (let i = 0; i < pts * 2; i++) {
                        const radius = i % 2 === 0 ? outer : inner;
                        const angle = (i / (pts * 2)) * Math.PI * 2 - Math.PI / 2;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;
                        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                    }
                    ctx.closePath();
                    ctx.fill();
                    break;

                default:
                    ctx.beginPath();
                    ctx.arc(0, 0, size, 0, Math.PI * 2);
                    ctx.fill();
            }

            // Tiny highlight
            if (Math.random() > 0.6) {
                ctx.shadowBlur = 0;
                ctx.globalAlpha = 0.4;
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(-size * 0.15, -size * 0.15, size * 0.15, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }
    }

    // ========== PARTICLES ARRAY ==========
    let particles = [];

    function createParticles() {
        particles = [];
        // More particles on larger screens
        const count = Math.min(Math.floor((canvas.width * canvas.height) / 10000), 250);
        const finalCount = Math.max(50, count);
        for (let i = 0; i < finalCount; i++) {
            particles.push(new Particle());
        }
        console.log(`✨ Created ${finalCount} particles`);
    }

    // ========== ANIMATE ==========
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw connecting lines (subtle)
        if (particles.length > 20) {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 130 && dist > 0) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(6, 246, 255, ${0.08 * (1 - dist / 130)})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }
        }

        // Draw particles
        for (const p of particles) {
            p.update();
            p.draw();
        }

        requestAnimationFrame(animate);
    }

    // ========== INIT ==========
    createParticles();
    animate();

    // ========== RESIZE ==========
    window.addEventListener('resize', function () {
        resize();
        createParticles();
    });

    // ========== DEBUG ==========
    console.log('✅ Enhanced particles loaded (forced visible)');
    console.log('🎨 Shapes: circle, triangle, square, diamond, star');
    console.log('🌈 Colors: Blue, Cyan, Orange (bright)');

})();