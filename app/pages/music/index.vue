<template>
  <div>
    <PreloaderPage v-if="!isPageLoaded" target=".albums-list" @done="isPageLoaded = true" />
    <h1 class="sr-only">{{ $t('pages.music.title') }}</h1>
    <AlbumsList :play="isPageLoaded" />
  </div>
</template>

<script setup>
  import { pageTransitionConfig } from '~/helpers/transitionConfig';

  definePageMeta({
    // layout: 'full-screen',
    pageTransition: pageTransitionConfig,
    hideFooter: true,
  });

  const { t } = useI18n();
  const isPageLoaded = ref(false);

  useSeoMeta({
    title: `${t('pages.music.meta.title')} | ${t('siteName')}`,
    description: t('pages.music.meta.description'),
    ogTitle: `${t('pages.music.meta.title')} | ${t('siteName')}`,
    ogDescription: t('pages.music.meta.description'),
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
