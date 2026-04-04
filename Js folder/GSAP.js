gsap.registerPlugin(ScrollTrigger);

    // ── Loader exit ──────────────────────────
    const loaderPct = document.getElementById('loaderPct');
let pct = 0;

// Fake progress animation until page actually loads
const loaderInterval = setInterval(() => {
  if (pct < 95) {
    pct += Math.random() * 5;
    loaderPct.textContent = String(Math.floor(pct)).padStart(3, '0') + '%';
  }
}, 80);

// Wait until everything on the page is fully loaded
window.addEventListener('load', () => {
  clearInterval(loaderInterval);

  // Smoothly finish to 100%
  const finishInterval = setInterval(() => {
    pct += 1;

    loaderPct.textContent = String(Math.floor(pct)).padStart(3, '0') + '%';

    if (pct >= 100) {
      clearInterval(finishInterval);

      setTimeout(() => {
        gsap.to('#loader', {
          yPercent: -100,
          duration: 1,
          ease: 'expo.inOut',
          onComplete: () => {
            document.getElementById('loader').style.display = 'none';
          }
        });

        // Intro animations
        gsap.from('nav', {
          y: -60,
          opacity: 0,
          duration: 1,
          ease: 'expo.out',
          delay: 0.2
        });

        gsap.from('.hero-label h1', {
          x: -80,
          opacity: 0,
          duration: 1.2,
          ease: 'expo.out',
          delay: 0.4
        });

        gsap.from('.hero-label .sub', {
          x: -40,
          opacity: 0,
          duration: 1,
          ease: 'expo.out',
          delay: 0.7
        });
      }, 200);
    }
  }, 20);
});

    // ── Spec cards stagger ───────────────────
    gsap.to('.spec-card', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '#sp-root',
        start: 'top 70%',
      }
    });

    // ── Specs left text slide in ─────────────
    gsap.from('.specs-left', {
      x: -60,
      opacity: 0,
      duration: 1,
      ease: 'expo.out',
      scrollTrigger: { trigger: '#sp-root', start: 'top 70%' }
    });

    // ── Features header split ────────────────
    gsap.from('.features-header h2', {
      y: 80,
      opacity: 0,
      duration: 1.1,
      ease: 'expo.out',
      scrollTrigger: { trigger: '#fs-root', start: 'top 65%' }
    });

    // ── Feature panels stagger from bottom ───
    gsap.from('.feature-panel', {
      y: 100,
      opacity: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: 'expo.out',
      scrollTrigger: { trigger: '.features-strip', start: 'top 75%' }
    });

    // ── Models cards 3D flip-in ──────────────
    gsap.to('.model-card', {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 1,
      stagger: 0.18,
      ease: 'expo.out',
      scrollTrigger: { trigger: '#md-root', start: 'top 65%' }
    });

    // ── Models header slide ──────────────────
    gsap.from('.models-header h2', {
      x: -80,
      opacity: 0,
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: { trigger: '#md-root', start: 'top 70%' }
    });

    // ── Philosophy quote word-by-word ────────
    gsap.from('.philosophy-content blockquote', {
      y: 60,
      opacity: 0,
      duration: 1.4,
      ease: 'expo.out',
      scrollTrigger: { trigger: '#philosophy', start: 'top 65%' }
    });

    // ── Stats count-up ───────────────────────
    gsap.to('.stat-item', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'expo.out',
      scrollTrigger: { trigger: '.stats-row', start: 'top 80%' }
    });

    // ── Gallery cells scale-in ───────────────
    gsap.to('.gal-cell', {
      opacity: 1,
      scale: 1,
      duration: 0.9,
      stagger: { each: 0.1, from: 'random' },
      ease: 'expo.out',
      scrollTrigger: { trigger: '#gl-root', start: 'top 70%' }
    });

    // ── Gallery header clip ──────────────────
    gsap.from('.gallery-header h2', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: { trigger: '#gl-root', start: 'top 75%' }
    });

    // ── Contact headline char stagger ────────
    gsap.from('.contact-headline', {
      y: 80,
      opacity: 0,
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: { trigger: '#contact', start: 'top 70%' }
    });

    gsap.from('.cta-btn', {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'expo.out',
      delay: 0.3,
      scrollTrigger: { trigger: '#contact', start: 'top 70%' }
    });

    // ── Horizontal parallax on philosophy bg ─
    gsap.to('.philosophy-bg-text', {
      x: '-20%',
      ease: 'none',
      scrollTrigger: {
        trigger: '#philosophy',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });

    // ── Specs section subtle parallax ────────
    gsap.from('#specs', {
      backgroundPositionY: '30%',
      ease: 'none',
      scrollTrigger: { trigger: '#specs', scrub: true }
    });