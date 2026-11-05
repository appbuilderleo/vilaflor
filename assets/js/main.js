/**
 * Vila Flor — Main JavaScript Architecture
 * High-performance, vanilla JavaScript, zero framework overhead.
 */

(function () {
  'use strict';

  // State
  let currentCategory = 'all';
  let activeLightboxIndex = 0;
  let filteredGallery = [];

  /* ==========================================================================
     1. THEME MANAGEMENT (Light / Dark)
     ========================================================================== */
  function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('vilaflor-theme');

    function applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('vilaflor-theme', theme);
      const metaTheme = document.querySelector('meta[name="theme-color"]');
      if (metaTheme) {
        metaTheme.content = theme === 'dark' ? '#102C36' : '#F8F6F0';
      }
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro');
        const iconSun = themeToggleBtn.querySelector('.icon-sun');
        const iconMoon = themeToggleBtn.querySelector('.icon-moon');
        if (iconSun && iconMoon) {
          iconSun.style.display = theme === 'dark' ? 'block' : 'none';
          iconMoon.style.display = theme === 'dark' ? 'none' : 'block';
        }
      }
    }

    const initialTheme = savedTheme || (prefersDark.matches ? 'dark' : 'light');
    applyTheme(initialTheme);

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
      });
    }

    prefersDark.addEventListener('change', (e) => {
      if (!localStorage.getItem('vilaflor-theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  /* ==========================================================================
     2. NAVIGATION & HEADER
     ========================================================================== */
  function initNavigation() {
    const header = document.querySelector('.site-header');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav-drawer');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    // Sticky header with blur on scroll
    function onScrollHeader() {
      if (!header) return;
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScrollHeader, { passive: true });
    onScrollHeader();

    // Mobile menu toggle
    if (menuToggle && mobileNav) {
      function toggleMenu(open) {
        const shouldOpen = open !== undefined ? open : !mobileNav.classList.contains('open');
        mobileNav.classList.toggle('open', shouldOpen);
        menuToggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
        menuToggle.classList.toggle('active', shouldOpen);
        document.body.classList.toggle('menu-open', shouldOpen);

        if (shouldOpen) {
          const firstFocusable = mobileNav.querySelector('a, button');
          if (firstFocusable) firstFocusable.focus();
        }
      }

      menuToggle.addEventListener('click', () => toggleMenu());

      const closeBtn = mobileNav.querySelector('.close-menu-btn');
      if (closeBtn) closeBtn.addEventListener('click', () => toggleMenu(false));

      // Close on link click
      navLinks.forEach((link) => {
        link.addEventListener('click', () => {
          if (mobileNav.classList.contains('open')) {
            toggleMenu(false);
          }
        });
      });

      // Close on Esc
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
          toggleMenu(false);
        }
      });
    }

    // Active Section Tracking
    const sections = document.querySelectorAll('section[id]');
    if ('IntersectionObserver' in window && sections.length) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute('id');
              navLinks.forEach((link) => {
                const href = link.getAttribute('href');
                if (href === `#${id}`) {
                  link.classList.add('active');
                } else if (href && href.startsWith('#')) {
                  link.classList.remove('active');
                }
              });
            }
          });
        },
        { rootMargin: '-20% 0px -70% 0px' }
      );

      sections.forEach((s) => observer.observe(s));
    }
  }

  /* ==========================================================================
     3. HERO PERSPECTIVE SWITCHER
     ========================================================================== */
  function initHeroPerspectives() {
    const heroBg = document.querySelector('.hero-background');
    const heroTabs = document.querySelectorAll('.hero-perspective-tab');
    if (!heroBg || !heroTabs.length) return;

    heroTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const targetImage = tab.getAttribute('data-image');
        if (!targetImage) return;

        heroTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        // Smooth crossfade
        heroBg.style.opacity = '0.4';
        setTimeout(() => {
          heroBg.style.backgroundImage = `url('${targetImage}')`;
          heroBg.style.opacity = '1';
        }, 250);
      });
    });
  }

  /* ==========================================================================
     4. INTERACTIVE ATMOSPHERE MOMENT (Mid-journey Interactive Feature)
     ========================================================================== */
  function initAtmosphereExperience() {
    const atmosphereContainer = document.querySelector('.atmosphere-interactive');
    if (!atmosphereContainer) return;

    const timeButtons = atmosphereContainer.querySelectorAll('.atmosphere-btn');
    const bgImage = atmosphereContainer.querySelector('.atmosphere-image');
    const titleEl = atmosphereContainer.querySelector('.atmosphere-title');
    const textEl = atmosphereContainer.querySelector('.atmosphere-description');
    const soundCue = atmosphereContainer.querySelector('.atmosphere-cue');

    const moments = {
      morning: {
        title: "Amanhecer Dourado na Praia",
        text: "O sol surge sobre o Oceano Índico com tons de ouro e âmbar. A praia deserta convida a uma caminhada matinal com pés descalços antes do café na varanda colonial.",
        cue: "Temperatura: 24°C · Brisa leve · Mar calmo",
        img: "assets/images/vila-flor/exterior/02-ocean-deck-beachfront-view.webp"
      },
      midday: {
        title: "Meio-Dia Tropical & Piscina",
        text: "O calor agradável convida a um mergulho refrescante na piscina privativa. O mar ganha tons vibrantes de azul turquesa enquanto os pássaros tropicais cantam nos jardins.",
        cue: "Temperatura: 28°C · Piscina a 26°C · Sol radiante",
        img: "assets/images/vila-flor/swimming-pool/05-private-swimming-pool-and-sundeck.webp"
      },
      sunset: {
        title: "Entardecer & Piquenique na Areia",
        text: "O entardecer em Ponta do Ouro tinge o céu de rosa e lavanda. A maré baixa forma piscinas naturais enquanto a brisa fresca sopra pela varanda de madeira.",
        cue: "Temperatura: 25°C · Maré recuando · Céu em degradê",
        img: "assets/images/vila-flor/beach-ocean/34-beach-picnic-and-coastal-setup.webp"
      },
      night: {
        title: "Noite Sob as Estrelas Africanas",
        text: "Silêncio profundo, pontuado apenas pelo ritmo hipnótico das ondas rebentando suavemente. A via láctea brilha límpida sobre o teto colonial de Vila Flor.",
        cue: "Temperatura: 22°C · Céu estrelado · Som das ondas",
        img: "assets/images/vila-flor/exterior/01-colonial-house-veranda-facade.webp"
      }
    };

    timeButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const time = btn.getAttribute('data-time');
        const data = moments[time];
        if (!data) return;

        timeButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        if (bgImage) {
          bgImage.style.opacity = '0.3';
          setTimeout(() => {
            bgImage.src = data.img;
            bgImage.style.opacity = '1';
          }, 200);
        }

        if (titleEl) titleEl.textContent = data.title;
        if (textEl) textEl.textContent = data.text;
        if (soundCue) soundCue.textContent = data.cue;
      });
    });
  }

  /* ==========================================================================
     5. INTERACTIVE GALLERY & LIGHTBOX
     ========================================================================== */
  function initGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    const lightbox = document.getElementById('gallery-lightbox');
    if (!galleryGrid || typeof VILA_FLOR_GALLERY === 'undefined') return;

    filteredGallery = [...VILA_FLOR_GALLERY];

    function renderGallery(items) {
      galleryGrid.innerHTML = '';

      if (!items.length) {
        galleryGrid.innerHTML = `
          <div class="gallery-empty">
            <p>Nenhuma fotografia encontrada nesta categoria.</p>
          </div>
        `;
        return;
      }

      const fragment = document.createDocumentFragment();

      items.forEach((item, index) => {
        const card = document.createElement('article');
        card.className = `gallery-item category-${item.category} aspect-${item.aspect}`;
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `${item.title} — Clique para ampliar`);
        card.dataset.index = index;

        card.innerHTML = `
          <div class="gallery-thumb-wrapper">
            <picture>
              <source srcset="${item.thumb}" type="image/webp">
              <img 
                src="${item.fallbackSrc}" 
                alt="${item.title}" 
                loading="lazy" 
                decoding="async"
                width="${item.width}" 
                height="${item.height}"
                class="gallery-img"
              />
            </picture>
            <div class="gallery-item-overlay">
              <div class="gallery-item-meta">
                <span class="gallery-item-tag">${item.categoryLabel}</span>
                <h4 class="gallery-item-title">${item.title}</h4>
              </div>
              <div class="gallery-zoom-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </div>
            </div>
          </div>
        `;

        card.addEventListener('click', () => openLightbox(index));
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLightbox(index);
          }
        });

        fragment.appendChild(card);
      });

      galleryGrid.appendChild(fragment);

      // Trigger scroll animations for items
      triggerGalleryScrollAnim();
    }

    // Filter Buttons
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-category');
        currentCategory = cat;

        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        if (cat === 'all') {
          filteredGallery = [...VILA_FLOR_GALLERY];
        } else {
          filteredGallery = VILA_FLOR_GALLERY.filter((item) => item.category === cat);
        }

        renderGallery(filteredGallery);
      });
    });

    // Lightbox Controls
    function openLightbox(index) {
      if (!lightbox || !filteredGallery[index]) return;
      activeLightboxIndex = index;
      updateLightboxContent();
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lightbox-open');

      const closeBtn = lightbox.querySelector('.lightbox-close');
      if (closeBtn) closeBtn.focus();
    }

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('lightbox-open');

      // Return focus to active gallery item
      const activeCard = galleryGrid.querySelector(`[data-index="${activeLightboxIndex}"]`);
      if (activeCard) activeCard.focus();
    }

    function updateLightboxContent() {
      if (!lightbox || !filteredGallery[activeLightboxIndex]) return;
      const item = filteredGallery[activeLightboxIndex];

      const imgEl = lightbox.querySelector('.lightbox-image');
      const titleEl = lightbox.querySelector('.lightbox-title');
      const catEl = lightbox.querySelector('.lightbox-category');
      const captionEl = lightbox.querySelector('.lightbox-caption');
      const counterEl = lightbox.querySelector('.lightbox-counter');

      if (imgEl) {
        imgEl.style.opacity = '0';
        setTimeout(() => {
          imgEl.src = item.src;
          imgEl.alt = item.title;
          imgEl.style.opacity = '1';
        }, 120);
      }

      if (titleEl) titleEl.textContent = item.title;
      if (catEl) catEl.textContent = item.categoryLabel;
      if (captionEl) captionEl.textContent = item.caption;
      if (counterEl) counterEl.textContent = `${activeLightboxIndex + 1} / ${filteredGallery.length}`;
    }

    function nextImage() {
      if (!filteredGallery.length) return;
      activeLightboxIndex = (activeLightboxIndex + 1) % filteredGallery.length;
      updateLightboxContent();
    }

    function prevImage() {
      if (!filteredGallery.length) return;
      activeLightboxIndex = (activeLightboxIndex - 1 + filteredGallery.length) % filteredGallery.length;
      updateLightboxContent();
    }

    if (lightbox) {
      const closeBtn = lightbox.querySelector('.lightbox-close');
      const nextBtn = lightbox.querySelector('.lightbox-next');
      const prevBtn = lightbox.querySelector('.lightbox-prev');
      const backdrop = lightbox.querySelector('.lightbox-backdrop');

      if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
      if (nextBtn) nextBtn.addEventListener('click', nextImage);
      if (prevBtn) prevBtn.addEventListener('click', prevImage);
      if (backdrop) backdrop.addEventListener('click', closeLightbox);

      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        else if (e.key === 'ArrowRight') nextImage();
        else if (e.key === 'ArrowLeft') prevImage();
      });

      // Mobile Touch / Swipe Handling
      let touchStartX = 0;
      let touchEndX = 0;

      lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });

      function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
          nextImage(); // Swiped left -> Next
        } else if (touchEndX > touchStartX + threshold) {
          prevImage(); // Swiped right -> Prev
        }
      }
    }

    // Initial render
    renderGallery(filteredGallery);
  }

  function triggerGalleryScrollAnim() {
    const items = document.querySelectorAll('.gallery-item');
    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('visible'));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    items.forEach((item) => obs.observe(item));
  }

  /* ==========================================================================
     6. SCROLL REVEALS & ANIMATIONS
     ========================================================================== */
  function initScrollReveals() {
    const reveals = document.querySelectorAll('.reveal-on-scroll');
    if (!reveals.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveals.forEach((r) => r.classList.add('revealed'));
      return;
    }

    if (!('IntersectionObserver' in window)) {
      reveals.forEach((r) => r.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px 80px 0px' }
    );

    reveals.forEach((r) => observer.observe(r));
  }

  /* ==========================================================================
     7. INITIALIZATION
     ========================================================================== */
  function init() {
    initTheme();
    initNavigation();
    initHeroPerspectives();
    initAtmosphereExperience();
    initGallery();
    initScrollReveals();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
