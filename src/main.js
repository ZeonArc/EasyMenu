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
});
