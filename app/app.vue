<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator color="repeating-linear-gradient(to right,#ff0047 0%,#ffffff 50%,#00ffc7 100%)" />
  <AppPreloader @done="isPageReady = true" />
  <div v-if="isPageReady">
    <NuxtLayout :key="route => route.fullPath">
      <VueLenis ref="lenisRef" :auto-raf="false" root>
        <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir" />
        <NuxtPage :page-key="route => route.fullPath" />
      </VueLenis>
    </NuxtLayout>
  </div>
  <PageTransitionOverlay />
</template>

<script setup>
  import { VueLenis, useLenis } from 'lenis/vue';
  import gsap from "gsap";

  const lenisRef = ref()
  const isPageReady = ref(false)
  const head = useLocaleHead();

  // const lenis = useLenis(({ scroll }) => {
  //   // console.log(scroll)
  // })

  watchEffect((onInvalidate) => {
    function update(time) {
      lenisRef.value?.lenis?.raf(time * 1000)
    }
    gsap.ticker.add(update)

    onInvalidate(() => {
      gsap.ticker.remove(update)
    })
  })
</script>
