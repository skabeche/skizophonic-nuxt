<template>
  <div ref="wrapperRef" class="wrapper relative w-fit will-change-transform
    before:absolute before:z-70 before:top-0 before:left-0 before:w-full before:h-full before:bg-black
    after:absolute after:z-60 after:top-0 after:-left-0 after:w-full after:h-full after:bg-white">
    <slot class="w-full" />
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

  const wrapper = useTemplateRef('wrapperRef');
  let ctx;

  onMounted(() => {
    ctx = gsap.context((self) => {
      gsap.set(wrapper.value, {
        display: 'none',
      })
      gsap
        .timeline({
          defaults: {
            delay: props.delay,
          }
        })
        .to(wrapper.value, {
          display: 'block',
          '--scaleBefore': "100%",
          duration: 0.7 + Number(props.delay),
          ease: "power4.inOut",
          onStart: () => {
            gsap.set(wrapper.value, {
              '--transformOrigin': "top",
            })

          },
          onComplete: () => {
            gsap.set(wrapper.value, {
              '--transformOrigin': "bottom",
            })
          }
        })
        .to(wrapper.value, {
          delay: .3,
          '--scaleBefore': 0,
          '--scaleAfter': 0,
          duration: 0.7,
          ease: "power4.inOut",
          onComplete: () => {
            gsap.set(wrapper.value, {
              background: "transparent",
            })
          }
        })

    }, wrapper.value); // <- Scope!

  })

  onUnmounted(() => {
    ctx.revert();
  });
</script>

<style scoped>
  ::root {
    --scaleBefore: 0;
    --scaleAfter: '100%';
    --transformOrigin: 'top';
  }

  .wrapper::before {
    transform: scaleY(var(--scaleBefore));
    transform-origin: var(--transformOrigin);
  }

  .wrapper::after {
    transform: scaleY(var(--scaleAfter));
  }
</style>
