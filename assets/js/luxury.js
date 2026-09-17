document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lenis Smooth Scroll
  let lenis;
  try {
    lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  } catch (e) {
    console.warn('Lenis scroll smooth fallback applied:', e);
  }

  // 2. Custom Cursor
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.cursor-follower');

  if (cursor && follower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = 	ranslate(px, px);
    });

    function renderFollower() {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      follower.style.transform = 	ranslate(px, px);
      requestAnimationFrame(renderFollower);
    }
    renderFollower();

    // Hover effect on links and interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, .interactive-hover');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hover-active'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hover-active'));
    });
  }

  // 3. Before & After Slider Logic
  const baContainer = document.getElementById('referenceSlider');
  if (baContainer) {
    const afterWrapper = baContainer.querySelector('.ba-after-wrapper');
    const afterImg = baContainer.querySelector('.ba-after-wrapper img');
    const handle = baContainer.querySelector('.ba-handle');
    let isDragging = false;

    function updateSlider(clientX) {
      const rect = baContainer.getBoundingClientRect();
      let offsetX = clientX - rect.left;
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;

      const percentage = (offsetX / rect.width) * 100;
      afterWrapper.style.width = ${percentage}%;
      handle.style.left = ${percentage}%;
      if (afterImg) {
        afterImg.style.width = ${rect.width}px;
      }
    }

    // Set initial full width of internal image
    window.addEventListener('resize', () => {
      if (afterImg) afterImg.style.width = ${baContainer.getBoundingClientRect().width}px;
    });
    setTimeout(() => {
      if (afterImg) afterImg.style.width = ${baContainer.getBoundingClientRect().width}px;
    }, 100);

    handle.addEventListener('mousedown', () => isDragging = true);
    baContainer.addEventListener('mousedown', (e) => {
      isDragging = true;
      updateSlider(e.clientX);
    });

    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updateSlider(e.clientX);
    });

    // Touch support for mobile devices
    handle.addEventListener('touchstart', () => isDragging = true);
    baContainer.addEventListener('touchstart', (e) => {
      isDragging = true;
      if (e.touches[0]) updateSlider(e.touches[0].clientX);
    });
    window.addEventListener('touchend', () => isDragging = false);
    window.addEventListener('touchmove', (e) => {
      if (!isDragging || !e.touches[0]) return;
      updateSlider(e.touches[0].clientX);
    });
  }

  // 4. GSAP & ScrollTrigger Animations
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Stagger Reveal
    gsap.from('.hero-headline span', {
      opacity: 0,
      y: 45,
      stagger: 0.12,
      duration: 1.2,
      ease: 'power4.out',
      delay: 0.2
    });

    gsap.from('.hero-sub', {
      opacity: 0,
      y: 20,
      duration: 1.0,
      ease: 'power3.out',
      delay: 0.7
    });

    gsap.from('.hero-cta-group', {
      opacity: 0,
      y: 20,
      duration: 1.0,
      ease: 'power3.out',
      delay: 0.9
    });

    // Reveal elements on scroll
    const revealCards = document.querySelectorAll('.scroll-reveal');
    revealCards.forEach((card) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out'
      });
    });
  }

  // 5. Reference Concierge Estimator -> Direct WhatsApp Generator
  const conciergeForm = document.getElementById('conciergeForm');
  if (conciergeForm) {
    const scaleSlider = document.getElementById('scaleSlider');
    const scaleDisplay = document.getElementById('scaleDisplay');

    if (scaleSlider && scaleDisplay) {
      scaleSlider.addEventListener('input', (e) => {
        scaleDisplay.textContent = ${e.target.value} Feet;
      });
    }

    conciergeForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const category = document.querySelector('input[name="conciergeCategory"]:checked')?.value || 'Custom Project';
      const scale = scaleSlider ? ${scaleSlider.value} Feet : 'Not specified';
      const orderType = document.querySelector('input[name="orderType"]:checked')?.value || 'Retail (Single Custom)';
      const clientName = document.getElementById('clientName')?.value || 'Client';
      const clientCity = document.getElementById('clientCity')?.value || 'Lucknow / India';
      const details = document.getElementById('projectDetails')?.value || 'Custom reference discussion';

      const waText = encodeURIComponent(
        *✨ NEW BESPOKE ENQUIRY — SANGAM FABRICATORS*\n\n +
        • *Client Name:* \n +
        • *City / Location:* \n +
        • *Order Category:* \n +
        • *Approx Scale/Height:* \n +
        • *Order Volume:* \n +
        • *Requirement Details:* \n\n +
        _I am ready to share my reference photo/sketch for the best factory quotation._
      );

      const phone = "919450000000"; // Replace with client's actual phone number
      window.open(https://wa.me/?text=, '_blank');
    });
  }

  // 6. Portfolio Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active', 'border-accent-gold', 'text-accent-gold'));
      btn.classList.add('active', 'border-accent-gold', 'text-accent-gold');

      const filter = btn.getAttribute('data-filter');
      portfolioItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
          gsap.fromTo(item, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4 });
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});
