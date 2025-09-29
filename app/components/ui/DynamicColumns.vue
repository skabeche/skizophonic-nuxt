<template>
  <svg class="dynamic-columns w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" :fill="fillColor">
    <rect v-for="n in numColumns" :key="n" :width="`${calculateWidth()}%`" height="100%" :x="`${calculateX(n)}%`" y="0" />
  </svg>
</template>

<script setup>
  const props = defineProps({
    min: {
      type: Number,
      default: 5
    },
    max: {
      type: Number,
      default: 5
    },
    fillColor: {
      type: String,
      default: 'black'
    }
  })

  // Pick a random number of columns between min and max.
  const numColumns = computed(() => {
    return Math.floor(Math.random() * (props.max - props.min + 1)) + props.min
  })

  /**
   * Calculate the width of each column, adding a small overlap
   * to prevent sub-pixel gaps between columns in some browsers.
   * @returns {number} The width of the column in percentage.
   */
  const calculateWidth = () => {
    return (100 / numColumns.value) + 1;
  }

  /**
   * Calculate the x position of the nth column in percentage.
   * @param {number} n - The number of the column.
   * @returns {number} The x position of the column in percentage.
   */
  const calculateX = (n) => {
    return ((n - 1) * 100) / numColumns.value;
  }
</script>
