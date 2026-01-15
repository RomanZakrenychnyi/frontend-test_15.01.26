const track = document.querySelector('.slider__track');
const slides = Array.from(document.querySelectorAll('.slider__slide'));
const nextBtn = document.querySelector('.slider__arrow--next');
const prevBtn = document.querySelector('.slider__arrow--prev');
const dots = document.querySelectorAll('.dot');
const leadBtn = document.querySelector('.js-lead');

let currentIndex = 0;

function getSlidesPerView() {
  const width = window.innerWidth;

  if (width <= 1260) return 1;
  if (width <= 1900) return 2;
  return 3;
}

function getMaxIndex() {
  const slidesPerView = getSlidesPerView();
  return Math.max(slides.length - slidesPerView, 0);
}

function updateSlider() {
  const gap = 15;
  const slideWidth = slides[0].offsetWidth;
  const maxIndex = getMaxIndex();

  currentIndex = Math.min(Math.max(currentIndex, 0), maxIndex);

  const moveDistance = (slideWidth + gap) * currentIndex;

  track.style.transform = `translateX(-${moveDistance}px)`;

  dots.forEach((dot, index) => {
    dot.classList.toggle('dot--active', index === currentIndex);
  });

  if (prevBtn && nextBtn) {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === maxIndex;
  }
}

nextBtn.addEventListener('click', () => {
  currentIndex++;
  updateSlider();
});

prevBtn.addEventListener('click', () => {
  currentIndex--;
  updateSlider();
});

window.addEventListener('resize', () => {
  updateSlider();
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    updateSlider();
  });
});

let startX = 0;
let currentX = 0;
let isDragging = false;

track.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
  currentX = startX;
  isDragging = true;
});

track.addEventListener('touchmove', e => {
  if (!isDragging) return;
  currentX = e.touches[0].clientX;
});

track.addEventListener('touchend', () => {
  if (!isDragging) return;

  const diff = startX - currentX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      currentIndex++;
    } else {
      currentIndex--;
    }
    updateSlider();
  }
  isDragging = false;
});

if (leadBtn) {
  leadBtn.addEventListener('click', () => {
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Lead');
    }
  });
}

updateSlider();
