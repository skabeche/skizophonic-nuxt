<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <VueLenis ref="lenisRef" :auto-raf="false" root>
      <NuxtPage :page-key="route => route.fullPath" />
    </VueLenis>
  </NuxtLayout>
</template>

<script setup>
  import { VueLenis, useLenis } from 'lenis/vue';
  import gsap from "gsap";
  import { useTransition } from "#imports";

  const lenisRef = ref()


  const { toggleTransitionComplete } = useTransition();

  onMounted(() => {
    toggleTransitionComplete(true);
  });

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
