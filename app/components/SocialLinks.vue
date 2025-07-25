<template>
  <ul class="flex gap-4 sm:gap-6">
    <li v-for="social in socials" :key="social.name">
      <AnimationDropShadow>
        <a :href="social.url" :title="social.name">
          <Icon :name="social.icon" />
        </a>
      </AnimationDropShadow>
    </li>
  </ul>
</template>

<script setup>
  import { socials } from '~/data/socials'
</script>
