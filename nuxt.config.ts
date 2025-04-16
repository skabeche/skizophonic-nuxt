import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false, // Need to disable server-side rendering to prevent error 500 (no idea why yet).
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    'lenis/nuxt'
  ],
  fonts: {
    defaults: {
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
    google: {
      families: {
        'Montserrat': [300, 400, 500, 600, 700],
        'Poppins': [600, 700, 800, 900],
        'Lato': [700, 800, 900],
        'League Spartan': [700, 800, 900],
        'Public Sans': [700, 800, 900],
      },
      display: 'swap'
    },
  },
})