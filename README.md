# Reign Krista Garcia — AI Video Editor Portfolio

Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · Motion · Lucide.

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck && npm run lint && npm run build
```

## What to edit

| I want to…                         | Edit                                                     |
| ---------------------------------- | -------------------------------------------------------- |
| Change my email / phone                | `data/site.ts`                                           |
| Add my portrait                    | save `public/images/portrait.jpg`, set `hasPortrait: true` in `data/site.ts` |
| Add / reorder / rename videos      | `data/projects.ts`                                       |
| Add real testimonials              | `data/testimonials.ts` (section stays hidden while empty) |

## Media workflow (no redesign needed)

Every video is one object in `data/projects.ts` plus three files:

```
public/videos/<id>.mp4           web excerpt (what the modal plays)
public/videos/<id>-preview.mp4   3–5 s muted hover loop
public/images/<id>.jpg           poster frame
```

Generate them from a source file with ffmpeg:

```bash
# modal excerpt (first 60 s, 720p, fast-start)
ffmpeg -i source.mp4 -t 60 -vf "scale=720:-2" -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart public/videos/p12.mp4
# hover loop
ffmpeg -ss 1 -i source.mp4 -t 4 -an -vf "scale=360:-2,fps=24" -c:v libx264 -crf 30 -pix_fmt yuv420p -movflags +faststart public/videos/p12-preview.mp4
# poster
ffmpeg -ss 2 -i source.mp4 -frames:v 1 -vf "scale=720:-2" -q:v 3 public/images/p12.jpg
```

The site plays the **opening 60 seconds** of each edit and links to the **full, uncut video on Google Drive** (`fullUrl`). If you later move video hosting to a CDN (Cloudflare R2, Bunny, Mux…), change `video` / `preview` / `poster` in `data/projects.ts` to absolute URLs — nothing else changes.

Videos are lazy-loaded (`preload="none"` on cards), hover previews load only on hover, hero previews and cards pause when off-screen, and the modal frees its video on close.

## Deploy to Vercel

1. Push this folder to a GitHub repo (the `_source` folder is git-ignored; `public/` is ~100 MB, which Vercel accepts).
2. Vercel → **Add New → Project** → import the repo (framework preset: Next.js, no build overrides).
3. (Optional) set `NEXT_PUBLIC_SITE_URL` to your domain for correct share previews.
4. Deploy. Add your custom domain under **Settings → Domains**.

CLI alternative: `npx vercel` then `npx vercel --prod`.

## Structure

```
app/                 layout, page
components/sections  nav, hero, credibility, work, about, expertise, toolkit, why-me, process, testimonials, contact
components/ui        motion-kit (reveal, counters, cursor, magnetic, marquee), video-card, video-modal
data/                site.ts, projects.ts, testimonials.ts
public/videos|images web media
```

Motion respects `prefers-reduced-motion`; the custom cursor only runs on fine pointers.

## Push to GitHub

```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Create the empty repo on github.com first (no README / .gitignore / license). The `_source` folder (original full-length videos) is git-ignored on purpose.
