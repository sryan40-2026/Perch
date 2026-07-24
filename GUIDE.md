# Perch — Plain English Guide

Everything about how this site works, written assuming you know nothing about
code. Keep this open when you publish.

---

## Part 1 — What Perch is

A photo journal that alternates. One week the photograph is yours; the next it
belongs to a guest photographer, credited under their own name. Each entry has a
short written story underneath. People subscribe by email and get each new entry
in their inbox.

**Live site:** https://perch-zeta-eight.vercel.app

---

## Part 2 — What we built, in plain English

The site has no admin panel, no login, and no database. That's deliberate — it's
what keeps it simple and free. Instead, **each entry is just a text file and an
image file** sitting in a folder on your computer.

Four pieces make it work:

### 1. Your folder — `~/Developer/perch`

The whole website lives here. The parts you'll actually touch:

| Folder | What's in it |
| --- | --- |
| `src/images/` | The photographs |
| `src/content/entries/` | One text file per entry (the story + details) |

Everything else is machinery. You never need to open it.

### 2. GitHub — the online copy

GitHub stores a synchronized copy of your folder online. Think of it as Dropbox
for code, with a history of every change.

Your repo: `github.com/sryan40-2026/Perch`

### 3. Vercel — the publisher

Vercel watches GitHub. **Every time you send changes to GitHub, Vercel
automatically rebuilds the website and puts it online.** You don't push a
"publish" button — sending the files *is* publishing.

### 4. Buttondown — the email

Sends entries to subscribers. The signup box at the bottom of the site feeds
into it. Sending each week's email is a manual step you do in Buttondown.

### How a photo gets from your desk to the internet

```
You add 2 files      GitHub Desktop        Vercel sees the       Site updates
to the perch    →    sends them to    →    change and           →  (~3 min)
folder               GitHub                rebuilds
```

---

## Part 3 — Five words worth knowing

You'll see these in GitHub Desktop. That's the only reason to learn them.

- **Repository (repo)** — your project folder, tracked for changes.
- **Commit** — saving a snapshot with a short note about what changed. Local
  only; nothing is public yet.
- **Push** — sending your commits up to GitHub. *This is the step that makes
  things go live*, because Vercel is watching.
- **Build** — Vercel converting your files into a real website. Takes a few
  minutes. Resizing photos is the slow part.
- **Deploy** — the finished build going live.

The short version: **commit = save, push = publish.**

---

## Part 4 — Posting a guest week

Do this when a guest sends you a photo and a story. The example below uses Tony
Bennett for week 2 — swap in whoever's week it is.

### Step 1 — Save the photo

Put their image file in `~/Developer/perch/src/images/` and rename it using the
week number and their first name:

```
week-02-tony.jpg
```

Any size or shape is fine. Don't crop or resize it — the site handles that and
deliberately never crops.

### Step 2 — Create the text file

In `~/Developer/perch/src/content/entries/`, make a new file with the matching
name:

```
week-02-tony.md
```

**Easiest way:** duplicate `week-01-sean.md` (right-click → Duplicate), rename
the copy, then open it in TextEdit and change the contents.

Paste this in and edit it:

```markdown
---
week: 2
date: 2026-07-28
photographer: Tony Bennett
photo: ../../images/week-02-tony.jpg
title: Their Title Here
---

Their story goes here. Write as many paragraphs as you like — leave a blank
line between them.
```

The `photographer:` line is free text, so any name works — that's what makes
guest weeks possible without changing anything else.

Everything between the two `---` lines is the settings. Everything below is the
story.

> **If using TextEdit:** first do **Format → Make Plain Text**, or it will save
> a rich-text file that breaks the build.

### Step 3 — Publish

1. Open **GitHub Desktop**
2. It shows your changed files on the left
3. In the **Summary** box — the *narrow top one* — type `Week 2 — Tony`
4. Click **Commit to main**
5. Click **Push origin** at the top

### Step 4 — Wait, then check

Give it about 3 minutes, then reload the site. The guest's photo should be at
the top, yours below it.

### Step 5 — Send the email

Log into Buttondown and send the broadcast to subscribers.

**Total: about 5 minutes.**

---

## Part 5 — The settings explained

```markdown
week: 2                                  A number. Shows in the byline.
date: 2026-07-28                         YYYY-MM-DD. Controls the order —
                                         newest goes on top.
photographer: Tony Bennett               Name as it should appear. Any name.
photo: ../../images/week-02-tony.jpg     Must match the image filename exactly.
title: Rooftop                           Optional. Falls back to "Week 2".
```

The `../../` in the photo line means "go up two folders." Leave it as-is and
only change the filename.

**Naming pattern:** `week-03-sean.md`, `week-04-kevin.md`, and so on. The
filename becomes the web address — `week-02-kevin.md` lives at
`/entry/week-02-kevin/`.

---

## Part 6 — When something goes wrong

**Commit button is greyed out** — the Summary box (narrow, top) is empty. Text
typed into the larger Description box below doesn't count.

**Site didn't update** — you committed but didn't push. Check for "Push origin"
at the top of GitHub Desktop.

**Vercel says the build failed** — almost always the text file. Check: the two
`---` lines are present, the `photo:` filename matches the actual image exactly
(including `.jpg` vs `.jpeg`), and the date is `YYYY-MM-DD`. Your live site
stays up when a build fails — the old version keeps serving until a good build
replaces it. Nothing breaks publicly.

**Photo looks wrong** — it shouldn't be cropped, ever. If it is, something's off
in the settings; send me the file.

---

## Part 7 — Where things stand

**Done:**
- Site built and live
- Week 1 published — "Christian and 12th"
- Subscribe form connected to Buttondown
- RSS feed working

**Waiting:**
- Buttondown is holding the account for a routine new-sender review (1–3
  business days). The signup form is live but may error until they clear it.
  **Don't share the URL widely until that's resolved** — a broken signup on
  launch day is the one thing worth avoiding.

**Optional later:**
- A custom domain instead of the `.vercel.app` address. If you buy one, it gets
  connected in Vercel, and one line in `astro.config.mjs` needs updating.
