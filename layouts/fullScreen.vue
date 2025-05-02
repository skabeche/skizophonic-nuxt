<template>
  <div>
    <AppHeader />
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
  onMounted(() => {
    // Seems to be the only way to disable scroll and pull-to-refresh for this specific layout.
    document.body.classList.add('overflow-hidden', 'overscroll-none');
    document.documentElement.classList.add('overflow-hidden', 'overscroll-none');

    // <video> do not autoplay in the <NuxtLayout> using <Transition> component.
    // @see https://github.com/nuxt/nuxt/issues/26262
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      video.play();
    });
  })

  onUnmounted(() => {
    // Enable scroll and pull-to-refresh again on other layouts.
    document.body.classList.remove('overflow-hidden', 'overscroll-none');
    document.documentElement.classList.remove('overflow-hidden', 'overscroll-none');
  })
</script>
