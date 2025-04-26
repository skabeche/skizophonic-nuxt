import gsap from 'gsap';

import { useTransition } from "#imports";

const { toggleTransitionComplete } = useTransition();

const pageTransitionConfig = {
  name: 'page-transition',
  mode: 'out-in',
  appear: true,
  onEnter: (el, done) => {

    console.log('----')
    console.log('transition enter')
    gsap.set(el, {
      // clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
      opacity: 0,
    });
    gsap
      .timeline({
        paused: true,
        onComplete() {
          toggleTransitionComplete(true);
          done();
          console.log('transition enter complete');
        },
      })
      .to(el, {
        duration: 0.6,
        opacity: 1,
        // clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        ease: 'power4.inOut',
      })
      .play();
  },
  onLeave: (el, done) => {
    toggleTransitionComplete(false);
    gsap
      .timeline({
        paused: true,
        onComplete() {
          done();
          console.log('transition leave complete')
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

export default pageTransitionConfig;
