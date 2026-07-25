// ============================================================
// PORTFOLIO — script.js
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- LOADER ----
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => loader.classList.add('hide'), 400);
  });

  // ---- AOS INIT ----
  if (window.AOS) AOS.init({ once: true, offset: 60, duration: 800 });

  // ---- PARTICLES ----
  if (window.particlesJS) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 55, density: { enable: true, value_area: 800 } },
        color: { value: '#38bdf8' },
        shape: { type: 'circle' },
        opacity: { value: 0.35, random: true },
        size: { value: 2.5, random: true },
        line_linked: { enable: true, distance: 140, color: '#2563eb', opacity: 0.25, width: 1 },
        move: { enable: true, speed: 1.1, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, resize: true },
        modes: { grab: { distance: 130, line_linked: { opacity: 0.5 } } }
      },
      retina_detect: true
    });
  }

  // ---- TYPED TEXT ----
  const roles = ['Full Stack Developer', 'AI / ML Engineer', 'IoT Builder', 'Telemetry Head', 'Innovation Lead'];
  const typedEl = document.getElementById('typed-text');
  let roleIndex = 0, charIndex = 0, deleting = false;

  function typeLoop() {
    if (!typedEl) return;
    const current = roles[roleIndex];
    if (!deleting) {
      typedEl.textContent = current.slice(0, ++charIndex);
      if (charIndex === current.length) { deleting = true; setTimeout(typeLoop, 1400); return; }
    } else {
      typedEl.textContent = current.slice(0, --charIndex);
      if (charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; }
    }
    setTimeout(typeLoop, deleting ? 45 : 85);
  }
  typeLoop();

  // ---- THEME TOGGLE ----
  const themeToggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;
  const savedTheme = localStorage.getItem && null; // artifacts sandbox: no persistent storage; default dark
  function setThemeIcon(theme) {
    if (!themeToggle) return;
    themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  }
  setThemeIcon(htmlEl.getAttribute('data-theme') || 'dark');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', current);
      setThemeIcon(current);
    });
  }

  // ---- NAVBAR SCROLL STATE ----
  const mainNav = document.getElementById('mainNav');
  const scrollTopBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 40;
    if (mainNav) mainNav.classList.toggle('scrolled', scrolled);
    if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  });
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ---- ACTIVE NAV LINK ON SCROLL ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let currentId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) currentId = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  });

  // ---- STAT COUNTERS ----
  const statNumbers = document.querySelectorAll('.stat-number');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'), 10) || 0;
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const tick = () => {
        current += step;
        if (current >= target) { el.textContent = target; return; }
        el.textContent = current;
        requestAnimationFrame(tick);
      };
      tick();
      statObserver.unobserve(el);
    });
  }, { threshold: 0.4 });
  statNumbers.forEach(el => statObserver.observe(el));

  // ---- SKILL BARS ----
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.style.width = `${el.getAttribute('data-width') || 0}%`;
      skillObserver.unobserve(el);
    });
  }, { threshold: 0.3 });
  skillFills.forEach(el => skillObserver.observe(el));

  // ---- CONTACT FORM (demo submit) ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.style.display = 'none';
      const success = document.getElementById('formSuccess');
      if (success) success.style.display = 'flex';
    });
  }
});

// ---- PROJECT MODALS ----
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) { modal.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
}

// ---- CERT LIGHTBOX ----
function openCert(card) {
  const img = card.querySelector('img');
  const lightbox = document.getElementById('certLightbox');
  const lightboxImg = document.getElementById('certLightboxImg');
  if (img && lightbox && lightboxImg) {
    lightboxImg.src = img.src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}
function closeCert() {
  const lightbox = document.getElementById('certLightbox');
  if (lightbox) { lightbox.classList.remove('open'); document.body.style.overflow = ''; }
}
