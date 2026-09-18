document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }

  // ==========================================================
  // SANDHILL STUDIO SLIDER ENGINE (SMOOTH 60FPS CSS TRANSFORMS)
  // ==========================================================
  const slidesData = [
    {
      img: 'assets/images/shiva_statue_hero.jpg',
      sculptureTransform: 'translate3d(0, 0, 0) scale(1)',
      haloTransform: 'translate3d(-50%, -50%, 0) scale(1)',
      alt: 'Lord Shiva Meditating Statue'
    },
    {
      img: 'assets/images/shiva_statue_hero.jpg',
      sculptureTransform: 'translate3d(18vw, 0, 0) scale(1.05)',
      haloTransform: 'translate3d(calc(-50% + 18vw), -50%, 0) scale(0.95)',
      alt: 'Lord Shiva Spec Details'
    },
    {
      img: 'assets/images/party_entrance_hero.jpg',
      sculptureTransform: 'translate3d(14vw, 0, 0) scale(1.02)',
      haloTransform: 'translate3d(calc(-50% + 14vw), -46%, 0) scale(1.15)',
      alt: 'Royal Party Entrance Gate'
    },
    {
      img: 'assets/images/ganesha_statue_hero.jpg',
      sculptureTransform: 'translate3d(16vw, 0, 0) scale(1.02)',
      haloTransform: 'translate3d(calc(-50% + 16vw), -50%, 0) scale(1.05)',
      alt: 'Lord Ganesha Divine Idol'
    }
  ];

  const sculptureFrame = document.getElementById('sculptureFrame');
  const sculptureMedia = document.getElementById('sculptureMedia');
  const haloRing = document.getElementById('haloRing');
  const slideBlocks = document.querySelectorAll('.slide-content-block');
  const dashes = document.querySelectorAll('.progress-dash-item');
  const slideCounter = document.getElementById('slideCounter');
  const prevBtn = document.getElementById('prevSlideBtn');
  const nextBtn = document.getElementById('nextSlideBtn');

  let currentSlide = 0;
  const totalSlides = slidesData.length;

  function setSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentSlide = index;

    const data = slidesData[currentSlide];

    // Smooth transform of sculpture & halo ring
    if (sculptureFrame) {
      sculptureFrame.style.transform = data.sculptureTransform;
    }
    if (haloRing) {
      haloRing.style.transform = data.haloTransform;
    }

    // Update Image smoothly
    if (sculptureMedia && sculptureMedia.getAttribute('src') !== data.img) {
      sculptureMedia.style.opacity = '0.4';
      setTimeout(() => {
        sculptureMedia.src = data.img;
        sculptureMedia.alt = data.alt;
        sculptureMedia.style.opacity = '1';
      }, 150);
    }

    // Toggle active typography slide
    slideBlocks.forEach((block, idx) => {
      if (idx === currentSlide) {
        block.classList.add('active');
      } else {
        block.classList.remove('active');
      }
    });

    // Update left indicator
    dashes.forEach((dash, idx) => {
      if (idx === currentSlide) {
        dash.classList.add('active');
      } else {
        dash.classList.remove('active');
      }
    });

    // Update counter text
    if (slideCounter) {
      slideCounter.textContent = '0' + (currentSlide + 1) + ' / 0' + totalSlides;
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => setSlide(currentSlide - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => setSlide(currentSlide + 1));
  }

  dashes.forEach(dash => {
    dash.addEventListener('click', () => {
      const idx = parseInt(dash.getAttribute('data-slide-index'), 10);
      if (!isNaN(idx)) setSlide(idx);
    });
  });

  // Autoplay presentation every 7 seconds, pauses on interaction
  let autoTimer = setInterval(() => setSlide(currentSlide + 1), 7000);
  const heroMuseum = document.getElementById('heroMuseum');
  if (heroMuseum) {
    heroMuseum.addEventListener('mouseenter', () => clearInterval(autoTimer));
    heroMuseum.addEventListener('mouseleave', () => {
      clearInterval(autoTimer);
      autoTimer = setInterval(() => setSlide(currentSlide + 1), 7000);
    });
  }

  // ==========================================================
  // BEFORE & AFTER COMPARISON SLIDER (LIGHTWEIGHT & SMOOTH)
  // ==========================================================
  const baContainer = document.getElementById('referenceSlider');
  if (baContainer) {
    const afterWrapper = baContainer.querySelector('.ba-after-wrapper');
    const afterImg = baContainer.querySelector('.ba-after-wrapper img');
    const handle = baContainer.querySelector('.ba-handle');
    let isDown = false;

    function moveSlider(clientX) {
      const rect = baContainer.getBoundingClientRect();
      let x = clientX - rect.left;
      if (x < 0) x = 0;
      if (x > rect.width) x = rect.width;
      const pct = (x / rect.width) * 100;
      afterWrapper.style.width = pct + '%';
      handle.style.left = pct + '%';
      if (afterImg) afterImg.style.width = rect.width + 'px';
    }

    window.addEventListener('resize', () => {
      if (afterImg) afterImg.style.width = baContainer.getBoundingClientRect().width + 'px';
    });
    setTimeout(() => {
      if (afterImg) afterImg.style.width = baContainer.getBoundingClientRect().width + 'px';
    }, 100);

    baContainer.addEventListener('mousedown', (e) => {
      isDown = true;
      moveSlider(e.clientX);
    });
    window.addEventListener('mouseup', () => isDown = false);
    window.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      moveSlider(e.clientX);
    });

    baContainer.addEventListener('touchstart', (e) => {
      isDown = true;
      if (e.touches[0]) moveSlider(e.touches[0].clientX);
    });
    window.addEventListener('touchend', () => isDown = false);
    window.addEventListener('touchmove', (e) => {
      if (!isDown || !e.touches[0]) return;
      moveSlider(e.touches[0].clientX);
    });
  }

  // ==========================================================
  // PORTFOLIO FILTER TABS
  // ==========================================================
  const filterButtons = document.querySelectorAll('.filter-btn, .filter-pill');
  const portfolioItems = document.querySelectorAll('.portfolio-card, .portfolio-item-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('active', 'border-[#d4af37]', 'text-[#d4af37]');
        b.classList.add('border-white/10', 'text-[#9aa0a6]');
      });
      btn.classList.add('active', 'border-[#d4af37]', 'text-[#d4af37]');
      btn.classList.remove('border-white/10', 'text-[#9aa0a6]');

      const filter = btn.getAttribute('data-filter');
      portfolioItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // ==========================================================
  // REFERENCE CONCIERGE -> WHATSAPP LINK GENERATOR
  // ==========================================================
  const conciergeForm = document.getElementById('conciergeForm');
  if (conciergeForm) {
    const scaleSlider = document.getElementById('scaleSlider');
    const scaleDisplay = document.getElementById('scaleDisplay');

    if (scaleSlider && scaleDisplay) {
      scaleSlider.addEventListener('input', (e) => {
        scaleDisplay.textContent = e.target.value + ' Feet';
      });
    }

    conciergeForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const category = document.querySelector('input[name=\"conciergeCategory\"]:checked')?.value || 'Custom Project';
      const scale = scaleSlider ? scaleSlider.value + ' Feet' : 'Not specified';
      const orderType = document.querySelector('input[name=\"orderType\"]:checked')?.value || 'Retail (Single Piece)';
      const clientName = document.getElementById('clientName')?.value || 'Client';
      const clientCity = document.getElementById('clientCity')?.value || 'Lucknow / India';
      const details = document.getElementById('projectDetails')?.value || 'Custom reference discussion';

      const waMsg = 
        '*✨ NEW ENQUIRY — SANGAM FABRICATORS (LUCKNOW)*\n\n' +
        '• *Client Name:* ' + clientName + '\n' +
        '• *City:* ' + clientCity + '\n' +
        '• *Category:* ' + category + '\n' +
        '• *Approx Scale:* ' + scale + '\n' +
        '• *Order Volume:* ' + orderType + '\n' +
        '• *Requirement Details:* ' + details + '\n\n' +
        '_I am sharing my reference photo/sketch for direct factory quotation._';

      const phone = '919450000000'; // Target factory owner phone
      window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(waMsg), '_blank');
    });
  }
});
