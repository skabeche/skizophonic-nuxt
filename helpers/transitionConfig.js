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
    toggleTransitionComplete(true);
    done();
  },
  onLeave: (el, done) => {
    toggleTransitionComplete(false);
    gsap
      .timeline({
        paused: true,
        onComplete() {
          done();
        },
      })
      .to(el, {
        duration: 1.6,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        ease: 'power4.inOut',
      })
      .play();
  },
};

export const layoutTransitionConfig = {
  name: 'layout-transition',
  mode: 'out-in',
  css: false,
  appear: false,
  onEnter: (el, done) => {
    // No animations on enter as they are custom-made on each route/page.
    toggleTransitionComplete(true);
    done();
  },
  onLeave: (el, done) => {
    toggleTransitionComplete(false);
    gsap.set(el, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    })
    gsap
      .timeline({
        paused: true,
        onComplete() {
          done();
        },
      })
      .to(el, {
        duration: 1.4,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        ease: 'power4.inOut',
      })
      .play();
  },
}
