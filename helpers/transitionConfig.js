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
        onComplete() {
          toggleTransitionComplete(true);
          done();
        },
      })
      .to(el, {
        duration: 1.9,
        y: '-100vh',
        ease: 'power4.in',
      })
      .to('#page-transition-overlay', {
        delay: .3,
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
      .play();
  },
};
