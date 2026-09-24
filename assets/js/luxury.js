document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js-ready');
  if (window.lucide) {
    lucide.createIcons();
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
  // PORTFOLIO FILTER TABS (FIX #3: Use blue, not gold)
  // ==========================================================
  const filterButtons = document.querySelectorAll('.filter-btn, .filter-pill');
  const portfolioItems = document.querySelectorAll('.portfolio-card, .portfolio-item-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('active', 'border-[#3b82f6]', 'text-[#3b82f6]');
        b.classList.add('border-white/10', 'text-[#9aa0a6]');
      });
      btn.classList.add('active', 'border-[#3b82f6]', 'text-[#3b82f6]');
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

      const category = document.querySelector('input[name="conciergeCategory"]:checked')?.value || 'Custom Project';
      const scale = scaleSlider ? scaleSlider.value + ' Feet' : 'Not specified';
      const orderType = document.querySelector('input[name="orderType"]:checked')?.value || 'Retail (Single Piece)';
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

      const phone = '919450000000';
      window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(waMsg), '_blank');
    });
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
    '.reveal-init, .portfolio-card, #referenceSlider, .material-cell, .identity-left, .identity-stats, .call-card, .scroll-reveal'
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

    // FIX #11: Generate 50 ambient luminous BLUE starlight particles (was gold)
    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.6,
        alpha: Math.random() * 0.7 + 0.2,
        speedY: Math.random() * 0.45 + 0.15,
        speedX: (Math.random() - 0.5) * 0.25,
        color: Math.random() > 0.4 ? 'rgba(59, 130, 246,' : 'rgba(255, 255, 255,'
      });
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ')';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#3b82f6';
        ctx.fill();
      });

      if (finaleParticlesRunning) {
        particleAnimId = requestAnimationFrame(renderParticles);
      }
    }

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
  // BACK TO TOP SMOOTH GLIDE (FIX #2: removed setSlide call)
  // ==========================================================
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================================
  // MOBILE HAMBURGER MENU (FIX #15)
  // ==========================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenuOverlay) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    function closeMenu() {
      mobileMenuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMenu);

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on backdrop click
    mobileMenuOverlay.addEventListener('click', (e) => {
      if (e.target === mobileMenuOverlay) closeMenu();
    });
  }

  // ==========================================================
  // SKETCHFAB TRUE 3D CURSOR TRACKING (FIX #1: Inside DOMContentLoaded)
  // ==========================================================
  const apiFrame = document.getElementById('api-frame');
  if (apiFrame && window.Sketchfab) {
    // Show loading skeleton
    const loadingSkeleton = document.getElementById('model-loading');
    
    const client = new Sketchfab('1.12.1', apiFrame);
    const uid = '46f25917718e48338536689c48b160d5';

    client.init(uid, {
      success: function onSuccess(api) {
        api.start();
        api.addEventListener('viewerready', function() {
          // Hide loading skeleton & reveal iframe
          if (loadingSkeleton) {
            loadingSkeleton.style.opacity = '0';
            setTimeout(() => loadingSkeleton.style.display = 'none', 500);
          }
          if (apiFrame) {
            apiFrame.classList.remove('opacity-0', 'blur-sm');
            apiFrame.classList.add('opacity-100', 'blur-0');
          }
          
          let target = [0, 0, 0];
          let originalEye = [0, -10, 0];
          
          api.getCameraLookAt(function(err, camera) {
            if (!err) {
              target = camera.target;
              originalEye = camera.position;
            }
            
            const dx = originalEye[0] - target[0];
            const dy = originalEye[1] - target[1];
            const dz = originalEye[2] - target[2];
            
            const distance = Math.sqrt(dx*dx + dy*dy + dz*dz);
            const baseTheta = Math.atan2(dy, dx);
            const basePhi = Math.acos(dz / distance);

            // FIX #1: Single mousemove listener with rAF throttle (no leak)
            let ticking = false;
            let mouseX = 0;
            let mouseY = 0;

            function updateCamera() {
              const maxThetaOffset = 0.6;
              const maxPhiOffset = 0.3;

              const newTheta = baseTheta + (-mouseX * maxThetaOffset);
              
              let newPhi = basePhi + (-mouseY * maxPhiOffset);
              newPhi = Math.max(0.1, Math.min(Math.PI - 0.1, newPhi));

              const newEyeX = target[0] + distance * Math.sin(newPhi) * Math.cos(newTheta);
              const newEyeY = target[1] + distance * Math.sin(newPhi) * Math.sin(newTheta);
              const newEyeZ = target[2] + distance * Math.cos(newPhi);

              api.setCameraLookAt([newEyeX, newEyeY, newEyeZ], target, 0);
              ticking = false;
            }

            document.addEventListener('mousemove', (e) => {
              mouseX = (e.clientX / window.innerWidth) * 2 - 1;
              mouseY = (e.clientY / window.innerHeight) * 2 - 1;
              
              if (!ticking) {
                window.requestAnimationFrame(updateCamera);
                ticking = true;
              }
            });
          });
        });
      },
      error: function onError() {
        console.error('Sketchfab API error');
        const loadingSkeleton = document.getElementById('model-loading');
        if (loadingSkeleton) loadingSkeleton.textContent = 'Failed to load 3D model';
      },
      autostart: 1,
      transparent: 1,
      ui_infos: 0,
      ui_watermark_link: 0,
      ui_watermark: 0,
      ui_theme: 'dark',
      ui_stop: 0,
      ui_controls: 0,
      ui_help: 0,
      orbit_constraint_pan: 1,
      scrollwheel: 0,
      orbit_constraint_zoom_in: 0.4,
      orbit_constraint_zoom_out: 0.4
    });
  }


  // ==========================================================
  // MAGNETIC FLOATING BUTTONS (PRO UX)
  // ==========================================================
  const floatBtns = document.querySelectorAll('.float-btn');
  floatBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const h = rect.width / 2;
      const x = e.clientX - rect.left - h;
      const y = e.clientY - rect.top - h;
      
      // Pull button slightly towards mouse
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.06)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px) scale(1)';
    });
  });
}); // end DOMContentLoaded
