<template>
  <div class="relative w-full rounded-full">
    <div class="absolute top-0 left-0 w-full h-full rounded-full">
      <video class="w-full h-full object-cover rounded-full" preload="auto" autoplay muted loop playsinline disableremoteplayback>
        <source src="/videos/spiral_large.mp4" type="video/mp4" media="(min-width: 2560px)">
        <source src="/videos/spiral_medium.mp4" type="video/mp4" media="(min-width: 1920px)">
        <source src="/videos/spiral_small.mp4" type="video/mp4">
      </video>
    </div>
    <NuxtLink class="relative z-10 block text-center text-3xl sm:text-8xl border-8 sm:border-20 border-red-500 bg-black text-white rounded-full p-8 sm:p-20 hover:bg-red-500 hover:text-black hover:no-underline before:h-0 mix-blend-difference transition-all duration-700" to="/music">
      <slot />
    </NuxtLink>
  </div>
</template>
