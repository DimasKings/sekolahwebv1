/* ===== NAV SCROLL + MOBILE ===== */
const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', scrollY > 20);
});

/* ===== ACTIVE LINK ===== */
const sections = [...document.querySelectorAll('section[id]')];
const links = [...document.querySelectorAll('.nav-links a')];
const obs = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + en.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => obs.observe(s));

/* ===== REVEAL ON SCROLL ===== */
const revealObs = new IntersectionObserver((entries, o) => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.classList.add('show');
      o.unobserve(en.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ===== COUNTER ===== */
const counters = document.querySelectorAll('[data-count]');
const cObs = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target;
    const target = +el.dataset.count;
    let cur = 0;
    const step = Math.max(1, Math.round(target / 60));
    const timer = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(timer); }
      el.textContent = cur.toLocaleString('id-ID');
    }, 22);
    cObs.unobserve(el);
  });
}, { threshold: .5 });
counters.forEach(c => cObs.observe(c));

/* ===== LIGHTBOX ===== */
const lb = document.getElementById('lightbox');
const lbImg = lb.querySelector('img');
document.querySelectorAll('.g-item').forEach(btn => {
  btn.addEventListener('click', () => {
    lbImg.src = btn.dataset.full;
    lb.classList.add('show');
    document.body.style.overflow = 'hidden';
  });
});
const closeLb = () => { lb.classList.remove('show'); document.body.style.overflow = ''; };
lb.addEventListener('click', e => { if (e.target === lb || e.target.classList.contains('lb-close')) closeLb(); });
addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });

/* ===== FORM VALIDATION ===== */
const form = document.getElementById('form');
const msg = document.getElementById('formMsg');

form.addEventListener('submit', e => {
  e.preventDefault();
  let ok = true;
  form.querySelectorAll('[required]').forEach(f => {
    const err = f.parentElement.querySelector('.err');
    const val = f.value.trim();
    let message = '';
    if (!val) message = 'Wajib diisi';
    else if (f.type === 'tel' && !/^[0-9+\-\s]{9,15}$/.test(val)) message = 'Nomor tidak valid';
    if (message) {
      ok = false;
      f.classList.add('invalid');
      err.textContent = message;
    } else {
      f.classList.remove('invalid');
      err.textContent = '';
    }
  });

  if (!ok) { msg.textContent = 'Periksa kembali isian formulir.'; msg.style.color = '#e0524c'; return; }

  msg.style.color = '#1e9e63';
  msg.textContent = 'Terima kasih! Pendaftaran berhasil dikirim, tim kami akan menghubungi Anda.';
  form.reset();
});

/* ===== YEAR ===== */
document.getElementById('year').textContent = new Date().getFullYear();

/* ===== PARALLAX BLOBS (subtle) ===== */
const blobs = document.querySelectorAll('.blob');
addEventListener('mousemove', e => {
  const x = (e.clientX / innerWidth - .5) * 26;
  const y = (e.clientY / innerHeight - .5) * 26;
  blobs.forEach((b, i) => {
    b.style.marginLeft = x * (i + 1) * .4 + 'px';
    b.style.marginTop = y * (i + 1) * .4 + 'px';
  });
});