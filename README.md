# Mag. Claudia Plessl — Raum & Ordnung

Business website for **Mag. Claudia Plessl**, Interior Designerin and certified
Ordnungscoach in Vienna and Lower Austria.

🔗 **Live:** [ainxtgendev.github.io/interior-design](https://ainxtgendev.github.io/interior-design/)

German is the primary language and lives at the site root; English is served
from `/en/`.

> **This repository is public and holds only the website.** Everything else —
> the businessplan and financial projections, the logo sources, and the video
> working project with its music bed and renders — lives in the private repo
> `AINxtGenDev/plessl-projekt`. They are split because GitHub Pages will not
> serve from a private repository on a free plan. Do not move material across
> that line without checking what it contains.

---

## Stack

| Detail | Value |
|---|---|
| Framework | Next.js 16 (App Router, `output: "export"`) |
| Styling | Tailwind CSS 4 |
| Language | TypeScript |
| Fonts | Cormorant Garamond · Inter · Jost — self-hosted at build time via `next/font` |
| Colours | Sage `#7a9468` · Anthracite `#333338` · Warm cream `#f3efe8` · Gold `#c9a96e` |
| Hosting | GitHub Pages, deployed by GitHub Actions on every push to `main` |

The palette and type are derived from the brand cover image; the hero and
detail photography are crops of that same asset, so the site ships no
third-party imagery.

### Logo

`brand/logo-optimized/` holds the current artwork — the monogram redrawn from
the business card, de-pixelated, with a real alpha channel, in every size the
site and mobile devices need. `logo-dokumentation.md` in that folder is the
supplier's own notes. It replaced the extraction from
`brand/logo-original-scan.pdf` (a 300 DPI Simple Scan), which is kept only as
the historical source.

| Use | File in the set | Path in this repo |
|---|---|---|
| Header / footer mark | `wpl-logo-256.webp` | `website/src/assets/logo-mark.webp` |
| Favicon, 16–256 px | `favicon.ico` | `website/src/app/favicon.ico` |
| Icon, 512 px | `wpl-logo-512.png` | `website/src/app/icon.png` |
| iOS touch icon | `apple-touch-icon.png` | `website/src/app/apple-icon.png` |
| Android / manifest | `android-chrome-{192,512}.png` | `website/public/icons/` |

The three files under `src/app/` are Next.js file conventions — they emit their
own `<link>` tags, so nothing is hand-wired into the layouts. The Android icons
are reachable only through `src/app/manifest.ts`; note that **Next does not
apply `basePath` inside manifest strings**, so `start_url`, `scope` and every
icon path prefix it themselves from `NEXT_PUBLIC_BASE_PATH`.

256 px is enough for the mark: the largest it is ever drawn is 64 px in the
footer, i.e. 192 px at 3× pixel density. That makes it 22.8 KB instead of the
scan's 87.6 KB.

**The wordmark is live text, not part of the image.** The scanned "CLAUDIA
PLESSL" and the hairline rules around "INTERIOR DESIGN" were too faint to
extract cleanly — the rules peak at a colour distance of 41 against paper noise
of 18 — so they are set in Jost with letter-spacing, which matches the card,
stays crisp at any size, and is selectable and translatable.

> **Worth doing:** ask the designer for the original vector logo (SVG, AI, EPS).
> The redrawn set is clean, but it is still raster — print and very large
> renditions want true vector artwork. A light negative version is also missing,
> which is what a dark header or a dark mode would need.

#### The mark turns

`website/src/components/LogoMark.tsx` rotates the monogram once every 24
seconds around its vertical axis, in the header and the footer.

It is built as a **two-sided card, not a plain rotation**. A flat image turned
past 90° shows its own mirror image, which would leave the monogram reading
backwards for half of every turn; instead both faces carry the logo, the back
one pre-flipped, and `backface-visibility` hands over between them.

The animation exists **only** inside `@media (prefers-reduced-motion:
no-preference)` — there is no ungated rule — so the logo stands still for anyone
who has asked for less motion. Keep it that way if you touch this: continuous
movement in a sticky header is precisely what that preference is for.

The artwork carries its own safe-area margin (content fills 77 % of the square,
where the old scan filled 98 %), so the header and footer run one size larger
than they did with the scan. Shrink them and the logo starts reading small.

---

## Structure

```
.
├── .github/workflows/deploy.yml   → build + deploy to GitHub Pages
├── brand/
│   ├── logo-optimized/            → current logo set + supplier documentation
│   └── logo-original-scan.pdf     → historical source scan of the business card
├── video-source/                  → storyboard, script and compositions for the intro film
├── handout/
│   └── claudia-plessl-uebersicht.html   → offline one-pager for phone/tablet
└── website/
    ├── src/
    │   ├── app/
    │   │   ├── favicon.ico        → favicon 16–256 px (Next file convention)
    │   │   ├── icon.png           → 512 px icon (Next file convention)
    │   │   ├── apple-icon.png     → iOS touch icon (Next file convention)
    │   │   ├── manifest.ts        → web app manifest, Android icons
    │   │   ├── (de)/              → German root layout, lang="de-AT"
    │   │   │   ├── page.tsx       → /
    │   │   │   ├── impressum/     → /impressum/
    │   │   │   ├── datenschutz/   → /datenschutz/
    │   │   │   └── agb/           → /agb/
    │   │   ├── (en)/              → English root layout, lang="en"
    │   │   │   └── en/
    │   │   │       ├── page.tsx   → /en/
    │   │   │       └── legal/     → /en/legal/
    │   │   └── globals.css        → design tokens + base styles
    │   ├── assets/                → images imported by the build
    │   ├── components/            → HomePage, SiteHeader, SiteFooter, LogoMark,
    │   │                            IntroVideo, LegalShell
    │   └── content/site.ts        → all page copy, both languages
    └── public/
        ├── og-image.jpg           → social preview
        ├── icons/                 → Android icons referenced by the manifest
        └── video/                 → intro film, poster, German subtitles
```

### Editing the copy

Nearly all text lives in **`website/src/content/site.ts`** as one typed object
covering both languages. A missing translation is a build error rather than a
silent gap, so add German and English together. The legal pages are the
exception — their text sits in the page components, because it is
document-shaped rather than reusable.

---

## Development

```bash
cd website
npm install
npm run dev     # http://localhost:3000/interior-design
npm run build   # static export into website/out
npx eslint src  # lint
```

To preview the production build exactly as Pages serves it:

```bash
cd website && npm run build
mkdir -p /tmp/preview && cp -r out /tmp/preview/interior-design
cd /tmp/preview && python3 -m http.server 8787 --protocol HTTP/1.1
# → http://localhost:8787/interior-design/
```

> **Do not drop `--protocol HTTP/1.1`.** The default is HTTP/1.0, which closes
> the connection after every response; Chrome then reports six bogus "preloaded
> using link preload but not used" warnings for the fonts. Same build, same
> files, no warnings once keep-alive is on — but it looks exactly like a real
> regression if you are checking the console.

---

## Four decisions worth knowing before you edit

**1. `@theme`, not `@theme inline`.** Tailwind's `inline` mode does not emit the
design tokens as real `:root` custom properties — it substitutes them into
generated utilities and tree-shakes the rest. Hand-written CSS in `globals.css`
uses `var(--font-heading)` and friends directly, so `inline` silently broke
every heading, body and label font back to the browser default sans. Keep
`@theme`.

**2. Font variables live on `<html>`, not `<body>`.** `--font-cormorant` and the
other `next/font` variables must exist at `:root` for the `@theme` tokens that
reference them to resolve.

**3. Images are statically imported, never referenced by string.** A plain
`src="/hero.webp"` resolves to the domain root and 404s under the
`/interior-design` base path. Import from `src/assets/` so Next rewrites the URL.

**4. Two root layouts, one per language.** `app/(de)/layout.tsx` and
`app/(en)/layout.tsx` each render their own `<html>`, which is how each language
gets a correct `lang` attribute. There is deliberately no `app/layout.tsx` —
adding one would break the route-group setup. Static export has no middleware or
redirects, so language switching is explicit links by necessity, and section
anchors are shared across both languages so the switcher keeps the reader's place.

---

## Intro film

A 58-second German-narrated introduction sits between the hero and the services
section, self-hosted at `website/public/video/vorstellung.mp4` (1080×1920,
4.2 MB, faststart, −14.5 LUFS) with a poster frame and a German WebVTT subtitle
track. **Subtitles are off by default** — the `<track>` carries no `default`
attribute, so nothing is overlaid on the film; a viewer can still switch them on
from the player's own controls.

**Self-hosted on purpose.** A YouTube or Vimeo embed would put third-party
requests and cookies on a site that currently has neither — and would oblige a
rewrite of the Datenschutzerklärung. `preload="metadata"` means a visitor who
never presses play downloads a few KB, not 4.2 MB.

Plan, script and compositions are in [`video-source/`](video-source/); that
README also covers the voiceover route (Gemini TTS — Kokoro has no German and
this HeyGen account exposes no German voice) and the music bed.

**Music was replaced on 2026-08-16.** The bed had been built from a Queen
recording; it is now `casa_in_ordine.mp3`, a Suno-generated instrumental. The
swap was audio-only — the video stream is byte-identical to the original render
(`5b518475…`), so the picture never went through a second encode. Worth
confirming that the Suno plan it came from grants commercial use.

The full HyperFrames working project (renders, voiceover, assets) lives outside
this repository, in the **private** repo `AINxtGenDev/plessl-projekt` under
`79_plessl-video/`, together with the business documents — none of that belongs
in this public repository.

## Verified on the live site

Measured against the deployed URL, not assumed. Last re-measured 2026-08-16,
after the logo change, with the cache disabled:

| Check | Result |
|---|---|
| All 6 page routes | 200 |
| `manifest.webmanifest`, `favicon.ico`, `icon.png`, `apple-icon.png` | 200 |
| Android icons under `/icons/` | 200 |
| **Total requests** | **35 — none to a third party** |
| Cookies / localStorage | none / none |
| Fonts | Cormorant Garamond, Inter, Jost — loaded self-hosted |
| Internal links | all 200, no `basePath` 404s |
| Console | no errors, no warnings |
| Weight | 637 KB, `load` 140 ms |
| Heading outline | one h1, no skipped levels |
| Horizontal scroll at 320 px | none (measured under device emulation) |
| Logo rotation | running, 24 s, `matrix3d`; monogram not mirrored at 0/45/135/180° |

That first-party-only result is what makes the Datenschutzerklärung's "no
cookies, no tracking, no third-party requests" claim actually true. **Keep it
that way** — adding an embedded map, a web font, a YouTube embed, a contact-form
service or an analytics snippet all break it, and each one obliges you to update
the privacy page.

> GitHub Pages caches aggressively. After a deploy the previous version may be
> served for a short while — hard-reload before concluding something is broken.

### Accessibility

Skip-to-content link (localised, visible on focus), visible focus rings, tap
targets ≥44 px on standalone controls, `prefers-reduced-motion` honoured —
including the rotating logo, which simply stands still — decorative images with
empty `alt` and `aria-hidden` on the mark, and a correct heading outline.

There is **no mobile nav menu** — the in-page section links are hidden below
`lg`. That is deliberate for a one-pager, since scrolling reaches everything,
but it becomes a gap the moment the site grows past a single page.

## Custom domain

`next.config.ts` reads `BASE_PATH` (default `/interior-design`). When a custom
domain is pointed at Pages:

1. Set `BASE_PATH: ""` in `.github/workflows/deploy.yml`.
2. Add the domain in the repository's Pages settings (creates a `CNAME`).
3. Update `SITE_URL` in both `src/app/(de)/layout.tsx` and `src/app/(en)/layout.tsx`.

---

## Before this goes in front of customers

The legal pages are drafted against Austrian law but contain placeholders,
shown on the page as highlighted `[…]` markers. **They must be filled in and the
AGB reviewed by the WKO or a lawyer before the site is promoted.**

| Item | Where |
|---|---|
| GISA number, exact Gewerbewortlaut, UID / Kleinunternehmer status | `/impressum/` |
| Competent trade authority (BH Tulln assumed, unconfirmed) | `/impressum/` |
| WKO Fachgruppe | `/impressum/` |
| Third-country transfer basis for GitHub hosting | `/datenschutz/` |
| Cancellation windows and fees, deposit threshold, workshop minimum | `/agb/` |
| VAT status statement | `/agb/` |

Notes:

- The **EU ODR platform was shut down on 20 July 2025** (Regulation (EU)
  2024/3228). The AGB deliberately does *not* carry the link that most
  boilerplate templates still include, and points at Austrian ADR bodies instead.
- The Austrian **Kleinunternehmergrenze is EUR 55,000 gross** as of 2025. The
  business plan projects EUR 52,000, which leaves little headroom — worth
  watching, since crossing it changes the invoicing and the AGB wording.
- Claudia's academic degree is not on the site; only the certification and
  ongoing training are listed. Add it in `site.ts` under `about.credentials`.

---

## Copyright

© 2026 Mag. Claudia Plessl. All rights reserved. The site content, imagery and
brand are not licensed for reuse.
