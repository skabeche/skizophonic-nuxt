<template>
  <section ref="albumsListRef" class="albums-list flex items-center justify-end sm:justify-start h-dvh">
    <div class="controls relative z-20 flex flex-col text-white mx-2 text-5xl lg:text-[4.4rem] 2xl:text-[7.4rem]">
      <button class="prev-slide cursor-pointer hover:text-[#ff0047]" :disabled="buttonDisabled" @click="handlePrevSlide">
        <Icon name="ion:arrow-up-a" />
      </button>
      <button class="next-slide cursor-pointer hover:text-[#00ffc7]" :disabled="buttonDisabled" @click="handleNextSlide">
        <Icon name="ion:arrow-down-a" />
      </button>
      <button class="swipe-slide hidden touch:block hybrid-device:block fixed z-20 bottom-0 p-4 text-4xl text-white" :disabled="buttonDisabled">
        <Icon class="icon-swipe" name="mdi:gesture-swipe-vertical" />
      </button>
    </div>
    <div v-for="album in albums" :key="album.name" class="slide album invisible fixed w-screen h-screen top-0 will-change-transform [&_a]:before:h-0">
      <div class="outer-wrapper w-full h-full overflow-y-hidden will-change-transform">
        <div class="inner-wrapper w-full h-full overflow-y-hidden will-change-transform">
          <div :class="`bg absolute top-0 left-0 grid grid-cols-1 sm:grid-cols-2 place-items-center content-center gap-4 w-full h-full bg-cover bg-center`" :style="`background-image: linear-gradient(0deg, rgb(0 0 0 / 100%) 0%, rgb(0 0 0 / 50%) 100%), url(/albums/${album.slug}/${album.images.cover});`">
            <div class="absolute -z-10 top-0 left-0 w-full h-full" :data-cursor-text="$t('components.cursor.scroll')">
              <video class="w-full h-full object-cover rotate-180" preload="auto" autoplay muted loop playsinline disableremoteplayback>
                <source :src="`/videos/${album.bgVideo.fhd}`" type="video/mp4" media="(min-width: 1920px)">
                <source :src="`/videos/${album.bgVideo.hd}`" type="video/mp4">
              </video>
            </div>
            <div class="w-2/3 relative">
              <NuxtLinkLocale :to="{ name: 'music-slug', params: { slug: album.slug } }">
                <img :src="`/albums/${album.slug}/${album.images.cover}`" :alt="album.title" width="1000" height="900">
              </NuxtLinkLocale>
              <span class="album-year absolute bottom-0 right-0 inline-block text-lg lg:text-xl xl:text-2xl p-2 lg:p-3 font-bold text-white mix-blend-difference">{{ album.year }}</span>
            </div>
            <div class="1/3">
              <h2 class="slide-heading text-8xl">
                <AnimationTextShadow>
                  <NuxtLinkLocale class="text-white" :to="{ name: 'music-slug', params: { slug: album.slug } }">
                    {{ album.title }}
                  </NuxtLinkLocale>
                </AnimationTextShadow>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { albums } from "~/data/albums";
  import { isSafari } from "#imports";

  import gsap from "gsap";
  import { SplitText } from "gsap/SplitText";
  import { Observer } from "gsap/Observer";

  gsap.registerPlugin(SplitText, Observer);

  const props = defineProps({
    play: {
      type: Boolean,
      default: true,
      required: false
    }
  });

  const albumsListRef = useTemplateRef('albumsListRef');
  const buttonDisabled = ref(false);

  let ctx;
  let isAnimating = false;
  let slides, images, headings, years, outerWrappers, innerWrappers, splitHeadings, splitYears, wrap;
  const currentIndex = useState('currentAlbumIndex', () => undefined);
  const startIndex = currentIndex.value === undefined ? 0 : currentIndex.value;
  currentIndex.value = undefined;

  function handlePrevSlide() {
    if (isAnimating) return;
    goToSlide(currentIndex.value - 1, -1)
  }

  function handleNextSlide() {
    if (isAnimating) return;
    goToSlide(currentIndex.value + 1, 1)
  }

  /**
   * Go to a specific slide with an optional direction.
   * @param {number} index - The index of the slide to go to.
   * @param {number} direction - The direction of the animation. Use -1 for up and 1 for down.
   * @returns {void}
   */
  function goToSlide(index, direction = 1) {
    // Ensure the index is always in range.
    index = wrap(index);

    gsap.set(splitHeadings[index].lines, { clipPath: "inset(0% 0% 0% 0%)" });
    const tl = gsap
      .timeline({
        paused: true,
        defaults: {
          duration: 1.24,
          ease: "power4.inOut"
        },
        onStart: () => {
          isAnimating = true;
          buttonDisabled.value = true;
        },
        onComplete: () => {
          isAnimating = false;
          buttonDisabled.value = false;
          currentIndex.value = index;
          gsap.set(splitHeadings[index].lines, { clipPath: "none" });
        }
      });

    if (currentIndex.value !== undefined) {
      gsap.set(slides[currentIndex.value], { zIndex: 0 });
      tl
        .to(images[currentIndex.value], {
          yPercent: -15 * direction
        })
        .set(slides[currentIndex.value], {
          autoAlpha: 0
        });
    }

    gsap.set(slides[index], { autoAlpha: 1, zIndex: 1 });
    tl
      .fromTo([outerWrappers[index], innerWrappers[index]], {
        yPercent: i => i ? -100 * direction : 100 * direction
      }, {
        yPercent: 0
      }, 0)
      .fromTo(images[index], {
        yPercent: 15 * direction
      }, {
        yPercent: 0
      }, '<')
      .fromTo(splitHeadings[index].chars, {
        autoAlpha: 0,
        yPercent: 150 * direction
      }, {
        autoAlpha: 1,
        yPercent: 0,
        stagger: 0.02
      }, isSafari() ? '<+=0.1' : '<') // Fix painting issue on Safari.
      .fromTo(splitYears[index].chars, {
        autoAlpha: 0,
        yPercent: 150 * direction
      }, {
        autoAlpha: 1,
        yPercent: 0,
        stagger: 0.02
      }, '<0.24');

    tl.play(0);
  }

  onMounted(async () => {
    await document.fonts.ready

    slides = document.querySelectorAll(".slide");
    images = document.querySelectorAll(".bg");
    headings = gsap.utils.toArray(".slide-heading");
    years = gsap.utils.toArray(".album-year");
    outerWrappers = gsap.utils.toArray(".outer-wrapper");
    innerWrappers = gsap.utils.toArray(".inner-wrapper");

    splitHeadings = headings.map((heading) =>
      SplitText.create(heading, {
        type: "lines, words, chars",
        linesClass: "line",
      })
    );
    splitYears = years.map((year) =>
      SplitText.create(year, {
        type: "words, chars",
        mask: "words",
      })
    );

    wrap = gsap.utils.wrap(0, slides.length);

    gsap.set(outerWrappers, { yPercent: 100 });
    gsap.set(innerWrappers, { yPercent: -100 });

    ctx = gsap.context(() => {
      gsap.to('.icon-swipe', {
        y: 6,
        repeat: -1,
        duration: 1.3,
        ease: 'power2.inOut',
        yoyo: true
      })

      const observer = Observer.create({
        type: "wheel,touch,pointer",
        wheelSpeed: -1,
        onDown: () => !isAnimating && goToSlide(currentIndex.value - 1, -1),
        onUp: () => !isAnimating && goToSlide(currentIndex.value + 1, 1),
        tolerance: 10,
        preventDefault: true
      });
      observer.disable();

      watch(
        () => props.play,
        (newVal) => {
          if (newVal) {
            observer.enable();
            goToSlide(startIndex);
          }
        },
        { immediate: false }
      )

    }, albumsListRef.value);
  });

  onUnmounted(() => {
    ctx.revert();
  });
</script>
