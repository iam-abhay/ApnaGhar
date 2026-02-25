'use strict';

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }

/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [overlay, navCloseBtn, navOpenBtn];

/**
 * close navbar when click on any navbar link
 */

for (let i = 0; i < navbarLinks.length; i++) { navElemArr.push(navbarLinks[i]); }

/**
 * add event on all elements for toggling navbar
 */

for (let i = 0; i < navElemArr.length; i++) {
  navElemArr[i].addEventListener("click", function () {
    elemToggleFunc(navbar);
    elemToggleFunc(overlay);
  });
}

/**
 * header active state
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 400 ? header.classList.add("active")
    : header.classList.remove("active");
});

/**
 * Scroll reveal animation
 */

const scrollElements = document.querySelectorAll('.scroll-hidden');

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const displayScrollElement = (element) => {
  element.classList.add('scroll-visible');
  element.classList.remove('scroll-hidden');
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    }
  });
};

window.addEventListener('scroll', handleScrollAnimation);

/**
 * Property card animations
 */

const propertyCards = document.querySelectorAll('.property-card');

propertyCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
    this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    this.style.transition = 'all 0.3s ease';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
    this.style.boxShadow = 'var(--shadow-2)';
  });
});

/**
 * Features card hover animation
 */

const featureCards = document.querySelectorAll('.features-card');

featureCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    const icon = this.querySelector('.card-icon');
    const btn = this.querySelector('.card-btn');
    
    if (icon) {
      icon.style.transform = 'scale(1.2) rotate(360deg)';
      icon.style.transition = 'transform 0.5s ease';
    }
    
    if (btn) {
      btn.style.transform = 'translateX(10px)';
      btn.style.transition = 'transform 0.3s ease';
    }
    
    this.style.transform = 'translateY(-5px)';
    this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
  });
  
  card.addEventListener('mouseleave', function() {
    const icon = this.querySelector('.card-icon');
    const btn = this.querySelector('.card-btn');
    
    if (icon) {
      icon.style.transform = 'scale(1) rotate(0deg)';
    }
    
    if (btn) {
      btn.style.transform = 'translateX(0)';
    }
    
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = 'none';
  });
});

/**
 * Typing effect for hero title
 */

const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  const text = heroTitle.textContent;
  heroTitle.textContent = '';
  let i = 0;
  
  const typeWriter = () => {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };
  
  setTimeout(typeWriter, 1000);
}

/**
 * Image hover effects
 */

const images = document.querySelectorAll('img');

images.forEach(img => {
  img.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05)';
    this.style.transition = 'transform 0.3s ease';
    this.style.filter = 'brightness(1.1)';
  });
  
  img.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.filter = 'brightness(1)';
  });
});

/**
 * Smooth scroll for navigation links
 */

const navLinks = document.querySelectorAll('[data-nav-link]');

navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/**
 * Loading animation
 */

window.addEventListener('load', function() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }
  
  // Add scroll-hidden class to elements for animation
  const animateElements = document.querySelectorAll(
    '.about-content, .service-card, .property-card, .features-card, .blog-card, .footer-brand'
  );
  
  animateElements.forEach(el => {
    el.classList.add('scroll-hidden');
  });
  
  // Trigger initial scroll animation check
  handleScrollAnimation();
}); 