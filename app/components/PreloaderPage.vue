<template>
  <div ref="preloaderPageRef" class="preloader-page fixed inset-0 z-90 flex items-center justify-center w-screen h-dvh bg-white text-black">
    <div ref="preloaderTextRef" class="preloader-text text-lg md:text-2xl">
      {{ $t('components.preloaderPage.text1') }} <span ref="preloaderDotRef" class="preloader-dot inline-block">·</span> {{ $t('components.preloaderPage.text2') }}
    </div>
  </div>
</template>

<script setup>
  import gsap from "gsap";
  import { SplitText } from "gsap/SplitText";

  gsap.registerPlugin(SplitText);

  const emit = defineEmits(['done']);

  const props = defineProps({
    target: {
      type: String,
      required: true,
    }
  });

  const isPageLoaded = ref(false);
  const preloaderPageRef = useTemplateRef('preloaderPageRef');
  const preloaderTextRef = useTemplateRef('preloaderTextRef');
  const preloaderDotRef = useTemplateRef('preloaderDotRef');
  const route = useRoute()
  const routeIsLoaded = useState('routeIsLoaded', () => undefined);
  let ctx = gsap.context(() => { });

  function waitForMediaLoad(container) {
    const mediaElements = container.querySelectorAll('img, video');
    const mediaPromises = [];

    mediaElements.forEach((el) => {
      mediaPromises.push(new Promise((resolve) => {
        if (el.tagName === 'IMG') {
          // If image is already loaded.
          if (el.complete && el.naturalHeight !== 0) {
            resolve();
          } else {
            console.log(el)
            console.log('el.complete', el.complete)
            el.addEventListener('load', resolve, { once: true });
            el.addEventListener('error', resolve, { once: true }); // Resolve even if failed.
          }
        }
        else if (el.tagName === 'VIDEO') {
          // HAVE_ENOUGH_DATA
          if (el.readyState >= 4) {
            resolve();
          } else {
            el.addEventListener('loadeddata', resolve, { once: true });
            el.addEventListener('error', resolve, { once: true }); // Resolve even if failed.
          }
        }
        else {
          // Not a media element, nothing to wait for.
          resolve();
        }
      }));
    });

    return Promise.all(mediaPromises);
  }

  onMounted(async () => {
    // await nextTick();
    await document.fonts.ready;

    if (routeIsLoaded.value === route.path) {
      emit('done');
      isPageLoaded.value = true;
      return;
    }

    const preloaderSplit = SplitText.create(preloaderTextRef.value, {
      type: 'words',
      mask: 'words'
    });

    ctx = gsap.context(() => {
      gsap.fromTo(preloaderDotRef.value, {
        autoAlpha: 0,
      }, {
        autoAlpha: 1,
        repeat: -1,
        yoyo: true,
        duration: 0.5,
        ease: "power4.inOut",
      })

      gsap.from(preloaderSplit.words, {
        yPercent: 100,
        duration: 0.8,
        stagger: 0.05,
        ease: "power4.out",
        onComplete: async () => {
          const container = document.querySelector(props.target)
          if (container) {
            try {
              await waitForMediaLoad(container);

              gsap.to(preloaderTextRef.value, {
                opacity: 0,
                duration: 0.7,
                filter: "blur(3px)",
                y: -50,
                ease: "power4.in",
                onComplete: () => {
                  emit('done');
                  isPageLoaded.value = true;
                  routeIsLoaded.value = route.path;
                }
              });
            } catch (error) {
              console.error(error);
            }
          }
        }
      })
    }, preloaderPageRef.value);
  });

  onUnmounted(() => {
    ctx.revert();
  });
</script>
