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

  onMounted(() => {
    // Seems to be the only way to disable scroll and pull-to-refresh for this specific page.
    document.body.classList.add('overflow-hidden', 'overscroll-none');
    document.documentElement.classList.add('overflow-hidden', 'overscroll-none');
  })

  onUnmounted(() => {
    // Enable scroll and pull-to-refresh again on other pages.
    document.body.classList.remove('overflow-hidden', 'overscroll-none');
    document.documentElement.classList.remove('overflow-hidden', 'overscroll-none');
  })
</script>
