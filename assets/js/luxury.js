document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js-ready');
  if (window.lucide) {
    lucide.createIcons();
  }

  // Slider engine removed by request (Single static hero)

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
  // SCROLL-DRIVEN 3D ROTATION EFFECT
  // ==========================================================
  const sculptureMedia = document.getElementById('sculptureMedia');
  if (sculptureMedia) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      // Calculate rotation based on scroll percentage, a gentle full rotation or tilt
      // To mimic a 3D effect without getting too thin, we'll oscillate from -15 to +15
      // or if full rotation is desired, we could use rotateY(scrolled * 0.1deg).
      // Let's do a gentle sway for better visuals of flat png:
      const tiltAngle = Math.sin(scrolled * 0.002) * 20; 
      sculptureMedia.style.transform = `perspective(1000px) rotateY(${tiltAngle}deg)`;
    }, { passive: true });
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
