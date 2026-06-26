/* ============================================================
   PORTFOLIO — script.js (Enhanced v2)
   Chellamuthu S
============================================================ */

/* ---- LOADER ---- */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hide');
  }, 900);
});

/* ---- AOS INIT ---- */
AOS.init({
  duration: 800,
  once: true,
  offset: 60,
  easing: 'ease-out-cubic'
});

/* ---- DARK MODE TOGGLE ---- */
const themeBtn   = document.getElementById('themeToggle');
const htmlEl     = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlEl.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeBtn.addEventListener('click', () => {
  const current = htmlEl.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  htmlEl.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});
function updateThemeIcon(theme) {
  themeBtn.innerHTML = theme === 'dark'
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
}

/* ---- NAVBAR SCROLL ---- */
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveNav();
  handleScrollTopBtn();
});

/* ---- ACTIVE NAV LINK ---- */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 130) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

/* ---- SMOOTH SCROLL ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      const collapse = document.getElementById('navbarNav');
      if (collapse && collapse.classList.contains('show')) {
        new bootstrap.Collapse(collapse).hide();
      }
    }
  });
});

/* ---- TYPING ANIMATION ---- */
const words = [
  'Full Stack Developer',
  'AI & ML Enthusiast',
  'Final Year CSE Student',
  'Computer Vision Engineer',
  'Embedded Systems Builder',
  'Open Source Creator',
];
let wordIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function typeLoop() {
  const current = words[wordIdx];
  if (deleting) {
    charIdx--;
    typedEl.textContent = current.substring(0, charIdx);
    if (charIdx === 0) {
      deleting = false;
      wordIdx = (wordIdx + 1) % words.length;
    }
    setTimeout(typeLoop, 55);
  } else {
    charIdx++;
    typedEl.textContent = current.substring(0, charIdx);
    if (charIdx === current.length) {
      setTimeout(() => { deleting = true; typeLoop(); }, 2000);
    } else {
      setTimeout(typeLoop, 85);
    }
  }
}
typeLoop();

/* ---- PARTICLES.JS ---- */
if (typeof particlesJS !== 'undefined') {
  particlesJS('particles-js', {
    particles: {
      number: { value: 55, density: { enable: true, value_area: 900 } },
      color: { value: ['#2563eb', '#38bdf8', '#818cf8', '#ffffff'] },
      shape: { type: 'circle' },
      opacity: { value: 0.3, random: true, anim: { enable: true, speed: 0.5, opacity_min: 0.1 } },
      size: { value: 3, random: true, anim: { enable: false } },
      line_linked: { enable: true, distance: 130, color: '#2563eb', opacity: 0.12, width: 1 },
      move: { enable: true, speed: 1.2, random: true, out_mode: 'out', bounce: false }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'grab' },
        onclick: { enable: true, mode: 'push' }
      },
      modes: {
        grab: { distance: 140, line_linked: { opacity: 0.4 } },
        push: { particles_nb: 3 }
      }
    },
    retina_detect: true
  });
}

/* ---- COUNTER ANIMATION ---- */
function animateCounter(el) {
  const target = +el.getAttribute('data-target');
  let count = 0;
  const step = Math.ceil(target / 45);
  const timer = setInterval(() => {
    count = Math.min(count + step, target);
    el.textContent = count + '+';
    if (count >= target) clearInterval(timer);
  }, 35);
}
const counters = document.querySelectorAll('.stat-number');
let counterDone = false;
const counterObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !counterDone) {
    counterDone = true;
    counters.forEach(animateCounter);
  }
}, { threshold: 0.5 });
if (counters[0]) counterObs.observe(counters[0]);

/* ---- SKILL BAR ANIMATION ---- */
const skillFills = document.querySelectorAll('.skill-fill');
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      setTimeout(() => {
        fill.style.width = fill.getAttribute('data-width') + '%';
      }, 150);
      skillObs.unobserve(fill);
    }
  });
}, { threshold: 0.2 });
skillFills.forEach(fill => skillObs.observe(fill));

/* ---- REVEAL ON SCROLL (stagger cards) ---- */
function initStaggerReveal() {
  const groups = document.querySelectorAll('.stagger-group');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const items = entry.target.querySelectorAll('.stagger-item');
        items.forEach((item, i) => {
          setTimeout(() => {
            item.classList.add('revealed');
          }, i * 80);
        });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  groups.forEach(g => obs.observe(g));
}
initStaggerReveal();

/* ---- MAGNETIC BUTTONS ---- */
document.querySelectorAll('.btn-primary-gradient, .btn-outline-hero').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

/* ---- PROJECT MODALS ---- */
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.custom-modal-overlay.open').forEach(m => {
      m.classList.remove('open');
    });
    document.body.style.overflow = '';
    closeCert();
  }
});

/* ---- CERTIFICATE LIGHTBOX ---- */
function openCert(card) {
  const img = card.querySelector('img');
  document.getElementById('certLightboxImg').src = img.src;
  document.getElementById('certLightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCert() {
  document.getElementById('certLightbox').classList.remove('open');
  document.body.style.overflow = '';
}

/* ---- CONTACT FORM ---- */
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = document.getElementById('sendBtn');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending…';
  btn.disabled = true;
  setTimeout(() => {
    this.reset();
    btn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message';
    btn.disabled = false;
    const success = document.getElementById('formSuccess');
    success.style.display = 'flex';
    setTimeout(() => { success.style.display = 'none'; }, 4000);
  }, 1600);
});

/* ---- SCROLL TO TOP ---- */
const scrollTopBtn = document.getElementById('scrollTop');
function handleScrollTopBtn() {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
}
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---- CURSOR GLOW (desktop only) ---- */
if (window.innerWidth > 768) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9998;
    width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: left 0.15s ease, top 0.15s ease;
    left: -300px; top: -300px;
  `;
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}

/* ---- TILT EFFECT on project cards ---- */
document.querySelectorAll('.project-card, .award-card, .stat-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
    setTimeout(() => card.style.transition = '', 500);
  });
});

/* ---- GLOWING SECTION HEADINGS ---- */
document.querySelectorAll('.section-title .accent').forEach(el => {
  el.style.filter = 'drop-shadow(0 0 8px rgba(37,99,235,0.3))';
});