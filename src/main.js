// Menu UI Logic

document.addEventListener('DOMContentLoaded', () => {
  // Handle Add to Order button
  const orderBtn = document.querySelector('.btn-primary');
  if (orderBtn) {
    orderBtn.addEventListener('click', () => {
      // Simple animation feedback
      const originalText = orderBtn.textContent;
      orderBtn.textContent = 'ADDED TO ORDER ✓';
      orderBtn.style.backgroundColor = 'var(--accent-secondary)';
      
      setTimeout(() => {
        orderBtn.textContent = originalText;
        orderBtn.style.backgroundColor = 'var(--accent-primary)';
      }, 2000);
    });
  }

  // Handle Carousel Indicators
  const indicators = document.querySelectorAll('.indicator');
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      // Remove active from all
      indicators.forEach(ind => ind.classList.remove('active'));
      // Add active to clicked
      indicator.classList.add('active');
    });
  });

  // Handle model-viewer AR status
  const viewer = document.getElementById('dish-model');
  if (viewer) {
    viewer.addEventListener('ar-status', (event) => {
      if (event.detail.status === 'session-started') {
        viewer.classList.add('in-ar');

        // Animate the 3D model: spin + scale up from nothing
        const duration = 1200; // ms
        let startTime = null;

        // Start tiny and rotated
        viewer.scale = '0.01 0.01 0.01';
        viewer.orientation = '0 180deg 0';

        function animateModel(timestamp) {
          if (!startTime) startTime = timestamp;
          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Ease-out cubic for smooth deceleration
          const eased = 1 - Math.pow(1 - progress, 3);

          // Scale from 0.01 → 1
          const s = 0.01 + 0.99 * eased;
          viewer.scale = `${s} ${s} ${s}`;

          // Rotate from 180° → 0°
          const rot = 180 * (1 - eased);
          viewer.orientation = `0 ${rot}deg 0`;

          if (progress < 1) {
            requestAnimationFrame(animateModel);
          }
        }

        requestAnimationFrame(animateModel);

      } else if (event.detail.status === 'not-presenting') {
        viewer.classList.remove('in-ar');
        // Reset model to normal
        viewer.scale = '1 1 1';
        viewer.orientation = '0 0deg 0';
      }
    });
  }
});
