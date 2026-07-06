'use strict';

const header = document.querySelector('[data-header]');
const navbar = document.querySelector('[data-navbar]');
const overlay = document.querySelector('[data-overlay]');
const navCloseBtn = document.querySelector('[data-nav-close-btn]');
const navOpenBtn = document.querySelector('[data-nav-open-btn]');
const loader = document.querySelector('.loader');

const revealSelector = '.about-content, .service-card, .property-card, .features-card, .blog-card, .footer-brand';
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const setNavigationState = (isOpen) => {
  if (!navbar || !overlay) {
    return;
  }

  navbar.classList.toggle('active', isOpen);
  overlay.classList.toggle('active', isOpen);

  if (navOpenBtn) {
    navOpenBtn.setAttribute('aria-expanded', String(isOpen));
  }

  if (navCloseBtn) {
    navCloseBtn.setAttribute('aria-expanded', String(isOpen));
  }
};

const openNavigation = () => setNavigationState(true);
const closeNavigation = () => setNavigationState(false);

if (navOpenBtn) {
  navOpenBtn.addEventListener('click', openNavigation);
}

if (navCloseBtn) {
  navCloseBtn.addEventListener('click', closeNavigation);
}

if (overlay) {
  overlay.addEventListener('click', closeNavigation);
}

if (navbar) {
  navbar.addEventListener('click', (event) => {
    if (event.target.closest('[data-nav-link]')) {
      closeNavigation();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeNavigation();
  }
});

const updateHeaderState = () => {
  if (!header) {
    return;
  }

  header.classList.toggle('active', window.scrollY >= 400);
};

let headerFramePending = false;
window.addEventListener(
  'scroll',
  () => {
    if (headerFramePending) {
      return;
    }

    headerFramePending = true;
    window.requestAnimationFrame(() => {
      updateHeaderState();
      headerFramePending = false;
    });
  },
  { passive: true }
);
updateHeaderState();

const initializeRevealAnimations = () => {
  const elements = document.querySelectorAll(revealSelector);

  if (!elements.length) {
    return;
  }

  elements.forEach((element) => {
    element.classList.add('scroll-hidden');
  });

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    elements.forEach((element) => {
      element.classList.add('scroll-visible');
      element.classList.remove('scroll-hidden');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('scroll-visible');
        entry.target.classList.remove('scroll-hidden');
        observerInstance.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -8% 0px',
    }
  );

  elements.forEach((element) => observer.observe(element));
};

const typeHeroTitle = () => {
  const heroTitle = document.querySelector('.hero-title');

  if (!heroTitle || prefersReducedMotion) {
    return;
  }

  const fullText = heroTitle.textContent.trim();

  if (!fullText) {
    return;
  }

  heroTitle.textContent = '';

  let index = 0;
  const step = () => {
    heroTitle.textContent += fullText.charAt(index);
    index += 1;

    if (index < fullText.length) {
      window.setTimeout(step, 75);
    }
  };

  window.setTimeout(step, 600);
};

window.addEventListener('DOMContentLoaded', () => {
  typeHeroTitle();
});

window.addEventListener('load', () => {
  if (loader) {
    loader.classList.add('is-hidden');
  }

  initializeRevealAnimations();
});