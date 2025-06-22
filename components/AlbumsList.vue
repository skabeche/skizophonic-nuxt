<template>
  <section class="flex items-center justify-end sm:justify-start h-dvh">
    <div class="controls relative z-20 flex flex-col text-white mx-2 text-5xl lg:text-[4.4rem] 2xl:text-[7.4rem]">
      <button class="prev-slide cursor-pointer hover:text-[#ff0047]" @click="handlePrevSlide">
        <Icon name="ion:arrow-up-a" />
      </button>
      <button class="next-slide cursor-pointer hover:text-[#00ffc7]" @click="handleNextSlide">
        <Icon name="ion:arrow-down-a" />
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
            <div class="w-2/3">
              <NuxtLinkLocale :to="{ name: 'music-slug', params: { slug: album.slug } }">
                <img :src="`/albums/${album.slug}/${album.images.cover}`" :alt="album.title" width="1000" height="900" loading="lazy">
              </NuxtLinkLocale>
            </div>
            <div class="1/3">
              <h2 class="slide-heading text-8xl [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)] hover:[clip-path:none]">
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

  import gsap from "gsap";
  import { SplitText } from "gsap/SplitText";

  gsap.registerPlugin(SplitText);

  let isAnimating = false;
  let direction = "down";
  let current;
  let next = 0;

  const touch = {
    startX: 0,
    startY: 0,
    dx: 0,
    dy: 0,
    startTime: 0,
    dt: 0
  };

  let slides, images, headings, outerWrappers, innerWrappers, splitHeadings;

  const tlDefaults = {
    ease: "power4.inOut",
    duration: 1.2
  };

  function handleTouchStart(e) {
    if (!isAnimating) return;
    const t = e.changedTouches[0];
    touch.startX = t.pageX;
    touch.startY = t.pageY;
  }

  function handleTouchMove(e) {
    if (!isAnimating) return;
    // e.preventDefault();
  }

  function handleTouchEnd(e) {
    if (!isAnimating) return;
    const t = e.changedTouches[0];
    touch.dx = t.pageX - touch.startX;
    touch.dy = t.pageY - touch.startY;

    if (touch.dy >= -10 && touch.dy <= 10) {
      if (e.target.closest("a") || e.target.closest("button")) return;
    }

    if (touch.dy > 10) direction = "up";
    if (touch.dy < -10) direction = "down";
    handleDirection();
  }

  function handleWheel(e) {
    if (!isAnimating) return;
    direction = e.wheelDeltaY < 0 ? "down" : "up";
    handleDirection();
  }

  function handlePrevSlide() {
    if (!isAnimating) return;
    direction = "up";
    handleDirection();
  }

  function handleNextSlide() {
    if (!isAnimating) return;
    direction = "down";
    handleDirection();
  }

  function handleDirection() {
    isAnimating = false;

    if (direction === "down") {
      next = current + 1;
      if (next >= slides.length) next = 0;
      slideIn();
    }

    if (direction === "up") {
      next = current - 1;
      if (next < 0) next = slides.length - 1;
      slideOut();
    }
  }

  function revealSectionHeading() {
    return gsap.to(splitHeadings[next].chars, {
      autoAlpha: 1,
      yPercent: 0,
      duration: 1.2,
      ease: "power4.inOut",
      stagger: 0.02
    });
  }

  function slideIn() {
    if (current !== undefined) gsap.set(slides[current], { zIndex: 0 });

    gsap.set(slides[next], { autoAlpha: 1, zIndex: 1, pointerEvents: "auto" });
    gsap.set(images[next], { yPercent: 0 });
    gsap.set(splitHeadings[next].chars, { autoAlpha: 0, yPercent: 100 });

    const tl = gsap
      .timeline({
        paused: true,
        defaults: tlDefaults,
        onComplete: () => {
          isAnimating = true;
          current = next;
        }
      })
      .to([outerWrappers[next], innerWrappers[next]], { yPercent: 0 }, 0)
      .from(images[next], { yPercent: 15 }, 0)
      .add(revealSectionHeading(), 0);

    if (current !== undefined) {
      tl.add(
        gsap.to(images[current], {
          yPercent: -15,
          ...tlDefaults
        }),
        0
      ).add(
        gsap
          .timeline()
          .set(outerWrappers[current], { yPercent: 100 })
          .set(innerWrappers[current], { yPercent: -100 })
          .set(images[current], { yPercent: 0 })
          .set(slides[current], { autoAlpha: 0 })
      );
    }

    tl.play(0);
  }

  function slideOut() {
    gsap.set(slides[current], { zIndex: 1, pointerEvents: "none" });
    gsap.set(slides[next], { autoAlpha: 1, zIndex: 0 });
    gsap.set(splitHeadings[next].chars, { autoAlpha: 0, yPercent: 100 });
    gsap.set([outerWrappers[next], innerWrappers[next]], { yPercent: 0 });
    gsap.set(images[next], { yPercent: 0 });

    gsap
      .timeline({
        defaults: tlDefaults,
        onComplete: () => {
          isAnimating = true;
          current = next;
        }
      })
      .to(outerWrappers[current], { yPercent: 100 }, 0)
      .to(innerWrappers[current], { yPercent: -100 }, 0)
      .to(images[current], { yPercent: 15 }, 0)
      .from(images[next], { yPercent: -15 }, 0)
      .add(revealSectionHeading(), ">-1")
      .set(images[current], { yPercent: 0 });
  }

  onMounted(() => {
    slides = document.querySelectorAll(".slide");
    images = document.querySelectorAll(".bg");
    headings = gsap.utils.toArray(".slide-heading");
    outerWrappers = gsap.utils.toArray(".outer-wrapper");
    innerWrappers = gsap.utils.toArray(".inner-wrapper");

    splitHeadings = headings.map((heading) =>
      SplitText.create(heading, { type: "chars, words" })
    );

    gsap.set(outerWrappers, { yPercent: 100 });
    gsap.set(innerWrappers, { yPercent: -100 });

    document.addEventListener("wheel", handleWheel);
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    slideIn();
  });

  onUnmounted(() => {
    document.removeEventListener("wheel", handleWheel);
    document.removeEventListener("touchstart", handleTouchStart);
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
  });
</script>
