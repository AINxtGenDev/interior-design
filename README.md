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
| Fonts | Manrope · Montserrat (CI.pptx slide 6) — self-hosted at build time via `next/font` |
| Colours | Sage `#7a9468` · Anthracite `#333338` · Warm cream `#f3efe8` · Gold `#c9a96e` |
| Hosting | GitHub Pages, deployed by GitHub Actions on every push to `main` |

The palette and type are derived from the brand cover image; the hero and
detail photography are crops of that same asset, so the site ships no
third-party imagery.

### Open Graph cards

`website/public/og-image-de.jpg` and `-en.jpg`, built by `build_og_images.py`
from the original hand-made `og-image.jpg` (which stays as the build input).

The card is flat pixels — photo, headline and descriptor, no layers and no
generator — and one file used to serve both languages, so **every German share
showed a German headline over an English descriptor**. Now each locale points at
its own card and the descriptor matches the site's eyebrow line, workshops
included.

Only the bottom line is touched. It is erased by interpolating the wall between
the clean rows above and below (plus matched grain, or the patch reads as an
unnaturally smooth band) and re-set in the site's own Jost. The typography was
measured back off the original rather than guessed: 9 px cap height, 2.05 px
tracking, and a design axis at x = 574 — the card is deliberately not centred on
the image, its headline sits on 572.5 and 574.5.

The new lines are longer than the old one. The smooth wall carries 406 px around
that axis, so each language is fitted to 392 px **by tracking**, at constant type
size: the eye reads size, not tracking.

> The font is `brand/fonts/Jost-latin.ttf`, lifted from the site's own build
> output. The video project's copy used to be the **Cyrillic** subset and
> rendered no Latin at all; on 2026-08-19 it was replaced from this same build
> (see *Intro film*).

### Corporate identity (since 2026-10-02)

The site follows `CI.pptx`, supplied by the client. The deck is **not in this
public repo**; it lives in the private project repo at `55_laulau/ci/CI.pptx`.

| Slide | What it defines | Where it lives |
|---|---|---|
| 4 | Navigation: Home · Mein Angebot (Raumgestaltung, Ordnungscoaching, Raumgestaltung plus Ordnungscoaching, Re-Design) · Über mich · Projekte · FAQ · Kontakt | `SiteHeader.tsx` / `SiteNav.tsx`, section order in `HomePage.tsx` |
| 5 | Palette (Salbeigrün, Blush, Anthrazit — four tones each), page ground `#FAFBFA`, tiles, short blush rules | `@theme` in `globals.css` |
| 6 | Manrope Bold (headlines), Manrope Regular (body), Montserrat Regular (accents) | `src/app/fonts.ts`, type scale in `globals.css` |
| 9 | Claim "ENJOY YOUR HOME" | `.claim` band above the contact section |

Contrast decides which CI tone may carry text — measured, not assumed:
anthrazit-dark 12.5:1, sage-dark 5.2:1, anthrazit-mid 4.9:1 on the page ground;
**blush-dark is 3.3:1 and is therefore used only for rules, dots and large
accents**, never for running text. The one tone that is not in the deck,
`sage-ink` `#4E5C4C`, exists only for hover states.

### Logo and title image

`Logo2.png` and `Titelbild Homepage.png` (repo root) are the sources. Every web
derivative is built by **`brand/build_web_assets.py`**:

```bash
uv run --with pillow --with numpy --with opencv-python-headless \
    python brand/build_web_assets.py
```

| Output | From | Notes |
|---|---|---|
| `src/assets/logo-{480,960}.webp` | Logo2.png | trimmed to the mark, lossless, with alpha |
| `src/assets/hero-{narrow,medium,wide}-*.webp` | Titelbild | three crops around the painted slogan |
| `src/assets/hero-en-*.webp` | Titelbild | same crops, headline painted in English |
| `favicon.ico`, `icon.png`, `apple-icon.png`, `public/icons/*` | Logo2.png | CP monogram only (rows above 640) |

- **The logo is a plain `<img srcset>`** (`BrandLogo.tsx`), not `next/image`:
  `images.unoptimized` makes `next/image` emit one file and no `srcset`, so a
  3× phone would get either a blurry or an oversized logo.
- **The title image is art-directed** (`HeroImage.tsx`): 4:3 below 640 px,
  1.93:1 up to 1199 px, the full 2.41:1 frame above. Its slogan is painted on
  the wall; at full width on a phone it would be ~5 px tall.
