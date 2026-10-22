// Smoke background. Draws a pre-rendered sprite at half resolution and only runs while visible.
(function () {
  const root = document.getElementById("fs-root");
  const canvas = document.getElementById("smoke-canvas");
  const ctx = canvas.getContext("2d");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const SCALE = 0.5, COUNT = 18;
  let W = 0, H = 0, raf = 0, last = 0, onScreen = false;

  const sprite = document.createElement("canvas");   // one radial gradient, drawn once
  sprite.width = sprite.height = 128;
  const sctx = sprite.getContext("2d");
  const g = sctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(180,200,220,1)");
  g.addColorStop(1, "rgba(180,200,220,0)");
  sctx.fillStyle = g;
  sctx.fillRect(0, 0, 128, 128);

  function reset(p) {
    p.x = W * 0.5 + (Math.random() - 0.5) * W * 0.3;
    p.y = H * 0.75 + Math.random() * H * 0.2;
    p.vx = (Math.random() - 0.5) * 0.4 * SCALE;
    p.vy = -(Math.random() * 0.6 + 0.2) * SCALE;
    p.r = (Math.random() * 80 + 30) * SCALE;
    p.alpha = Math.random() * 0.08 + 0.02;
    p.life = 0;
    p.maxLife = 200 + Math.random() * 200;
    return p;
  }
  let particles = [];

  function resize() {
    W = canvas.width = Math.max(1, Math.round(canvas.offsetWidth * SCALE));
    H = canvas.height = Math.max(1, Math.round(canvas.offsetHeight * SCALE));
    particles = Array.from({ length: COUNT }, () => { const p = reset({}); p.life = Math.random() * p.maxLife; return p; });
    if (!onScreen || reduceMotion) render(0);
  }

  function render(dt) {            // dt in 60fps frames, so speed is the same on 60/120/144Hz screens
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      p.life += dt; p.x += p.vx * dt; p.y += p.vy * dt;
      p.vx += (Math.random() - 0.5) * 0.05 * SCALE * dt;
      if (p.life > p.maxLife) reset(p);
      ctx.globalAlpha = p.alpha * Math.sin((p.life / p.maxLife) * Math.PI);
      ctx.drawImage(sprite, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
    }
    ctx.globalAlpha = 1;
  }

  function loop(t) {
    render(Math.min((t - last) / 16.667, 3));
    last = t;
    raf = requestAnimationFrame(loop);
  }
  function start() { if (!raf && !reduceMotion) { last = performance.now(); raf = requestAnimationFrame(loop); } }
  function stop() { cancelAnimationFrame(raf); raf = 0; }

  let revealed = false;
  new IntersectionObserver(([e]) => {
    onScreen = e.isIntersecting;
    if (onScreen) {
      if (!revealed) {
        revealed = true;
        root.classList.add("loaded");
        document.querySelectorAll(".fs-card").forEach((c, i) => {
          c.style.transition = `opacity 0.6s ${0.2 + i * 0.08}s, transform 0.6s ${0.2 + i * 0.08}s`;
        });
      }
      start();
    } else stop();
  }, { threshold: 0.05 }).observe(root);

  document.addEventListener("visibilitychange", () => { document.hidden ? stop() : onScreen && start(); });
  let t; addEventListener("resize", () => { clearTimeout(t); t = setTimeout(resize, 150); });
  resize();
})();
