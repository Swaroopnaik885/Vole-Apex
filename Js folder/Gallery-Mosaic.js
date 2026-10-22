(function() {
  const root = document.getElementById('gl-root');

  function init() {
    root.classList.add('gl-loaded');
    const cells = document.querySelectorAll('.gl-cell');

    if (window.Motion) {
      const { animate, stagger } = window.Motion;

      animate(cells, { opacity: [0, 1], scale: [0.94, 1] }, {
        duration: 0.8,
        delay: stagger(0.09, { start: 0.3 }),
        easing: [0.76, 0, 0.24, 1]
      });

      cells.forEach(cell => {
        cell.addEventListener('mouseenter', () => {
          animate(cell.querySelector('.gl-cell-num'), { opacity: [null, 1], scale: [1, 1.06] }, { duration: 0.4, easing: 'ease-out' });
          animate(cell.querySelector('.gl-cell-art img'), { scale: [1, 1.06], y: [0, -6] }, { duration: 0.55, easing: [0.76,0,0.24,1] });
        });
        cell.addEventListener('mouseleave', () => {
          animate(cell.querySelector('.gl-cell-num'), { scale: [null, 1] }, { duration: 0.4, easing: 'ease-out' });
          animate(cell.querySelector('.gl-cell-art img'), { scale: [null, 1], y: [null, 0] }, { duration: 0.55, easing: [0.76,0,0.24,1] });
        });
      });

    } else {
      cells.forEach((c, i) => {
        c.style.opacity = '0';
        c.style.transform = 'scale(0.94)';
        c.style.transition = `opacity 0.8s ${0.3 + i * 0.09}s, transform 0.8s ${0.3 + i * 0.09}s`;
        requestAnimationFrame(() => { c.style.opacity = '1'; c.style.transform = 'scale(1)'; });
      });
    }
  }

  const obs = new IntersectionObserver(e => { if (e[0].isIntersecting) { obs.disconnect(); init(); } }, { threshold: 0.1 });
  obs.observe(root);
})();