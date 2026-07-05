// ============ NAV: solid on scroll + mobile toggle ============
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

function updateNav() {
  if (window.scrollY > 40) nav.classList.add('solid');
  else nav.classList.remove('solid');
}
updateNav();
window.addEventListener('scroll', updateNav, { passive: true });

navToggle.addEventListener('click', () => {
  const open = navMobile.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});
navMobile.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navMobile.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============ SCROLL REVEAL ============
const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealItems.forEach(el => revealObserver.observe(el));

// ============ HERO CANVAS: drifting circuit particles ============
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animFrame;

function resizeCanvas() {
  canvas.width = canvas.offsetWidth * devicePixelRatio;
  canvas.height = canvas.offsetHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}

function initParticles() {
  const count = Math.min(60, Math.floor(canvas.offsetWidth / 20));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.offsetWidth,
    y: Math.random() * canvas.offsetHeight,
    r: Math.random() * 1.6 + 0.6,
    vx: (Math.random() - 0.5) * 0.15,
    vy: (Math.random() - 0.5) * 0.15,
    hue: Math.random() > 0.5 ? '52,199,89' : '36,107,206'
  }));
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function drawParticles() {
  ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) p.x = canvas.offsetWidth;
    if (p.x > canvas.offsetWidth) p.x = 0;
    if (p.y < 0) p.y = canvas.offsetHeight;
    if (p.y > canvas.offsetHeight) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.hue}, 0.5)`;
    ctx.fill();
  });

  // faint connecting lines for nearby particles
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i], b = particles[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(148, 163, 184, ${0.08 * (1 - dist / 120)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
  if (!reduceMotion) animFrame = requestAnimationFrame(drawParticles);
}

function setupCanvas() {
  resizeCanvas();
  initParticles();
  cancelAnimationFrame(animFrame);
  drawParticles();
  if (reduceMotion) drawParticles(); // draw one static frame
}
setupCanvas();
window.addEventListener('resize', () => {
  clearTimeout(window._resizeT);
  window._resizeT = setTimeout(setupCanvas, 200);
});

// ============ CONTACT FORM (Formspree — static, no backend) ============
// Progressive enhancement: with JS off, the form does a native POST to Formspree
// (which shows its own thank-you page). With JS on, we submit via fetch and show
// inline success/error without leaving the page.
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
const submitBtn = document.getElementById('contactSubmit');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Guard: don't pretend to send while the endpoint is still a placeholder.
  if (form.action.includes('YOUR_FORM_ID')) {
    formNote.textContent = 'Form not connected yet — add the Formspree endpoint to enable sending.';
    formNote.className = 'form-note error';
    return;
  }

  const originalLabel = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';
  formNote.textContent = '';
  formNote.className = 'form-note';

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      form.reset();
      formNote.textContent = "Thanks — your message is on its way. We'll be in touch.";
      formNote.className = 'form-note success';
    } else {
      const data = await res.json().catch(() => ({}));
      formNote.textContent = data.errors
        ? data.errors.map(x => x.message).join(', ')
        : 'Something went wrong. Please email support@wradlabs.com.';
      formNote.className = 'form-note error';
    }
  } catch (err) {
    formNote.textContent = 'Network error — please try again, or email support@wradlabs.com.';
    formNote.className = 'form-note error';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalLabel;
  }
});
