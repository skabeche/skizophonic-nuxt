<template>
  <span class="anim-drop-shadow inline-block transition-all duration-200 ease-out" @mousemove="handleMouseMove" @mouseout="handleMouseOut">
    <slot />
  </span>
</template>

<script setup>
  import gsap from "gsap";

  const movement = 15;

  const handleMouseMove = (e) => {
    // @todo Make a composable.
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    const x = Math.round(((relX - rect.width / 2) / rect.width) * movement);
    const y = Math.round(((relY - rect.height / 2) / rect.height) * movement);

    gsap.set(target, { filter: `drop-shadow(${x}px ${y}px 1px #ff0047) drop-shadow(${-x}px ${-y}px 1px #00ffc7)` })
  }

  const handleMouseOut = (e) => {
    const target = e.currentTarget;

    gsap.set(target, { filter: `drop-shadow(0px 0px 0px #ff0047) drop-shadow(0px 0px 0px #00ffc7)` })
  }
</script>