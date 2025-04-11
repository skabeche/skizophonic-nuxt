<template>
  <footer>
    <div class="bg-white text-black mt-40">
      <AppLogo class="fill-black w-1/2" />
    </div>
    <div class="p-14 bg-black text-white">
      <SocialLinks class="text-4xl" />
      <p>&copy;{{ currentYear }} Skizophonic &infin; Site by <a href="https://www.danalcaide.com">danalcaide.com</a></p>
    </div>
  </footer>
</template>

<script setup>
  const currentYear = new Date().getFullYear();
</script>
