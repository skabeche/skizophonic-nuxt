<template>
  <nav class="lang-navigation" aria-label="Language navigation">
    <ul class="relative flex gap-4 p-12 text-xl lg:text-2xl uppercase">
      <li v-for="(locale) in $i18n.availableLocales" :key="`locale-${locale}`">
        <NuxtLink :to="switchLocalePath(locale)" :lang="locale">
          {{ $t(`languages.${locale}`) }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
  const switchLocalePath = useSwitchLocalePath()
</script>
