<template>
  <NuxtLink :to="localePath(to)">
    <slot />
  </NuxtLink>
</template>

<script setup>
  defineProps({
    to: {
      type: String,
      required: true
    }
  })

  const localePath = useLocalePath()
</script>
