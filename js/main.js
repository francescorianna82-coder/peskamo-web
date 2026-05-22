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

// ── NAVBAR SCROLL EFFECT ──
window.addEventListener('scroll', function() {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 40) {
    nav.style.background = 'rgba(5,16,24,0.98)';
    nav.style.borderBottom = '1px solid rgba(0,180,216,0.15)';
  } else {
    nav.style.background = 'rgba(5,16,24,0.92)';
    nav.style.borderBottom = '1px solid rgba(0,180,216,0.08)';
  }
});

// ── ACTIVE NAV LINK ON SCROLL ──
const sections = document.querySelectorAll('section[id]');
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
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-item, .eco-card').forEach(function(el) {
  el.classList.add('fade-in');
  observer.observe(el);
});

