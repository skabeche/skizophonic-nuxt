<template>
  <div ref="outerWrapperRef" class="outer-wrapper relative w-fit before:absolute before:z-70 before:top-0 before:left-0 before:w-full before:h-full before:bg-black before:will-change-transform">
    <div ref="innerWrapperRef" class="inner-wrapper">
      <slot />
    </div>
  </div>
</template>

<script setup>
  import gsap from 'gsap';

  const props = defineProps({
    delay: {
      type: Number,
      default: 0
    }
  })

  const outerWrapperRef = useTemplateRef('outerWrapperRef');
  const innerWrapperRef = useTemplateRef('innerWrapperRef');
  let ctx;

  onMounted(() => {
    ctx = gsap.context(() => {
      gsap.set(outerWrapperRef.value, {
        visibility: 'hidden',
      })
      gsap.set(innerWrapperRef.value, {
        visibility: 'hidden',
      })
      gsap
        .timeline({
          delay: props.delay + 1.1, // Align with layout transition.
        })
        .to(outerWrapperRef.value, {
          visibility: 'visible',
          '--scaleBefore': "100%",
          duration: 0.7 + props.delay,
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
            })
          }
        })
        .to(outerWrapperRef.value, {
          delay: 0.3,
          '--scaleBefore': 0,
          duration: 0.7,
          ease: "power4.inOut",
        })

    }, outerWrapperRef.value); // <- Scope!

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
