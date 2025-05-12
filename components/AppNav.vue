<template>
  <div>
    <div class="fixed top-0 right-0 z-100 m-8 mix-blend-difference">
      <button class="nav-icon focus:outline-none focus:ring-0 cursor-pointer" aria-label="Open menu" @click="handleClick">
        <NavIcon :is-open="isOpen" />
      </button>
    </div>

    <div ref="navWrapperRef" class="nav-wrapper fixed top-0 right-0 z-90 flex flex-col justify-center items-center w-full h-full bg-black text-white text-5xl sm:text-7xl text-center transition-all duration-500 ease-in-out" :class="isOpen ? 'open' : 'pointer-events-none'">
      <nav class="main-navigation" aria-label="Main navigation">
        <ul class="relative z-90 flex flex-col gap-4 p-12 uppercase">
          <li>
            <NuxtLinkLocale to="/">{{ $t('pages.home.name') }}</NuxtLinkLocale>
          </li>
          <li>
            <NuxtLinkLocale to="band">{{ $t('pages.band.name') }}</NuxtLinkLocale>
          </li>
          <li>
            <NuxtLinkLocale to="music">{{ $t('pages.music.name') }}</NuxtLinkLocale>
          </li>
          <li>
            <NuxtLinkLocale to="merch">{{ $t('pages.merch.name') }}</NuxtLinkLocale>
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
    let firstPageLoad = true;

    const tlOpen = gsap
      .timeline({
        paused: true,
        defaults: {
          ease: 'power1.inOut'
        },
      })
      .fromTo(navWrapperRef.value, {
        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
      }, {
        duration: 0.1,
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
      })
      .fromTo('.nav-wrapper ul li', {
        autoAlpha: 0,
        y: 30,
      }, {
        duration: 0.4,
        autoAlpha: 1,
        y: 0,
        stagger: 0.12,
        ease: 'back.out(3)',
      }, '>+=0.3')

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
        y: -40,
        ease: 'power4.in',
      })
      .fromTo(navWrapperRef.value, {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
      }, {
        duration: 0.1,
        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
      })

    watchEffect(() => {

      if (isOpen.value) {
        tlOpen.play(0)
      } else {
        // Avoid animation on first page load.
        if (!firstPageLoad) {
          tlClose.play(0)
        } else {
          tlClose.revert()
        }
      }

      // It is not first page load.
      firstPageLoad = false
    })
  })

</script>

<style scoped>
  .nav-wrapper {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);

    &.open {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    }

    :deep(a) {
      text-shadow: 0 0 0 transparent;
      transition: all .2s ease-in-out;

      &:hover {
        text-shadow:
          4px 4px 1px rgb(255, 0, 71),
          -4px -4px 1px rgb(0, 255, 199);
      }
    }
  }

  .nav-icon:hover {
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
