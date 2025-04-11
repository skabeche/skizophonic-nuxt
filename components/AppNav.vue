<template>
  <div class="fixed top-0 right-0 z-50 m-8 mix-blend-difference">
    <button class="focus:outline-none focus:ring-0 cursor-pointer" aria-label="Open menu" @click="handleClick">
      <NavIcon :is-open="isOpen" />
    </button>
  </div>

  <nav class="fixed flex flex-col justify-center items-center w-full h-full top-0 right-0 z-40 bg-black text-white text-7xl" :class="isOpen ? 'block opacity-100' : 'hidden opacity-0'" aria-label="Main navigation">
    <ul class="relative z-50 flex flex-col gap-4 p-12 uppercase">
      <li><a href="/">Home</a></li>
      <li><a href="/music">Music</a></li>
    </ul>
    <SocialLinks class="text-5xl" />
  </nav>
</template>

<script setup>
  const isOpen = ref(false)

  const handleClick = () => {
    isOpen.value = !isOpen.value
  }
</script>
