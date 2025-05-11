<template>
  <div>
    <AlbumsList />
  </div>
</template>

<script setup>
  import { pageTransitionConfig } from '~/helpers/transitionConfig';

  definePageMeta({
    // layout: 'full-screen',
    pageTransition: pageTransitionConfig,
    hideFooter: true,
  });

  useSeoMeta({
    title: 'Music | Skizophonic',
    ogTitle: 'Music | Skizophonic',
  })
</script>
