(function() {
  const root = document.getElementById('sp-root');

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function animateCount(el, target, decimals, duration, delay) {
    let start = null;
    setTimeout(() => {
      function step(ts) {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const val = target * easeOut(progress);
        el.textContent = val.toFixed(decimals);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target.toFixed(decimals);
      }
      requestAnimationFrame(step);
    }, delay);
  }

  function initAnimations() {
    root.classList.add('sp-loaded');

    const nums = document.querySelectorAll('.sp-num');
    nums.forEach((el, i) => {
      const target = parseFloat(el.dataset.target);
      const dec = parseInt(el.dataset.decimals);
      animateCount(el, target, dec, 1800, 400 + i * 120);
    });

    const fills = document.querySelectorAll('.sp-bar-fill');
    fills.forEach((el, i) => {
      const pct = el.dataset.pct;
      setTimeout(() => { el.style.width = pct + '%'; }, 500 + i * 100);
    });

    if (window.Motion) {
      const { animate, stagger } = window.Motion;

      animate('.sp-card', { opacity: [0, 1], y: [40, 0] }, {
        duration: 0.7,
        delay: stagger(0.1, { start: 0.3 }),
        easing: [0.76, 0, 0.24, 1]
      });

      document.querySelectorAll('.sp-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
          animate(card.querySelector('.sp-num'), { scale: [1, 1.04, 1] }, { duration: 0.35, easing: 'ease-out' });
        });
      });
    } else {
      document.querySelectorAll('.sp-card').forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = `opacity 0.7s ${0.3 + i * 0.1}s, transform 0.7s ${0.3 + i * 0.1}s`;
        requestAnimationFrame(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      });
    }
  }

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      observer.disconnect();
      initAnimations();
    }
  }, { threshold: 0.15 });

  observer.observe(root);
})();