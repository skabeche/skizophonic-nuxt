<template>
  <footer class="bg-black">
    <div class="bg-white text-black mt-40 rounded-b-3xl">
      <AppLogo class="fill-black w-3/4 xl:w-1/2" />
    </div>
    <div class="flex flex-col gap-6 p-14 md:py-24 text-white">
      <SocialLinks class="text-4xl" />
      <p>&copy;{{ currentYear }} Skizophonic &infin; Site by <a href="https://www.danalcaide.com">danalcaide.com</a></p>
    </div>
  </footer>
</template>

<script setup>
  const currentYear = new Date().getFullYear();
</script>
