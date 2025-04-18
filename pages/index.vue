<template>
  <div>
    <HeroHypnotic class="hero z-50 overflow-hidden">
      <AppLogo class="fill-white" />
    </HeroHypnotic>

    <section class="content1 flex flex-col justify-center gap-24 w-screen min-h-screen p-4 lg:p-40 text-3xl lg:text-6xl text-black bg-white prose prose-p:leading-normal text-pretty">
      <div class="container">
        <p>
          La banda más lenta de la historia se creó entre Castellón y Benicasim a finales del 2003 practicando una especie de rock alternativo con influencias de otros estilos del rock más clásico.
        </p>
      </div>
    </section>

    <section class="content2 flex flex-col justify-center gap-24 w-screen min-h-screen p-4 lg:p-40 text-3xl lg:text-6xl text-white bg-black prose prose-p:leading-normal text-pretty">
      <div class="container">
        <p>
          No obstante, en proceso de reestructuración musical y en la búsqueda inquieta de nuevos sonidos, los miembros de la banda dieron un giro a sonidos más garageros, indies y especialmente ácidos, con un toque de espíritu mod y pinceladas de electrónica.
        </p>
      </div>
    </section>

    <section class="flex items-center justify-center p-4 sm:p-12">
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

  onMounted(() => {
    const content1Split = new SplitType('.content1 p', { types: 'lines, words' })
    const content2Split = new SplitType('.content2 p', { types: 'lines, words' })

    gsap.set([content1Split.lines, content2Split.lines], {
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
      }, '<-=0.2')
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
          scrub: true,
        }
      })
      .to('.content2', {
        backgroundColor: 'white',
        color: 'black',
      }, '<')
      .from(content2Split.words, {
        stagger: 0.025,
        y: 200,
      }, '<')

  })

</script>
