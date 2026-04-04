(function() {
  const canvas = document.getElementById('smoke-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function Particle() {
    this.reset();
  }
  Particle.prototype.reset = function() {
    this.x = W * 0.5 + (Math.random() - 0.5) * W * 0.3;
    this.y = H * 0.75 + Math.random() * H * 0.2;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = -(Math.random() * 0.6 + 0.2);
    this.r = Math.random() * 80 + 30;
    this.alpha = Math.random() * 0.08 + 0.02;
    this.life = 0;
    this.maxLife = 200 + Math.random() * 200;
  };
  Particle.prototype.update = function() {
    this.life++;
    this.x += this.vx;
    this.y += this.vy;
    this.vx += (Math.random() - 0.5) * 0.05;
    if (this.life > this.maxLife) this.reset();
  };
  Particle.prototype.draw = function() {
    const prog = this.life / this.maxLife;
    const a = this.alpha * Math.sin(prog * Math.PI);
    const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
    grad.addColorStop(0, `rgba(180,200,220,${a})`);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  };

  function init() {
    resize();
    for (let i = 0; i < 18; i++) {
      const p = new Particle();
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }
    loop();
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => { resize(); });

  const root = document.getElementById('fs-root');
  const cards = document.querySelectorAll('.fs-card');

  setTimeout(() => {
    root.classList.add('loaded');
    cards.forEach((c, i) => {
      c.style.transition = `opacity 0.6s ${0.2 + i * 0.08}s, transform 0.6s ${0.2 + i * 0.08}s`;
    });
  }, 100);

  init();
})();