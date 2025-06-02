<template>
  <div class="container flex flex-col gap-16 mt-[100px]">
    <AnimationReveal :delay="0.2">
      <h1 class="text-[clamp(3rem,_10vw,_6rem)]">{{ $t('pages.merch.title') }}</h1>
    </AnimationReveal>

    <section>
      <AnimationReveal>
        <h2>{{ $t('pages.merch.sections.tshirts.title') }}</h2>
      </AnimationReveal>
      <MerchItem :items="tshirts" />
    </section>

    <section>
      <AnimationReveal>
        <h2>{{ $t('pages.merch.sections.buttonBadges.title') }}</h2>
      </AnimationReveal>
      <MerchItem :items="badges" />
    </section>

    <section>
      <AnimationReveal>
        <h2>{{ $t('pages.merch.sections.stickers.title') }}</h2>
      </AnimationReveal>
      <MerchItem :items="stickers" />
    </section>

    <section>
      <AnimationReveal>
        <h2>{{ $t('pages.merch.sections.posters.title') }}</h2>
      </AnimationReveal>
      <MerchItem :items="posters" />
    </section>
  </div>
</template>

<script setup>
  import { tshirts, badges, stickers, posters } from "~/data/merch";
  import { pageTransitionConfig } from '~/helpers/transitionConfig';

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
</script>
