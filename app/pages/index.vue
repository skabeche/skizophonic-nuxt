<template>
  <div ref="homeTimelineRef">
    <h1 class="sr-only">{{ $t('pages.home.title') }}</h1>

    <div ref="timelineRef" class="timeline relative top-0 left-0 w-screen min-h-dvh">

      <HeroHypnotic class="hero z-40 overflow-hidden">
        <AppLogo class="logo fill-white" />
      </HeroHypnotic>

      <h2 class="sr-only">{{ $t('pages.home.heading') }}</h2>

      <div v-for="(video, index) in videos" :key="index" class="circles absolute top-0 left-0 w-full h-full will" :class="`circle${index}`">
        <video class="w-full h-full object-cover rotate-180" preload="auto" autoplay muted loop playsinline disableremoteplayback>
          <source :src="`/videos/${video.large}`" type="video/mp4" media="(min-width: 1280px)">
          <source :src="`/videos/${video.small}`" type="video/mp4">
        </video>
      </div>

      <section ref="block1Ref" class="block1 absolute top-0 left-0 flex flex-col justify-center w-screen min-h-screen py-4 lg:py-40">
        <div class="container text-[clamp(1.5rem,_3.5vw,_3.5rem)] prose-black prose-p:leading-normal text-pretty">
          <p class="relative z-30">{{ $t('pages.home.block1') }}</p>
        </div>
      </section>

      <div class="absolute z-10 top-0 left-0 w-screen min-h-dvh">
        <video ref="showreelRef" class="video absolute top-0 left-0 w-full h-full object-cover mask-[url(/images/circles_mask.svg)] mask-type-alpha mask-cover mask-no-repeat mask-center" preload="auto" autoplay muted loop playsinline disableremoteplayback>
          <source src="/videos/showreel_skizophonic_1080p.mp4" type="video/mp4" media="(min-width: 1920px)">
          <source src="/videos/showreel_skizophonic_720p.mp4" type="video/mp4" media="(min-width: 1280px)">
          <source src="/videos/showreel_skizophonic_480p.mp4" type="video/mp4" media="(min-width: 640px)">
          <source src="/videos/showreel_skizophonic_360p.mp4" type="video/mp4">
        </video>
      </div>

      <section ref="block2Ref" class="block2 absolute z-20 top-0 left-0 flex flex-col justify-center w-screen min-h-dvh">
        <div class="container py-12 lg:py-40 text-[clamp(1.5rem,_3.5vw,_3.5rem)] text-white text-pretty">
          <p class="relative z-20">{{ $t('pages.home.block2') }}</p>
        </div>
      </section>
    </div>

    <section ref="block3Ref" class="block3 flex flex-col justify-evenly gap-18 w-screen sm:min-h-screen py-12">
      <div class="container text-[clamp(1.5rem,_3.5vw,_3.5rem)] prose-black prose-p:leading-normal text-pretty">
        <p>{{ $t('pages.home.block3') }}</p>
      </div>
      <div class="p-4 sm:px-16">
        <ButtonHypnotic to="music">{{ $t('pages.home.buttonHypnotic') }}</ButtonHypnotic>
      </div>
    </section>
  </div>
</template>

