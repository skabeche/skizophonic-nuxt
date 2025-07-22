import gsap from 'gsap';

import { useTransition } from "#imports";

const { toggleTransitionComplete } = useTransition();

export const pageTransitionConfig = {
  name: 'page-transition',
  mode: 'out-in',
  css: false,
  appear: false,
  onEnter: (el, done) => {
    // No animations on enter as they are custom-made on each route/page.
    gsap.set('#page-transition-overlay', { clipPath: 'inset(100% 0% 0% 0%)' })
    gsap.set('#page-transition-overlay .inner', { scale: 1 })
    toggleTransitionComplete(true);
    done();
  },
  onLeave: (el, done) => {
    toggleTransitionComplete(false);

    gsap
      .timeline({
        paused: true,
        onStart() {
          gsap.set('#page-transition-overlay, #page-transition-overlay .inner', { autoAlpha: 1 })
        },
        onComplete() {
          gsap.set('#page-transition-overlay, #page-transition-overlay .inner', { autoAlpha: 0 })
          toggleTransitionComplete(true);
          done();
        },
      })
      .to(el, {
        duration: 1.9,
        y: '-100vh',
        overflow: 'hidden',
        ease: 'power4.in',
      })
      .to('.nav-icon', {
        scaleX: 0,
        ease: 'power4.in',
      }, '<')
      .to('#page-transition-overlay', {
        delay: 0.3,
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.2,
        ease: 'power4.inOut'
      }, '<')
      .from('#page-transition-overlay .inner .center-ring', {
        duration: 0.4,
        scale: 0,
        svgOrigin: "144 144",
        ease: 'back.out(2)',
      }, '-=.9')
      .from('#page-transition-overlay .inner .middle-ring', {
        duration: 0.7,
        scale: 0,
        svgOrigin: "144 144",
        ease: 'back.out(2)',
      }, '<')
      .from('#page-transition-overlay .inner .outer-ring', {
        duration: .9,
        scale: 0,
        svgOrigin: "144 144",
        ease: 'power1.out',
      }, '<')
      .to('#page-transition-overlay .inner', {
        scale: 50,
        duration: 0.6,
        ease: 'power4.in'
      })
      .to('.nav-icon', {
        scaleX: 1,
        ease: 'power4.out'
      }, '<85%')
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
    gsap.set('#page-transition-overlay', { clipPath: 'inset(100% 0% 0% 0%)' })
    gsap.set('#page-transition-overlay .inner', { scale: 1 })
    toggleTransitionComplete(true);
    done();
  },
  onLeave: (el, done) => {
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
      .play();
  },
};
