import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().min(1),
    // Minidescripcion entre parentesis junto al titulo en el listado del Blog.
    excerpt: z.string().min(1),
  }),
});

export const collections = { blog };
