document.addEventListener('DOMContentLoaded', () => {
  const leadBtn = document.querySelector('.js-lead');

  if (leadBtn) {
    leadBtn.addEventListener('click', () => {
      if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead');
        console.log('Событие Lead отправлено в Facebook');
      } else {
        console.warn('Pixel еще не загружен');
      }
    });
  }
});
