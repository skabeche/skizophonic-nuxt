<template>
  <div class="overflow-x-hidden">
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
  onMounted(() => {
    // <video> do not autoplay in the <NuxtLayout> using <Transition> component.
    // @see https://github.com/nuxt/nuxt/issues/26262
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      video.play();
    });
  })
</script>
