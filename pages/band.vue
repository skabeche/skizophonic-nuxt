<template>
  <div>
    <!-- <HeroHypnotic>Band</HeroHypnotic> -->
    <section class="gallery flex flex-wrap gap-4 bg-black">
      <figure v-for="image in images" :key="image.src" class="flex-auto">
        <img :alt="image.alt" :src="image.src" class="object-cover h-[50vh] w-auto min-w-full">
      </figure>
    </section>
  </div>
</template>

<script setup>
  import { images } from "~/data/media";

  import gsap from "gsap";
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  gsap.registerPlugin(ScrollTrigger);

  onMounted(() => {
    const figures = gsap.utils.toArray("figure");

    figures.forEach((figure) => {
      gsap.fromTo(figure, {
        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
      }, {
        duration: 1,
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
        stagger: 0.25,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: figure,
          start: "top bottom",
        }
      })
    });
  })

</script>