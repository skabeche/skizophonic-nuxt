<template>
  <div>
    <div class="fixed top-0 right-0 z-100 m-8 mix-blend-difference">
      <button class="button-nav-icon focus:outline-none focus:ring-0 cursor-pointer" aria-label="Open menu" @click="handleClick">
        <NavIcon :is-open="isOpen" />
      </button>
    </div>

    <div ref="navWrapperRef" class="nav-wrapper fixed top-0 right-0 z-90 flex flex-col justify-center items-center w-full h-full bg-black text-white text-5xl sm:text-7xl text-center transition-all duration-500 ease-in-out" :class="isOpen ? 'open' : 'pointer-events-none'">
      <nav class="main-navigation" aria-label="Main navigation">
        <ul class="relative z-90 flex flex-col gap-4 p-12 uppercase">
          <li>
            <AnimationTextShadow>
              <NuxtLinkLocale to="/">{{ $t('pages.home.name') }}</NuxtLinkLocale>
            </AnimationTextShadow>
          </li>
          <li>
            <AnimationTextShadow>
              <NuxtLinkLocale to="band">{{ $t('pages.band.name') }}</NuxtLinkLocale>
            </AnimationTextShadow>
          </li>
          <li>
            <AnimationTextShadow>
              <NuxtLinkLocale to="music">{{ $t('pages.music.name') }}</NuxtLinkLocale>
            </AnimationTextShadow>
          </li>
          <li>
            <AnimationTextShadow>
              <NuxtLinkLocale to="merch">{{ $t('pages.merch.name') }}</NuxtLinkLocale>
            </AnimationTextShadow>
          </li>
        </ul>
      </nav>
      <nav class="social-navigation" aria-label="Social navigation">
        <SocialLinks class="text-3xl sm:text-5xl" />
      </nav>
      <NavLang />
    </div>
  </div>
</template>

<script setup>
  import gsap from "gsap"

  const isOpen = ref(false)
  const navWrapperRef = useTemplateRef('navWrapperRef')
  const route = useRoute()

  watch(route, () => {
    isOpen.value = false
  })

  const handleClick = () => {
    isOpen.value = !isOpen.value
  }

  onMounted(() => {
    let isFirstPageLoad = true;

    gsap.set(navWrapperRef.value, { clipPath: 'inset(0% 0% 100% 0%)', })

    const tlOpen = gsap
      .timeline({
        paused: true,
        onStart() {
          gsap.set('.nav-wrapper ul li', {
            clipPath: 'inset(0% 0% 0% 0%)',
            autoAlpha: 1,
            y: 0
          })
        },
        onComplete() {
          gsap.set('.nav-wrapper ul li', {
            clipPath: 'none'
          })
        }
      })
      .to(navWrapperRef.value, {
        duration: 0.2,
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'power2.inOut'
      })
      .fromTo('.nav-wrapper ul li > span', {
        yPercent: -200,
      }, {
        yPercent: 0,
        duration: 0.5,
        stagger: 0.04,
        ease: 'power2.inOut'
      }, '<')

    const tlClose = gsap
      .timeline({
        paused: true,
      })
      .fromTo('.nav-wrapper ul li', {
        autoAlpha: 1,
        y: 0,
      }, {
        duration: 0.4,
        autoAlpha: 0,
        y: -50,
        ease: 'power4.in',
      })
      .fromTo(navWrapperRef.value, {
        clipPath: 'inset(0% 0% 0% 0%)',
      }, {
        duration: 0.1,
        clipPath: 'inset(0% 0% 100% 0%)',
        ease: 'power4.inOut'
      }, '<0.25')


    watchEffect(() => {
      if (isOpen.value) {
        tlOpen.play(0)
      } else {
        // Avoid animation on first page load.
        if (!isFirstPageLoad) {
          tlClose.play(0)
        } else {
          tlClose.revert()
        }
      }

      isFirstPageLoad = false
    })
  })

</script>

<style scoped>
  .button-nav-icon {
    animation: anim-icon-init .7s ease;
  }

  @keyframes anim-icon-init {
    0% {
      transform: scaleX(0);
    }

    100% {
      transform: scaleX(1);
    }
  }

  .button-nav-icon:hover {
    :deep(.line:nth-child(1)) {
      animation: anim-icon-line 1.2s ease-in-out infinite;
    }

    :deep(.line:nth-child(2)) {
      animation: anim-icon-line 1s ease-in-out infinite;
    }

    :deep(.line:nth-child(3)) {
      animation: anim-icon-line 1.35s ease-in-out infinite;
    }
  }

  @keyframes anim-icon-line {
    0% {
      transform: scaleX(1);
    }

    50% {
      transform: scaleX(1.2);
    }

    100% {
      transform: scaleX(1);
    }
  }
</style>
