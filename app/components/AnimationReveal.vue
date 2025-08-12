<template>
  <div ref="outerWrapperRef" class="outer-wrapper relative w-fit">
    <svg class="reveal-grid absolute z-90 inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" fill="black">
      <rect width="21%" height="100%" x="0" y="0" />
      <rect width="22%" height="100%" x="20%" y="0" />
      <rect width="23%" height="100%" x="40%" y="0" />
      <rect width="24%" height="100%" x="60%" y="0" />
      <rect width="25%" height="100%" x="80%" y="0" />
    </svg>
    <div ref="innerWrapperRef" class="inner-wrapper">
      <slot />
    </div>
  </div>
</template>

<script setup>
  import gsap from 'gsap';
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  gsap.registerPlugin(ScrollTrigger);

  const emit = defineEmits(['done'])

  const props = defineProps({
    refreshScrollTrigger: {
      type: Boolean,
      default: false,
      required: false
    }
  })

  const outerWrapperRef = useTemplateRef('outerWrapperRef');
  const innerWrapperRef = useTemplateRef('innerWrapperRef');
  const offset = 0.1; // Initial delay.
  const randomDelay = +(Math.random() * 0.7 + 0.2).toFixed(2) + offset;
  let ctx;

  onMounted(() => {
    ctx = gsap.context(() => {
      gsap.set([innerWrapperRef.value, '.reveal-grid rect'], {
        autoAlpha: 0,
      })
      gsap
        .timeline({
          delay: randomDelay,
          onStart: () => {
            // Sometimes elements loose their scroll position, so we have to refresh it manually.
            if (props.refreshScrollTrigger) {
              ScrollTrigger.refresh();
            }
          },
          onComplete: () => {
            emit('done')
          }
        })
        .to('.reveal-grid rect', {
          '--scaleColumnsReveal': "100%",
          duration: 1,
          ease: "power4.inOut",
          onStart: () => {
            gsap.set('.reveal-grid rect', {
              '--transformOrigin': "top",
              autoAlpha: 1,
            })
          },
          onComplete: () => {
            gsap.set('.reveal-grid rect', {
              '--transformOrigin': "bottom",
            })
            gsap.set(innerWrapperRef.value, {
              autoAlpha: 1,
            })
          }
        })
        .to('.reveal-grid rect', {
          delay: 0.2,
          '--scaleColumnsReveal': 0,
          stagger: {
            each: 0.035,
            from: "random"
          },
          duration: 0.8,
          ease: "power4.inOut",
          onComplete: () => {
            gsap.set('.reveal-grid', {
              autoAlpha: 0,
            })
          }
        })

    }, outerWrapperRef.value);
  })

  onUnmounted(() => {
    ctx.revert();
  });
</script>

<style scoped>
  ::root {
    --scaleColumnsReveal: 0;
    --transformOrigin: 'top';
  }

  .reveal-grid rect {
    transform: scaleY(var(--scaleColumnsReveal));
    transform-origin: var(--transformOrigin);
    will-change: auto;
  }
</style>
