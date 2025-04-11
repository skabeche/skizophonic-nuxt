<template>
  <section>
    <div class="grid lg:grid-cols-2 gap-18">
      <div v-for="album in albums" :key="album.name" class="relative border-20">
        <h2 class="text-white bg-black text-5xl">{{ album.title }}</h2>
        <a :href="`/music/${album.slug}`">
          <img :src="album.cover" :alt="album.title">
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { albums } from "~/data/albums";
</script>
