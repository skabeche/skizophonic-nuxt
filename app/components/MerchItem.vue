<template>
  <div class="merch-items grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-18">
    <div v-for="item in items" :key="item.id" class="merch-item flex flex-col items-center">
      <AnimationReveal class="w-full" @start="isAnimationRevealStarted = true">
        <div class="item relative overflow-hiddenx">
          <div class="mask relative z-30 transition-all duration-400 ease-in-out rounded-xl">
            <NuxtImg class="item-img w-full h-auto object-cover cursor-crosshair rounded-xl will-change-[filter]" :src="`/images/merch/${item.image}`" :alt="`Merch item - ${item.name}`" />
          </div>
          <video ref="videoRef" class="item-bg-video absolute z-20 inset-0 w-full h-full object-cover transition-all duration-500 [clip-path:circle(46%_at_50%_50%)] mix-blend-darken" preload="auto" autoplay muted loop playsinline disableremoteplayback aria-hidden="true">
            <!-- <source src="/videos/spiral2_large.mp4" type="video/mp4" media="(min-width: 1920px)"> -->
            <source src="/videos/spiral2_medium.mp4" type="video/mp4" media="(min-width: 1280px)">
            <source src="/videos/spiral2_small.mp4" type="video/mp4">
          </video>
        </div>
      </AnimationReveal>
      <AnimationReveal>
        <h3 class="mt-3 will-change-[filter, text-shadow]">{{ item.name }}</h3>
      </AnimationReveal>
      <AnimationReveal>
        <span class="block text-gray-500 will-change-[filter, text-shadow]">{{ $t('pages.merch.labels.noStock') }}</span>
      </AnimationReveal>
    </div>
  </div>
</template>

<script setup>
  import gsap from 'gsap';
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  gsap.registerPlugin(ScrollTrigger);

  defineProps({
    items: {
      type: Object,
      required: true
    },
  })

  const isAnimationRevealStarted = ref(false);

  watch(
    isAnimationRevealStarted,
    (newValue) => {
      if (newValue) {
        // Sometimes elements loose their scroll position, so we have to refresh it.
        ScrollTrigger.refresh();
      }
    })
</script>

<style scoped>
  .item:hover .mask {
    transform: scale(1.04);
  }

  .mask + .item-bg-video {
    opacity: 0;
    transform: scale(0.9);
    transition: all .4s ease;
  }

  .mask:hover + .item-bg-video {
    opacity: 1;
    transform: scale(1);
  }
</style>
