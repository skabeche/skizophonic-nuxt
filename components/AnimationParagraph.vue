<template>
  <p ref="paragraphRef">
    <slot />
  </p>
</template>

<script setup>
  import gsap from "gsap";
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import SplitType from "split-type";

  gsap.registerPlugin(ScrollTrigger);

  const paragraph = useTemplateRef('paragraphRef')

  onMounted(() => {
    const paragraphSplit = new SplitType(paragraph.value, { types: 'lines, words' })
    gsap.set([paragraphSplit.lines], { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' })
    gsap.from(paragraphSplit.words, {
      duration: 1,
      stagger: 0.02,
      y: 130,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: paragraph.value,
        start: 'top bottom',
        end: 'bottom bottom',
        toggleActions: 'play none none reverse',
      }
    });
  })
</script>