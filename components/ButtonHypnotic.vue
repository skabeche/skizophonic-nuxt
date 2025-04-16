<template>
  <div class="relative rounded-full">
    <div class="absolute top-0 left-0 w-full h-full rounded-full">
      <video class="w-full h-full object-cover rounded-full" src="/public/videos/spiral.mp4" autoplay muted loop playsinline disableremoteplayback />
    </div>
    <a class="relative z-10 inline-block w-full text-center text-8xl border-20 border-red-500 bg-black text-white rounded-full p-20 hover:bg-red-500 hover:text-black mix-blend-difference transition-all duration-700" href="/music">
      <slot />
    </a>
  </div>
</template>
