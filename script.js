// Hero: drag the handle, then the frame sequence auto-plays; scrolling back to the hero rewinds it.
const hero = document.querySelector("#hero");
const canvas = document.querySelector("#frame");
const ctx = canvas.getContext("2d", { alpha: false });
const path = document.querySelector("#curve");
const handle = document.querySelector("#handle");
const slider = document.querySelector("#sliderContainer");

const LAST = 160;            // last frame index (161 frames)
const AUTOPLAY_AT = 0.3;     // drag progress that triggers auto-play
const RUN_MS = 5000;         // full-sequence play time, independent of device speed
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const pathLength = path.getTotalLength();

const images = new Array(LAST + 1);
let w = 0, h = 0, current = 0, drawn = -1, progress = 0;
let raf = 0, mode = "idle"; // idle | drag | play | reverse

const clamp = (v) => Math.max(0, Math.min(1, v));
const frameUrl = (i) => `Frames/frame_${String(i).padStart(4, "0")}.webp`;

function draw(i) {
  const img = images[i];
  if (!img || !img.naturalWidth) return;       // not decoded (or failed): keep previous frame
  current = i;
  if (drawn === i) return;
  drawn = i;
  const s = Math.max(w / img.naturalWidth, h / img.naturalHeight);
  const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
  ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
}

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // cap: fill cost grows with dpr²
  w = window.innerWidth; h = window.innerHeight;
  canvas.width = w * dpr; canvas.height = h * dpr;          // only reallocated on resize, not per frame
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingQuality = "high";
  drawn = -1; draw(current);
}

// The handle starts at the right end of the curve and moves left as progress goes 0 -> 1.
function placeHandle(p) {
  const pt = path.getPointAtLength((1 - p) * pathLength);
  handle.setAttribute("cx", pt.x);
  handle.setAttribute("cy", pt.y);
  handle.setAttribute("aria-valuenow", Math.round(p * 100));
}

function run(to, done) {
  cancelAnimationFrame(raf);
  const from = current, ms = RUN_MS * Math.abs(to - from) / LAST, t0 = performance.now();
  if (reduceMotion || ms === 0) { draw(to); done?.(); return; }
  const step = (t) => {
    const k = Math.min(1, (t - t0) / ms);
    draw(Math.round(from + (to - from) * k));
    if (k < 1) raf = requestAnimationFrame(step); else done?.();
  };
  raf = requestAnimationFrame(step);
}

function setProgress(p) {
  progress = clamp(p);
  placeHandle(progress);
  draw(Math.floor(progress * LAST));
  if (progress < AUTOPLAY_AT) { slider.style.opacity = 1 - progress / AUTOPLAY_AT; return; }
  mode = "play";
  slider.style.opacity = 0;
  run(LAST, () => { mode = "idle"; });
}

function rewind() {
  if (mode === "reverse") return;
  mode = "reverse";
  run(0, () => { mode = "idle"; progress = 0; placeHandle(0); slider.style.opacity = 1; });
}

// Pointer Events cover mouse, touch and pen; capture keeps the drag alive outside the handle.
handle.setAttribute("stroke", "transparent");   // enlarges the hit area without changing the look
handle.setAttribute("stroke-width", "28");
handle.style.touchAction = "none";
handle.setAttribute("tabindex", "0");
handle.setAttribute("role", "slider");
handle.setAttribute("aria-label", "Explore the bike");
handle.setAttribute("aria-valuemin", "0");
handle.setAttribute("aria-valuemax", "100");

handle.addEventListener("pointerdown", (e) => {
  if (mode !== "idle") return;
  mode = "drag";
  handle.setPointerCapture(e.pointerId);
});
handle.addEventListener("pointermove", (e) => {
  if (mode !== "drag") return;
  const r = path.getBoundingClientRect();
  if (r.width) setProgress((r.right - e.clientX) / r.width);
});
const endDrag = () => { if (mode === "drag") mode = "idle"; };
handle.addEventListener("pointerup", endDrag);
handle.addEventListener("pointercancel", endDrag);
handle.addEventListener("keydown", (e) => {
  const step = { ArrowRight: -0.05, ArrowUp: -0.05, ArrowLeft: 0.05, ArrowDown: 0.05 }[e.key];
  if (step === undefined || (mode !== "idle" && mode !== "drag")) return;
  e.preventDefault();
  setProgress(progress + step);
});

// Rewind when the hero comes back into view (replaces a scroll listener that ran layout on every event).
new IntersectionObserver(([e]) => {
  if (e.isIntersecting && current > 0 && mode !== "drag") rewind();
}, { threshold: 0.9 }).observe(hero);

let resizeRaf = 0;
window.addEventListener("resize", () => {
  cancelAnimationFrame(resizeRaf);
  resizeRaf = requestAnimationFrame(resize);
});

// Preload every frame; a failed frame no longer blocks the rest (onerror counts as settled).
placeHandle(0);
resize();
for (let i = 0; i <= LAST; i++) {
  const img = new Image();
  img.decoding = "async";
  img.src = frameUrl(i);
  if (i === 0) img.onload = () => draw(0);
  else img.onerror = () => console.warn("Missing frame:", img.src);
  images[i] = img;
}
