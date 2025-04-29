<template>
  <div class="hero-hypnotic relative w-screen h-screen">
    <div class="absolute top-0 left-0 w-full h-full">
      <video ref="videoRef" class="w-full h-full object-cover" preload="auto" autoplay muted loop playsinline disableremoteplayback>
        <source src="/videos/spiral_large.mp4" type="video/mp4" media="(min-width: 2560px)">
        <source src="/videos/spiral_medium.mp4" type="video/mp4" media="(min-width: 1920px)">
        <source src="/videos/spiral_small.mp4" type="video/mp4">
      </video>
    </div>
    <h1 ref="headerRef" class="relative z-10 flex justify-center items-center w-full h-full text-9xl bg-black text-white mix-blend-difference">
      <slot />
    </h1>
  </div>
</template>

<script setup>
  import { gsap } from 'gsap'

  const video = useTemplateRef('videoRef')
  const header = useTemplateRef('headerRef')
  let ctx

  onMounted(() => {
    ctx = gsap.context((self) => {
      gsap
        .timeline({
          defaults: {
            delay: .4
          },
        })
        .fromTo(video.value, {
          clipPath: 'circle(0% at 50% 50%)',
        }, {
          duration: 2,
          clipPath: 'circle(100% at 50% 50%)',
        })
        .fromTo(header.value, {
          autoAlpha: 0,
          scale: 1.1,
          filter: 'blur(5px)',
        }, {
          autoAlpha: 1,
          duration: .5,
          scale: 1,
          filter: 'blur(0px)',
        }, '<')
    }); // <- Scope!

  })

  onUnmounted(() => {
    ctx.revert();
  });
</script>
