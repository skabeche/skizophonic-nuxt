<template>
  <section ref="merchRef" class="container relative flex gap-16 justify-end pt-[60px]">
    <h1 class="sr-only">{{ $t('pages.merch.title') }}</h1>

    <aside ref="filterRef" class="merch-filter-wrapper fixed top-16 left-4 lg:top-20 lg:left-20 md:block" aria-label="Merch filter options" role="complementary">
      <nav aria-label="Merch filter navigation">
        <ul class="merch-filter">
          <li v-for="(item, index) in filterSections" :key="item.key" class="relative">
            <button class="w-max text-xl md:text-[1.8rem] uppercase leading-none" :class="item.key" @click="handleClickFilterOption(index)">{{ item.label }}</button>
          </li>
        </ul>
      </nav>
    </aside>

    <section class="merch-list flex flex-col gap-18 md:gap-28 w-[80%]">
      <article id="tshirts">
        <h2 class="sr-only">{{ $t('pages.merch.sections.tshirts.title') }}</h2>
        <MerchItem :items="tshirts" />
      </article>
      <article id="badges">
        <h2 class="sr-only">{{ $t('pages.merch.sections.buttonBadges.title') }}</h2>
        <MerchItem :items="badges" />
      </article>
      <article id="stickers">
        <h2 class="sr-only">{{ $t('pages.merch.sections.stickers.title') }}</h2>
        <MerchItem :items="stickers" />
      </article>
      <article id="posters">
        <h2 class="sr-only">{{ $t('pages.merch.sections.posters.title') }}</h2>
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
  const filterRef = useTemplateRef('filterRef');
  let ctx;

  onMounted(async () => {
    gsap.set('.merch-filter', { autoAlpha: 0 });
    await document.fonts.ready;

    ctx = gsap.context(() => {
      const filterSplit = SplitText.create(".merch-filter li button", {
        type: 'lines, words, chars',
        mask: 'lines',
        charsClass: 'char'
      });

      gsap.set('.merch-filter', { autoAlpha: 1 });
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

      const createScrollTriggerBySection = () => {
        filterSections.forEach((section, index) => {
          ScrollTrigger.create({
            trigger: `#${section.key}`,
            // iOS Safari has some issues providing correct scroll positions.
            start: 'top top+=25%',
            end: 'bottom top+=25%',
            endTrigger: `#${section.key}`,
            invalidateOnRefresh: true, // Safari needs this.
            // markers: true,
            onEnter: () => setActiveSection(index),
            onEnterBack: () => setActiveSection(index),
          });
        });

        // Safari needs this.
        ScrollTrigger.refresh();
      }

      gsap.utils.toArray('.merch-items .merch-item').forEach((item) => {
        const image = item.querySelector('img');
        const header = item.querySelector('h3');
        const text = item.querySelector('span');

        const headerSplit = SplitText.create(header, {
          type: 'chars',
        });
        const textSplit = SplitText.create(text, {
          type: 'chars',
        });

        // Items disappear as it scrolls out (to top).
        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: item,
              start: 'bottom center',
              end: 'bottom top',
              scrub: 0,
              preventOverlaps: true,
              fastScrollEnd: true,
              // markers: true,
            }
          })
          .fromTo(image,
            {
              borderRadius: 12,
              filter: 'blur(0px) contrast(1) saturate(1)',
            },
            {
              borderRadius: 20,
              filter: 'blur(6px) contrast(2.5) saturate(0)',
            })
          .fromTo([headerSplit.chars, textSplit.chars],
            {
              filter: 'blur(0px)',
              fontWeight: 800,
              textShadow: '0px 0px 0px rgba(0,0,0,0), 0px 0px 0px rgba(0,0,0,0),0px 0px 0px rgba(0,0,0,0), 0px 0px 0px rgba(0,0,0,0)',
            },
            {
              filter: 'blur(6px)',
              fontWeight: 900,
              color: '#000',
              textShadow: '3px 0px 2px rgba(0,0,0,1), -3px 0px 2px rgba(0,0,0,1), 0px 3px 2px rgba(0,0,0,1), 0px -3px 2px rgba(0,0,0,1)',
              stagger: 0.02,
            }, '<');

        // Items appear as it scrolls in (from bottom).
        gsap.set(image, { filter: 'blur(6px) contrast(2.5) saturate(0)' });
        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: item,
              start: 'top bottom-=20%',
              end: 'bottom bottom',
              scrub: 0,
              preventOverlaps: true,
              fastScrollEnd: true,
              // markers: true,
            }
          })
          .fromTo(image,
            {
              borderRadius: 20,
              filter: 'blur(6px) contrast(2.5) saturate(0)',
            },
            {
              borderRadius: 12,
              filter: 'blur(0px) contrast(1) saturate(1)',
            })
          .fromTo([headerSplit.chars, textSplit.chars],
            {
              filter: 'blur(6px)',
            },
            {
              filter: 'blur(0px)',
              stagger: 0.02,
            }, '<');

      });

    }, merchRef.value);
  })

  onUnmounted(() => {
    ctx.revert();
  });

  onBeforeRouteLeave(() => {
    // When leaving the page, we need to reset the filter position
    // because the scroll is locked with "position: fixed "until the page transition is complete.
    filterRef.value.style.top = `${window.scrollY + filterRef.value.offsetTop}px`;
  })

  const setActiveSection = (index) => {
    const nextSection = filterSections[index].key;
    const prevSection = activeFilterSection.value;

    if (prevSection === nextSection) return;

    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const tl = gsap.timeline();
    // Matching: font-size: clamp(2.6rem, 10vw, 12rem);
    const clamp = gsap.utils.clamp(41.6, 192); // min 2.6rem, max 12rem - in px.
    const fontSizeNext = clamp(window.innerWidth * 0.10); // 10vw - result in px.

    if (prevSection) {
      // Shrink previous.
      tl.to(`.${prevSection} .char`, {
        fontSize: isDesktop ? '1.8rem' : '1.25rem',
        color: '#000',
        stagger: 0.03,
        ease: 'power2.inOut',
      })
    }
    // Grow next.
    tl.to(`.${nextSection} .char`, {
      fontSize: `${fontSizeNext}px`,
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
