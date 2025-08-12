<template>
  <div>
    <PreloaderLight v-if="!isPageLoaded" target=".albums-list" :text1="$t('pages.music.preloader.text1')" :text2="$t('pages.music.preloader.text2')" @done="isPageLoaded = true" @destroyed="disableScroll" />
    <h1 class="sr-only">{{ $t('pages.music.title') }}</h1>
    <AlbumsList :play="isPageLoaded" />
  </div>
</template>

<script setup>
  import { pageTransitionConfig } from '~/helpers/transitionConfig';
  import { disableScroll, enableScroll } from '~/utils/scrollLock.js';

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
    disableScroll();
  })

  onUnmounted(() => {
    enableScroll();
  })
</script>
