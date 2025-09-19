<template>
  <div class="overflow-x-hidden">
    <AppHeader />
    <main class="min-h-dvh">
      <slot />
    </main>
    <AppFooter v-if="!route.meta.hideFooter" />
    <AppCursor />
  </div>
</template>

<script setup>
  import gsap from "gsap";

  const route = useRoute();

  onMounted(() => {
    const html = document.documentElement;

    gsap.to(html, {
      backgroundColor: '#000000',
      duration: 1,
      ease: 'power4.in',
    });
  })

  // onMounted(() => {
  //   // <video> do not autoplay in the <NuxtLayout> using <Transition> component.
  //   // @see https://github.com/nuxt/nuxt/issues/26262
  //   const videos = document.querySelectorAll("video");
  //   videos.forEach((video) => {
  //     if (video.autoplay === true) {
  //       video.play();
  //     }
  //   });
  // })
</script>
