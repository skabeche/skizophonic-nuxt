<template>
  <div ref="outerWrapperRef" class="outer-wrapper relative w-fit before:absolute before:z-70 before:top-0 before:left-0 before:w-full before:h-full before:bg-black before:will-change-transform">
    <div ref="innerWrapperRef" class="inner-wrapper">
      <slot />
    </div>
  </div>
</template>

<script setup>
  import gsap from 'gsap';

  const emit = defineEmits(['done'])

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
        opacity: 0,
      })
      gsap
        .timeline({
          delay: randomDelay,
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
              opacity: 1,
            })
          }
        })
        .to(outerWrapperRef.value, {
          delay: 0.2,
          '--scaleBefore': 0,
          duration: 0.8,
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
