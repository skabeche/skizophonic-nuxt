<template>
  <div class="youtube-embed relative w-full aspect-video cursor-pointer" @click="loadVideo">
    <img v-if="!videoLoaded" :src="`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`" class="w-full h-full object-cover" :alt="alt" loading="lazy">
    <div v-if="!videoLoaded" class="absolute inset-0 flex items-center justify-center bg-black/40">
      <svg class="w-30 h-30 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
    <iframe v-if="videoLoaded" class="w-full h-full" :src="`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen />
  </div>
</template>

<script setup>
  defineProps({
    videoId: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: 'YouTube video preview'
    }
  });

  const videoLoaded = ref(false);
  const loadVideo = () => {
    videoLoaded.value = true;
  };
</script>
