<template>
  <div class="container flex flex-col gap-16 mt-[100px]">
    <AnimationReveal :delay="0.2">
      <h1 class="text-[clamp(3rem,_10vw,_6rem)]">Merch</h1>
    </AnimationReveal>
    <MerchItem title="T-shirts" :content="tshirts" />
    <MerchItem title="Button badges" :content="badges" />
    <MerchItem title="Stickers" :content="stickers" />
    <MerchItem title="Posters" :content="posters" />
  </div>
</template>

<script setup>
  import { tshirts, badges, stickers, posters } from "~/data/merch";
  import { pageTransitionConfig } from '~/helpers/transitionConfig';

  definePageMeta({
    pageTransition: pageTransitionConfig,
  });

  useSeoMeta({
    title: 'Merch | Skizophonic',
    ogTitle: 'Merch | Skizophonic',
  })
</script>
