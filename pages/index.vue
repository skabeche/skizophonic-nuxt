<template>
  <div>
    <HeroHypnotic class="hero z-50 overflow-hidden">
      <AppLogo class="fill-white" />
    </HeroHypnotic>

    <section ref="block1Ref" class="block1 flex flex-col justify-center w-screen min-h-screen py-4 lg:py-40 text-[clamp(1.5rem,_3.5vw,_3.5rem)] text-black bg-white prose prose-p:leading-normal text-pretty">
      <div class="container">
        <p>La banda más lenta de la historia se formó entre Benicasim y Castellón a finales del 2003 practicando una especie de rock alternativo con influencias de otros estilos del rock más clásico.</p>
      </div>
    </section>

    <section ref="block2Ref" class="block2 relative flex flex-col justify-center w-screen min-h-dvh">
      <div class="absolute top-0 left-0 w-screen min-h-dvh">
        <video ref="videoRef" src="/videos/woman_dancing.mp4" class="absolute top-0 left-0 w-full h-full object-cover mask-[url(/images/circles.svg)] mask-type-alpha mask-size-[90%_90%] 2xl:mask-size-[100%_100%] mask-no-repeat mask-center" preload="auto" autoplay muted loop playsinline disableremoteplayback />
      </div>

      <div class="container py-12 lg:py-40 text-[clamp(1.5rem,_3.5vw,_3.5rem)] prose-black prose-p:leading-normal text-pretty mix-blend-color-dodge">
        <p>No obstante, en la búsqueda inquieta de ideas eclécticas, los miembros de la banda dieron un giro a sonidos más garageros, soul y especialmente ácidos, con un toque de espíritu mod y pinceladas de electrónica.</p>
      </div>
    </section>

    <section ref="block3Ref" class="block3 flex flex-col justify-evenly gap-18 w-screen min-h-screen py-4 sm:py-12">
      <div class="container text-[clamp(1.5rem,_3.5vw,_3.5rem)] prose-black prose-p:leading-normal text-pretty">
        <p>Actualmente sobreviven como soldados de fortuna. Si tiene buen gusto y los escucha, quizá pueda apreciarlos.</p>
      </div>
      <div class="py-4 sm:px-16">
        <ButtonHypnotic>Listen to their music</ButtonHypnotic>
      </div>
    </section>

  </div>
</template>

<script setup>
  import pageTransitionConfig from '~/helpers/transitionConfig';
  // import AnimationParagraph from "~/components/AnimationParagraph.vue";

  import gsap from "gsap";
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import SplitType from "split-type";

  gsap.registerPlugin(ScrollTrigger);

  definePageMeta({
    pageTransition: pageTransitionConfig,
  });

  useSeoMeta({
    title: 'Home | Skizophonic',
    ogTitle: 'Home | Skizophonic',
  })

  const block1 = useTemplateRef('block1Ref')
  const block2 = useTemplateRef('block2Ref')
  const block3 = useTemplateRef('block3Ref')
  const video = useTemplateRef('videoRef')
  let ctx

  onMounted(() => {
    const block1Split = new SplitType('.block1 p', { types: 'lines, words' })
    const block2Split = new SplitType('.block2 p', { types: 'lines, words' })
    const block3Split = new SplitType('.block3 p', { types: 'lines, words' })

    ctx = gsap.context((self) => {
      gsap.set([block1Split.lines, block2Split.lines, block3Split.lines], {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
      })

      // Hero and block 1 timeline.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: '+=100%',
            pin: true,
            scrub: 2,
            pinSpacing: false,
            // markers: true,
          }
        })
        .fromTo('.hero', {
          clipPath: 'circle(100% at 50% 50%)',
        }, {
          scale: 1.7,
          filter: 'blur(5px)',
          rotate: -15,
          clipPath: 'circle(0% at 50% 50%)',
        })
        .from(block1Split.words, {
          stagger: 0.025,
          y: 200,
        }, '<-=0.25')
        .to(block1.value, {
          scrollTrigger: {
            trigger: block1.value,
            start: 'top top',
            end: '+=100%',
            pin: true,
            pinSpacing: false,
            // markers: true,
          }
        })

      // Block 1 timeline.
      gsap.to(block1Split.lines, {
        duration: .7,
        autoAlpha: 0,
        stagger: 0.02,
        y: -200,
        ease: 'power4.in',
        scrollTrigger: {
          trigger: block2.value,
          start: 'top center-=15%',
          end: '+=100%',
          // markers: true, 
          toggleActions: 'play none none reverse',
        }
      })

      // Block 2 timeline.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: block2.value,
            start: 'top top',
            end: '+=100%',
            pin: true,
            scrub: true,
            // scrub: 2,
            // markers: true,
          }
        })
        .to(video.value, {
          maskSize: '250% 250%',
          ease: 'power2.in',
        })
        .to(block2.value, {
          backgroundColor: 'black',
          color: 'white',
        }, '<')
        .to(video.value, {
          duration: 3,
          maskSize: '900% 900%',
          ease: 'power2.in',
        })

      gsap.from(block2Split.words, {
        stagger: 0.02,
        y: 200,
        scrollTrigger: {
          trigger: block2.value,
          start: 'bottom bottom',
          end: '+=100%',
          // markers: true,
          toggleActions: 'play none none reverse',
        },
      })

      // Block 3 timeline.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: block3.value,
            start: 'top center',
            end: '+=100%',
            // markers: true,
            toggleActions: 'play play none reverse',
          }
        })
        .from(block3Split.words, {
          stagger: 0.015,
          y: 200,
        }, '<')
    }); // <- Scope!

  })

  onUnmounted(() => {
    ctx.revert();
  });
</script>
