<template>
  <div v-if="showPreloader" ref="preloaderRef" class="preloader fixed inset-0 z-10 w-screen h-dvh flex items-center justify-center bg-white text-black">
    <div ref="logoCirclesRef" class="logo-circles w-40 h-40">
      <LogoCircles />
    </div>
    <div ref="dot1Ref" class="dot1 fixed z-20 w-screen h-dvh bg-black will-change-[clip-path]" />
    <div ref="dot2Ref" class="dot2 fixed z-30 w-screen h-dvh bg-white will-change-[clip-path]" />
    <div ref="preloaderTextRef" class="preloader-text fixed z-20 inset-0 flex items-center justify-center w-screen h-dvh text-[clamp(1.2rem,5vw,2.8rem)] text-white font-bold uppercase mix-blend-difference">
      {{ $t('preloader.text') }}
    </div>
  </div>
</template>

<script setup>
  import gsap from "gsap";

  const emit = defineEmits(['done']);

  const route = useRoute();
  const { locale } = useI18n();
  const showPreloader = ref(true);
  const preloaderRef = useTemplateRef('preloaderRef');
  const logoCirclesRef = useTemplateRef('logoCirclesRef');
  const dot1Ref = useTemplateRef('dot1Ref');
  const dot2Ref = useTemplateRef('dot2Ref');
  const preloaderTextRef = useTemplateRef('preloaderTextRef');
  const isRootPath = computed(() => route.path === '/' || route.path === `/${locale.value}`);
  let ctx = gsap.context(() => { });

  onMounted(() => {
    // Only show preloader on root path.
    if (!isRootPath.value) {
      showPreloader.value = false;
      emit('done');
      return;
    }

    ctx = gsap.context(() => {
      gsap.set([dot1Ref.value, dot2Ref.value], { clipPath: 'circle(0% at 50% 50%)' })
      gsap.set(preloaderTextRef.value, { opacity: 0, scale: 0.9 })

      gsap
        .timeline({
          delay: 2.5,
          onComplete: () => {
            showPreloader.value = false
            emit('done')
          }
        })
        .to(logoCirclesRef.value, {
          duration: 0.3,
          scale: 0.03,
          ease: "power4.inOut",
        })
        .to(dot1Ref.value, {
          duration: 0.8,
          clipPath: 'circle(0.5% at 50% 50%)',
          ease: "power4.out",
        }, '<')
        .to(dot1Ref.value, {
          duration: 0.8,
          clipPath: 'circle(100% at 50% 50%)',
          ease: "power4.inOut",
        })
        .to(preloaderTextRef.value, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power4.inOut",
        }, '<0.1')
        .to(dot2Ref.value, {
          duration: 1.2,
          clipPath: 'circle(100% at 50% 50%)',
          ease: "power4.inOut",
        }, '<')
    }, preloaderRef.value);
  })

  onUnmounted(() => {
    ctx.revert();
  });
</script>
