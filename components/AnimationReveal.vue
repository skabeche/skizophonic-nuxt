<template>
  <div ref="outerWrapperRef" class="outer-wrapper relative w-fit before:absolute before:z-70 before:top-0 before:left-0 before:w-full before:h-full before:bg-black before:will-change-transform">
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
  const randomDelay = +(Math.random() * 0.8 + 0.2).toFixed(2) + offset;
  let ctx;

  onMounted(() => {
    ctx = gsap.context(() => {
      gsap.set(outerWrapperRef.value, {
        visibility: 'hidden',
      })
      gsap.set(innerWrapperRef.value, {
        visibility: 'hidden',
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
        .to(outerWrapperRef.value, {
          visibility: 'visible',
          '--scaleBefore': "100%",
          duration: 1,
          ease: "power4.inOut",
          onStart: () => {
            gsap.set(outerWrapperRef.value, {
              '--transformOrigin': "top",
            })
          },
          onComplete: () => {
            gsap.set(outerWrapperRef.value, {
              '--transformOrigin': "bottom",
            })
            gsap.set(innerWrapperRef.value, {
              visibility: 'visible',
              autoAlpha: 1,
            })
          }
        })
        .to(outerWrapperRef.value, {
          delay: 0.2,
          '--scaleBefore': 0,
          duration: 0.8,
          ease: "power4.inOut",
        })

    }, outerWrapperRef.value);

  })

  onUnmounted(() => {
    ctx.revert();
  });
</script>

<style scoped>
  ::root {
    --scaleBefore: 0;
    --transformOrigin: 'top';
  }

  .outer-wrapper::before {
    transform: scaleY(var(--scaleBefore));
    transform-origin: var(--transformOrigin);
  }
</style>