- **English page:** only the two German headline lines are removed
  (glyph-stroke mask + inpaint) and "BEAUTIFUL SPACES. / A CLEARER DAY." is
  painted in their place by `english_headline()` — same face, size, colour and
  axis, so both languages look and scale identically. The rule and the
  "INTERIOR DESIGN • PROFESSIONAL ORGANIZING" line stay original pixels.
  The face was **identified by measurement**: of 20 OFL serifs, only
  **Playfair Display Medium** fits the original word widths at natural
  spacing with the same amount of ink; re-setting the German lines with it
  gives 406/412 px against the original 409/409. Font and licence:
  `brand/fonts/PlayfairDisplay[wght].ttf`, `PlayfairDisplay-OFL.txt`.
- The previous round seal (`brand/logo-optimized/`) and its 24-second rotation
  are retired. A rotating wordmark is unreadable for half of every turn.

> **Still worth asking the designer for:** a vector logo (SVG/AI/EPS) and a
> light negative version.

**Verified locally on 2026-10-02** (build served under `/interior-design/`):
no horizontal overflow on 15 viewports from 320 to 2560 px (DE, EN, a legal
page); H1 and primary CTA above the fold at 375×812, 1280×720, 1366×768 and
1920×1080; Lighthouse mobile on `/` and `/en/` 100 / 100 / 100 / 100, 56 audits
passed, 0 failed. Reviewed by three separate passes — responsive, CI
consistency, readability — and their findings were applied or are recorded in
`SESSION_CHECKPOINT.md` with the reason they were not.

**Open points from the redesign:** the Re-Design copy needs the client's
confirmation; the intro film itself still shows the retired seal (~18 s and the
closing frame) and needs a re-render; the Open Graph cards still carry the old
look.

---

## Structure

