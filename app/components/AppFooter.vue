<template>
  <footer class="bg-black">
    <div class="bg-white mt-40 lg:mt-50 rounded-b-3xl">
      <AppLogo class="relative z-20 fill-black mx-auto lg:mx-0 w-3/4 xl:w-1/2" />
    </div>
    <div class="relative z-20 bg-black h-[250px] [clip-path:inset(0_0_0_0)]">
      <div class="fixed left-0 bottom-0 h-[250px] bg-black w-full flex flex-col items-center lg:items-start text-center lg:text-left gap-6 p-14 md:py-40 text-white">
        <SocialLinks class="text-4xl" />
        <div class="copyright flex flex-col lg:flex-row gap-2 [&_a]:anim-underline-white">
          <p>&copy; {{ currentYear }} Skizophonic</p>
          <p>&infin; {{ $t('footer.siteBy') }} <a href="https://www.danalcaide.com">danalcaide.com</a> <DanHummingbird /></p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
  const currentYear = new Date().getFullYear();
</script>
