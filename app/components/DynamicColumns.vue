<template>
  <svg class="dynamic-columns w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" :fill="fillColor">
    <g class="flex">
      <g v-for="n in numColumns" :key="n" class="rect">
        <rect :width="`${getWidth(n)}%`" height="100%" :x="`${getX(n)}%`" y="0" />
      </g>
    </g>
  </svg>
</template>

<script setup>
  const props = defineProps({
    numColumns: {
      type: Number,
      default: 5
    },
    fillColor: {
      type: String,
      default: 'black'
    }
  })

  const getWidth = (n) => {
    return (100 / props.numColumns) + n;
  }
  const getX = (n) => {
    return ((n - 1) * 100) / props.numColumns;
  }
</script>
