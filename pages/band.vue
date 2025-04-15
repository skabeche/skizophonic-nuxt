<template>
  <div>
    <section class="flex flex-wrap gap-x-4 bg-black text-white border-t-16 border-t-black">
      <div class="flex-auto">
        <ul class="members flex flex-col gap-3 p-8 text-xl">
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
          <img class="h-[50dvh] w-full object-cover transition-all duration-500 ease-in-out cursor-pointer will-change-transform scale-105 hover:scale-110 [clip-path:polygon(0_0,100%_0,100%_100%,0_100%]" loading="lazy" :alt="image.alt" :src="image.src" @click="handleClick" @mousemove="handleMouseMove">
        </div>
        <figcaption class="relative z-10 text-white bg-black">{{ image.alt }}</figcaption>
      </figure>
    </section>
  </div>
</template>

<script setup>
  import { images } from "~/data/media";

  import gsap from "gsap";
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  gsap.registerPlugin(ScrollTrigger);

  const prevImage = ref(null)
  const currentImage = ref(null)

  const handleClick = (e) => {
    const element = e.srcElement

    prevImage.value = (currentImage.value !== null) ? currentImage.value : element

    currentImage.value = element;

    if (prevImage.value !== currentImage.value) {
      prevImage.value.classList.remove('h-[calc(100dvh-1.4rem)]')
    }

    element.classList.toggle('h-[calc(100dvh-1.4rem)]')
    element.classList.toggle('hover:scale-110')
    // element.classList.toggle('w-fit')
    // element.classList.toggle('w-full')

    // Scroll to element after CSS transition is done.
    setTimeout(function () {
      element.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" })
    }, 500);
  }

  const handleMouseMove = (e) => {
    const target = e.srcElement;
    const movement = 15;
    const rect = target.getBoundingClientRect();
    const relX = e.pageX - (rect.left + window.scrollX);
    const relY = e.pageY - (rect.top + window.scrollY);

    const containerWidth = target.offsetWidth;
    const containerHeight = target.offsetHeight;

    gsap.to(target.parentElement, {
      duration: .5,
      x: ((relX - containerWidth / 2) / containerWidth) * movement,
      y: ((relY - containerHeight / 2) / containerHeight) * movement
    });
  }

  onMounted(() => {
    const tl = gsap.timeline();

    tl.fromTo('figure', {
      clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
    }, {
      duration: 1,
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
      stagger: 0.25,
      ease: 'power4.inOut',
    });

    tl.from('.members li span', {
      y: 60,
      duration: 1.4,
      ease: 'power4.inOut',
    }, '<0.5');
  })

</script>

<style scoped>
  .members {
    & li {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    }

    & span {
      display: block;
    }
  }
</style>
