import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE } from '../consts';

// Astro 7 requires a named `GET` export (the old lowercase `get` is gone).
export async function GET(context: APIContext) {
  const entries = await getCollection('entries');

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site!,
    items: entries
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map((entry) => ({
        title: entry.data.title ?? `Week ${entry.data.week}`,
        pubDate: entry.data.date,
        description: `Week ${entry.data.week} — photograph by ${entry.data.photographer}.`,
        link: `/entry/${entry.id}/`,
      })),
  });
}
