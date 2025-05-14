import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    music: defineCollection({
      type: 'page',
      source: '**/music/*.md',
      schema: z.object({
        date: z.string()
      })
    })
  }
})
