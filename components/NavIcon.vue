<template>
  <div class="flex flex-col gap-2">
    <span :class="`${commonStyle} ${isOpen ? 'rotate-45 translate-y-3.5' : ' -translate-y-px'}`" />
    <span :class="`${commonStyle} ${isOpen ? 'opacity-0 translate-x-6' : ' opacity-100'}`" />
    <span :class="`${commonStyle} ${isOpen ? '-rotate-45 -translate-y-2.5' : ' translate-y-px'}`" />
  </div>
</template>

<script setup>
  defineProps({
    isOpen: {
      type: Boolean,
      default: false
    }
  })

  const commonStyle = 'line relative block h-1 w-12 bg-white transition-all duration-300 ease-out'
</script>
