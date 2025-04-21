<template>
  <article class="container grid grid-cols-1 xl:grid-cols-2 gap-12 min-h-screen mt-[120px]">
    <aside class="relative h-fit">
      <div ref="caseRef" class="case relative z-10 w-[80%] [perspective:1000px] group cursor-pointer">
        <div class="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] ">
          <div class="cover relative w-full top-0 left-0 [backface-visibility:hidden] overflow-hidden will-change-transform [box-shadow:_5px_3px_15px_-3px_rgba(0,_0,_0,_.7)]">
            <img class="object-cover" :src="`/albums/${content.slug}/${content.images.cover}`" :alt="`${content.title} - cover`" loading="lazy">
          </div>
          <div class="back absolute w-full top-0 left-0 [transform:rotateY(180deg)] [backface-visibility:hidden] will-change-transform [box-shadow:_5px_3px_15px_-3px_rgba(0,_0,_0,_.7)]">
            <img class="object-cover" :src="`/albums/${content.slug}/${content.images.back}`" :alt="`${content.title}`">
          </div>
        </div>
      </div>
      <div ref="galletaRef" class="galleta absolute top-1/2 -translate-y-1/2 right-0 w-[65%] drop-shadow-md/50 will-change-transform">
        <img class="[clip-path:_circle(50%_at_50%_50%)] cursor-pointer" :src="`/albums/${content.slug}/${content.images.galleta}`" :alt="`${content.title} - disc`" loading="lazy" @mouseenter="handleMouseEnterGalleta" @mouseleave="handleMouseLeaveGalleta">
      </div>
    </aside>
    <div>
      <NuxtLink to="/music" class="inline-block">back to music</NuxtLink>
      <h1>{{ content.title }}</h1>
      <span class="text-2xl">{{ content.year }}</span>
      <nav class="album-navigation my-4 text-2xl up [&_a]:hover:text-black [&_a]:hover:no-underline" aria-label="Album navigation">
        <ul class="flex gap-4">
          <li><a href="#">Music</a></li>
          <li><a href="#">Info</a></li>
          <li><a href="#">Tracks</a></li>
        </ul>
      </nav>
      <section class="prose-lg lg:prose-xl prose-h1:m-0 prose-h1:text-7xl">
        <iframe v-if="content.player.bandcamp.id" :style="`width: ${content.player.bandcamp.width}; height: ${content.player.bandcamp.height};`" :src="`https://bandcamp.com/EmbeddedPlayer/album=${content.player.bandcamp.id}/size=large/bgcol=ffffff/linkcol=333333/artwork=none/transparent=true/`" seamless><a href="https://skizophonic.bandcamp.com/album/living-room">{{ content.title }} by Skizophonic</a></iframe>
        <!-- <iframe v-if="content.player.spotify" style="border-radius:12px" :src="`${content.player.spotify}?utm_source=generator&theme=0`" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" /> -->
        <ContentRenderer :value="post" />
      </section>
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
  const galletaRef = ref(null)
  const caseRef = ref(null)

  const handleMouseEnterGalleta = () => {
    gsap.
      timeline()
      .to(galletaRef.value, {
        duration: 1,
        scale: 1.3,
        rotate: 0,
        xPercent: -14,
        ease: 'power4.out',
      })
      .to(caseRef.value, {
        duration: 0.6,
        opacity: 0.6,
        zIndex: -1,
        x: -100,
        rotation: -10,
        scale: 0.8,
        filter: "blur(5px)",
        ease: "power4.out",
      }, '<')
  }

  const handleMouseLeaveGalleta = () => {
    gsap.
      timeline()
      .to(galletaRef.value, {
        duration: 1,
        scale: 1,
        rotate: 30,
        xPercent: 0,
        ease: 'power4.out',
      }).to(caseRef.value, {
        duration: 0.6,
        opacity: 1,
        zIndex: 10,
        x: 0,
        rotation: 0,
        scale: 1,
        filter: "blur(0px)",
        ease: "power4.out"
      }, '<')
  }

  onMounted(() => {
    gsap.fromTo(galletaRef.value, {
      x: -200,
      rotate: -90,
    }, {
      duration: 1,
      x: 0,
      rotate: 30,
      ease: 'power4.out',
    })
  })
</script>
