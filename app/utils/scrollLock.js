import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function disableScroll() {
  const scrollY = window.scrollY;

  // Be aware, when method "position: fixed; top: -scrollYpx;" is used to freeze the page,
  // all child "position: fixed" elements suddenly become positioned relative to that shifted container, not the viewport.
  // So, we may need to reset the position of all child elements in the spectific component right before route leaves.
  document.body.style.top = `-${scrollY}px`; // Lock position.
  document.documentElement.style.top = `-${scrollY}px`; // Lock position.
  document.body.classList.add('scroll-lock');
  document.documentElement.classList.add('scroll-lock');

  // Some elements need to be refreshed after scroll position is locked.
  ScrollTrigger.refresh();
}

export function enableScroll() {
  document.documentElement.style.top = '';
  document.body.style.top = '';
  document.body.classList.remove('scroll-lock');
  document.documentElement.classList.remove('scroll-lock');

  window.scrollTo(0, 0);
}
