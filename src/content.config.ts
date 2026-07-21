import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Astro 7: config lives at src/content.config.ts (NOT src/content/config.ts),
// and a `loader` is required — the old `type: 'content'` form is gone.
const entries = defineCollection({
  loader: glob({ base: './src/content/entries', pattern: '**/*.md' }),
  // The function form of `schema` is what exposes the `image()` helper.
  schema: ({ image }) =>
    z.object({
      week: z.number(),
      date: z.coerce.date(),
      photographer: z.string(),
      photo: image(),
      title: z.string().optional(),
    }),
});

export const collections = { entries };
