'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ── Utilitaire sécurisé ── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ── Année footer ── */
  const yearEl = $('#footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Formulaire Contact (mailto fallback) ── */
  const form = $('#contact-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = form.querySelector('#contact-name')?.value.trim();
    const email   = form.querySelector('#contact-email')?.value.trim();
    const subject = form.querySelector('#contact-subject')?.value.trim();
    const message = form.querySelector('#contact-message')?.value.trim();
    if (!name || !email || !subject || !message) return;
    const body = encodeURIComponent(`Bonjour Abakar,\n\nNom : ${name}\nEmail : ${email}\n\n${message}`);
    window.location.href = `mailto:abakarbrahim702@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  });

  /* ── Header / Navigation ── */
  const header   = $('header');
  const menuIcon = $('#menu-icon');
  const navbar   = $('.navbar');
  const navLinks = $$('.navbar a');

  menuIcon?.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuIcon.classList.toggle('bx-x');
  });

  /* Ferme le menu mobile si clic en dehors */
  document.addEventListener('click', (e) => {
    if (navbar.classList.contains('active') &&
        !navbar.contains(e.target) &&
        !menuIcon.contains(e.target)) {
      navbar.classList.remove('active');
      menuIcon.classList.remove('bx-x');
    }
  });

  /* Sticky header + lien actif au scroll */
  const sections = $$('section[id]');

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);

    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      link.classList.toggle('active', href.includes(current) && current !== '');
    });

    /* Fermer le menu au scroll sur mobile */
    if (navbar.classList.contains('active')) {
      navbar.classList.remove('active');
      menuIcon.classList.remove('bx-x');
    }
  };

  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        onScroll();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  /* ── Mode sombre ── */
  const darkBtn = $('#modesombre');
  const applyTheme = (dark) => {
    document.body.classList.toggle('active', dark);
    darkBtn?.classList.toggle('bx-moon', !dark);
    darkBtn?.classList.toggle('bx-sun',   dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  };

  applyTheme(localStorage.getItem('theme') === 'dark');
  darkBtn?.addEventListener('click', () => applyTheme(!document.body.classList.contains('active')));

  /* ── Scroll Reveal (IntersectionObserver) ── */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('active'); revealObs.unobserve(e.target); } });
  }, { threshold: 0.08 });

  $$('.reveal').forEach(el => revealObs.observe(el));

  /* ── Barres de compétences ── */
  const skillSection = $('#skills');
  if (skillSection) {
    const skillObs = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      $$('.skill-fill').forEach(fill => { fill.style.width = fill.dataset.width; });
      $$('.skill-percent').forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        let current = 0;
        const step = target / 60;
        const tick = () => {
          current = Math.min(current + step, target);
          el.textContent = Math.ceil(current) + '%';
          if (current < target) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
      skillObs.disconnect();
    }, { threshold: 0.4 });
    skillObs.observe(skillSection);
  }

  /* ── Effet magnétique sur les boutons ── */
  $$('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width  / 2) * 0.15;
      const y = (e.clientY - r.top  - r.height / 2) * 0.15;
      btn.style.transform = `translate(${x}px,${y}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  /* ── Curseur personnalisé ── */
  const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches;
  if (!isTouchDevice()) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    let cx = 0, cy = 0, tx = 0, ty = 0;
    document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; }, { passive: true });

    const animateCursor = () => {
      cx += (tx - cx) * 0.3;
      cy += (ty - cy) * 0.3;
      cursor.style.left = `${cx}px`;
      cursor.style.top  = `${cy}px`;
      requestAnimationFrame(animateCursor);
    };
    requestAnimationFrame(animateCursor);

    $$('a, button, .portfolio-card, .info-card, #modesombre, #menu-icon').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });

    document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; });
  }

  /* ── Galerie Slideshow ── */
  const slides    = $$('.slideshow-container img');
  const prevBtn   = $('.prev');
  const nextBtn   = $('.next');
  const slideshow = $('.slideshow');

  if (slides.length) {
    let idx = 0;
    let autoTimer = null;

    const showSlide = (i) => {
      slides.forEach(s => s.classList.remove('active'));
      slides[i].classList.add('active');
    };

    const next = () => { idx = (idx + 1) % slides.length; showSlide(idx); };
    const prev = () => { idx = (idx - 1 + slides.length) % slides.length; showSlide(idx); };

    const startAuto = () => { autoTimer = setInterval(next, 5000); };
    const stopAuto  = () => { clearInterval(autoTimer); };

    nextBtn?.addEventListener('click', () => { next(); stopAuto(); startAuto(); });
    prevBtn?.addEventListener('click', () => { prev(); stopAuto(); startAuto(); });
    slideshow?.addEventListener('mouseenter', stopAuto);
    slideshow?.addEventListener('mouseleave', startAuto);

    /* Swipe tactile */
    let touchStartX = 0;
    slideshow?.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    slideshow?.addEventListener('touchend',   e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); stopAuto(); startAuto(); }
    });

    startAuto();

    /* Bouton Détails → page détails */
    const detailBtn = $('.details-button');
    detailBtn?.addEventListener('click', () => {
      const slide = slides[idx];
      const params = new URLSearchParams({
        title:       slide.dataset.title       || '',
        src:         slide.getAttribute('src') || '',
        description: slide.dataset.description || ''
      });
      window.location.href = `details.html?${params}`;
    });
  }

  /* ── Compteur d'années d'expérience (hero) ── */
  const expYearEl = $('#experience-years');
  if (expYearEl) {
    expYearEl.textContent = new Date().getFullYear() - 2022;
  }

});
