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
        // Hide the poster instantly when AR starts
        viewer.classList.add('in-ar-session');
      } else if (event.detail.status === 'object-placed') {
        // Trigger animations once the user places the pizza on the floor
        viewer.classList.add('in-ar');

        // Play the native Blender animation exactly once!
        viewer.play({ repetitions: 1 });

      } else if (event.detail.status === 'not-presenting') {
        viewer.classList.remove('in-ar');
        viewer.classList.remove('in-ar-session');
        // Reset animation and scale
        viewer.pause();
        viewer.currentTime = 0;
        viewer.scale = '1 1 1';
        viewer.orientation = '0 0deg 0';
      }
    });
  }

  // Handle USDZ Export
  const exportBtn = document.getElementById('export-usdz');
  if (exportBtn && viewer) {
    exportBtn.addEventListener('click', async () => {
      exportBtn.textContent = 'Generating...';
      try {
        const blob = await viewer.toUSDZ();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'dish.usdz';
        a.click();
        URL.revokeObjectURL(url);
        exportBtn.textContent = 'Downloaded!';
      } catch (e) {
        console.error(e);
        exportBtn.textContent = 'Error!';
      }
    });
  }
});
