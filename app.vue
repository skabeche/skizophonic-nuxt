<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator />
  <AppPreloader @done="isPageReady = true" />
  <div v-if="isPageReady">
    <NuxtLayout :key="route => route.fullPath">
      <VueLenis ref="lenisRef" :auto-raf="false" root>
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
