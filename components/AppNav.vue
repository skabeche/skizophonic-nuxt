<template>
  <div class="fixed top-0 right-0 z-100 m-8 mix-blend-difference">
    <button class="nav-icon focus:outline-none focus:ring-0 cursor-pointer" aria-label="Open menu" @click="handleClick">
      <NavIcon :is-open="isOpen" />
    </button>
  </div>

  <nav class="main-navigation fixed top-0 right-0 z-90 flex flex-col justify-center items-center w-full h-full bg-black text-white text-5xl sm:text-7xl text-center transition-all duration-500 ease-in-out " :class="isOpen ? 'open' : 'pointer-events-none'" aria-label="Main navigation">
    <ul class="relative z-90 flex flex-col gap-4 p-12 uppercase">
      <li>
        <NuxtLink to="/">Home</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/band">Band</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/music">Music</NuxtLink>
      </li>
    </ul>
    <SocialLinks class="text-4xl sm:text-5xl" />
  </nav>
</template>

<script setup>
  import gsap from "gsap"

  const isOpen = ref(false)
  const route = useRoute()

  watch(route, () => {
    isOpen.value = false
  })

  const handleClick = () => {
    isOpen.value = !isOpen.value
  }

  onMounted(() => {
    const tl = gsap
      .timeline({
        paused: true,
        defaults: {
          ease: 'power1.inOut'
        },
      })
      .fromTo('.main-navigation', {
        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
      }, {
        duration: 0.1,
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
      })
      .set('.main-navigation ul li', {
        opacity: 0,
        y: 30,
      })
      .to('.main-navigation ul li', {
        duration: 0.4,
        opacity: 1,
        y: 0,
        stagger: 0.15,
        ease: 'back.out(3)',
      }, '>+=0.3')


    watchEffect(() => {
      if (isOpen.value) {
        tl.play(0)
      } else {
        // tl.reverse()
        tl.revert()
      }
    })
  })

</script>

<style scoped>
  .main-navigation {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);

    &.open {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    }

    a {
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
