<template>
  <div class="merch-items grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div v-for="item in items" :key="item.id" class="merch-item">
      <AnimationReveal class="w-full">
        <div class="item relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-200">
          <NuxtImg class="item-img relative z-30 w-full h-auto object-cover transition-all duration-500 cursor-crosshair drop-shadow-md/50" :src="`/images/merch/${item.image}`" :alt="`${title} - ${item.name}`" loading="lazy" />
          <video ref="videoRef" class="item-bg-video absolute z-20 top-0 left-0 w-full h-full object-cover transition-all duration-500" preload="auto" autoplay muted loop playsinline disableremoteplayback>
            <source src="/videos/spiral_large.mp4" type="video/mp4" media="(min-width: 2560px)">
            <source src="/videos/spiral_medium.mp4" type="video/mp4" media="(min-width: 1920px)">
            <source src="/videos/spiral_small.mp4" type="video/mp4">
          </video>
        </div>
      </AnimationReveal>
      <AnimationReveal>
        <h3>{{ item.name }}</h3>
      </AnimationReveal>
      <AnimationReveal>
        <span class="block text-gray-500">Not available</span>
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
  .item:hover {

    .item-img,
    .tem-bg-video {
      transform: scale(1.04);
    }
  }

  .item-img + .item-bg-video {
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .item-img:hover + .item-bg-video {
    opacity: 1;
  }
</style>
