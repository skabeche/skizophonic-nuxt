<template>
  <div class="relative w-screen h-screen">
    <div class="absolute top-0 left-0 w-full h-full">
      <video class="w-full h-full object-cover" src="/public/videos/spiral.mp4" autoplay muted loop playsinline />
    </div>
    <h1 class="relative z-10 flex justify-center items-center w-full h-full text-9xl bg-black text-white mix-blend-differencex">
      <slot />
    </h1>
  </div>
</template>