```
.
├── .github/workflows/deploy.yml   → build + deploy to GitHub Pages
├── brand/
│   ├── build_web_assets.py        → builds logo, hero crops and icons from Logo2.png / Titelbild
│   ├── logo-optimized/            → retired seal logo set (2026-08), historical
│   ├── fonts/Jost-latin.ttf       → real Latin Jost, used by build_og_images.py
│   └── logo-original-scan.pdf     → historical source scan of the business card
├── build_og_images.py             → rebuilds the two Open Graph cards
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
    │   │   ├── robots.ts          → robots.txt (see Machine-readable layer)
    │   │   ├── sitemap.ts         → sitemap.xml, six URLs
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
    │   ├── components/            → HomePage, SiteHeader, SiteNav, LangSwitch,
    │   │                            BrandLogo, HeroImage, SiteFooter,
    │   │                            IntroVideo, LegalShell, JsonLd
    │   └── content/
    │       ├── site.ts            → all page copy, both languages
    │       └── schema.ts          → JSON-LD, derived from site.ts
    └── public/
        ├── og-image-de.jpg        → social preview, German pages
        ├── og-image-en.jpg        → social preview, English pages
        ├── og-image.jpg           → NOT linked from any page; the build input
        │                            build_og_images.py edits. Do not delete.
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

The two Open Graph cards are generated, not hand-edited. Rebuild them after any
change to the descriptor wording — they are checked in, so this is only needed
when the text changes:

```bash
python3 build_og_images.py   # needs numpy + Pillow; reads website/public/og-image.jpg
```

`og-image.jpg` is the build input, not a leftover — do not delete it.

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

**2. Font variables live on `<html>`, not `<body>`.** `--font-manrope` and
`--font-montserrat` must exist at `:root` for the `@theme` tokens that
reference them to resolve.

**3. Images are statically imported, never referenced by string.** A plain
`src="/logo.webp"` resolves to the domain root and 404s under the
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
4.75 MB, faststart, −14.5 LUFS) with a poster frame and a German WebVTT subtitle
track. **Subtitles are off by default** — the `<track>` carries no `default`
attribute, so nothing is overlaid on the film; a viewer can still switch them on
from the player's own controls.

**Self-hosted on purpose.** A YouTube or Vimeo embed would put third-party
requests and cookies on a site that currently has neither — and would oblige a
rewrite of the Datenschutzerklärung. `preload="metadata"` means a visitor who
never presses play downloads a few KB, not 4.75 MB.

Plan, script and compositions are in [`video-source/`](video-source/); that
README also covers the voiceover route (Gemini TTS — Kokoro has no German and
this HeyGen account exposes no German voice) and the music bed.

**Music was replaced on 2026-08-16.** The bed had been built from a Queen
recording; it is now `casa_in_ordine.mp3`, a Suno-generated instrumental. That
swap was audio-only — no second encode of the picture. Worth confirming that the
Suno plan it came from grants commercial use.

**Re-rendered on 2026-08-19 onto the seal logo.** Frame 3 now carries the seal
with `MAG. CLAUDIA PLESSL` / `RAUM & ORDNUNG`, frame 7 the seal as sign-off, and
the poster comes from the new render — it had still been showing the old mark,
which is the frame a visitor sees before pressing play. The picture hash moved
`5b518475…` → `e2619707…`; the mix script guards it, so a silent change cannot
slip through.

The audio did not change and was not rebuilt: the voice track carried over by
remux with an identical MD5, and the finished mix still measures −14.5 LUFS with
an envelope correlation of 1.00000 against the previous release.

That re-render also fixed a long-standing defect. Two of the three brand fonts
bundled with the video were subsets containing **no Latin glyphs** — Jost was the
Cyrillic cut, Inter likewise — so both fell back silently and the wordmark in
every shipped copy of the film was Liberation Sans, not Jost. Both now come from
this site's build output.

**Since 2026-10-02:** the poster is the frame at t = 24 s (the Ordnung |
Gestaltung split), because the earlier poster showed the retired seal. The film
itself still shows the seal at about 18 s and in the closing frame — that needs
a re-render in the video project. The narration is Claudia's cloned voice, so
the caption directly under the player carries the EU AI Act Art. 50
disclosure: "Vorstellungsvideo, 58 Sekunden, KI-generierte Stimme" /
"Introduction, 58 seconds, AI-generated voice". Keep it at the video; the
footer notice alone is further from the point of first exposure.

The full HyperFrames working project (renders, voiceover, assets) lives outside
this repository, in the **private** repo `AINxtGenDev/plessl-projekt` under
`79_plessl-video/`, together with the business documents — none of that belongs
in this public repository.

## Verified on the live site

Measured against the deployed URL, not assumed. Re-measured in full on
**2026-08-19**, after the seal logo, the per-language OG cards and the
re-rendered film, then again the same day in Chrome DevTools after the
machine-readable layer and the contrast fix.

> **This table predates the CI redesign** (fonts, logo and rotation have
> changed since). The 2026-10-02 measurements are under *Corporate identity*
> above: no overflow on 15 viewports, Lighthouse mobile 100 × 4 on `/` and
> `/en/`, assets byte-identical at the live URL.

| Check | Result |
|---|---|
| All 6 page routes | 200 |
| `manifest.webmanifest`, `favicon.ico`, `icon.png`, `apple-icon.png` | 200 |
| Android icons under `/icons/` | 200 |
| **Total requests** | **34 — none to a third party** |
| Cookies / localStorage | none / none |
| Fonts | 6 self-hosted files (Cormorant Garamond, Inter, Jost) |
| Internal links | all 200, no `basePath` 404s |
| Console | no errors, no warnings |
| Weight | 622 KB transferred (`load` 736 ms on this run; network-dependent) |
| Heading outline | one h1, no skipped levels |
| Horizontal scroll at 320 px | none (device emulation, DPR 3) |
| Logo rotation | running, 24 s; seal not mirrored at 0/45/135/180° |
| Video | `vorstellung.mp4` + poster, `preload="metadata"`, subtitle track carries no `default` |
| `robots.txt`, `sitemap.xml` | 200; sitemap's 6 `<loc>` entries each resolve to a built page |
| JSON-LD | exactly one block per page, parses, all 14 `@id` references resolve |
| Lighthouse (mobile) | **100 / 100 / 100 / 100** on `/`, `/en/` and `/impressum/` |

The four Lighthouse categories are accessibility, best practices, SEO and
agentic browsing; 54 audits pass and none fail. Its `llms-txt` audit reports
*notApplicable* — it grades the file's format only if one exists, so not having
one costs nothing.

> The request count is measured two ways and both are right. A plain fetch of
> the page sees 34; a real browser sees 40, because it also runs the RSC
> prefetches and the video player's inline `data:` SVG icons. **Neither includes
> a third-party host**, which is the number that actually matters.

That first-party-only result is what makes the Datenschutzerklärung's "no
cookies, no tracking, no third-party requests" claim actually true. **Keep it
that way** — adding an embedded map, a web font, a YouTube embed, a contact-form
service or an analytics snippet all break it, and each one obliges you to update
the privacy page.

> GitHub Pages caches aggressively. After a deploy the previous version may be
> served for a short while — hard-reload before concluding something is broken.

### Accessibility

Skip-to-content link (localised, visible on focus), 3 px focus rings (white on
the dark contact band), tap targets ≥ 44 px, `prefers-reduced-motion` honoured,
semantic landmarks with labelled navigation, `lang` on the English claim inside
the German page, and a correct heading outline. **Lighthouse accessibility is
100** on `/` and `/en/` (2026-10-02).

**Contrast is decided per CI tone, measured** (see *Corporate identity*): text
uses only anthrazit-dark (12.5:1), sage-dark (5.2:1) and, for captions,
anthrazit-mid (4.9:1). Blush-dark (3.3:1) and every *-mid/-soft/-light tone are
surfaces, rules and decoration only. Base styles live in `@layer base` so
Tailwind utilities can override them — unlayered, `h2 { color }` once beat
`text-white` and left the contact heading at 2.4:1.

**Navigation on phones and tablets:** below 1024 px a "Menü" button opens the
full tree (slide 4 order, the four offers always expanded). From 1024 px the
"Mein Angebot" entry is a click/Enter disclosure, not a hover menu, so it works
on touch tablets. Both close on Escape (focus returns to the button) and on an
outside tap. The DE | EN switch stays visible in the header at every width and
lands on the counterpart page.

## Machine-readable layer

The pages are written for people, but they also have to survive being read by a
crawler or an assistant that never renders them. Three things carry that:

**The HTML itself.** `output: "export"` with no client components on the content
path means every service, price and credential is in the served markup — no
JavaScript needed to see any of it. This is the part that actually matters, and
it comes for free from the way the site is already built. Don't trade it away
for a client-side rendering convenience later.

**JSON-LD**, built in `src/content/schema.ts` and injected by the `JsonLd`
component — one `<script type="application/ld+json">` per page. It is *derived
from `site.ts`*, never written out by hand: a price edited in the content object
cannot drift away from the price a machine reads. Each locale gets its own node
graph with its own `@id` fragments, because one shared `@id` would describe the
same entity twice with conflicting German and English values.

| Page | Nodes |
|---|---|
| `/` and `/en/` | `ProfessionalService`, `Person` (with `hasCredential`), 3 × `Service`, `OfferCatalog` of the 7 packages, `VideoObject`, `WebSite`, `WebPage` |
| the four legal pages | `WebPage`, `BreadcrumbList` |

Two details that are easy to get wrong and are deliberate here:

- Every price on the site is a floor — "ab EUR 110". So each offer carries a
  `priceSpecification` with **`minPrice`**, not `price`; a bare `price` would
  assert a fixed fee the business does not offer. `valueAddedTaxIncluded` is
  `false` under the Kleinunternehmerregelung and is **one flag in `schema.ts`**,
  because it flips the day the EUR 55.000 threshold is crossed.
- What is *not* claimed matters as much as what is. No `openingHours` (there
  are none), no `SearchAction` (there is no search), no `FAQPage` (there is no
  FAQ — inventing Q&A to farm a rich result is what earns a manual action), no
  `vatID` while the Impressum's is still a placeholder.

**`robots.txt` and `sitemap.xml`**, from `src/app/robots.ts` and `sitemap.ts`.
Both are emitted as real files by the static export. `robots.txt` currently
allows everything, AI crawlers included — being citable in an assistant's answer
is worth more to a one-person business than keeping marketing copy out of a
training set. The comment in `robots.ts` records the alternative split if that
judgement ever changes.

Only the two home pages declare hreflang alternates in the sitemap, matching
what the layouts emit into the HTML. The three German legal pages have no
one-to-one English counterpart — all three would have to name `/en/legal/`,
which can only name one of them back, so the cluster would contradict itself.

> ⚠️ **`robots.txt` does nothing until the custom domain lands.** Crawlers read
> it only from the origin root. While the site sits under
> `…github.io/interior-design/` the file is published at
> `/interior-design/robots.txt`, where nothing looks for it. The sitemap and the
> JSON-LD have no such problem and work today.

After the next deploy, check the JSON-LD against the
[Schema Markup Validator](https://validator.schema.org/) and Google's
[Rich Results Test](https://search.google.com/test/rich-results) — both need the
live URL, so this cannot be done from the build output alone.

## Deploys and cached pages

GitHub Pages serves HTML with `cache-control: max-age=600` and each deploy
replaces the whole site. Without help, anyone who opened a page shortly
before a deploy keeps HTML that points at CSS/JS the new build deleted, and
sees an unstyled page for up to ten minutes. `.github/keep-live-assets.sh`
runs in the deploy workflow and copies the live site's content-hashed
`/_next/static/` files into the new build first. Hashed names cannot collide,
so this only ever adds files.

## Custom domain

`next.config.ts` reads `BASE_PATH` (default `/interior-design`). When a custom
domain is pointed at Pages:

1. Set `BASE_PATH: ""` in `.github/workflows/deploy.yml`.
2. Add the domain in the repository's Pages settings (creates a `CNAME`).
3. Update `SITE_URL` in `src/content/site.ts` — one constant, which the two
   layouts and the JSON-LD all read.
4. Confirm `https://<domain>/robots.txt` resolves. Until this step it is dead
   (see *Machine-readable layer*), so this is the moment it starts working.
5. Consider `llms.txt` at that point. It is a community convention with no
   standards body behind it, and the measured traffic does not support it —
   Google said on the record in July 2025 that it does not read the file, and
   crawler logs show AI bots fetching HTML directly rather than `/llms.txt`. It
   is cheap insurance, not a channel, and it has the same origin-root
   constraint as `robots.txt`.

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
