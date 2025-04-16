<template>
  <div>
    <h1 class="text-black mix-blend-normal">Album</h1>

    <section class="flex flex-col justify-center gap-24 w-screen min-h-screen p-40 text-6xl text-white bg-black text-pretty">
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas maxime eveniet molestias incidunt totam quos eligendi itaque blanditiis veniam. Possimus facere nobis neque debitis libero ad voluptates dolor minus illum?
      </p>
    </section>

    <section class="flex flex-col justify-center gap-24 w-screen min-h-screen p-40 text-6xl text-black bg-white text-pretty">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit mollitia quam illum, praesentium quos nesciunt quod ipsa eum commodi laudantium porro alias quidem minima nisi modi optio! Ipsa, illo praesentium.
      </p>
    </section>
  </div>
</template>

<script setup>
  import pageTransitionConfig from '~/helpers/transitionConfig';

  definePageMeta({
    key: route => route.fullPath,
    pageTransition: pageTransitionConfig,
  });
</script>
