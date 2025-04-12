<template>
  <VueLenis ref="lenisRef" :auto-raf="false" root>
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator />
    <AppHeader />
    <main>
      <NuxtPage :page-key="route => route.fullPath" />
    </main>
    <AppFooter />
  </VueLenis>
</template>

<script setup>
  import { VueLenis, useLenis } from 'lenis/vue';
  import gsap from "gsap";

  const lenisRef = ref()

  const lenis = useLenis(({ scroll }) => {
    // console.log(scroll)
  })

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
