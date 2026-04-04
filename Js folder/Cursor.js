const cur = document.getElementById('cursor');
    const trail = document.getElementById('cursor-trail');

    document.addEventListener('mousemove', e => {
      cur.style.left = e.clientX + 'px';
      cur.style.top = e.clientY + 'px';
      trail.style.left = e.clientX + 'px';
      trail.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .feature-panel, .model-card, .gal-cell, .cta-btn, #handle').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cur.style.width = '20px';
        cur.style.height = '20px';
        trail.style.width = '60px';
        trail.style.height = '60px';
      });
      el.addEventListener('mouseleave', () => {
        cur.style.width = '12px';
        cur.style.height = '12px';
        trail.style.width = '36px';
        trail.style.height = '36px';
      });
    });