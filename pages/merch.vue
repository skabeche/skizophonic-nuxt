<template>
  <section ref="merchRef" class="container relative flex gap-16 justify-end min-h-dvh pt-[60px]">
    <h1 class="sr-only">{{ $t('pages.merch.title') }}</h1>

    <!-- <aside class="absolute top-0 left-0 w-full h-full" aria-label="Merch filter" role="complementary"> -->
    <aside class="fixed container inset-10 lg:inset-20 hidden md:block" aria-label="Merch filter" role="complementary">
      <ul class="merch-filter">
        <li v-for="(item, index) in filterSections" :key="item.key" class="relative">
          <button class="w-max text-[1.8rem] uppercase leading-none" :class="`${item.key}`" @click="handleClickFilterOption(index)">{{ item.label }}</button>
        </li>
      </ul>
    </aside>

    <section class="merch-items flex flex-col gap-18 md:gap-28 w-full md:w-[70%] lg:w-[80%]">
      <article id="tshirts">
        <AnimationReveal>
          <h2 class="md:sr-only">{{ $t('pages.merch.sections.tshirts.title') }}</h2>
        </AnimationReveal>
        <MerchItem :items="tshirts" />
      </article>
      <article id="badges">
        <AnimationReveal>
          <h2 class="md:sr-only">{{ $t('pages.merch.sections.buttonBadges.title') }}</h2>
        </AnimationReveal>
        <MerchItem :items="badges" />
      </article>
      <article id="stickers">
        <AnimationReveal>
          <h2 class="md:sr-only">{{ $t('pages.merch.sections.stickers.title') }}</h2>
        </AnimationReveal>
        <MerchItem :items="stickers" />
      </article>
      <article id="posters">
        <AnimationReveal>
          <h2 class="md:sr-only">{{ $t('pages.merch.sections.posters.title') }}</h2>
        </AnimationReveal>
        <MerchItem :items="posters" />
      </article>
    </section>
  </section>
</template>

<script setup>
  import { tshirts, badges, stickers, posters } from "~/data/merch";
  import { pageTransitionConfig } from '~/helpers/transitionConfig';

  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { SplitText } from "gsap/SplitText";
  import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

  gsap.registerPlugin(SplitText, ScrollTrigger, ScrollToPlugin);

  definePageMeta({
    pageTransition: pageTransitionConfig,
  });

  const { t } = useI18n();

  useSeoMeta({
    title: `${t('pages.merch.meta.title')} | ${t('siteName')}`,
    description: t('pages.merch.meta.description'),
    ogTitle: `${t('pages.merch.meta.title')} | ${t('siteName')}`,
    ogDescription: t('pages.merch.meta.description'),
  })

  const filterSections = [
    { label: t('pages.merch.sections.tshirts.title'), key: 'tshirts' },
    { label: t('pages.merch.sections.buttonBadges.title'), key: 'badges' },
    { label: t('pages.merch.sections.stickers.title'), key: 'stickers' },
    { label: t('pages.merch.sections.posters.title'), key: 'posters' },
  ];
  const activeFilterSection = ref(null);
  const merchRef = useTemplateRef('merchRef');
  let ctx;

  onMounted(() => {
    const mm = gsap.matchMedia();

    ctx = gsap.context(() => {
      // Only desktop.
      mm.add("(min-width: 768px)", () => {
        const filterSplit = SplitText.create(".merch-filter li button", {
          type: 'lines, words, chars',
          mask: 'lines',
          charsClass: 'char'
        });

        gsap.set(filterSplit.lines, { y: 60, });
        gsap
          .timeline(
            {
              onComplete: () => createScrollTriggerBySection(),
            }
          )
          .to(filterSplit.lines, {
            delay: 0.5,
            y: 0,
            duration: 1,
            ease: 'power4',
          })

        // Make aside sticky.
        // ScrollTrigger.create({
        //   trigger: 'aside',
        //   start: 'top-=80 top',
        //   // end: () => `${document.documentElement.scrollHeight - window.innerHeight - 240}px`,
        //   end: 'bottom center',
        //   pin: true,
        //   // markers: true,
        // });
      })


      const createScrollTriggerBySection = () => {
        filterSections.forEach((section, index) => {
          ScrollTrigger.create({
            trigger: `#${section.key}`,
            start: 'top-=150 top',
            // end: 'bottom bottom',
            // markers: true,
            onEnter: () => setActiveSection(index),
            onEnterBack: () => setActiveSection(index),
          });
        });
      }

      // Items dissapear on scroll.
      gsap.utils.toArray('.merch-items .merch-item').forEach((item) => {
        gsap.to(item, {
          autoAlpha: 0,
          filter: 'blur(6px)',
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'bottom top+=40%',
            // end: 'bottom top',
            scrub: true,
            // markers: true,
          }
        });
      });

    }, merchRef.value);
  })

  onUnmounted(() => {
    ctx.revert();
  });

  const setActiveSection = (index) => {
    const nextSection = filterSections[index].key;
    const prevSection = activeFilterSection.value;

    if (prevSection === nextSection) return;

    // Matching: font-size: clamp(1.8rem, 10vw, 12rem);
    const clamp = gsap.utils.clamp(28.8, 192); // min 1.8rem, max 12rem - in px.
    const fontSize = clamp(window.innerWidth * 0.10); // 10vw - result in px.
    const tl = gsap.timeline();

    if (prevSection) {
      // Shrink previous.
      tl.to(`.${prevSection} .char`, {
        fontSize: '1.8rem',
        color: '#000',
        stagger: 0.03,
        ease: 'power2.inOut',
      })
    }
    // Grow next.
    tl.to(`.${nextSection} .char`, {
      fontSize: `${fontSize}px`,
      color: '#cfcfcf',
      duration: 0.4,
      stagger: 0.03,
      ease: 'power2.inOut',
    }, '<');

    activeFilterSection.value = nextSection;
  };

  const handleClickFilterOption = (index) => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: {
        y: `#${filterSections[index].key}`,
        offsetY: 60,
      },
      ease: 'power4.inOut',
    });
  }
</script>
