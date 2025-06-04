<template>
  <AnimationReveal>
    <div class="artwork-controls mb-2">
      <ButtonExpand :disabled="buttonDisabled" :preffix="buttonExpand.preffix" @click="buttonExpand.eventMethod">{{ buttonExpand.text }}</ButtonExpand>
    </div>
  </AnimationReveal>
  <AnimationReveal @done="isAnimationRevealDone = true">
    <section class="artwork relative h-fit">
      <div ref="caseRef" class="case relative z-10 w-[80%] perspective-[1000px]" :class="{ 'cursor-pointer': !expandedArtwork }">
        <div ref="caseInnerRef" class="relative w-full h-full transform-3d" :data-cursor-text="$t('components.cursor.flip')" @click="handleClickCase">
          <div ref="coverRef" class="cover relative w-full top-0 left-0 backface-hidden overflow-hidden will-change-transform [box-shadow:_5px_3px_10px_-3px_rgba(0,_0,_0,_.7)]">
            <img class="object-cover" :src="`/albums/${content.slug}/${content.images.cover}`" :alt="`${content.title} - cover`" loading="lazy">
          </div>
          <div ref="backRef" class="back absolute w-full top-0 left-0 rotate-y-180 backface-hidden will-change-transform [box-shadow:_5px_3px_10px_-3px_rgba(0,_0,_0,_.7)]">
            <img class="object-cover" :src="`/albums/${content.slug}/${content.images.back}`" :alt="`${content.title} - back`" loading="lazy">
          </div>
        </div>
      </div>
      <div ref="discRef" class="disc absolute top-1/2 -translate-y-1/2 right-0 w-[65%] drop-shadow-md/50 will-change-transform">
        <img ref="galletaRef" class="galleta [clip-path:_circle(50%_at_50%_50%)]" :class="{ 'cursor-pointer': !expandedArtwork }" :src="`/albums/${content.slug}/${content.images.galleta}`" :alt="`${content.title} - disc`" loading="lazy" :data-cursor-text="$t('components.cursor.zoom')" @click="handleClickGalleta">
      </div>
    </section>
  </AnimationReveal>
</template>

<script setup>
  import gsap from "gsap";

  defineProps({
    content: {
      type: Object,
      required: true
    },
  })

  const { t } = useI18n()
  const caseRef = useTemplateRef('caseRef')
  const back = useTemplateRef('backRef')
  const disc = useTemplateRef('discRef')
  const caseInner = useTemplateRef('caseInnerRef')
  const galleta = useTemplateRef('galletaRef')
  const expandedArtwork = ref(false);
  const flippedCase = ref(false);
  const zoomedGalleta = ref(false);
  const buttonDisabled = ref(false);
  const isAnimationRevealDone = ref(false)
  const buttonExpand = ref({ preffix: '+', text: t('pages.music.labels.expandArtwork'), eventMethod: () => handleExpandArtwork() })

  onMounted(() => {
    gsap.set(galleta.value, {
      opacity: 0,
      xPercent: -50,
      rotate: -90,
    })

    watchEffect(() => {
      if (isAnimationRevealDone.value) {
        gsap.to(galleta.value, {
          duration: 1,
          opacity: 1,
          xPercent: 0,
          rotate: 30,
          ease: 'power4.out',
        })
      }
    })

    watchEffect(() => {
      if (expandedArtwork.value) {
        buttonExpand.value = { preffix: '-', text: t('pages.music.labels.collapseArtwork'), eventMethod: () => handleCollapseArtwork() }
      }
      else {
        buttonExpand.value = { preffix: '+', text: t('pages.music.labels.expandArtwork'), eventMethod: () => handleExpandArtwork() }
      }
    })
  })

  const handleExpandArtwork = () => {
    // @todo Handle with timelines.
    // Reset animations.
    if (flippedCase.value) {
      gsap.to(caseInner.value, {
        rotateY: 0,
        duration: 0.7,
        ease: 'power4.inOut',
      })
    }
    // Reset animations.
    if (zoomedGalleta.value) {
      gsap.
        timeline()
        .to(galleta.value, {
          duration: 0.7,
          scale: 1,
          rotate: 30,
          xPercent: 0,
          ease: 'power4.out',
        })
        .to(caseRef.value, {
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

    // Start animations.
    gsap
      .timeline({
        onStart: () => {
          buttonDisabled.value = true
          document.querySelector('.cursor-custom').classList.add('hidden')
        },
        onComplete: () => {
          expandedArtwork.value = true
          buttonDisabled.value = false
        }
      })
      .to(galleta.value, {
        xPercent: -50,
        rotate: 0,
        duration: 0.7,
        ease: "power4.in",
        onComplete: () => {
          gsap.set(disc.value, {
            opacity: 0,
            translate: '0 0',
            width: "95%",
          })
        }
      })
      .to(caseRef.value, {
        width: '95%',
        duration: 0.6,
        ease: "power4.inOut",
      })
      .to(back.value, {
        position: "relative",
        opacity: 1,
        left: 0,
        rotateY: 0,
        duration: 0.7,
        yPercent: 4,
        ease: "power4.inOut"
      })
      .to(disc.value, {
        position: "relative",
        opacity: 1,
        duration: 0.6,
        yPercent: 9,
        ease: "power4.out",
        onStart: () => {
          gsap.set(galleta.value, {
            xPercent: 0,
            rotate: 0,
          })
        },
      })

  }

  const handleCollapseArtwork = () => {
    gsap
      .timeline({
        onStart: () => {
          buttonDisabled.value = true
        },
        onComplete: () => {
          expandedArtwork.value = false
          buttonDisabled.value = false
          document.querySelector('.cursor-custom').classList.remove('hidden')
        }
      })
      .to(disc.value, {
        opacity: 0,
        yPercent: 0,
        duration: 0.6,
        width: "65%",
        ease: "power4.inOut",
        onComplete: () => {
          gsap.set(disc.value, {
            position: "absolute",
            translate: '0 -50%',
          })
        }
      })
      .to(caseRef.value, {
        width: '80%',
        duration: 0.6,
        ease: "power4.inOut",
      }, '<')
      .to(back.value, {
        y: 0,
        rotateY: 180,
        duration: 0.6,
        ease: "power4.inOut",
        onComplete: () => {
          gsap.set(back.value, {
            position: "absolute",
          })
        }
      })
      .to(galleta.value, {
        xPercent: -50,
        rotate: -90,
      })
      .to(galleta.value, {
        xPercent: 0,
        rotate: 30,
        opacity: 1,
        duration: 0.6,
        ease: "power4.out",
        onStart: () => {
          gsap.set(disc.value, {
            opacity: 1,
          })
        }
      })
  }

  const handleClickCase = () => {
    if (expandedArtwork.value) return

    flippedCase.value = !flippedCase.value;

    gsap.to(caseInner.value, {
      rotateY: flippedCase.value ? 180 : 0,
      duration: 0.7,
      ease: 'power4.inOut',
    });
  }

  const handleClickGalleta = () => {
    if (expandedArtwork.value) return

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
        })
        .to(caseRef.value, {
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
