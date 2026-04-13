/* ==========================================
   SATO STUDIOS — Premium JS v3.0
   ========================================== */

/* ── CUSTOM CURSOR ── */
const dot  = document.createElement('div');
const ring = document.createElement('div');
dot.className  = 'cursor-dot';
ring.className = 'cursor-ring';
document.body.appendChild(dot);
document.body.appendChild(ring);

let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left  = mx + 'px';
  dot.style.top   = my + 'px';
});

(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button, .tag, .proj-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width  = '56px';
    ring.style.height = '56px';
    ring.style.borderColor = 'rgba(200,255,0,.7)';
    dot.style.opacity = '0';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width  = '36px';
    ring.style.height = '36px';
    ring.style.borderColor = 'rgba(200,255,0,.4)';
    dot.style.opacity = '1';
  });
});

/* ── LIVE CLOCK ── */
const clockEl = document.getElementById('clock');
function tick() {
  if (!clockEl) return;
  const now = new Date();
  const hh = String(now.getHours()).padStart(2,'0');
  const mm = String(now.getMinutes()).padStart(2,'0');
  const ss = String(now.getSeconds()).padStart(2,'0');
  clockEl.textContent = `${hh}:${mm}:${ss}`;
}
tick();
setInterval(tick, 1000);

/* ── HEADER SCROLL ── */
const hdr = document.getElementById('hdr');
window.addEventListener('scroll', () => {
  hdr.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── MOBILE MENU ── */
const burger = document.getElementById('burger');
const mobNav = document.getElementById('mobNav');
burger.addEventListener('click', () => {
  const open = mobNav.classList.toggle('open');
  burger.classList.toggle('open', open);
});
document.querySelectorAll('.mob-link').forEach(l => {
  l.addEventListener('click', () => {
    mobNav.classList.remove('open');
    burger.classList.remove('open');
  });
});

/* ── SCROLL REVEAL ── */
const rups = document.querySelectorAll('.r-up');
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      ro.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
rups.forEach(el => ro.observe(el));

/* ── SMOOTH SCROLL ── */
let cur = window.pageYOffset, tgt = cur, going = false;
const ease = 0.08;

function step() {
  cur += (tgt - cur) * ease;
  if (Math.abs(tgt - cur) < 0.5) { cur = tgt; going = false; }
  window.scrollTo(0, cur);
  if (going) requestAnimationFrame(step);
}

window.addEventListener('wheel', e => {
  e.preventDefault();
  tgt = Math.max(0, Math.min(tgt + e.deltaY, document.body.scrollHeight - window.innerHeight));
  if (!going) { going = true; requestAnimationFrame(step); }
}, { passive: false });

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    tgt = target.getBoundingClientRect().top + window.pageYOffset - 80;
    if (!going) { going = true; requestAnimationFrame(step); }
  });
});

/* ── BACK TO TOP ── */
const backTop = document.getElementById('backTop');
if (backTop) {
  backTop.addEventListener('click', e => {
    e.preventDefault();
    tgt = 0;
    if (!going) { going = true; requestAnimationFrame(step); }
  });
}

/* ── PROJECT CARD TILT ── */
document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - .5;
    const y = (e.clientY - r.top)  / r.height - .5;
    card.style.transform = `translateY(-6px) rotateX(${-y*5}deg) rotateY(${x*5}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1), border-color .3s';
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform .12s ease';
  });
});