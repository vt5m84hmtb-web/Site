/* ==========================================
   SATO STUDIOS — Premium JS v2.0
   ========================================== */

/* ── HEADER SCROLL EFFECT ── */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });

/* ── MOBILE MENU ── */
const menuToggle = document.getElementById('menuToggle');
const mobileNav  = document.getElementById('mobileNav');

menuToggle.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  menuToggle.classList.toggle('open', isOpen);
});

// Close menu when nav link clicked
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuToggle.classList.remove('open');
  });
});

/* ── INTERSECTION OBSERVER — SCROLL ANIMATIONS ── */
const revealElements = document.querySelectorAll('.reveal-up');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));

/* ── RIPPLE EFFECT ON BUTTONS ── */
document.querySelectorAll('.btn-primary, .btn-plan').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;

    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

/* ── SMOOTH SCROLL (ANCHOR LINKS) ── */
let currentScroll = window.pageYOffset;
let targetScroll  = currentScroll;
let isScrolling   = false;
const ease = 0.08;

function smoothStep() {
  currentScroll += (targetScroll - currentScroll) * ease;

  if (Math.abs(targetScroll - currentScroll) < 0.5) {
    currentScroll = targetScroll;
    isScrolling = false;
  }

  window.scrollTo(0, currentScroll);
  if (isScrolling) requestAnimationFrame(smoothStep);
}

window.addEventListener('wheel', e => {
  e.preventDefault();
  targetScroll += e.deltaY;
  targetScroll = Math.max(0, Math.min(targetScroll, document.body.scrollHeight - window.innerHeight));

  if (!isScrolling) {
    isScrolling = true;
    requestAnimationFrame(smoothStep);
  }
}, { passive: false });

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    targetScroll = target.getBoundingClientRect().top + window.pageYOffset;
    isScrolling = true;
    requestAnimationFrame(smoothStep);
  });
});

/* ── CARD HOVER PARALLAX ── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    card.style.transform = `
      translateY(-8px)
      rotateX(${-y * 6}deg)
      rotateY(${x * 6}deg)
      scale(1.01)
    `;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s cubic-bezier(.16,1,.3,1)';
  });

  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.15s ease';
  });
});

/* ── CURSOR GLOW (OPTIONAL) ── */
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
  transition: left 0.3s ease, top 0.3s ease;
  will-change: left, top;
`;
document.body.appendChild(cursorGlow);

window.addEventListener('mousemove', e => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
}, { passive: true });