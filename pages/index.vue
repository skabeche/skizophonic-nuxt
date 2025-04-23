<template>
  <div>
    <HeroHypnotic class="hero z-50 overflow-hidden">
      <AppLogo class="fill-white" />
    </HeroHypnotic>

    <section class="content1 flex flex-col justify-center w-screen min-h-screen p-4 lg:p-40 text-[clamp(1.5rem,_3.5vw,_3.5rem)] text-black bg-white prose prose-p:leading-normal text-pretty">
      <div class="container">
        <p>La banda más lenta de la historia se formó entre Castellón y Benicasim a finales del 2003 practicando una especie de rock alternativo con influencias de otros estilos del rock más clásico.</p>
      </div>
    </section>

    <section class="content2 flex flex-col justify-center relative w-screen min-h-dvh text-white bg-black">
      <div ref="videoRef" class="absolute -top-10 lg:-top-18 2xl:-top-28 left-0 w-screen min-h-dvh aspect-video">
        <video src="/videos/woman_dancing.mp4" class="absolute top-0 left-0 w-full object-cover" autoplay muted loop playsinline />
      </div>

      <div class="container py-12 lg:py-40 text-[clamp(1.5rem,_3.5vw,_3.5rem)] prose-black prose-p:leading-normal text-pretty">
        <p>No obstante, en la búsqueda inquieta de nuevos sonidos, los miembros de la banda dieron un giro a sonidos más garageros, soul y especialmente ácidos, con un toque de espíritu mod y pinceladas de electrónica.</p>
      </div>
    </section>

    <section class="content3 flex flex-col items-center justify-center gap-18 p-4 sm:p-12">
      <div class="container text-[clamp(1.5rem,_3.5vw,_3.5rem)] prose-black prose-p:leading-normal text-pretty">
        <p>Actualmente sobreviven como soldados de fortuna. Si tiene buen gusto y se los encuentra quizá pueda escucharlos.</p>
      </div>
      <ButtonHypnotic>Listen to their music</ButtonHypnotic>
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

  const video = useTemplateRef('videoRef')

  onMounted(() => {
    const content1Split = new SplitType('.content1 p', { types: 'lines, words' })
    const content2Split = new SplitType('.content2 p', { types: 'lines, words' })
    const content3Split = new SplitType('.content3 p', { types: 'lines, words' })

    gsap.set([content1Split.lines, content2Split.lines, content3Split.lines], {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
    })

    gsap
      .timeline({
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: true,
          pinSpacing: false,
          // markers: true,
        }
      })
      .fromTo('.hero', {
        // scale: 1,
        clipPath: 'circle(100% at 50% 50%)',
      }, {
        // scale: 1.7,
        // filter: 'blur(5px)',
        clipPath: 'circle(0% at 50% 50%)',
      }, '<')
      .from(content1Split.words, {
        stagger: 0.025,
        y: 200,
      }, '<-=0.25')
      .to('.content1', {
        scrollTrigger: {
          trigger: '.content1',
          start: 'top top',
          end: '+=100%',
          pin: true,
          pinSpacing: false,
          // markers: true,
        }
      })

    gsap
      .timeline({
        scrollTrigger: {
          trigger: '.content2',
          start: 'top top',
          end: '+=100%',
          pin: true,
          // markers: true,
          // scrub: true,
          toggleActions: 'play none none reverse',
        }
      })
      .to('.content2', {
        backgroundColor: 'white',
        color: 'black',
      }, '<')
      .to(video.value, {
        duration: .5,
        autoAlpha: 0,
        // rotate: 30,
        yPercent: 15,
        ease: 'power2.in',
      }, '<')
      .from(content2Split.words, {
        stagger: 0.015,
        y: 200,
      }, '<')

      gsap
      .timeline({
        scrollTrigger: {
          trigger: '.content3',
          start: 'top center',
          end: '+=100%',
          markers: true,
          toggleActions: 'play none none reverse',
        }
      })
      .from(content3Split.words, {
        stagger: 0.015,
        y: 200,
      }, '<')

  })

</script>

<style scoped>
  video {
    mask-image: url(/images/circles.svg);
    mask-type: alpha;
    mask-size: 100% 100%;
    mask-repeat: no-repeat;
    mask-position: center center;
  }
</style>