import gsap from 'gsap';

import { useTransition } from "#imports";
import { disableScroll, enableScroll } from '~/utils/scrollLock.js';

const { toggleTransitionComplete } = useTransition();

export const pageTransitionConfig = {
  name: 'page-transition',
  mode: 'out-in',
  css: false,
  appear: false,
  onEnter: (el, done) => {
    // No animations on enter as they are custom-made on each route/page.
    resetAnimations();
    toggleTransitionComplete(true);
    done();
  },
  onLeave: (el, done) => {
    disableScroll();
    toggleTransitionComplete(false);

    gsap
      .timeline({
        paused: true,
        onStart() {
          gsap.set('#page-transition-overlay', { autoAlpha: 1 })
          gsap.set('#page-transition-circles', { autoAlpha: 1 })
          gsap.set('.button-nav-icon-wrapper', { pointerEvents: 'none' });
        },
        onComplete() {
          gsap.set('#page-transition-overlay', { autoAlpha: 0 })
          gsap.set('#page-transition-circles', { autoAlpha: 0 })
          toggleTransitionComplete(true);
          done();
        },
      })
      .to(el, {
        duration: 1.9,
        y: -80,
        overflow: 'hidden',
        ease: 'power4.inOut',
      })
      .to('.nav-icon', {
        scaleX: 0,
        ease: 'power4.in',
      }, '<')
      .to('#page-transition-grid rect', {
        '--scaleColumnsTransition': "100%",
        delay: 0.1,
        duration: 1.2,
        stagger: {
          each: 0.04,
          from: "random"
        },
        ease: 'power4.inOut'
      }, '<')
      .from('#page-transition-circles .center-ring', {
        duration: 0.4,
        scale: 0,
        svgOrigin: "144.16 144.16",
        ease: 'back.out(2)',
      }, '-=.9')
      .from('#page-transition-circles .middle-ring', {
        duration: 0.7,
        scale: 0,
        svgOrigin: "144.16 144.16",
        ease: 'back.out(2)',
      }, '<')
      .from('#page-transition-circles .outer-ring', {
        duration: .9,
        scale: 0,
        svgOrigin: "144.16 144.16",
        ease: 'power1.out',
      }, '<')
      .to('#page-transition-circles', {
        scale: 50,
        duration: 0.6,
        ease: 'power4.in'
      })
      .play();
  },
};

export const pageTransitionFadeConfig = {
  name: 'page-transition',
  mode: 'out-in',
  css: false,
  appear: false,
  onEnter: (el, done) => {
    // No animations on enter as they are custom-made on each route/page.
    resetAnimations();
    toggleTransitionComplete(true);
    done();
  },
  onLeave: (el, done) => {
    disableScroll();
    toggleTransitionComplete(false);

    const children = el.querySelectorAll('div, h1, h2, h3, h4');

    gsap
      .timeline({
        paused: true,
        onComplete() {
          toggleTransitionComplete(true);
          done();
        },
      })
      .to(children, {
        delay: 0.15,
        duration: 0.7,
        stagger: 0.02,
        y: -70,
        autoAlpha: 0,
        ease: 'power4.in',
      })
      .to('footer', {
        delay: 0.15,
        duration: 0.7,
        autoAlpha: 0,
        ease: 'power4.in',
      }, '<')
      .play();
  },
};

const resetAnimations = () => {
  gsap.set('#page-transition-overlay', { autoAlpha: 0 })
  gsap.set('#page-transition-grid rect', { '--scaleColumnsTransition': 0 })
  gsap.set('#page-transition-circles', { scale: 1 })
  if (document.querySelector('footer')) {
    gsap.set('footer', { autoAlpha: 1 })
  }
  gsap.set('.button-nav-icon-wrapper', { pointerEvents: 'auto' });
  gsap.to('.nav-icon', {
    scaleX: 1,
    ease: 'power4.out'
  });
  enableScroll();
}
