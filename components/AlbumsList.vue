<template>
  <section class="flex items-center gap-4 h-dvh">
    <div class="controls relative z-20 flex flex-col gap-4 text-white text-5xl sm:text-6xl xl:text-9xl">
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
          <div :class="`bg absolute top-0 left-0 grid grid-cols-1 sm:grid-cols-2 place-items-center content-center gap-4 w-full h-full bg-cover bg-center`" :style="`background-image: linear-gradient(0deg, rgb(0 0 0 / 100%) 0%, rgb(0 0 0 / 50%) 100%), url(albums/${album.slug}/${album.images.cover});`">
            <div class="absolute -z-10 top-0 left-0 w-full h-full" :data-cursor-text="$t('components.cursor.scroll')">
              <video class="w-full h-full object-cover rotate-180" :src="`/videos/${album.bgVideo}`" autoplay muted loop playsinline disableremoteplayback />
            </div>
            <div class="w-2/3">
              <LocaleLink :to="`/music/${album.slug}`">
                <img :src="`/albums/${album.slug}/${album.images.cover}`" :alt="album.title" loading="lazy">
              </LocaleLink>
            </div>
            <div class="1/3">
              <h2 class="slide-heading text-8xl text-white">
                <LocaleLink :to="`/music/${album.slug}`" class="text-white">
                  {{ album.title }}
                </LocaleLink>
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

  onMounted(() => {
    const slides = document.querySelectorAll(".slide");
    const images = document.querySelectorAll(".bg");
    const prevSlide = document.querySelector(".prev-slide");
    const nextSlide = document.querySelector(".next-slide");
    const headings = gsap.utils.toArray(".slide-heading");
    const outerWrappers = gsap.utils.toArray(".outer-wrapper");
    const innerWrappers = gsap.utils.toArray(".inner-wrapper");

    document.addEventListener("wheel", handleWheel);
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
    prevSlide.addEventListener("click", handlePrevSlide);
    nextSlide.addEventListener("click", handleNextSlide);

    let listening = false;
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

    const tlDefaults = {
      ease: "power4.inOut",
      duration: 1.2
    };

    const splitHeadings = headings.map((heading) => {
      return SplitText.create(heading, {
        type: "chars, words, lines",
        mask: "lines"
      });
    });

    function revealSectionHeading() {
      return gsap.to(splitHeadings[next].chars, {
        autoAlpha: 1,
        yPercent: 0,
        duration: 1.2,
        ease: "power4.inOut",
        stagger: 0.02
      });
    }

    gsap.set(outerWrappers, { yPercent: 100 });
    gsap.set(innerWrappers, { yPercent: -100 });

    function slideIn() {
      // The first time this function runs, current is undefined
      if (current !== undefined) gsap.set(slides[current], { zIndex: 0 });

      gsap.set(slides[next], { autoAlpha: 1, zIndex: 1, pointerEvents: "auto" });
      gsap.set(images[next], { yPercent: 0 });
      gsap.set(splitHeadings[next].chars, { autoAlpha: 0, yPercent: 100 });

      const tl = gsap
        .timeline({
          paused: true,
          defaults: tlDefaults,
          onComplete: () => {
            listening = true;
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
            listening = true;
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

    function handleDirection() {
      listening = false;

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

    function handleWheel(e) {
      if (!listening) return;
      direction = e.wheelDeltaY < 0 ? "down" : "up";
      handleDirection();
    }

    function handleTouchStart(e) {
      if (!listening) return;
      const t = e.changedTouches[0];
      touch.startX = t.pageX;
      touch.startY = t.pageY;
    }

    function handleTouchMove(e) {
      if (!listening) return;
      e.preventDefault();
    }

    function handleTouchEnd(e) {
      if (!listening) return;
      const t = e.changedTouches[0];
      touch.dx = t.pageX - touch.startX;
      touch.dy = t.pageY - touch.startY;

      if (touch.dy >= -10 && touch.dy <= 10) {
        const touchedElement = e.target.closest('a') || e.target.closest('button');
        if (touchedElement) {
          // Navigate if the user touched a link.
          if (touchedElement.tagName === "A") window.location.href = touchedLink.href;

          return;
        }
      }

      if (touch.dy > 10) direction = "up";
      if (touch.dy < -10) direction = "down";
      handleDirection();
    }

    function handlePrevSlide() {
      if (!listening) return;
      direction = "up";
      handleDirection();
    }

    function handleNextSlide() {
      if (!listening) return;
      direction = "down";
      handleDirection();
    }

    slideIn();

  })
</script>
