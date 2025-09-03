<template>
  <div class="anim-glitch w-full h-full overflow-hidden pointer-events-none">
    <div class="relative w-full h-full">
      <div v-for="n in 3" :key="n" class="glitch absolute inset-0 w-full h-full will-change[clip-path]" />
    </div>
  </div>
</template>

<style scoped>
  .anim-glitch {
    --gap-x: -15px;
    --gap-y: 15px;

    @media (width >=768px) {
      --gap-x: -50px;
      --gap-y: 50px;
    }
  }

  .anim-glitch {
    animation: anim-rotate 6s 1s steps(1) infinite;
  }

  .glitch {
    opacity: 0;
    transform: translate3d(0, 0, 0);
    background: url(/images/circles_logo.svg) no-repeat center center;
    background-size: 100% 100%;
    animation: 3s 1s linear infinite;
  }

  .glitch:nth-child(1) {
    background-color: var(--color-primary);
    animation-name: anim-glitch-1;
  }

  .glitch:nth-child(2) {
    background-color: var(--color-secondary);
    animation-name: anim-glitch-2;
  }

  .glitch:nth-child(3) {
    background-color: var(--color-gray-500);
    animation-name: anim-glitch-3;
  }

  /* .glitch:nth-child(4) {
    background-color: #888;
    animation-name: anim-glitch-flash;
  } */

  @media (prefers-reduced-motion: reduce) {
    .anim-glitch,
    .glitch {
      animation: none;
    }
  }

  @keyframes anim-rotate {
    0% {
      rotate: 0deg;
    }

    50% {
      rotate: 180deg;
    }

    100% {
      rotate: 0deg;
    }
  }

  @keyframes anim-glitch-1 {
    0% {
      opacity: 1;
      transform: translate3d(var(--gap-x), 0, 0);
      clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
    }

    2% {
      clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%);
    }

    4% {
      clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%);
    }

    6% {
      clip-path: polygon(0 1%, 100% 1%, 100% 2%, 0 2%);
    }

    8% {
      clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
    }

    10% {
      clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
    }

    12% {
      clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
    }

    14% {
      clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
    }

    16% {
      clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
    }

    18% {
      clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
    }

    20% {
      clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%);
    }

    21.9% {
      opacity: 1;
      transform: translate3d(var(--gap-x), 0, 0);
    }

    22%,
    100% {
      opacity: 0;
      transform: translate3d(0, 0, 0);
      clip-path: polygon(0 0, 0 0, 0 0, 0 0);
    }
  }

  @keyframes anim-glitch-2 {
    0% {
      opacity: 1;
      transform: translate3d(calc(-1 * var(--gap-x)), 0, 0);
      clip-path: polygon(0 25%, 100% 25%, 100% 30%, 0 30%);
    }

    3% {
      clip-path: polygon(0 3%, 100% 3%, 100% 3%, 0 3%);
    }

    5% {
      clip-path: polygon(0 5%, 100% 5%, 100% 20%, 0 20%);
    }

    7% {
      clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%);
    }

    9% {
      clip-path: polygon(0 40%, 100% 40%, 100% 40%, 0 40%);
    }

    11% {
      clip-path: polygon(0 52%, 100% 52%, 100% 59%, 0 59%);
    }

    13% {
      clip-path: polygon(0 60%, 100% 60%, 100% 60%, 0 60%);
    }

    15% {
      clip-path: polygon(0 75%, 100% 75%, 100% 75%, 0 75%);
    }

    17% {
      clip-path: polygon(0 65%, 100% 65%, 100% 40%, 0 40%);
    }

    19% {
      clip-path: polygon(0 45%, 100% 45%, 100% 50%, 0 50%);
    }

    20% {
      clip-path: polygon(0 14%, 100% 14%, 100% 33%, 0 33%);
    }

    21.9% {
      opacity: 1;
      transform: translate3d(calc(-1 * var(--gap-x)), 0, 0);
    }

    22%,
    100% {
      opacity: 0;
      transform: translate3d(0, 0, 0);
      clip-path: polygon(0 0, 0 0, 0 0, 0 0);
    }
  }

  @keyframes anim-glitch-3 {
    0% {
      opacity: 1;
      transform: translate3d(0, calc(-1 * var(--gap-y)), 0) scale3d(-1, -1, 1);
      clip-path: polygon(0 1%, 100% 1%, 100% 3%, 0 3%);
    }

    1.5% {
      clip-path: polygon(0 10%, 100% 10%, 100% 9%, 0 9%);
    }

    2% {
      clip-path: polygon(0 5%, 100% 5%, 100% 6%, 0 6%);
    }

    2.5% {
      clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%);
    }

    3% {
      clip-path: polygon(0 10%, 100% 10%, 100% 10%, 0 10%);
    }

    5% {
      clip-path: polygon(0 30%, 100% 30%, 100% 25%, 0 25%);
    }

    5.5% {
      clip-path: polygon(0 15%, 100% 15%, 100% 16%, 0 16%);
    }

    7% {
      clip-path: polygon(0 40%, 100% 40%, 100% 39%, 0 39%);
    }

    8% {
      clip-path: polygon(0 20%, 100% 20%, 100% 21%, 0 21%);
    }

    9% {
      clip-path: polygon(0 60%, 100% 60%, 100% 55%, 0 55%);
    }

    10.5% {
      clip-path: polygon(0 30%, 100% 30%, 100% 31%, 0 31%);
    }

    11% {
      clip-path: polygon(0 70%, 100% 70%, 100% 69%, 0 69%);
    }

    13% {
      clip-path: polygon(0 40%, 100% 40%, 100% 41%, 0 41%);
    }

    14% {
      clip-path: polygon(0 80%, 100% 80%, 100% 75%, 0 75%);
    }

    14.5% {
      clip-path: polygon(0 50%, 100% 50%, 100% 51%, 0 51%);
    }

    15% {
      clip-path: polygon(0 90%, 100% 90%, 100% 90%, 0 90%);
    }

    16% {
      clip-path: polygon(0 60%, 100% 60%, 100% 60%, 0 60%);
    }

    18% {
      clip-path: polygon(0 100%, 100% 100%, 100% 99%, 0 99%);
    }

    20% {
      clip-path: polygon(0 70%, 100% 70%, 100% 71%, 0 71%);
    }

    21.9% {
      opacity: 1;
      transform: translate3d(0, calc(-1 * var(--gap-y)), 0) scale3d(-1, -1, 1);
    }

    22%,
    100% {
      opacity: 0;
      transform: translate3d(0, 0, 0);
      clip-path: polygon(0 0, 0 0, 0 0, 0 0);
    }
  }

  @keyframes glitch-text {
    0% {
      transform: translate3d(calc(-1 * var(--gap-x)), 0, 0) scale3d(-1, -1, 1);
      clip-path: polygon(0 20%, 100% 20%, 100% 21%, 0 21%);
    }

    2% {
      clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
    }

    4% {
      clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
    }

    5% {
      clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
    }

    6% {
      clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
    }

    7% {
      clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
    }

    8% {
      clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
    }

    9% {
      clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%);
    }

    9.9% {
      transform: translate3d(calc(-1 * var(--gap-x)), 0, 0) scale3d(-1, -1, 1);
    }

    10%,
    100% {
      transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    }
  }

  /* @keyframes anim-glitch-flash {
    0%,
    5% {
      opacity: 0.2;
      transform: translate3d(var(--gap-x), var(--gap-y), 0);
    }

    5.5%,
    100% {
      opacity: 0;
      transform: translate3d(0, 0, 0);
    }
  } */
</style>
