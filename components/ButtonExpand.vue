<template>
  <button class="cursor-pointer flex group">
    [
    <span class="inline-block mx-1">{{ preffix }}</span>
    <span class="w-0 group-hover:w-full transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap">
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
