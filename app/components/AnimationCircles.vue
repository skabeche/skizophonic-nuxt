<template>
  <svg class="anim-svg-circles" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 714 714" fill="currentColor" aria-hidden="true">
    <g class="circle">
      <circle cx="357" cy="357" r="318" fill="black" />
    </g>
    <g class="circle">
      <circle cx="357" cy="357" r="260" fill="white" />
    </g>
    <g class="circle">
      <circle cx="357" cy="357" r="218" fill="black" />
    </g>
    <g class="circle">
      <circle cx="357" cy="357" r="175" fill="white" />
    </g>
    <g class="circle">
      <circle cx="357" cy="357" r="150" fill="black" />
    </g>
    <g class="circle">
      <circle cx="357" cy="357" r="124" fill="white" />
    </g>
    <g class="circle sound">
      <circle cx="357" cy="357" r="95" fill="black" />
    </g>
    <g class="circle sound">
      <circle cx="357" cy="357" r="65" fill="white" />
    </g>
    <g class="circle sound">
      <circle cx="357" cy="357" r="40" fill="black" />
    </g>
    <g class="circle sound text uppercase text-[18.5px] font-black" fill="black">
      <text>
        <textPath href="#circlePath" startOffset="0">sound sound sound sound</textPath>
      </text>
    </g>
    <!-- <g class="circle sound">
      <circle cx="357" cy="357" r="28" fill="white" />
    </g> -->
    <!-- <path id="circlePath" fill="none" d="M357,357 m-75,0 a75,75 0 1,1 150,0 a75,75 0 1,1 -150,0" /> -->
    <path id="circlePath" fill="none" d="M357,357 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
  </svg>
</template>

<script setup>
  import gsap from "gsap";

  onMounted(() => {
    const ua = navigator.userAgent.toLowerCase();
    const isFirefoxMobile = ua.includes('firefox') && /android|iphone|ipad|ipod|mobile/.test(ua);

    gsap.set('.anim-svg-circles circle, .anim-svg-circles text', {
      transformOrigin: 'center center'
    })
    gsap.set('.anim-svg-circles text', {
      filter: isFirefoxMobile ? 'blur(0px)' : 'blur(.5px)',
    })
    gsap.from('.anim-svg-circles circle', {
      scale: 0.84,
      translateZ: 0,
      duration: 0.8,
      force3D: true,
      ease: 'back(3.8)',
      stagger: {
        each: -0.061,
        repeat: -1,
        yoyo: true
      },
    }, 0.6)

    gsap.from('.anim-svg-circles text', {
      scale: 0.9,
      translateZ: 0,
      autoAlpha: 0,
      force3D: true,
      filter: isFirefoxMobile ? 'blur(0px)' : 'blur(3px)',
      duration: 0.8,
      ease: 'back(4)',
      repeat: -1,
      yoyo: true
    }, 0.6)

  })
</script>
