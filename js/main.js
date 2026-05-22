// ============================================================
// PESKAMO — main.js
// ============================================================

// ── MENU MOBILE ──
function toggleMenu() {
  const links = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  links.classList.toggle('open');
  hamburger.classList.toggle('active');
}

// Chiudi menu cliccando su un link
document.querySelectorAll('.nav-links a').forEach(function(link) {
  link.addEventListener('click', function() {
    document.getElementById('navLinks').classList.remove('open');
    document.getElementById('hamburger').classList.remove('active');
  });
});

// Chiudi menu cliccando fuori
document.addEventListener('click', function(e) {
  const nav = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  if (!nav || !hamburger) return;
  if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
    nav.classList.remove('open');
    hamburger.classList.remove('active');
  }
});

// ── NAVBAR SCROLL EFFECT ──
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── ACTIVE NAV LINK ON SCROLL ──
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function() {
  let current = '';
  sections.forEach(function(section) {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(function(link) {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === '#' + current || href === 'index.html#' + current) {
      link.classList.add('active');
    }
  });
});

// ── SMOOTH SCROLL CON OFFSET NAVBAR ──
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: top, behavior: 'smooth' });
  });
});

// ── NEWSLETTER FORMSPREE FEEDBACK ──
const form = document.querySelector('.newsletter-form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = form.querySelector('button');
    const input = form.querySelector('input');
    const data = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    })
    .then(function(response) {
      if (response.ok) {
        btn.textContent = 'Iscritto!';
        btn.style.background = '#00C896';
        input.value = '';
        setTimeout(function() {
          btn.textContent = 'Iscriviti';
          btn.style.background = '';
        }, 3000);
      } else {
        btn.textContent = 'Riprova';
        btn.style.background = '#FF4757';
        setTimeout(function() {
          btn.textContent = 'Iscriviti';
          btn.style.background = '';
        }, 3000);
      }
    })
    .catch(function() {
      btn.textContent = 'Errore';
      btn.style.background = '#FF4757';
      setTimeout(function() {
        btn.textContent = 'Iscriviti';
        btn.style.background = '';
      }, 3000);
    });
  });
}

// ── FADE IN ON SCROLL ──
const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-item, .eco-card').forEach(function(el) {
  el.classList.add('fade-in');
  observer.observe(el);
});
