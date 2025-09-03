<template>
  <span class="colibri relative [filter:invert(100%)]">
    <span class="colibri-fly absolute -top-3 left-0 w-[70px] h-[48px] scale-50 origin-top-left bg-colibri-anim" aria-hidden="true" role="img" />
  </span>
</template>

<style scoped>
  .colibri-fly {
    animation:
      anim-colibri-wings 150ms steps(4) infinite,
      anim-colibri-fly 5000ms infinite;
  }

  @keyframes anim-colibri-wings {
    0% {
      background-position: 0 0;
    }

    100% {
      background-position: 280px 0;
    }
  }

  @keyframes anim-colibri-fly {
    0% {
      transform: translateY(0) translateX(0);
      rotate: -10deg;
      filter: blur(3px);
    }

    7% {
      transform: translateY(20px) translateX(10px);
      filter: blur(0);
    }

    22% {
      transform: translateY(10px) translateX(0);
      rotate: 0deg;
    }

    30% {
      transform: translateY(-10px) translateX(10px);
      rotate: -5deg;
    }

    44% {
      transform: translateY(10px) translateX(15px);
      rotate: 10deg;
      filter: blur(0);
    }

    46% {
      rotate: 20deg;
      filter: blur(3px);
    }

    50% {
      transform: translateY(20px) translateX(5px);
      filter: blur(0);
    }

    58% {
      transform: translateY(0) translateX(20px);
    }

    72% {
      transform: translateY(10px) translateX(0);
      rotate: -5deg;
    }

    80% {
      transform: translateY(-10px) translateX(5px);
    }

    89% {
      rotate: 5deg;
      filter: blur(0);
    }

    92% {
      transform: translateY(10px) translateX(-5px);
      rotate: -10deg;
      filter: blur(3px);
    }

    94% {
      rotate: 0deg;
      filter: blur(0);
    }

    100% {
      transform: translateY(0) translateX(0);
    }
  }
</style>
