"use strict";
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#menu');
const mobile = window.matchMedia('(max-width: 760px)');
if (toggle && nav) {
  document.documentElement.classList.add('js');
  toggle.hidden = false;
  function closeMenu(returnFocus = false) {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    if (returnFocus) toggle.focus();
  }
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  nav.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link) return;
    closeMenu();
    if (mobile.matches && link.hash) {
      const target = document.getElementById(link.hash.slice(1));
      if (target) { target.setAttribute('tabindex', '-1'); target.focus({preventScroll: true}); }
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.header-inner')) closeMenu();
  });
  document.addEventListener('focusin', event => {
    if (!event.target.closest('.header-inner')) closeMenu();
  });
  mobile.addEventListener('change', () => closeMenu());
}
