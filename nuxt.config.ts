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
  modules: ['@nuxt/content', '@nuxt/eslint', '@nuxt/fonts', '@nuxt/icon', '@nuxt/image', '@nuxt/scripts', 'lenis/nuxt', '@nuxtjs/i18n'],
  i18n: {
    strategy: 'prefix',
    defaultLocale: 'en',
    detectBrowserLanguage: false,
    // vueI18n: './i18n/i18n.config.ts',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'es', name: 'Spanish', file: 'es.json' }
    ],
    customRoutes: 'config', // disable custom route with page components
    pages: {
      home: {
        en: '/home',
        es: '/home'
      },
      band: {
        en: '/band',
        es: '/banda'
      },
      merch: {
        en: '/merch',
        es: '/merch'
      },
      music: {
        en: '/music',
        es: '/musica'
      },
      'music-slug': {
        en: '/music/[slug]',
        es: '/musica/[slug]'
      },
    },
  },
  app: {
    head: {
      title: 'Skizophonic',
      htmlAttrs: {
        lang: 'en',
        dir: 'ltr',
      },
      meta: [
        {
          name: 'description',
          content: 'Music band based in Benicasim and Castellón, Spain',
        },
        { name: 'author', content: 'Dan Alcaide' },
        { name: 'generator', content: 'Coffe and chocolate' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'apple-mobile-web-app-title', content: 'Skizophonic' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', media: '(prefers-color-scheme: light)', href: '/favicons/favicon-light-mode.svg' },
        { rel: 'icon', type: 'image/svg+xml', media: '(prefers-color-scheme: dark)', href: '/favicons/favicon-dark-mode.svg' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicons/favicon-96x96.png' },
        // { rel: 'icon', type: 'image/x-icon', href: '/favicons/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', type: 'image/x-icon', href: '/favicons/apple-touch-icon.png' },
        { rel: 'manifest', href: '/favicons/site.webmanifest' },
      ]
    }
  },
  fonts: {
    defaults: {
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
    google: {
      families: {
        'Inter': [600, 700, 800, 900],
      },
      display: 'swap'
    },
  },
})
