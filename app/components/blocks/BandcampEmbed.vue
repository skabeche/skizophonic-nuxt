<template>
  <div class="bandcamp-embed">
    <iframe v-if="playerId" :style="`width: ${width}; height: ${height};`" :src="`https://bandcamp.com/EmbeddedPlayer/album=${playerId}/size=large/bgcol=ffffff/linkcol=333333/artwork=none/transparent=true/`" frameborder="0" seamless />
    <p v-if="!playerId">{{ $t('components.bandcampEmbed.noPlayer') }}</p>
  </div>
</template>

<script setup>
  defineProps({
    playerId: {
      type: Number,
      required: true
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
  });
</script>
