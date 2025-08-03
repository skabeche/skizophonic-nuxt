<template>
  <div class="merch-items grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-18">
    <div v-for="item in items" :key="item.id" class="merch-item flex flex-col items-center">
      <AnimationReveal class="w-full" :refresh-scroll-trigger="true">
        <div class="item relative overflow-hidden">
          <NuxtImg class="item-img relative z-30 w-full h-auto object-cover transition-all duration-400 ease-in-out cursor-crosshair drop-shadow-md/70 will-change-[filter]" :src="`/images/merch/${item.image}`" :alt="`Merch item - ${item.name}`" />
          <video ref="videoRef" class="item-bg-video absolute z-20 inset-0 w-full h-full object-cover transition-all duration-500 [clip-path:circle(46%_at_50%_50%)] mix-blend-darken" preload="auto" autoplay muted loop playsinline disableremoteplayback aria-hidden="true">
            <!-- <source src="/videos/spiral2_large.mp4" type="video/mp4" media="(min-width: 1920px)"> -->
            <source src="/videos/spiral2_medium.mp4" type="video/mp4" media="(min-width: 1280px)">
            <source src="/videos/spiral2_small.mp4" type="video/mp4">
          </video>
        </div>
      </AnimationReveal>
      <AnimationReveal>
        <h3 class="will-change-[filter]">{{ item.name }}</h3>
      </AnimationReveal>
      <AnimationReveal>
        <span class="block text-gray-500 will-change-[filter]">{{ $t('pages.merch.labels.noStock') }}</span>
      </AnimationReveal>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    items: {
      type: Object,
      required: true
    },
  })
</script>

<style scoped>
  .item:hover .item-img {
    transform: scale(1.04);
  }

  .item-img + .item-bg-video {
    opacity: 0;
    transform: scale(0.9);
    transition: all .4s ease;
  }

  .item-img:hover + .item-bg-video {
    opacity: 1;
    transform: scale(1);
  }
</style>
