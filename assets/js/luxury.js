document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js-ready');
  if (window.lucide) {
    lucide.createIcons();
  }

  // ==========================================================
  // SANDHILL STUDIO SLIDER ENGINE (SMOOTH 60FPS CSS TRANSFORMS)
  // ==========================================================
  const slidesData = [
    {
      img: 'assets/images/shiva_cutout_clean.png',
      sculptureTransform: 'translate3d(0, 0, 0) scale(1)',
      haloTransform: 'translate3d(-50%, -50%, 0) scale(1)',
      haloOpacity: '1',
      alt: 'Lord Shiva Meditating Statue'
    },
    {
      img: 'assets/images/shiva_cutout_clean.png',
      sculptureTransform: 'translate3d(20vw, 0, 0) scale(1.08)',
      haloTransform: 'translate3d(calc(-50% + 20vw), -50%, 0) scale(0.9)',
      haloOpacity: '0',
      alt: 'Lord Shiva Sacred Specifications'
    },
    {
      img: 'assets/images/gate_cutout_clean.png',
      sculptureTransform: 'translate3d(15vw, 0, 0) scale(1)',
      haloTransform: 'translate3d(calc(-50% + 15vw), -48%, 0) scale(1.1)',
      haloOpacity: '0',
      alt: 'Royal Palatial Wedding Entrance Gate'
    },
    {
      img: 'assets/images/ganesha_cutout_clean.png',
      sculptureTransform: 'translate3d(16vw, 0, 0) scale(1.06)',
      haloTransform: 'translate3d(calc(-50% + 16vw), -50%, 0) scale(1)',
      haloOpacity: '1',
      alt: 'Lord Ganesha Handcrafted Divine Idol'
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
      haloRing.style.opacity = data.haloOpacity !== undefined ? data.haloOpacity : '1';
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

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('slide')) {
    const sIdx = parseInt(urlParams.get('slide'), 10);
    if (!isNaN(sIdx)) setSlide(sIdx);
  }
  if (urlParams.has('scroll') && urlParams.get('scroll') === 'bottom') {
    const finale = document.getElementById('atelierFinale');
    if (finale) {
      setTimeout(() => {
        finale.scrollIntoView({ behavior: 'auto' });
      }, 60);
    }
  }

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

  // ==========================================================
  // SCROLL-DRIVEN HERO TRANSITIONS (WHEEL & TOUCH GESTURES)
  // (Seamlessly steps through slides before scrolling down)
  // ==========================================================
  let isWheelLocked = false;
  const heroMuseumSection = document.getElementById('heroMuseum');

  if (heroMuseumSection) {
    window.addEventListener('wheel', (e) => {
      // Only intercept wheel if we are at the very top of the page
      if (window.scrollY > 20) return;

      if (isWheelLocked) return;

      if (e.deltaY > 35) {
        // Scrolling downward
        if (currentSlide < totalSlides - 1) {
          e.preventDefault();
          setSlide(currentSlide + 1);
          isWheelLocked = true;
          setTimeout(() => { isWheelLocked = false; }, 650);
        }
        // If at the last slide (Slide 3), let native scroll proceed down
      } else if (e.deltaY < -35) {
        // Scrolling upward
        if (currentSlide > 0 && window.scrollY <= 10) {
          e.preventDefault();
          setSlide(currentSlide - 1);
          isWheelLocked = true;
          setTimeout(() => { isWheelLocked = false; }, 650);
        }
      }
    }, { passive: false });
  }

  // ==========================================================
  // SCROLL PROGRESS BAR
  // ==========================================================
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  function updateScrollProgress() {
    if (!scrollProgressBar) return;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const scrollPercent = (window.scrollY / docHeight) * 100;
    scrollProgressBar.style.width = Math.min(100, Math.max(0, scrollPercent)) + '%';
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // ==========================================================
  // SCROLL REVEAL INTERSECTION OBSERVER
  // ==========================================================
  const revealElements = document.querySelectorAll(
    '.reveal-init, .portfolio-card, #referenceSlider, .material-cell, .identity-left, .identity-stats, .call-card'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach((el) => revealObserver.observe(el));

  // ==========================================================
  // END-OF-PAGE GRAND ATELIER FINALE ANIMATION
  // (Cinematic Portal Expansion & Starlight Particles)
  // ==========================================================
  const atelierFinale = document.getElementById('atelierFinale');
  const finalePortal = document.getElementById('finalePortal');
  const finaleSculpture = document.getElementById('finaleSculpture');
  const finaleCanvas = document.getElementById('finaleCanvas');

  let finaleParticlesRunning = false;
  let particleAnimId = null;

  if (finaleCanvas && atelierFinale) {
    const ctx = finaleCanvas.getContext('2d');
    let width = (finaleCanvas.width = atelierFinale.offsetWidth);
    let height = (finaleCanvas.height = atelierFinale.offsetHeight);

    window.addEventListener('resize', () => {
      width = finaleCanvas.width = atelierFinale.offsetWidth;
      height = finaleCanvas.height = atelierFinale.offsetHeight;
    });

    // Generate 50 ambient luminous starlight particles
    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.6,
        alpha: Math.random() * 0.7 + 0.2,
        speedY: Math.random() * 0.45 + 0.15,
        speedX: (Math.random() - 0.5) * 0.25,
        color: Math.random() > 0.4 ? 'rgba(212, 175, 55,' : 'rgba(255, 255, 255,'
      });
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;

        // Wrap around seamlessly
        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ')';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#d4af37';
        ctx.fill();
      });

      if (finaleParticlesRunning) {
        particleAnimId = requestAnimationFrame(renderParticles);
      }
    }

    // Observer for Atelier Finale
    const finaleObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (finalePortal) finalePortal.classList.add('active');
          if (finaleSculpture) finaleSculpture.classList.add('active');
          if (!finaleParticlesRunning) {
            finaleParticlesRunning = true;
            renderParticles();
          }
        } else {
          finaleParticlesRunning = false;
          if (particleAnimId) cancelAnimationFrame(particleAnimId);
        }
      });
    }, {
      threshold: 0.15
    });

    finaleObserver.observe(atelierFinale);
  }

  // ==========================================================
  // BACK TO TOP SMOOTH GLIDE
  // ==========================================================
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      setTimeout(() => {
        setSlide(0);
      }, 400);
    });
  }
});
