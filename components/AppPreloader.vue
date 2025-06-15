<template>
  <div v-if="showPreloader" class="preloader fixed inset-0 z-10 flex items-center justify-center bg-white text-black">
    <div class="icon w-40 h-40">
      <LogoCircles class="logo-circles" />
    </div>
    <div class="dot1 fixed z-20 w-screen min-h-dvh bg-black" />
    <div class="dot2 fixed z-30 w-screen min-h-dvh bg-white" />
  </div>
</template>

<script setup>
  import gsap from "gsap";

  const emit = defineEmits(['done'])

  const route = useRoute();
  const { locale } = useI18n()
  const showPreloader = ref(true);
  const isRootPath = computed(() => route.path === '/' || route.path === `/${locale.value}`);
  let ctx = gsap.context(() => { });

  onMounted(() => {
    // Only show preloader on root path.
    if (!isRootPath.value) {
      showPreloader.value = false
      emit('done')
      return
    }

    ctx = gsap.context(() => {
      gsap.set([".dot1", ".dot2"], { clipPath: 'circle(0% at 50% 50%)' })
      gsap
        .timeline({
          delay: 2.5,
          onComplete: () => {
            showPreloader.value = false
            emit('done')
          }
        })
        .to(".logo-circles", {
          duration: 0.5,
          scale: 0.05,
          ease: "power4.inOut",
        })
        .to(".dot1", {
          duration: .8,
          clipPath: 'circle(1% at 50% 50%)',
          ease: "power4.out",
        }, '<')
        .to(".dot1", {
          duration: .8,
          clipPath: 'circle(100% at 50% 50%)',
          ease: "power4.inOut",
        })
        .to(".dot2", {
          duration: 1.2,
          clipPath: 'circle(100% at 50% 50%)',
          ease: "power4.inOut",
        }, '<0.1')
    }); // <- Scope!
  })

  onUnmounted(() => {
    ctx.revert();
  });
</script>