<script setup>
  import { pageTransitionConfig } from '~/helpers/transitionConfig';

  import gsap from "gsap";
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { SplitText } from "gsap/SplitText";

  gsap.registerPlugin(ScrollTrigger, SplitText);

  definePageMeta({
    pageTransition: pageTransitionConfig,
  });

  const videos = {
    0: {
      'small': 'woman_dancing_480p.mp4',
      'large': 'woman_dancing_720p.mp4',
    },
    1: {
      'small': 'vhs_480p.mp4',
      'large': 'vhs_720p.mp4',
    },
    2: {
      'small': 'subway_480p.mp4',
      'large': 'subway_720p.mp4',
    },
    3: {
      'small': 'woman_finger_640p.mp4',
      'large': 'woman_finger_720p.mp4',
    },
    4: {
      'small': 'factories_480p.mp4',
      'large': 'factories_720p.mp4',
    },
  }
  const { t } = useI18n();
  const homeTimelineRef = useTemplateRef('homeTimelineRef');
  const timelineRef = useTemplateRef('timelineRef');
  const block1Ref = useTemplateRef('block1Ref');
  const block3Ref = useTemplateRef('block3Ref');
  const showreelRef = useTemplateRef('showreelRef');
  let ctx;

  useSeoMeta({
    title: `${t('pages.home.meta.title')} | ${t('siteName')}`,
    description: t('pages.home.meta.description'),
    ogTitle: `${t('pages.home.meta.title')} | ${t('siteName')}`,
    ogDescription: t('pages.home.meta.description'),
  })

  onMounted(() => {
    const block1Split = SplitText.create(".block1 p", {
      type: 'lines, words',
      mask: 'words'
    });
    const block2Split = SplitText.create(".block2 p", {
      type: 'lines, words',
      mask: 'lines'
    });
    const block3Split = SplitText.create(".block3 p", {
      type: 'lines, words',
      mask: 'lines'
    });

    gsap.set('.circle0, .circle1, .circle2, .circle3, .circle4', {
      clipPath: 'circle(0% at 50% 50%)',
      filter: 'brightness(60%)',
    });

    ctx = gsap.context(() => {
      gsap.
        timeline({
          defaults: {
            ease: 'none'
          },
          scrollTrigger: {
            trigger: timelineRef.value,
            start: 'top top',
            end: '+=900%',
            pin: true,
            scrub: 2,
            // markers: true,
          }
        })
        .fromTo('.hero .bg-wrapper', {
          clipPath: 'circle(100% at 50% 50%)',
        }, {
          clipPath: 'circle(0% at 50% 50%)',
        })
        .to('.hero .logo', {
          scale: 20,
          rotate: 45,
          ease: 'power1.in',
        })
        .to('.hero', {
          autoAlpha: 0,
          ease: 'power4.in',
        }, '<-=1%')
        .from(block1Split.words, {
          yPercent: 100,
          ease: 'power4.inOut',
          stagger: 0.01,
        }, '<0.2')
        .to('.circle0', {
          clipPath: 'circle(62% at 50% 50%)',
          ease: "back.out(1)",
        }, '<0.6')
        .to(block1Ref.value, {
          color: '#ffffff',
          ease: "power1",
        }, '<')
        .to('.circle1', {
          clipPath: 'circle(47% at 50% 50%)',
          ease: "back.out(1.2)",
        }, '<0.2')
        .to('.circle2', {
          clipPath: 'circle(33% at 50% 50%)',
          ease: "back.out(1)",
        }, '<0.1')
        .to('.circle3', {
          clipPath: 'circle(25% at 50% 50%)',
          ease: "power4",
        }, '<0.2')
        .to('.circle4', {
          clipPath: 'circle(11% at 50% 50%)',
          ease: "power4",
        }, '<0.1')
        .to(block1Split.lines, {
          autoAlpha: 0,
          stagger: 0.02,
          yPercent: -200,
          ease: 'power4.in',
        }, '<')
        .to('.circle0, .circle1, .circle2, .circle3, .circle4', {
          clipPath: 'circle(0% at 50% 50%)',
          stagger: 0.01,
          ease: "power4.inOut",
        }, '<0.3')
        .fromTo(showreelRef.value, {
          autoAlpha: 0,
          maskSize: '900% 900%',
          filter: 'brightness(0%)',
        }, {
          autoAlpha: 1,
          maskSize: '30% 30%',
          ease: 'power4.inOut',
        }, '<')
        .to(showreelRef.value, {
          filter: 'brightness(80%)',
          maskSize: '200% 200%',
          ease: 'power4.inOut',
        }, '<0.4')
        .to(timelineRef.value, {
          backgroundColor: '#000000',
          ease: 'power1',
        }, '<0.2')
        .to(showreelRef.value, {
          maskSize: '900% 900%',
          duration: 0.7,
          ease: 'power4.in',
        }, '<0.3')
        .from(block2Split.words, {
          yPercent: 100,
          ease: 'power4',
          stagger: 0.01,
        }, '<')
        .to(timelineRef.value, {}) // Simulate a scroll pause.

      // Block 3 animations.
      gsap.from(block3Split.words, {
        stagger: 0.02,
        yPercent: 100,
        scrollTrigger: {
          trigger: block3Ref.value,
          start: 'top bottom',
          end: '+=100%',
          toggleActions: 'play none none reverse',
          // markers: true,
        }
      })
    }, homeTimelineRef.value);
  })

  onUnmounted(() => {
    ctx.revert();
    block1Split.revert();
    block2Split.revert();
    block3Split.revert();
  });
</script>
