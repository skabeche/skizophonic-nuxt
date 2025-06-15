<template>
  <NuxtLayout>
    <section class="error-page xl:w-1/2 container flex flex-col justify-center gap-8 min-h-dvh md:text-balance">
      <p class="text-sm uppercase">Error {{ error?.statusCode }}</p>
      <div v-if="error?.statusCode === 404" class="flex flex-col gap-2">
        <h1 class="text-5xl md:text-6xl">Page not found</h1>
        <p class="text-2xl">Oops! The page you're requesting doesn't exist.</p>
        <p>If you're looking for food… sorry, this is not the right place.</p>
        <p>We are not even sure what we are doing here, but we can offer you some nice music to fill your ears and feed your intellect.</p>
        <p>Today, save your weekend. Tomorrow, save your soul.</p>
      </div>
      <div v-else>
        <p class="text-2xl">{{ error?.message }}</p>
      </div>
      <NuxtLinkLocale to="/" class="w-fit">Go back home</NuxtLinkLocale>
    </section>
  </NuxtLayout>
</template>

<script setup>
  import gsap from "gsap";
  import { SplitText } from "gsap/SplitText";

  gsap.registerPlugin(SplitText);

  const error = useError();

  onMounted(() => {
    const contents = document.querySelectorAll('.error-page');
    contents.forEach(content => {
      const contentSplit = SplitText.create(content, {
        type: 'lines, words',
        mask: 'words'
      })
      gsap.from(contentSplit.words, {
        duration: 1.2,
        stagger: 0.02,
        y: 60,
        ease: 'power4.inOut',
      })
    })
  })
</script>
