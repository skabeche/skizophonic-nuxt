// Doesn't seem to work on all cases and pages.
// Disabled for now until the issue is found (maybe due to transitions page?) or a better solution is done.

// import { defineNuxtPlugin } from '#app';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { nextTick } from 'vue';
// import { useRefreshScrollTriggerById } from "#imports";

// export default defineNuxtPlugin((nuxtApp) => {
//   gsap.registerPlugin(ScrollTrigger);

//   nuxtApp.hook('page:loading:end', async () => {
//     await nextTick();
//     useRefreshScrollTriggerById('footer-trigger');
//   })
// })
