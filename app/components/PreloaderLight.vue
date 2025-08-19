<template>
  <div ref="preloaderLightRef" class="preloader-light fixed inset-0 z-90 flex items-center justify-center w-screen h-dvh bg-white text-black">
    <div ref="preloaderTextRef" class="preloader-text text-[clamp(1rem,3vw,1.5rem)]">
      {{ text1 }} <span ref="preloaderDotRef" class="preloader-dot inline-block">·</span> {{ text2 }}
    </div>
  </div>
</template>

<script setup>
  import { disableScroll, enableScroll } from '~/utils/scrollLock.js';
  import { useWaitForMediaLoad } from "#imports";
  import gsap from "gsap";
  import { SplitText } from "gsap/SplitText";

  gsap.registerPlugin(SplitText);

  const emit = defineEmits(['done', 'destroyed']);

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
  const preloaderLightRef = useTemplateRef('preloaderLightRef');
  const preloaderTextRef = useTemplateRef('preloaderTextRef');
  const preloaderDotRef = useTemplateRef('preloaderDotRef');
  const route = useRoute()
  const routesAreLoaded = useState('routesAreLoadedLight', () => []);
  let ctx = gsap.context(() => { });

  onMounted(async () => {
    await nextTick();
    disableScroll();
    await document.fonts.ready;

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
      gsap.set(buttonNavIconWrapper, { scaleX: 0, pointerEvents: 'none' });

      gsap
        .timeline({
          paused: true,
        })
        .fromTo(preloaderDotRef.value, {
          autoAlpha: 0,
        }, {
          autoAlpha: 1,
          repeat: -1,
          yoyo: true,
          duration: 0.5,
          ease: "power4.inOut",
        })
        .from(preloaderSplit.words, {
          yPercent: 100,
          duration: 0.8,
          stagger: 0.05,
          ease: "power4.out",
          onComplete: async () => {
            const container = document.querySelector(props.target)
            if (container) {
              try {
                await useWaitForMediaLoad(container);
              } catch (error) {
                console.error(error);
              }

              gsap
                .timeline()
                .to(preloaderTextRef.value, {
                  opacity: 0,
                  duration: 0.7,
                  filter: "blur(3px)",
                  y: -50,
                  ease: "power4.in",
                  onComplete: () => {
                    emit('done');
                    isPageLoaded.value = true;
                    routesAreLoaded.value.push(route.path);
                  }
                })
                .to(buttonNavIconWrapper, {
                  scaleX: 1,
                  pointerEvents: 'auto',
                  duration: 0.6,
                  ease: 'power4.out'
                }, '<0.4');

            }
          }
        })
        .play();

    }, preloaderLightRef.value);
  });

  onUnmounted(() => {
    ctx.revert();
    enableScroll();
    emit('destroyed');
  });
</script>
