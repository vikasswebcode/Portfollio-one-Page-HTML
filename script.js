// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

(function follow() {
  fx += (mx - fx) * 0.12;
  fy += (my - fy) * 0.12;
  cursorFollower.style.left = fx + 'px';
  cursorFollower.style.top = fy + 'px';
  requestAnimationFrame(follow);
})();

// ===== PARTICLES =====
const particlesEl = document.getElementById('particles');
const PARTICLE_COUNT = 30;
const colors = ['#6c63ff', '#ff6584', '#43c59e', '#ffd700', '#9b8fff'];

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const p = document.createElement('div');
  p.classList.add('particle');
  const size = Math.random() * 4 + 2;
  const color = colors[Math.floor(Math.random() * colors.length)];
  const left = Math.random() * 100;
  const dur = Math.random() * 20 + 15;
  const delay = Math.random() * 20;
  p.style.cssText = `
    width:${size}px; height:${size}px;
    background:${color};
    left:${left}%;
    animation-duration:${dur}s;
    animation-delay:${delay}s;
  `;
  particlesEl.appendChild(p);
}

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
const navLinkEls = document.querySelectorAll('.nav-links a:not(.nav-cta)');

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 60);
  backToTop.classList.toggle('show', y > 500);

  // Active nav highlight
  let current = '';
  sections.forEach(s => { if (y + 150 >= s.offsetTop) current = s.id; });
  navLinkEls.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== BACK TO TOP =====
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ===== TYPEWRITER =====
const roles = ['Full Stack Developer', 'React Specialist', 'UI/UX Designer', 'Problem Solver'];
let roleIdx = 0, charIdx = 0, deleting = false;
const typeEl = document.getElementById('typewriter');

function type() {
  const role = roles[roleIdx];
  if (!deleting) {
    typeEl.textContent = role.slice(0, ++charIdx);
    if (charIdx === role.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    typeEl.textContent = role.slice(0, --charIdx);
    if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; }
  }
  setTimeout(type, deleting ? 60 : 95);
}
type();

// ===== REVEAL ON SCROLL =====
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); } }),
  { threshold: 0.12 }
);

// Add reveal classes
document.querySelectorAll('.skill-category').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.1}s`;
});
document.querySelectorAll('.project-card').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.12}s`;
});
document.querySelectorAll('.prof-item').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.08}s`;
});
document.querySelectorAll('.highlight-item').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.1}s`;
});
document.querySelectorAll('.contact-info-card').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.1}s`;
});

revealEls.forEach(el => revealObserver.observe(el));
// Observe newly added
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObserver.observe(el));

// ===== SKILL BAR ANIMATION =====
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      const fill = e.target;
      setTimeout(() => {
        fill.style.width = fill.dataset.width + '%';
        fill.classList.add('animated');
      }, 200);
      skillObserver.unobserve(fill);
    }
  }),
  { threshold: 0.1 }
);
skillFills.forEach(f => skillObserver.observe(f));

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = parseInt(el.dataset.target);
      const step = target / 40;
      let current = 0;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.round(current);
        if (current >= target) clearInterval(timer);
      }, 40);
      counterObserver.unobserve(el);
    }
  }),
  { threshold: 0.5 }
);
counters.forEach(c => counterObserver.observe(c));

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  const original = btn.innerHTML;
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 4V2A10 10 0 002 12h2a8 8 0 018-8V4z"><animateTransform attributeName="transform" type="rotate" dur=".6s" from="0 12 12" to="360 12 12" repeatCount="indefinite"/></path></svg> Sending...';
  btn.disabled = true;

  setTimeout(() => {
    form.reset();
    btn.innerHTML = original;
    btn.disabled = false;
    formSuccess.classList.add('show');
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1400);
});

// ===== BUDGET PILLS =====
document.querySelectorAll('.budget-pill input').forEach(inp => {
  inp.addEventListener('change', () => {
    document.querySelectorAll('.budget-pill input').forEach(i => i.parentElement.querySelector('span').style.cursor = 'pointer');
  });
});

// ===== HERO PARALLAX =====
const heroText = document.querySelector('.hero-text');
window.addEventListener('scroll', () => {
  if (heroText && window.scrollY < window.innerHeight) {
    heroText.style.transform = `translateY(${window.scrollY * 0.15}px)`;
  }
});

// ===== SKILL PILL HOVER GLOW =====
document.querySelectorAll('.skill-pill').forEach(pill => {
  const c = getComputedStyle(pill).getPropertyValue('--c').trim();
  if (c) {
    pill.addEventListener('mouseenter', () => { pill.style.boxShadow = `0 4px 20px ${c}33`; });
    pill.addEventListener('mouseleave', () => { pill.style.boxShadow = ''; });
  }
});
