import gsap from 'gsap';

import { useTransition } from "#imports";

const { toggleTransitionComplete } = useTransition();

export const pageTransitionConfig = {
  name: 'page-transition',
  mode: 'out-in',
  css: false,
  appear: false,
  onEnter: (el, done) => {
    toggleTransitionComplete(true);
    done();
    // gsap.set(el, {
    //   // clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
    //   opacity: 0,
    // });
    // gsap
    //   .timeline({
    //     paused: true,
    //     onComplete() {
    //       toggleTransitionComplete(true);
    //       done();
    //     },
    //   })
    //   .to(el, {
    //     duration: 0.6,
    //     opacity: 1,
    //     // clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    //     ease: 'power4.inOut',
    //   })
    //   .play();
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
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
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
    // toggleTransitionComplete(true);
    done();

    // gsap
    //   .timeline({
    //     paused: true,
    //     onComplete() {
    //       // toggleTransitionComplete(true);
    //       done();
    //     },
    //   })
    //   .fromTo(el,
    //     {
    //       autoAlpha: 0,
    //       y: 20,
    //     },
    //     {
    //       autoAlpha: 1,
    //       y: 0,
    //       duration: 0.5,
    //       ease: 'power4.in',
    //     }
    //   )
    //   .play();
  },
  onLeave: (el, done) => {
    // toggleTransitionComplete(false);
    gsap
      .timeline({
        onComplete() {
          done();
        },
      })
      .fromTo(el,
        {
          //   opacity: 0,
          //   y: 30,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        },
        {
          // opacity: 1,
          // y: 0,
          clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)',
          duration: 1.2,
          ease: 'power4.inOut',
        }
      )


  },
}
