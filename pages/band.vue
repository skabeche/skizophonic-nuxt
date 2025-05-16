<template>
  <section class="flex flex-col lg:flex-row lg:flex-wrap gap-x-4 bg-black text-white border-t-16 border-t-black">
    <div class="flex-auto">
      <ul class="members flex flex-col gap-1.5 p-6 text-lg lg:text-[1.15rem] [&_span]:block">
        <li><span>Vocals & Guitar: Nacho Galí</span></li>
        <li><span>Guitar: Dan Alcaide</span></li>
        <li><span>Guitar: Fede Trillo</span></li>
        <li><span>Keyboards: Eloy Alcaide</span></li>
        <li><span>Bass & Trombone: Javier Gascón</span></li>
        <li><span>Bass: Carlos Sánchez</span></li>
        <li><span>Drums: Carlos Cruz</span></li>
        <li><span>Drums: Deed Marc</span></li>
        <li><span>Skizonettes:<br> Sofía Royo & Nuria Pallares & Sol González</span></li>
      </ul>
    </div>
    <figure v-for="image in images" :key="image.src" class="relative flex-auto overflow-hidden">
      <div class="relative [clip-path:polygon(0_0,100%_0,100%_100%,0_100%]">
        <NuxtImg class="max-lg:h-auto h-[50dvh] w-full object-cover transition-all duration-500 ease-in-out cursor-pointer will-change-transform lg:scale-105 hover:scale-110 [clip-path:polygon(0_0,100%_0,100%_100%,0_100%]" width="1920" loading="lazy" :alt="image.alt" :src="`/images/band/${image.src}`" @click="handleClick" @mousemove="handleMouseMove" />
      </div>
      <figcaption class="relative z-10 text-white bg-black">{{ image.alt }}</figcaption>
    </figure>
  </section>
</template>

<script setup>
  import { images } from "~/data/media";
  import { pageTransitionConfig } from '~/helpers/transitionConfig';

  import gsap from "gsap";
  import SplitText from "gsap/SplitText";

  gsap.registerPlugin(SplitText);

  definePageMeta({
    pageTransition: pageTransitionConfig,
  });

  useSeoMeta({
    title: 'Band | Skizophonic',
    ogTitle: 'Band | Skizophonic',
  })

  const prevImage = ref(null)
  const currentImage = ref(null)
  const isLargeDevice = window.matchMedia("(min-width: 1024px)");
  let ctx;

  const handleClick = (e) => {
    const element = e.srcElement

    prevImage.value = (currentImage.value !== null) ? currentImage.value : element
    currentImage.value = element;

    if (prevImage.value !== currentImage.value) {
      prevImage.value.classList.remove('h-[calc(100dvh-1.4rem)]')
    }

    if (isLargeDevice.matches) {
      element.classList.toggle('hover:scale-110')
      element.classList.toggle('h-[calc(100dvh-1.4rem)]')
    }

    // Scroll to element after CSS transition is done.
    const delay = isLargeDevice.matches ? 500 : 0;
    setTimeout(function () {
      element.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" })
    }, delay);
  }

  const movement = 15;
  const handleMouseMove = (e) => {
    // @todo Make a composable.
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    const x = Math.round(((relX - rect.width / 2) / rect.width) * movement);
    const y = Math.round(((relY - rect.height / 2) / rect.height) * movement);

    gsap.to(target.parentElement, {
      duration: .5,
      x: x,
      y: y,
    });
  }

  onMounted(() => {
    const membersSplit = SplitText.create('.members li span', {
      type: 'lines',
      mask: 'lines'
    });

    ctx = gsap.context(() => {
      gsap
        .timeline()
        .fromTo('section', {
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
        }, {
          duration: 1.4,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          ease: 'power4.inOut',
        })
        .fromTo('figure', {
          clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
        }, {
          duration: 1,
          delay: 0.5,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
          stagger: 0.25,
          ease: 'power4.inOut',
        })
        .from(membersSplit.lines, {
          y: 200,
          duration: 1.4,
          ease: 'power4.inOut',
        }, '<0.5');
    })
  });

  onUnmounted(() => {
    ctx.revert();
  });
</script>
