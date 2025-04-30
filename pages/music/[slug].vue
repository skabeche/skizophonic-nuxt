<template>
  <article class="container grid grid-cols-1 xl:grid-cols-2 gap-16 min-h-[calc(100dvh-100px)] mt-[100px]">
    <aside>
      <AlbumArtwork :content="content" />
    </aside>
    <section>
      <header>
        <AnimationReveal :delay="0.2">
          <NuxtLink to="/music" class="inline-block">back to music</NuxtLink>
        </AnimationReveal>
        <AnimationReveal :delay="0.4">
          <h1>{{ content.title }}</h1>
        </AnimationReveal>
        <AnimationReveal :delay="0.5">
          <time class="text-2xl" datetime="{{ content.year }}">{{ content.year }}</time>
        </AnimationReveal>
      </header>
      <AnimationReveal :delay="0.3">
        <AlbumNav class="album-nav" @active-section-id="setCurrentActiveSectionId" />
      </AnimationReveal>
      <div ref="contentRef" class="content prose-lg lg:prose-xl prose-h1:m-0 prose-h1:text-7xl prose-h2:text-2xl prose-h2:normal-case prose-ol:list-decimal prose-img:m-0 text-pretty">
        <article id="music" class="active flex flex-col gap-4">
          <AnimationReveal class="w-full" :delay="0.5">
            <div class="player">
              <BandcampEmbed :player-id="content.player.bandcamp.id" :with="content.player.bandcamp.width" :height="content.player.bandcamp.height" />
            </div>
          </AnimationReveal>
          <AnimationReveal class="w-full" :delay="0.6">
            <div class="videos">
              <div v-for="video in content.videos.youtube" :key="video.id">
                <h2>{{ video.title }}</h2>
                <YoutubeEmbed :video-id="video.id" :alt="video.title" />
              </div>
            </div>
          </AnimationReveal>
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
    </section>
  </article>
</template>

<script setup>
  // import pageTransitionConfig from '~/helpers/transitionConfig';
  import { albums } from "~/data/albums";

  import gsap from "gsap";

  definePageMeta({
    // pageTransition: pageTransitionConfig,
    pageTransition: false,
  });

  const slug = useRoute().params.slug
  const { data: post } = await useAsyncData(slug, () => {
    return queryCollection('music').path(`/music/${slug}`).first()
  })

  const content = albums.find(album => album.slug === slug)
  const contentRef = ref(null)
  const currentActiveSectionId = ref('#music')

  useSeoMeta({
    title: `${content.title} | Skizophonic`,
    ogTitle: `${content.title} | Skizophonic`,
    ogImage: content.images.cover,
    ogImageAlt: `${content.title} - cover`,
    ogImageWidth: 1000,
    ogImageHeight: 900,
  })

  onMounted(() => {
    const contentArticles = contentRef.value.querySelectorAll('.content article')
    const articlesInactiveId = [...contentArticles].filter((article) => `#${article.id}` !== currentActiveSectionId.value);
    gsap.utils.toArray(articlesInactiveId).forEach((article) => {
      gsap.set(article, {
        display: "none",
        autoAlpha: 0,
        y: 40,
      })
    })
  })

  const setCurrentActiveSectionId = (nextId) => {
    gsap
      .timeline()
      .to(currentActiveSectionId.value, {
        display: "none",
        duration: 0.5,
        autoAlpha: 0,
        y: 40,
        ease: "power4.inOut",
      })
      .to(nextId, {
        display: "block",
        duration: 0.5,
        autoAlpha: 1,
        y: 0,
        ease: "power4.inOut",
        onComplete: () => {
          currentActiveSectionId.value = nextId
        }
      })
  }
</script>
