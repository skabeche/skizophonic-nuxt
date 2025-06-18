<template>
  <div>
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter v-if="!route.meta.hideFooter" />
    <AppCursor />
  </div>
</template>

<script setup>
  const route = useRoute();

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
