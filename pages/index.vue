<template>
  <div>
    <div ref="blockTimelineRef" class="block-timeline relative top-0 left-0 w-screen min-h-dvh">
      <HeroHypnotic class="hero z-50 overflow-hidden">
        <AppLogo class="logo fill-white" />
      </HeroHypnotic>

      <section ref="block1Ref" class="block1 absolute inset-0 flex flex-col justify-center w-screen min-h-screen py-4 lg:py-40 text-[clamp(1.5rem,_3.5vw,_3.5rem)] text-black bg-white prose prose-p:leading-normal text-pretty">
        <div class="container">
          <p>{{ $t('pages.home.block1') }}</p>
        </div>
      </section>

      <div class="absolute z-10 top-0 left-0 w-screen min-h-dvh">
        <video ref="videoRef" src="/videos/woman_dancing.mp4" class="absolute top-0 left-0 w-full h-full object-cover mask-[url(/images/circles_mask.svg)] mask-type-alpha mask-size-[40%_40%] mask-no-repeat mask-center" preload="auto" autoplay muted loop playsinline disableremoteplayback />
      </div>

      <section ref="block2Ref" class="block2 absolute top-0 left-0 flex flex-col justify-center w-screen min-h-dvh">
        <div class="container py-12 lg:py-40 text-[clamp(1.5rem,_3.5vw,_3.5rem)] prose-black prose-p:leading-normal text-pretty ">
          <p class="relative z-20 mix-blend-color-dodge">{{ $t('pages.home.block2') }}</p>
        </div>
      </section>
    </div>

    <section ref="block3Ref" class="block3 flex flex-col justify-evenly gap-18 w-screen min-h-screen py-4 sm:py-12">
      <div class="container text-[clamp(1.5rem,_3.5vw,_3.5rem)] prose-black prose-p:leading-normal text-pretty">
        <p>{{ $t('pages.home.block3') }}</p>
      </div>
      <div class="py-4 sm:px-16">
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

  useSeoMeta({
    title: 'Home | Skizophonic',
    ogTitle: 'Home | Skizophonic',
  })

  const blockTimelineRef = useTemplateRef('blockTimelineRef');
  // const block1 = useTemplateRef('block1Ref');
  const block2 = useTemplateRef('block2Ref');
  const block3 = useTemplateRef('block3Ref');
  const video = useTemplateRef('videoRef');
  let ctx;

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

    ctx = gsap.context(() => {
      // Hero and blocks timeline.
      gsap
        .timeline({
          defaults: { duration: 2, ease: 'none' },
          scrollTrigger: {
            trigger: blockTimelineRef.value,
            start: 'top top',
            end: '+=400%',
            pin: true,
            scrub: 2,
            // markers: true,
          }
        })
        .fromTo('.hero .bg-wrapper', {
          clipPath: 'circle(100% at 50% 50%)',
        }, {
          duration: 8,
          clipPath: 'circle(0% at 50% 50%)',
        })
        .to('.hero .logo', {
          duration: 12,
          scale: 20,
          rotate: 45,
        })
        .to('.hero', {
          autoAlpha: 0,
          x: -150,
        })
        .from(block1Split.words, {
          duration: 8,
          y: 200,
          ease: 'power1',
          stagger: 0.1,
        })
        .fromTo(video.value, {
          autoAlpha: 0,
          filter: 'brightness(0%)',
        }, {
          autoAlpha: 1,
          maskSize: '30% 30%',
          ease: 'power1.inOut',
        }, '+=400%')
        .to(video.value, {
          duration: 4,
          filter: 'brightness(100%)',
          maskSize: '200% 200%',
          ease: 'power1.in',
        }, '+=0.3')
        .to(block2.value, {
          backgroundColor: 'black',
          color: 'white',
        }, '<0.3')
        .to(video.value, {
          duration: 5,
          maskSize: '900% 900%',
        })

      // Block 1 animations.
      gsap.to(block1Split.lines, {
        duration: .7,
        autoAlpha: 0,
        stagger: 0.02,
        y: -200,
        ease: 'power4.in',
        scrollTrigger: {
          trigger: video.value,
          start: 'bottom top-=200%',
          end: '+=100%',
          // markers: true,
          toggleActions: 'play none none reverse',
        }
      })

      // Block 2 animations.
      gsap.from(block2Split.words, {
        stagger: 0.02,
        y: 200,
        scrollTrigger: {
          trigger: video.value,
          start: 'bottom top-=260%',
          end: '+=100%',
          // markers: true,
          toggleActions: 'play none none reverse',
        },
      })

      // Block 3 animations.
      gsap.from(block3Split.words, {
        stagger: 0.02,
        y: 200,
        scrollTrigger: {
          trigger: block3.value,
          start: 'top center',
          end: '+=100%',
          // markers: true,
          toggleActions: 'play none none reverse',
        }
      })
    }); // <- Scope!

  })

  onUnmounted(() => {
    ctx.revert();
  });
</script>
