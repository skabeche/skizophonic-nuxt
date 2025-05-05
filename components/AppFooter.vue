<template>
  <footer class="bg-black">
    <div class="bg-white mt-40 rounded-b-3xl">
      <AppLogo class="fill-black mx-auto lg:mx-0 w-3/4 xl:w-1/2" />
    </div>
    <div class="relative z-20 bg-black h-[250px] [clip-path:polygon(0_0,_100%_0,_100%_100%,_0%_100%)]">
      <div class="fixed left-0 bottom-0 h-[250px] bg-black w-full flex flex-col items-center lg:items-start text-center lg:text-left gap-6 p-14 md:py-40 text-white">
        <SocialLinks class="text-4xl" />
        <div class="copyright [&_a]:anim-underline-white">
          <p>&copy;{{ currentYear }} Skizophonic &infin; Site by <a href="https://www.danalcaide.com">danalcaide.com</a></p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
  const currentYear = new Date().getFullYear();
</script>
