<template>
  <div id="page-transition-overlay" class="fixed z-90 inset-0 w-screen h-dvh opacity-0 invisible">
    <div id="page-transition-grid" class="absolute z-95 inset-0 w-full h-full">
      <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" fill="black">
        <rect width="21%" height="100%" x="0" y="0" />
        <rect width="22%" height="100%" x="20%" y="0" />
        <rect width="23%" height="100%" x="40%" y="0" />
        <rect width="24%" height="100%" x="60%" y="0" />
        <rect width="25%" height="100%" x="80%" y="0" />
      </svg>
    </div>

    <div class="absolute z-96 inset-0 w-full h-full flex items-center justify-center">
      <div id="page-transition-circles" class="inner size-48">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 288.32 288.32" aria-hidden="true" role="img" fill="white">
          <path class="center-ring" d="M150.64,102.09h-.01c-23.24-3.57-44.96,12.37-48.53,35.61-3.57,23.23,12.37,44.95,35.6,48.52,23.22,3.57,44.95-12.37,48.52-35.6s-12.36-44.96-35.58-48.53Z" />
          <path class="middle-ring" d="M159.24,46.05c-54.18-8.32-104.85,28.84-113.18,83.03-8.33,54.2,28.84,104.85,83.03,113.18,54.18,8.32,104.85-28.83,113.18-83.03,8.32-54.19-28.85-104.84-83.03-113.18ZM199.18,152.61c-4.67,30.38-33.1,51.24-63.48,46.57-30.4-4.67-51.24-33.1-46.57-63.49,4.67-30.4,33.08-51.24,63.47-46.57,30.38,4.67,51.24,33.1,46.57,63.49h0Z" />
          <path class="outer-ring" d="M166.06,1.69C87.37-10.4,13.79,43.58,1.69,122.26c-12.09,78.68,41.89,152.27,120.57,164.35,78.68,12.09,152.27-41.88,164.36-120.57C298.72,87.37,244.73,13.78,166.06,1.69ZM254.97,161.18c-9.4,61.19-66.64,103.19-127.84,93.78-61.2-9.41-103.17-66.65-93.77-127.84,9.4-61.18,66.63-103.18,127.83-93.77,61.2,9.41,103.18,66.65,93.78,127.83Z" />
        </svg>
      </div>
    </div>
  </div>
</template>

<style>
  :root {
    --scaleColumnsTransition: 0;
  }

  #page-transition-grid rect {
    transform: scaleY(var(--scaleColumnsTransition));
    transform-origin: bottom;
    will-change: auto;
  }
</style>
