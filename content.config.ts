import { defineCollection, defineContentConfig, z } from "@nuxt/content";
import { asSitemapCollection } from "@nuxtjs/sitemap/content";

export default defineContentConfig({
  collections: {
    music: defineCollection(
      asSitemapCollection(
        {
          type: "page",
          source: "**/music/*.md",
          schema: z.object({
            date: z.string(),
          }),
        },
        {
          name: "music",
          onUrl: (url) => {
            // Map English path
            if (url.loc.startsWith("/en/")) {
              url.loc = url.loc.replace("/en/", "/");
            }
            // Map Spanish path
            if (url.loc.startsWith("/es/music/")) {
              url.loc = url.loc.replace("/music/", "/musica/");
            }
          },
        },
      ),
    ),
  },
});
