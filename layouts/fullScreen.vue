<template>
  <div>
    <AppHeader />
    <main>
      <slot />
    </main>
  </div>
</template>

<style>
  html {
    overflow: hidden;
    overscroll-behavior: none;
  }
</style>
