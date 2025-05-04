<template>
  <section class="merch-element">
    <AnimationReveal :delay="0.3">
      <h2>{{ title }}</h2>
    </AnimationReveal>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div v-for="element in content" :key="element.id" class="merch-element-item">
        <AnimationReveal class="w-full" :delay="0.2">
          <NuxtImg class="w-full h-auto object-cover bg-linear-to-b from-gray-900 to-gray-200" :src="`/images/merch/${element.image}`" :alt="`${title} - ${element.name}`" loading="lazy" />
        </AnimationReveal>
        <AnimationReveal :delay="0.2">
          <h3 class="">{{ element.name }}</h3>
        </AnimationReveal>
        <AnimationReveal :delay="0.3">
          <span class="block text-gray-500">Not available</span>
        </AnimationReveal>
      </div>
    </div>
  </section>
</template>

<script setup>
  defineProps({
    title: {
      type: String,
      default: ''
    },
    content: {
      type: Object,
      required: true
    },
  })
</script>
