(function() {
  const root = document.getElementById('md-root');

  function init() {
    root.classList.add('md-loaded');

    const cards = document.querySelectorAll('.md-card');

    if (window.Motion) {
      const { animate, stagger } = window.Motion;

      animate(cards, { opacity: [0, 1], y: [60, 0], rotateX: [8, 0] }, {
        duration: 0.9,
        delay: stagger(0.15, { start: 0.35 }),
        easing: [0.76, 0, 0.24, 1]
      });

      cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          animate(card.querySelector('.md-card-svg svg'), { y: [0, -10] }, { duration: 0.5, easing: 'ease-out' });
          animate(card.querySelector('.md-card-name'), { letterSpacing: ['0.06em', '0.1em'] }, { duration: 0.35, easing: 'ease-out' });
        });
        card.addEventListener('mouseleave', () => {
          animate(card.querySelector('.md-card-svg svg'), { y: [-10, 0] }, { duration: 0.5, easing: 'ease-out' });
          animate(card.querySelector('.md-card-name'), { letterSpacing: ['0.1em', '0.06em'] }, { duration: 0.35, easing: 'ease-out' });
        });
      });

    } else {
      cards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(60px)';
        card.style.transition = `opacity 0.9s ${0.35 + i * 0.15}s, transform 0.9s ${0.35 + i * 0.15}s`;
        requestAnimationFrame(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      });
    }
  }

  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { obs.disconnect(); init(); }
  }, { threshold: 0.1 });

  obs.observe(root);
  setTimeout(init, 200);
})();