// Custom cursor: one rAF-batched position update and delegated hover handling.
if (matchMedia("(hover: hover)").matches) {
  const cur = document.getElementById("cursor");
  const trail = document.getElementById("cursor-trail");
  const HOVER = "a, button, .fs-card, .md-card, .gl-cell, .cta-btn, #handle";
  let x = 0, y = 0, queued = false;

  document.addEventListener("mousemove", (e) => {
    x = e.clientX; y = e.clientY;
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      cur.style.left = trail.style.left = x + "px";
      cur.style.top = trail.style.top = y + "px";
    });
  }, { passive: true });

  const size = (on) => {
    cur.style.width = cur.style.height = on ? "20px" : "12px";
    trail.style.width = trail.style.height = on ? "60px" : "36px";
  };
  document.addEventListener("mouseover", (e) => { if (e.target.closest(HOVER)) size(true); });
  document.addEventListener("mouseout", (e) => { if (e.target.closest(HOVER) && !e.relatedTarget?.closest(HOVER)) size(false); });
}
