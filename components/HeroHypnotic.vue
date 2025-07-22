<template>
  <div ref="heroHypnoticRef" class="hero-hypnotic relative w-screen h-dvh">
    <div class="bg-wrapper absolute top-0 left-0 w-full h-full">
      <video ref="videoRef" class="w-full h-full object-cover" preload="auto" autoplay muted loop playsinline disableremoteplayback>
        <source src="/videos/spiral_large.mp4" type="video/mp4" media="(min-width: 2560px)">
        <source src="/videos/spiral_medium.mp4" type="video/mp4" media="(min-width: 1920px)">
        <source src="/videos/spiral_small.mp4" type="video/mp4">
      </video>
    </div>
    <div ref="slotRef" class="relative z-10 flex justify-center items-center w-full h-full overflow-hidden text-9xl bg-black text-white mix-blend-difference">
      <slot />
    </div>
    <div ref="scrollDownRef" class="scroll-down absolute bottom-2 w-full text-4xl sm:text-5xl text-center text-white mix-blend-difference">
      <Icon class="animate-bounce" name="ion:arrow-down-a" />
    </div>
  </div>
</template>

<script setup>
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  const heroHypnoticRef = useTemplateRef('heroHypnoticRef');
  const videoRef = useTemplateRef('videoRef');
  const slotRef = useTemplateRef('slotRef');
  const scrollDownRef = useTemplateRef('scrollDownRef');
  let ctx;

  onMounted(() => {
    ctx = gsap.context(() => {
      gsap
        .timeline({
          defaults: {
            delay: .4
          },
          onStart: () => {
            gsap.set(scrollDownRef.value, {
              autoAlpha: 0,
              filter: 'blur(3px)',
            })
          }
        })
        .fromTo(videoRef.value, {
          clipPath: 'circle(0% at 50% 50%)',
        }, {
          duration: 2,
          clipPath: 'circle(100% at 50% 50%)',
        })
        .fromTo(slotRef.value, {
          autoAlpha: 0,
          scale: 1.1,
          filter: 'blur(5px)',
        }, {
          duration: .5,
          autoAlpha: 1,
          scale: 1,
          filter: 'blur(0px)',
        }, '<')
        .to(scrollDownRef.value, {
          duration: .3,
          autoAlpha: 1,
          filter: 'blur(0px)',
        }, '<0.3')

      gsap.to(scrollDownRef.value, {
        duration: .3,
        autoAlpha: 0,
        filter: 'blur(3px)',
        scrollTrigger: {
          trigger: heroHypnoticRef.value,
          start: '5% top',
          // markers: true,
          toggleActions: 'play none none reverse',
        }
      })
    }, heroHypnoticRef.value);
  })

  onUnmounted(() => {
    ctx.revert();
  });
</script>
