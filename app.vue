<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator />
  <AppPreloader @done="isPageReady = true" />
  <div v-if="isPageReady">
    <NuxtLayout :key="route => route.fullPath">
      <VueLenis ref="lenisRef" :auto-raf="false" root>
        <!-- Although it shows a warning, need to use Transition component for layout transitions to work on child routes  -->
        <Transition :name="layoutTransitionConfig.name" :mode="layoutTransitionConfig.mode" :css="layoutTransitionConfig.css" :appear="layoutTransitionConfig.appear" @enter="layoutTransitionConfig.onEnter" @leave="layoutTransitionConfig.onLeave">
          <NuxtPage :page-key="route => route.fullPath" />
        </Transition>
      </VueLenis>
    </NuxtLayout>
  </div>
</template>

<script setup>
  import { layoutTransitionConfig } from "./helpers/transitionConfig";
  import { VueLenis, useLenis } from 'lenis/vue';
  import gsap from "gsap";
  import { useTransition } from "#imports";

  const lenisRef = ref()

  const { toggleTransitionComplete } = useTransition();
  const isPageReady = ref(false)

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
