<template>
  <NuxtLayout>
    <section class="error-page xl:w-1/2 container flex flex-col justify-center gap-8 min-h-dvh md:text-balance">
      <p class="text-sm uppercase">Error {{ error?.statusCode }}</p>
      <div v-if="error?.statusCode === 404" class=" prose-lg prose-h1:m-0 prose-h1:text-5xl md:prose-h1:text-6xl prose-p:leading-normal">
        <h1>Page not found</h1>
        <p class="text-2xl mt-2">Oops! The page you're requesting doesn't exist.</p>
        <p>If you're looking for food... sorry, this is not the right place.</p>
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
        type: 'words',
        mask: 'words'
      })
      gsap.from(contentSplit.words, {
        duration: 1,
        stagger: 0.02,
        y: 60,
        ease: 'power4.inOut',
      })
    })
  })
</script>
