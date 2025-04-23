<template>
  <div ref="caseRef" class="case relative z-10 w-[80%] [perspective:1000px] cursor-pointer">
    <div ref="caseInnerRef" class="relative w-full h-full [transform-style:preserve-3d]" @click="handleClickCase">
      <div class="cover relative w-full top-0 left-0 rounded-sm [backface-visibility:hidden] overflow-hidden will-change-transform [box-shadow:_5px_3px_15px_-3px_rgba(0,_0,_0,_.7)]">
        <img class="object-cover rounded-sm" :src="`/albums/${content.slug}/${content.images.cover}`" :alt="`${content.title} - cover`" loading="lazy">
      </div>
      <div class="back absolute w-full top-0 left-0 [transform:rotateY(180deg)] [backface-visibility:hidden] will-change-transform [box-shadow:_5px_3px_15px_-3px_rgba(0,_0,_0,_.7)]">
        <img class="object-cover rounded-sm" :src="`/albums/${content.slug}/${content.images.back}`" :alt="`${content.title}`">
      </div>
    </div>
  </div>

  <div class="disc absolute top-1/2 -translate-y-1/2 right-0 w-[65%] drop-shadow-md/50 will-change-transform">
    <img ref="galletaRef" class="galleta [clip-path:_circle(50%_at_50%_50%)] cursor-pointer" :src="`/albums/${content.slug}/${content.images.galleta}`" :alt="`${content.title} - disc`" loading="lazy" @click="handleClickGalleta">
  </div>
</template>

<script setup>
  import gsap from "gsap";

  defineProps({
    content: {
      type: Object,
      required: true
    },
  })

  const caseRef = useTemplateRef('caseRef')
  const caseInner = useTemplateRef('caseInnerRef')
  const galleta = useTemplateRef('galletaRef')
  const flippedCase = ref(false);
  const zoomedGalleta = ref(false);

  onMounted(() => {
    gsap.fromTo(galleta.value, {
      x: -200,
      rotate: -90,
    }, {
      duration: 1,
      x: 0,
      rotate: 30,
      ease: 'power4.out',
    })
  })

  const handleClickCase = () => {
    flippedCase.value = !flippedCase.value;
    gsap.to(caseInner.value, {
      rotateY: flippedCase.value ? 180 : 0,
      duration: 0.7,
      ease: 'power4.inOut',
    });

  }

  const handleClickGalleta = () => {
    zoomedGalleta.value = !zoomedGalleta.value;
    if (zoomedGalleta.value) {
      gsap.
        timeline()
        .to(galleta.value, {
          duration: 0.7,
          scale: 1.3,
          rotate: 0,
          xPercent: -14,
          ease: 'power4.out',
        })
        .to(caseRef.value, {
          duration: 0.6,
          opacity: 0.6,
          zIndex: -1,
          x: -100,
          rotation: -10,
          scale: 0.8,
          filter: "blur(5px)",
          ease: "power4.out",
        }, '<')
    } else {
      gsap.
        timeline()
        .to(galleta.value, {
          duration: 0.7,
          scale: 1,
          rotate: 30,
          xPercent: 0,
          ease: 'power4.out',
        }).to(caseRef.value, {
          duration: 0.6,
          opacity: 1,
          zIndex: 10,
          x: 0,
          rotation: 0,
          scale: 1,
          filter: "blur(0px)",
          ease: "power4.out"
        }, '<')
    }
  }
</script>
