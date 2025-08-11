<template>
  <div ref="homeTimelineRef">
    <PreloaderFull v-if="!isPageLoaded" target=".timeline" :text1="$t('pages.home.preloader.text1')" :text2="$t('pages.home.preloader.text2')" @done="isPageLoaded = true" />

    <div ref="timelineRef" class="timeline relative z-10 top-0 left-0 w-screen min-h-dvh">
      <h1 class="sr-only">{{ $t('pages.home.title') }}</h1>

      <HeroHypnotic :play="isPageLoaded" class="hero z-40 overflow-hidden">
        <AppLogo class="logo fill-white" />
      </HeroHypnotic>

      <h2 class="sr-only">{{ $t('pages.home.heading') }}</h2>

      <section ref="block1Ref" class="block1 absolute z-10 inset-0 flex flex-col items-center justify-center w-screen h-dvh">
        <div v-for="(video, index) in videos" :key="video.small" class="circles absolute top-0 left-0 w-full h-full" :class="`circle${index}`">
          <video class="w-full h-full object-cover rotate-180 brightness-70 will-change-[clip-path]" aria-hidden="true" preload="auto" autoplay muted loop playsinline disableremoteplayback>
            <source :src="`/videos/${video.large}`" type="video/mp4" media="(min-width: 1280px)">
            <source :src="`/videos/${video.small}`" type="video/mp4">
          </video>
        </div>
        <div class="container text-[clamp(1.5rem,_3.5vw,_3.5rem)] prose-black prose-p:leading-normal text-pretty">
          <p class="relative z-30">{{ $t('pages.home.block1') }}</p>
        </div>
      </section>

      <section ref="block2Ref" class="block2 absolute z-20 inset-0 flex flex-col items-center justify-center w-screen h-dvh">
        <div class="absolute z-10 top-0 left-0 w-full h-full">
          <video ref="showreelRef" class="showreel absolute top-0 left-0 w-full h-full object-cover mask-[url(/images/circles_mask.svg)] mask-type-alpha mask-cover mask-no-repeat mask-center brightness-80 will-change-[mask]" aria-hidden="true" preload="auto" autoplay muted loop playsinline disableremoteplayback>
            <source src="/videos/showreel_skizophonic_1080p.mp4" type="video/mp4" media="(min-width: 1920px)">
            <source src="/videos/showreel_skizophonic_720p.mp4" type="video/mp4" media="(min-width: 1280px)">
            <source src="/videos/showreel_skizophonic_480p.mp4" type="video/mp4" media="(min-width: 640px)">
            <source src="/videos/showreel_skizophonic_360p.mp4" type="video/mp4">
          </video>
        </div>
        <div class="container py-12 lg:py-40 text-[clamp(1.5rem,_3.5vw,_3.5rem)] text-white text-pretty">
          <p class="relative z-20">{{ $t('pages.home.block2') }}</p>
        </div>
      </section>

      <section class="block3 absolute z-30 inset-0 flex flex-col items-center justify-center w-screen h-dvh overflow-hidden">
        <div class="animation-circles absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full origin-center">
          <AnimationCircles class="object-cover w-full h-full" />
        </div>

        <div class="container flex flex-col items-center justify-center text-[clamp(1.5rem,_3.5vw,_3.5rem)] prose-white prose-p:leading-normal text-pretty text-white mix-blend-difference">
          <p class="">{{ $t('pages.home.block3') }}</p>
        </div>

        <div ref="buttonHypnoticRef" class="button-hypnotic absolute top-0 left-0 flex items-center justify-center w-full h-full p-4 sm:px-16">
          <ButtonHypnotic to="music">{{ $t('pages.home.buttonHypnotic') }}</ButtonHypnotic>
        </div>
      </section>

    </div>
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
  const isPageLoaded = ref(false);
  const homeTimelineRef = useTemplateRef('homeTimelineRef');
  const timelineRef = useTemplateRef('timelineRef');
  const block1Ref = useTemplateRef('block1Ref');
  const block2Ref = useTemplateRef('block2Ref');
  const showreelRef = useTemplateRef('showreelRef');
  const buttonHypnoticRef = useTemplateRef('buttonHypnoticRef');
  let block1Split, block2Split, block3Split;
  let ctx;

  useSeoMeta({
    title: `${t('pages.home.meta.title')} | ${t('siteName')}`,
    description: t('pages.home.meta.description'),
    ogTitle: `${t('pages.home.meta.title')} | ${t('siteName')}`,
    ogDescription: t('pages.home.meta.description'),
  })

  onMounted(() => {
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    const ua = navigator.userAgent.toLowerCase();
    const isFirefoxMobile = ua.includes('firefox') && /android|iphone|ipad|ipod|mobile/.test(ua);

    ctx = gsap.context(() => {
      block1Split = SplitText.create(".block1 p", {
        type: 'lines, words',
      });
      block2Split = SplitText.create(".block2 p", {
        type: 'lines, words',
      });
      block3Split = SplitText.create(".block3 p", {
        type: 'lines, words',
      });

      gsap.set('.circle0, .circle1, .circle2, .circle3, .circle4', {
        clipPath: 'circle(0% at 50% 50%)',
      });
      gsap.set(showreelRef.value, {
        autoAlpha: 0,
        maskSize: '100% 100%',
      });
      gsap.set('.animation-circles', {
        scale: isFirefoxMobile ? 4 : 10,
        autoAlpha: 0,
      });

      // Timeline for circles animation in block 3.
      const tlCircles = gsap.timeline({
        paused: true,
        repeat: -1,
        defaults: {
          ease: 'sine.inOut',
          stagger: {
            each: 0.02,
            from: 'end'
          }
        },
      })
      tlCircles.
        fromTo('.animation-circles .circle', {
          yPercent: -2,
          xPercent: 0,
        }, {
          yPercent: -9,
          xPercent: -6,
          duration: 1.8,
        })
        .to('.animation-circles .circle', {
          yPercent: 2,
          xPercent: -6,
          duration: 2,
        })
        .to('.animation-circles .circle', {
          yPercent: 5,
          xPercent: 5,
          duration: 1.8,
        })
        .to('.animation-circles .circle', {
          yPercent: -11,
          xPercent: 11,
          duration: 2,
        })
        .to('.animation-circles .circle', {
          yPercent: -2,
          xPercent: 0,
          duration: 1.9,
        })

      // Main timeline.
      gsap.
        timeline({
          defaults: {
            ease: 'none'
          },
          scrollTrigger: {
            trigger: timelineRef.value,
            start: 'top top',
            end: '+=1300%',
            pin: true,
            scrub: 2,
            preventOverlaps: true,
            fastScrollEnd: true,
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
          autoAlpha: 0,
          filter: isFirefoxMobile ? 'blur(0px)' : 'blur(2px)',
          ease: 'power4.out',
          stagger: 0.01,
        }, '<0.3')
        .to('.circle0', {
          clipPath: 'circle(64% at 50% 50%)',
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
          ease: "power4.inOut",
        }, '<0.3')
        .to(showreelRef.value, {
          autoAlpha: 1,
          maskSize: '30% 30%',
          ease: 'power3.inOut',
        }, '<')
        .to(showreelRef.value, {
          maskSize: '200% 200%',
          ease: 'power4.inOut',
        }, '<0.4')
        .to(timelineRef.value, {
          backgroundColor: '#000000',
          ease: 'power3',
        }, '<0.2')
        .to(showreelRef.value, {
          maskSize: '800% 800%',
          duration: 0.7,
          ease: 'power4.in',
        }, '<0.3')
        .from(block2Split.words, {
          yPercent: 100,
          autoAlpha: 0,
          filter: isFirefoxMobile ? 'blur(0px)' : 'blur(2px)',
          ease: 'power4.out',
          stagger: 0.01,
        }, '<')
        .to(block2Split.lines, {
          yPercent: -200,
          autoAlpha: 0,
          ease: 'power4.in',
          stagger: 0.03,
        }, '<.8')
        .to(block2Ref.value, {
          autoAlpha: 0,
        })
        .to('.animation-circles', {
          scale: isPortrait ? 3 : 1.5,
          autoAlpha: 1,
          translateZ: 0,
          ease: 'power1',
        }, '<0.3')
        .to('.animation-circles .circle', {
          scale: 30,
          translateZ: 0,
          transformOrigin: 'center center',
          ease: 'power4.in',
          stagger: {
            each: 0.1
          },
          onStart: () => {
            tlCircles.pause();
          },
          onReverseComplete: () => {
            gsap.to('.animation-circles .circle', {
              yPercent: -2,
              xPercent: 0,
              duration: 1.8,
              ease: 'sine.inOut',
              stagger: {
                each: 0.02,
                from: 'end'
              },
              onComplete: () => {
                tlCircles.play(0);
              }
            })
          },
        })
        .from(block3Split.words, {
          yPercent: 100,
          autoAlpha: 0,
          filter: isFirefoxMobile ? 'blur(0px)' : 'blur(2px)',
          ease: 'power4.out',
          stagger: 0.01,
        }, '<0.6')
        .to(block3Split.lines, {
          yPercent: -200,
          autoAlpha: 0,
          ease: 'power4.in',
          stagger: 0.03,
        }, '<0.6')
        .from(buttonHypnoticRef.value, {
          autoAlpha: 0,
          scale: 0.8,
          ease: 'back.inOut(3)',
          onComplete: () => {
            tlCircles.play(0);
          },
          onReverseComplete: () => {
            tlCircles.pause();
          },
        }, '<0.3')
        .to('.animation-circles .circle.sound', {
          scale: 0.8,
          translateZ: 0,
          ease: 'power4.out',
        })
        .to(timelineRef.value, {}) // Simulate a scroll pause.

    }, homeTimelineRef.value);
  })

  onUnmounted(() => {
    ctx.revert();
    block1Split.revert();
    block2Split.revert();
    block3Split.revert();
  });
</script>
