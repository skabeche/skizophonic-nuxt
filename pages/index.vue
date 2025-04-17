<template>
  <div>
    <HeroHypnotic>
      <AppLogo class="fill-white" />
    </HeroHypnotic>

    <section class="flex flex-col justify-center gap-24 w-screen min-h-screen p-4 lg:p-40 text-2xl lg:text-6xl text-white bg-black text-pretty">
      <div class="container">
        <AnimationParagraph>
          La banda más lenta de la historia se creó entre Castellón y Benicasim a finales del 2003 practicando una especie de rock alternativo con influencias de otros estilos del rock más clásico.
        </AnimationParagraph>
      </div>
    </section>

    <section class="flex flex-col justify-center gap-24 w-screen min-h-screen p-4 lg:p-40 text-2xl lg:text-6xl text-black bg-white text-pretty">
      <div class="container">
        <AnimationParagraph>
          No obstante, en proceso de reestructuración musical y en la búsqueda inquieta de nuevos sonidos, los miembros de la banda dieron un giro a sonidos más garageros, indies y especialmente ácidos, con un toque de espíritu mod y pinceladas de electrónica.
        </AnimationParagraph>
      </div>
      <ButtonHypnotic>Listen to their music</ButtonHypnotic>
    </section>
  </div>
</template>

<script setup>
  import pageTransitionConfig from '~/helpers/transitionConfig';
  import AnimationParagraph from "~/components/AnimationParagraph.vue";

  definePageMeta({
    pageTransition: pageTransitionConfig,
  });
</script>
