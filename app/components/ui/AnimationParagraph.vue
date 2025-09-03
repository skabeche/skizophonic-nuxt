<template>
  <p ref="paragraphRef">
    <slot />
  </p>
</template>

<script setup>
  import gsap from "gsap";
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { SplitText } from "gsap/SplitText";

  gsap.registerPlugin(ScrollTrigger, SplitText);

  const paragraph = useTemplateRef('paragraphRef')

  onMounted(() => {
    const paragraphSplit = SplitText.create(paragraph.value, {
      type: 'lines, words',
      mask: 'lines'
    })
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