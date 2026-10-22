// Page loader + scroll animations. Only selectors that exist in index.html are targeted.
// The markup's "REQUEST / COMPARE / VIEW" buttons call sendPrompt(), which only exists inside Claude's widget runtime.
// Define a safe stand-in so clicking them never throws; for now they scroll to the contact section.
window.sendPrompt = window.sendPrompt || (() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }));

const loader = document.getElementById("loader");
// If the GSAP CDN is blocked or slow, never leave the visitor stuck behind the loader.
const failSafe = setTimeout(() => { loader.style.display = "none"; }, 8000);
if (!window.gsap || !window.ScrollTrigger) {
  loader.style.display = "none";
} else {
gsap.registerPlugin(ScrollTrigger);

const pctEl = document.getElementById("loaderPct");
const counter = { v: 0 };
const show = () => { pctEl.textContent = String(Math.floor(counter.v)).padStart(3, "0") + "%"; };

function exitLoader() {
  const tl = gsap.timeline({ delay: 0.2 });
  tl.to(loader, { yPercent: -100, duration: 1, ease: "expo.inOut",
      onComplete: () => { clearTimeout(failSafe); loader.style.display = "none"; } })
    .from("nav", { y: -60, opacity: 0, duration: 1, ease: "expo.out" }, 0.4)
    .from(".hero-label h1", { x: -80, opacity: 0, duration: 1.2, ease: "expo.out" }, 0.6)
    .from(".hero-label .sub", { x: -40, opacity: 0, duration: 1, ease: "expo.out" }, 0.9);
}

// Simulated progress eases toward 90%, then completes when the page has really loaded.
const fake = gsap.to(counter, { v: 90, duration: 2.5, ease: "power2.out", onUpdate: show });
const finish = () => {
  fake.kill();
  gsap.to(counter, { v: 100, duration: 0.4, onUpdate: show, onComplete: exitLoader });
};
document.readyState === "complete" ? finish() : addEventListener("load", finish, { once: true });

gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
  const at = (trigger, start = "top 70%") => ({ trigger, start, once: true });
  gsap.from(".philosophy-content blockquote", { y: 60, opacity: 0, duration: 1.4, ease: "expo.out", scrollTrigger: at("#philosophy", "top 65%") });
  gsap.from(".stat-item", { y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: "expo.out", scrollTrigger: at(".stats-row", "top 80%") });
  gsap.from(".contact-headline", { y: 80, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: at("#contact") });
  gsap.from(".cta-btn", { y: 40, opacity: 0, duration: 1, delay: 0.3, ease: "expo.out", scrollTrigger: at("#contact") });
  gsap.to(".philosophy-bg-text", { x: "-20%", ease: "none",
    scrollTrigger: { trigger: "#philosophy", start: "top bottom", end: "bottom top", scrub: 1 } });
});
}
