document.addEventListener('DOMContentLoaded', () => {
  const leadBtn = document.querySelector('.js-lead');
  const popup = document.getElementById('success-popup');
  const closeBtns = document.querySelectorAll('#popup-close, #popup-ok');

  const openPopup = () => {
    popup.classList.add('popup--active');
    document.body.style.overflow = 'hidden';
  };

  const closePopup = () => {
    popup.classList.remove('popup--active');
    document.body.style.overflow = '';
  };

  if (leadBtn) {
    leadBtn.addEventListener('click', () => {
      if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead');
      }
      openPopup();
    });
  }

  closeBtns.forEach(btn => {
    btn.addEventListener('click', closePopup);
  });

  popup.addEventListener('click', e => {
    if (e.target === popup) closePopup();
  });
});
