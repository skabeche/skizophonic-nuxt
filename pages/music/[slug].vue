<template>
  <div class="container grid grid-cols-1 sm:grid-cols-2 gap-8">
    <div>
      <img :src="content.cover" :alt="content.title" loading="lazy">
    </div>
    <div class="lg:prose-xl">
      <h1 class="mix-blend-normal">{{ content.title }}</h1>
      <iframe v-if="content.player.spotify" style="border-radius:12px" :src="`${content.player.spotify}?utm_source=generator&theme=0`" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
      <ContentRenderer :value="post" />
    </div>
  </div>
</template>

<script setup>
  import pageTransitionConfig from '~/helpers/transitionConfig';
  import { albums } from "~/data/albums";

  definePageMeta({
    key: route => route.fullPath,
    pageTransition: pageTransitionConfig,
  });

  const slug = useRoute().params.slug
  const { data: post } = await useAsyncData(slug, () => {
    return queryCollection('music').path(`/music/${slug}`).first()
  })

  const content = albums.find(album => album.slug === slug)
  console.log(content.title)

</script>
