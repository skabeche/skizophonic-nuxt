<template>
  <div v-if="!isPageLoaded" ref="preloaderFullRef" class="preloader-full fixed inset-0 z-90 flex items-center justify-center w-screen h-dvh text-black">
    <div ref="logoCirclesRef" class="logo-circles w-40 h-40">
      <LogoCircles />
    </div>
    <div ref="dot1Ref" class="dot1 fixed z-95 w-screen h-dvh bg-black will-change-[clip-path]" />
    <div ref="dot2Ref" class="dot2 fixed z-96 w-screen h-dvh bg-white will-change-[clip-path]" />
    <div ref="preloaderSubliminalTextRef" class="preloader-subliminal-text fixed z-95 inset-0 flex items-center justify-center w-screen h-dvh text-[clamp(1.2rem,5vw,2.8rem)] font-bold uppercase">
      {{ $t(`preloader.text[${Math.floor(Math.random() * 6)}]`) }}
    </div>
    <div ref="preloaderTextRef" class="preloader-text fixed z-95 grid place-items-center grid-cols-2 gap-7 w-full h-full text-[1rem] sm:text-2xl">
      <span class="w-full inline-block text-right">
        {{ text1 }}
      </span>
      <span class="w-full inline-block text-left">
        {{ text2 }}
      </span>
    </div>
  </div>
</template>

<script setup>
  import { disableScroll, enableScroll } from '~/utils/scrollLock.js';
  import { useWaitForMediaLoad } from "#imports";
  import gsap from "gsap";
  import { SplitText } from "gsap/SplitText";

  gsap.registerPlugin(SplitText);

  const emit = defineEmits(['done']);

  const props = defineProps({
    target: {
      type: String,
      required: true,
    },
    text1: {
      type: String,
      required: true,
    },
    text2: {
      type: String,
      required: true,
    }
  });

  const isPageLoaded = ref(false);
  const preloaderFullRef = useTemplateRef('preloaderFullRef');
  const preloaderTextRef = useTemplateRef('preloaderTextRef');
  const logoCirclesRef = useTemplateRef('logoCirclesRef');
  const dot1Ref = useTemplateRef('dot1Ref');
  const dot2Ref = useTemplateRef('dot2Ref');
  const preloaderSubliminalTextRef = useTemplateRef('preloaderSubliminalTextRef');
  const route = useRoute()
  const routesAreLoaded = useState('routesAreLoadedFull', () => []);
  let ctx = gsap.context(() => { });

  onMounted(async () => {
    await nextTick();
    disableScroll();
    // await document.fonts.ready;

    if (routesAreLoaded.value.includes(route.path)) {
      emit('done');
      isPageLoaded.value = true;
      return;
    }

    const preloaderSplit = SplitText.create(preloaderTextRef.value, {
      type: 'words',
      mask: 'words'
    });

    const buttonNavIconWrapper = document.querySelector('.button-nav-icon-wrapper');

    ctx = gsap.context(() => {
      gsap.set([dot1Ref.value, dot2Ref.value], { clipPath: 'circle(0% at 50% 50%)' })
      gsap.set(preloaderSubliminalTextRef.value, { opacity: 0, scale: 1.1 })
      gsap.set(buttonNavIconWrapper, { scaleX: 0, pointerEvents: 'none' });

      const tlDot1 = gsap
        .timeline({
          paused: true,
        })
        .to(dot1Ref.value, {
          autoAlpha: 0,
          repeat: -1,
          yoyo: true,
          duration: 0.5,
          ease: "power4.inOut",
        })

      const tl1 = gsap
        .timeline({
          delay: 2.5, // Align with logo animation.
          onComplete: async () => {
            const container = document.querySelector(props.target)
            if (container) {
              try {
                await useWaitForMediaLoad(container);
              } catch (error) {
                console.error(error);
              }

              gsap
                .timeline({
                  onStart: () => {
                    tlDot1.pause();
                    tlDot1.revert();
                  },
                  onComplete: () => {
                    tl2.play();
                  }
                })
                .to(preloaderTextRef.value, {
                  opacity: 0,
                  rotate: 15,
                  duration: 0.6,
                  filter: "blur(3px)",
                  ease: "power4.in",
                })
            }
          }
        })

      tl1
        .to(logoCirclesRef.value, {
          duration: 0.3,
          scale: 0,
          ease: "power4.inOut",
        })
        .to(dot1Ref.value, {
          duration: 0.8,
          clipPath: 'circle(0.2% at 50% 50%)',
          ease: "power4.out",
        }, '<')
        .from(preloaderSplit.words, {
          yPercent: 100,
          duration: 0.7,
          stagger: 0.05,
          ease: "power4.out",
          onComplete: () => {
            tlDot1.play()
          }
        }, '<')

      const tl2 = gsap
        .timeline({
          paused: true,
          onComplete: () => {
            emit('done');
            isPageLoaded.value = true;
            routesAreLoaded.value.push(route.path);
          }
        });

      tl2
        .to(logoCirclesRef.value, {
          duration: 0.5,
          scale: 0.4,
          ease: "back.out(1.7)",
        })
        .to('#logo-circles path', {
          duration: 0.5,
          scale: .8,
          stagger: 0.1,
          svgOrigin: "144.16 144.16",
          ease: "back.out(1.7)",
        }, '<')
        .to(dot1Ref.value, {
          duration: 0.8,
          clipPath: 'circle(100% at 50% 50%)',
          ease: "power4.inOut",
        })
        .to(preloaderSubliminalTextRef.value, {
          scale: 1,
          duration: 1.4,
          ease: "power4",
        }, '<')
        .to(preloaderSubliminalTextRef.value, {
          opacity: 1,
          duration: 0.3,
          ease: "power4.inOut",
        }, '<0.1')
        .to(dot2Ref.value, {
          duration: 1,
          clipPath: 'circle(100% at 50% 50%)',
          ease: "power4.inOut",
        }, '<')
        .to(buttonNavIconWrapper, {
          scaleX: 1,
          pointerEvents: 'auto',
          duration: 0.6,
          ease: 'power4.out',
        }, '<0.4')

    }, preloaderFullRef.value);
  });

  onUnmounted(() => {
    ctx.revert();
    enableScroll();
  });
</script>
