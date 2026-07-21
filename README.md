# Perch

A two-person photo journal. Sean Ryan and Kevin Lawrence trade one photo a week,
each with a short story underneath. Readers subscribe by email.

Astro 7, static output, no database, no admin panel. Publishing is git-based.

---

## Publishing a new entry (~5 minutes)

1. **Add the photo** to `src/images/` — name it to match the entry, e.g.
   `week-03-sean.jpg`. Any aspect ratio is fine; nothing gets cropped.
2. **Create the markdown file** in `src/content/entries/`, e.g.
   `week-03-sean.md`:

   ```markdown
   ---
   week: 3
   date: 2026-07-31
   photographer: Sean Ryan
   photo: ../../images/week-03-sean.jpg
   title: Optional Short Title
   ---

   The story goes here. Plain paragraphs, as long or short as you like.
   ```

3. **Commit and push** to GitHub. This works from the GitHub web UI on a phone —
   no terminal needed.
4. **Vercel auto-deploys.** Live in about a minute.
5. **Send the email**: log into Buttondown and send a broadcast.

The filename becomes the URL: `week-03-sean.md` → `/entry/week-03-sean/`.

### Frontmatter fields

| Field          | Required | Notes                                       |
| -------------- | -------- | ------------------------------------------- |
| `week`         | yes      | number                                      |
| `date`         | yes      | `YYYY-MM-DD`; controls ordering on the site |
| `photographer` | yes      | name as it should appear in the byline      |
| `photo`        | yes      | path relative to the markdown file          |
| `title`        | no       | falls back to "Week N" if omitted           |

If a field is missing or the wrong type, the build fails with a clear message
rather than publishing something broken.

---

## Before this goes live — two TODOs

1. **Buttondown embed.** `src/components/Subscribe.astro` contains a
   deliberately non-functional placeholder form. Get the real snippet from
   Buttondown → Settings → Embedding and paste it in; instructions are in the
   file. **No one can subscribe until you do this.**
2. **Site URL.** `astro.config.mjs` has `site: 'https://perch.vercel.app'`.
   Change it to the real URL once Vercel assigns one (or your custom domain).
   RSS links are absolute and depend on it.

---

## Local commands

| Command           | Does                                     |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | dev server at `localhost:4321`           |
| `npm run build`   | production build into `dist/`            |
| `npm run preview` | serve the built site locally             |
| `npx astro check` | typecheck + validate content frontmatter |

## Deploying to Vercel

Static output needs no adapter and no configuration. Push the repo to GitHub,
import it at vercel.com, and Vercel auto-detects Astro. Every push to the
default branch redeploys.

## Structure

```
src/
  content.config.ts        collection schema (Astro 7 location)
  consts.ts                site title + description
  content/entries/         one markdown file per week
  images/                  the photos
  components/
    Entry.astro            photo + story + byline
    Subscribe.astro        <- TODO: Buttondown snippet
  layouts/Base.astro       page shell, header, footer
  pages/
    index.astro            the journal stream
    entry/[slug].astro     permalink pages
    rss.xml.ts             RSS feed
  styles/global.css        all styling
```

## A note on the sample entries

`week-01-sean.md` and `week-02-kevin.md` are placeholders with generated
grey test images, there to show the layout. Delete both files and their images
from `src/images/` when the real first entry goes up.
