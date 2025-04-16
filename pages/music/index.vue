<template>
  <AlbumsList />
</template>

<script setup>
  import pageTransitionConfig from '~/helpers/transitionConfig';

  definePageMeta({
    layout: 'full-screen',
    pageTransition: pageTransitionConfig,
  });
</script>
