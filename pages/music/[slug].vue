<template>
  <article class="container grid grid-cols-1 xl:grid-cols-2 gap-12 min-h-[calc(100dvh-120px)] mt-[120px]">
    <aside class="relative h-fit">
      <AlbumArtwork :content="content" />
    </aside>
    <div>
      <NuxtLink to="/music" class="inline-block">back to music</NuxtLink>
      <h1>{{ content.title }}</h1>
      <time class="text-2xl" datetime="{{ content.year }}">{{ content.year }}</time>

      <AlbumNav @active-section-id="setActiveSectionId" />
      <div ref="contentRef" class="prose-lg lg:prose-xl prose-h1:m-0 prose-h1:text-7xl prose-h2:text-2xl prose-h2:normal-case prose-ol:list-decimal prose-img:m-0 text-pretty">
        <article id="music" class="active flex flex-col gap-4">
          <div class="player">
            <BandcampEmbed :player-id="content.player.bandcamp.id" :with="content.player.bandcamp.width" :height="content.player.bandcamp.height" />
          </div>
          <div class="videos">
            <div v-for="video in content.videos.youtube" :key="video.id">
              <h2>{{ video.title }}</h2>
              <YoutubeEmbed :video-id="video.id" :alt="video.title" />
            </div>
          </div>
        </article>
        <article id="info">
          <div v-if="content.recordLabel" class="text-xl">Sello discográfico: {{ content.recordLabel }}</div>
          <ContentRenderer :value="post" />
        </article>
        <article id="tracks">
          <ol>
            <li v-for="track in content.tracks" :key="track">{{ track }}</li>
          </ol>
        </article>
      </div>

    </div>
  </article>
</template>

<script setup>
  import pageTransitionConfig from '~/helpers/transitionConfig';
  import { albums } from "~/data/albums";

  import gsap from "gsap";

  definePageMeta({
    key: route => route.fullPath,
    pageTransition: pageTransitionConfig,
  });

  const slug = useRoute().params.slug
  const { data: post } = await useAsyncData(slug, () => {
    return queryCollection('music').path(`/music/${slug}`).first()
  })

  const content = albums.find(album => album.slug === slug)
  const contentRef = ref(null)

  const activeSectionId = ref('#music')

  const setActiveSectionId = (id) => {
    gsap.timeline()
      .to(activeSectionId.value, {
        display: "none",
        duration: 0.5,
        autoAlpha: 0,
        y: 40,
        // filter: "blur(3px)",
        ease: "power4.inOut",
      })
      .to(id, {
        display: "block",
        duration: 0.5,
        autoAlpha: 1,
        y: 0,
        // filter: "blur(0)",
        ease: "power4.inOut",
        onComplete: () => {
          activeSectionId.value = id
        }
      })
  }

  onMounted(() => {
    const contentArticles = contentRef.value.querySelectorAll('article')
    const articlesInactiveId = [...contentArticles].filter((article) => `#${article.id}` !== activeSectionId.value);
    gsap.utils.toArray(articlesInactiveId).forEach((article) => {
      gsap.set(article, {
        display: "none",
        autoAlpha: 0,
        y: 50,
        // filter: "blur(3px)",
      })
    })
  })
</script>
