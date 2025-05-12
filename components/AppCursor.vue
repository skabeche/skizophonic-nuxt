<template>
  <div v-show="showCursor" ref="cursorRef" class="cursor-custom fixed z-100 top-0 left-0 origin-top-left pointer-events-none rounded-full backdrop-blur-sm">
    <div class="relative z-10 flex items-center justify-center w-24 h-24 p-2 bg-black/30 text-white text-center lowercase rounded-full">
      {{ text }}
    </div>
  </div>
</template>

<script setup>
  import { gsap } from "gsap";
  import { useTransition } from "#imports";

  const { transitionState } = useTransition();
  const showCursor = ref(false);
  const cursorRef = useTemplateRef('cursorRef');
  const lastCoordinatesAxis = { x: null, y: null };
  const currentCoordinatesAxis = { x: null, y: null };
  const text = ref(null);
  // let hoveredElement;
  let cursorElements = [];

  const setCursorListeners = () => {
    // Dataset options.
    // [data-cursor-enable-touch]
    // [data-cursor-text]

    const isTouchDevice = window.matchMedia('(hover: none)').matches || window.matchMedia('(pointer: coarse)').matches;
    cursorElements = document.querySelectorAll('[data-cursor-text]');
    for (const el of cursorElements) {
      if (isTouchDevice && el.dataset.cursorEnableTouch !== 'true') continue;

      el.addEventListener('mouseenter', (e) => {
        text.value = el.dataset.cursorText;
        cursorEnter(e);
      });
      el.addEventListener('mouseleave', (e) => {
        text.value = null;
        cursorOut(e);
      });
      el.addEventListener('mousemove', (e) => {
        cursorMove(e);
      });
    }

    // Cursor hides when the user touches out of the interacting element.
    // document.addEventListener('touchstart', (e) => {
    //   hoveredElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
    // hoveredElement.id !== 'XXXX' ? cursorOut(e) : cursorEnter(e);
    // },
    //   { passive: true }
    // );

    gsap
      .timeline()
      .to(cursorRef.value, {
        yPercent: 8,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
  };

  const cleanCursorListeners = () => {
    for (const el of cursorElements) {
      el.removeEventListener('mouseenter', cursorEnter);
      el.removeEventListener('mouseleave', cursorOut);
      el.removeEventListener('mousemove', cursorMove);
    }
    cursorElements = [];
  };

  onMounted(() => {
    setCursorListeners();
  })

  watch(() => transitionState.transitionComplete, (newValue) => {
    if (newValue) {
      cleanCursorListeners();
      setCursorListeners();
    }
  });

  onUnmounted(() => {
    cleanCursorListeners();
  })

  const cursorMove = (e) => {
    if (e.type === 'mouseenter' || e.type === 'mousemove') {
      if (showCursor.value === false) {
        cursorEnter(e);
      }
    }
    // Get mouse or touch coordinates.
    if (e.type === 'mousemove') {
      currentCoordinatesAxis.x = e.clientX;
      currentCoordinatesAxis.y = e.clientY;
    } else if (e.type === 'touchmove') {
      currentCoordinatesAxis.x = e.touches[0].clientX;
      currentCoordinatesAxis.y = e.touches[0].clientY;
    }

    // Get direction.
    const directionAxisX = currentCoordinatesAxis.x > lastCoordinatesAxis.x ? 'right' : currentCoordinatesAxis.x < lastCoordinatesAxis.x ? 'left' : 'none';
    // const directionAxisY = currentCoordinatesAxis.y > lastCoordinatesAxis.y ? 'down' : currentCoordinatesAxis.y < lastCoordinatesAxis.y ? 'up' : 'none';

    lastCoordinatesAxis.x = currentCoordinatesAxis.x;
    // lastCoordinatesAxis.y = currentCoordinatesAxis.y;

    gsap.fromTo(cursorRef.value,
      {
        rotate: directionAxisX === 'left' ? '+=-0.5' : '+=0.5',
        duration: .8,
        ease: "power3"
      },
      {
        rotate: 0,
        x: currentCoordinatesAxis.x,
        y: currentCoordinatesAxis.y,
        duration: .8,
        ease: "power3"
      }
    );
  }

  const cursorEnter = (e) => {
    gsap.to(cursorRef.value, {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      duration: .4,
      x: e.clientX ? e.clientX : e.touches[0].clientX,
      y: e.clientY ? e.clientY : e.touches[0].clientY,
      ease: "power3",
      onStart: () => showCursor.value = true
    });
  }

  const cursorOut = (e) => {
    gsap.to(cursorRef.value, {
      opacity: 0,
      filter: "blur(8px)",
      scale: 1.3,
      duration: .4,
      ease: "power3",
      // onComplete: () => showCursor.value = false
    });
  }
</script>
