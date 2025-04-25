<template>
  <button class="cursor-pointer flex gap-1 group">
    [
    <span class="inline-block">{{ preffix }}</span>
    <span class="hidden opacity-0 transition-all duration-300 ease-in-out [transition-behavior:_allow-discrete] group-hover:inline-block group-hover:opacity-100">
      <slot />
    </span>
    ]
  </button>
</template>

<script setup>
  defineProps({
    preffix: {
      type: String,
      default: '+'
    }
  })
</script>
