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

// ============ CONTACT FORM (Formspree — static, no backend) ============
// Progressive enhancement: with JS off, the form does a native POST to Formspree
// (which shows its own thank-you page). With JS on, we submit via fetch and show
// inline success/error without leaving the page.
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
const submitBtn = document.getElementById('contactSubmit');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

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
        : 'Something went wrong. Please email hello@wradlabs.com.';
      formNote.className = 'form-note error';
    }
  } catch (err) {
    formNote.textContent = 'Network error — please try again, or email hello@wradlabs.com.';
    formNote.className = 'form-note error';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalLabel;
  }
});
