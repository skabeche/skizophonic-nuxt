<template>
  <footer ref="footerMainRef" class="footer-main bg-black">
    <div class="bg-white mt-40 lg:mt-50 rounded-b-3xl">
      <AppLogo class="relative z-20 fill-black mx-auto lg:mx-0 w-3/4 xl:w-1/2" />
    </div>
    <div class="relative z-20 bg-black h-[250px] [clip-path:inset(0_0_0_0)]">
      <div ref="footerContentRef" class="footer-content fixed left-0 bottom-0 h-[250px] w-full flex flex-col items-center lg:items-start text-center lg:text-left gap-6 py-14 md:py-40 md:px-14 bg-black text-white">
        <SocialLinks class="text-4xl" />
        <div class="copyright flex flex-col lg:flex-row gap-2.5 [&_a]:anim-underline-white">
          <p>&copy; {{ currentYear }} Skizophonic <span class="inline-block ml-2.5">&pi; <NuxtLinkLocale to="/privacy">{{ $t('footer.privacy') }}</NuxtLinkLocale></span></p>
          <p>&infin; {{ $t('footer.siteBy') }} <a href="https://www.danalcaide.com">danalcaide.com</a>
            <DanHummingbird />
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
  const currentYear = new Date().getFullYear();
</script>

<!-- <script setup>
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  gsap.registerPlugin(ScrollTrigger);

  const currentYear = new Date().getFullYear();
  const footerMainRef = useTemplateRef('footerMainRef');
  const footerContentRef = useTemplateRef('footerContentRef');
  let ctx;

  onMounted(() => {
    ctx = gsap.context(() => {
      gsap.from(footerContentRef.value, {
        y: 40,
        ease: 'none',
        scrollTrigger: {
          id: 'footer-trigger',
          trigger: footerMainRef.value,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
          // markers: true,
        }
      })
    }, footerMainRef.value);
  })

  onUnmounted(() => {
    ctx.revert();
  });
</script> -->
