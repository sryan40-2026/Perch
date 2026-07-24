# How We Built Perch

A plain-English account of what we made and why. Written so you can understand
your own site, not so you can rebuild it from scratch.

Built in one session, 21 July 2026.

---

## The goal

A photo journal that alternates: one week your photograph, the next a guest
photographer's, each with a short written story. People subscribe by email. It
had to look clean and minimal, and — crucially — **posting had to take about
five minutes**, or it would never actually happen week after week.

(It started as a fixed pair — you and one other photographer — and became a
rotating guest slot shortly after launch. Nothing in the site had to change to
allow that, which is the sort of thing good structure buys you.)

That last constraint drove almost every decision below.

---

## The five decisions

### 1. No database

Most websites store their content in a database. We didn't. **Each entry is
just a text file and an image file in a folder.** That means nothing to
maintain, nothing to pay for, nothing that can go down, and you can read your
own content in ten years without special software.

### 2. A "static" site

There are two kinds of website. A *dynamic* one builds each page fresh every
time somebody visits — flexible, but there's a server running constantly and it
can break. A *static* one is built once, in advance, into plain files that just
get handed to visitors.

Perch is static. It's why hosting is free, why it loads instantly, and why
essentially nothing can break at 2am.

The tradeoff: the site has to be **rebuilt** whenever you add an entry. That
happens automatically, so you never think about it.

### 3. Publishing through git

There's no admin panel and no login. You add files to a folder and send them
up. That's the whole system.

It sounds more technical than a CMS, but it's fewer steps and there's nothing
to remember a password for. It also means every version of the site is kept
forever, so nothing can be permanently lost by mistake.

### 4. Email through Buttondown

The site doesn't send email — a service does. Buttondown was chosen because
it's small, text-forward, and free at your size. It's deliberately separate
from the site: if you ever leave Buttondown, the site is untouched.

### 5. One typeface

Courier Prime, a typewriter face redrawn for screens, on white. Not a stack of
fonts, not a design system — one face, one weight of ink, a lot of white space.
The restraint *is* the design.

---

## The pieces, and what each one does

| Piece | Its job | What it costs |
| --- | --- | --- |
| **Astro** | Turns your text and image files into a website | Free |
| **Your folder** | Where entries live, on your Mac | — |
| **GitHub** | Online copy + full history of every change | Free |
| **Vercel** | Watches GitHub, rebuilds, serves the site | Free |
| **Buttondown** | Sends the emails | Free at your size |

Nothing here has a bill attached. If Perch grows enough to change that, that's a
good problem.

### How they connect

```
Your folder  →  GitHub  →  Vercel  →  the live site
   (you)       (backup)   (builds)      (visitors)
```

You only ever touch the first box. The rest is automatic.

---

## What we actually did, in order

1. **Checked the docs first.** Astro had changed significantly in recent
   versions — enough that writing it from memory would have produced a site
   that didn't build at all. So the current syntax was verified against the
   official documentation before a single file was written.

2. **Scaffolded the project** and set up the *content collection* — the rules
   describing what an entry is: a week number, a date, a photographer, a photo,
   an optional title. Because these rules are enforced, a malformed entry fails
   loudly at build time instead of quietly publishing something broken.

3. **Built the pages.** The homepage stream, an individual page per entry so a
   single photo can be shared on its own, and an RSS feed.

4. **Designed the look.** White, black, generous space, Courier Prime.

5. **Handled photos carefully.** More on this below — it was the one real trap.

6. **Added the subscribe form**, first as a clearly-marked placeholder, later
   swapped for your real Buttondown form.

7. **Put it online.** GitHub, then Vercel. About twenty minutes.

8. **Published the first real entry** — the paste-up at Christian and 12th.

9. **Added an About page** so the project can be explained with one link.

---

## Three problems worth knowing about

**Photos were going to be cropped.** Recent Astro versions crop images by
default to make them fit. Your brief specifically said never crop. This would
not have thrown an error — it would have quietly cut the edges off any portrait
shot and nobody would have noticed for weeks. Fixed by configuring it
to preserve every photo's own shape, then verified by testing with deliberately
mismatched image shapes.

**Terminal wouldn't authenticate with GitHub.** GitHub stopped accepting
passwords in 2021 and wanted a security token instead. Rather than fight it, we
switched to GitHub Desktop, which handles that invisibly — and which makes your
weekly publishing two clicks instead of three typed commands. The better tool
for the job, not a workaround.

**iCloud was quietly deleting your files.** Your Desktop syncs to iCloud, and
iCloud had been removing local copies of files to save space — leaving
placeholders that look like real files but contain nothing. This is what broke
your music app, and it had started happening to Perch too. Fixed by moving both
projects to `~/Developer`, which iCloud doesn't touch.

That last one was a genuine near-miss: your music app wasn't backed up
anywhere, and some of its files — including your passwords file — existed only
in iCloud at the time. Everything was recovered intact, but it's the reason
that project should go on GitHub too.

---

## What you'd need to know to change something

- **The words on the About page** → `src/pages/about.astro`
- **The site's tagline** → `src/consts.ts`
- **Colors, spacing, type** → `src/styles/global.css`
- **The signup form** → `src/components/Subscribe.astro`
- **An entry** → the matching file in `src/content/entries/`

Everything else is machinery you can safely ignore.

---

## Where it stands

**Live:** https://perch-zeta-eight.vercel.app
**Code:** `~/Developer/perch` — also on GitHub at `sryan40-2026/Perch`

Week 1 is published. The subscribe form is wired up and waiting on Buttondown's
new-sender review. Week 2 is a guest week.

See `GUIDE.md` for how to publish it.
