<template>
  <div class="container flex flex-col gap-16 mt-[100px]">
    <h1>Merch</h1>
    <section>
      <h2>T-shirts</h2>
      <div class="grid grid-cols-3 gap-8">
        <div v-for="tshirt in tshirts" :key="tshirt.id">
          <img class="bg-linear-to-b from-gray-900 to-gray-200" :src="`/images/merch/${tshirt.image}`" :alt="tshirt.name" loading="lazy">
          <h3 class="">{{ tshirt.name }}</h3>
          <span class="block text-gray-500">Not available</span>
        </div>
      </div>
    </section>
    <section>
      <h2>Button badges</h2>
      <div class="grid grid-cols-3 gap-8">
        <div v-for="badge in badges" :key="badge.id">
          <img :src="`/images/merch/${badge.image}`" :alt="badge.name" loading="lazy">
          <h3 class="">{{ badge.name }}</h3>
          <span class="block text-gray-500">Not available</span>
        </div>
      </div>
    </section>
    <section>
      <h2>Stickers</h2>
      <div class="grid grid-cols-3 gap-8">
        <div v-for="sticker in stickers" :key="sticker.id">
          <img :src="`/images/merch/${sticker.image}`" :alt="sticker.name" loading="lazy">
          <h3 class="">{{ sticker.name }}</h3>
          <span class="block text-gray-500">Not available</span>
        </div>
      </div>
    </section>
    <section>
      <h2>Posters</h2>
      <div class="grid grid-cols-3 gap-8">
        <div v-for="poster in posters" :key="poster.id">
          <img :src="`/images/merch/${poster.image}`" :alt="poster.name" loading="lazy">
          <h3 class="">{{ poster.name }}</h3>
          <span class="block text-gray-500">Not available</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
  import { tshirts, badges, stickers, posters } from "~/data/merch";
  import { pageTransitionConfig } from '~/helpers/transitionConfig';

  definePageMeta({
    pageTransition: pageTransitionConfig,
  });

  useSeoMeta({
    title: 'Merch | Skizophonic',
    ogTitle: 'Merch | Skizophonic',
  })

</script>