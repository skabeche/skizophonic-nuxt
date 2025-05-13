<template>
  <span class="anim-text-shadow inline-block" @mousemove="handleMouseMove" @mouseout="handleMouseOut">
    <slot />
  </span>
</template>

<script setup>
  import gsap from "gsap";

  const handleMouseMove = (e) => {
    // @todo Make a composable.
    const target = e.currentTarget;
    const movement = 15;
    const rect = target.getBoundingClientRect();
    const relX = e.pageX - (rect.left + window.scrollX);
    const relY = e.pageY - (rect.top + window.scrollY);

    const containerWidth = target.offsetWidth;
    const containerHeight = target.offsetHeight;
    const x = ((relX - containerWidth / 2) / containerWidth) * movement;
    const y = ((relY - containerHeight / 2) / containerHeight) * movement;
    // Mirrored axis.
    const x2 = x - x * 2;
    const y2 = y - y * 2;

    gsap.to(target, {
      duration: 0.1,
      textShadow: `${x}px ${y}px 1px #ff0047, ${x2}px ${y2}px 1px #00ffc7`,
      ease: 'none',
    });
  }
  const handleMouseOut = (e) => {
    const target = e.currentTarget;

    gsap.to(target, {
      duration: 0.1,
      textShadow: '0px 0px 0px #ff0047, 0px 0px 0px #00ffc7',
    });
  }
</script>
