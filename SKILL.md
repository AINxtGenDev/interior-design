# Interior Design Website — Senior Web Designer Skill

## Role

Senior web designer and frontend engineer with deep expertise in React, HTML5, CSS3, responsive design, web security, and network performance. Specialized in building premium interior design websites with a modern, editorial aesthetic.

## Brand Identity

### Color Palette — Salbeigruen & Anthrazitgrau

```
PRIMARY COLORS
──────────────────────────────────────────────
Salbeigruen (Sage Green)
  --sage-50:    #f6f7f4    Background tint, subtle hover states
  --sage-100:   #e8ebe3    Card backgrounds, alternate sections
  --sage-200:   #d1d8c7    Borders, dividers, input outlines
  --sage-300:   #b3bfa3    Muted icons, disabled states
  --sage-400:   #8fa37a    Secondary buttons, tags, badges
  --sage-500:   #7a9468    PRIMARY brand green — CTAs, links, accents
  --sage-600:   #637a53    Hover state for primary actions
  --sage-700:   #4d6040    Active/pressed state, headings on light bg
  --sage-800:   #3a4a30    Dark text on light backgrounds
  --sage-900:   #283521    Deepest green for high-contrast needs

Anthrazitgrau (Anthracite Gray)
  --anthracite-50:   #f5f5f6    Light page backgrounds
  --anthracite-100:  #e5e5e7    Section dividers, table rows
  --anthracite-200:  #ccccce    Subtle borders, placeholder text
  --anthracite-300:  #a3a3a7    Meta text, captions, timestamps
  --anthracite-400:  #7a7a80    Secondary text, breadcrumbs
  --anthracite-500:  #57575e    Body text on light backgrounds
  --anthracite-600:  #434349    Subheadings, strong body text
  --anthracite-700:  #333338    PRIMARY dark — headings, nav text
  --anthracite-800:  #242428    Hero overlays, footer backgrounds
  --anthracite-900:  #18181b    Near-black, dark mode base

ACCENT & FUNCTIONAL COLORS
──────────────────────────────────────────────
  --warm-white:   #faf9f7    Page background (warm, not sterile)
  --cream:        #f5f0ea    Hero background, feature sections
  --gold-accent:  #c9a96e    Luxury accent — awards, premium tags
  --error:        #c44b4f    Form errors, destructive actions
  --success:      #5a8a5c    Success messages (harmonizes with sage)
  --info:         #5b7fa5    Informational badges, tooltips
```

### Typography

```
FONT STACK
──────────────────────────────────────────────
Headings:    "Playfair Display", Georgia, "Times New Roman", serif
Body:        "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
Accent/Nav:  "Montserrat", "Helvetica Neue", Arial, sans-serif
Monospace:   "JetBrains Mono", "Fira Code", "Consolas", monospace

TYPE SCALE (mobile-first, clamp() for fluid sizing)
──────────────────────────────────────────────
--text-xs:    clamp(0.694rem, 0.65rem + 0.2vw, 0.75rem)     12px
--text-sm:    clamp(0.833rem, 0.78rem + 0.25vw, 0.875rem)   14px
--text-base:  clamp(1rem, 0.93rem + 0.3vw, 1.0625rem)       16-17px
--text-lg:    clamp(1.125rem, 1.05rem + 0.4vw, 1.25rem)     18-20px
--text-xl:    clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)       20-24px
--text-2xl:   clamp(1.5rem, 1.2rem + 1.5vw, 2rem)           24-32px
--text-3xl:   clamp(1.875rem, 1.4rem + 2.3vw, 2.75rem)      30-44px
--text-4xl:   clamp(2.25rem, 1.5rem + 3.5vw, 3.75rem)       36-60px
--text-hero:  clamp(2.75rem, 1.8rem + 4.5vw, 5rem)          44-80px

LINE HEIGHTS
──────────────────────────────────────────────
Headings:    1.1 – 1.25
Body:        1.6 – 1.75  (excellent readability)
Compact:     1.4          (nav, buttons, captions)

LETTER SPACING
──────────────────────────────────────────────
Headings (serif):     -0.02em   (tighter for elegance)
Body:                  0em      (default)
All-caps labels:       0.08em   (wider for legibility)
Nav/buttons:           0.03em   (slightly open)
```

### Spacing System (8px grid)

```
--space-1:   0.25rem    4px
--space-2:   0.5rem     8px
--space-3:   0.75rem    12px
--space-4:   1rem       16px
--space-5:   1.5rem     24px
--space-6:   2rem       32px
--space-7:   2.5rem     40px
--space-8:   3rem       48px
--space-10:  4rem       64px
--space-12:  5rem       80px
--space-16:  8rem       128px
--space-20:  10rem      160px
```

## Core Principles

### 1. Mobile-First — Always

Every component starts as a single-column, touch-friendly layout. Enhancements layer up through breakpoints:

```
BREAKPOINTS
──────────────────────────────────────────────
--bp-sm:     480px     Large phones (landscape)
--bp-md:     768px     Tablets
--bp-lg:     1024px    Small laptops, tablets landscape
--bp-xl:     1280px    Desktops
--bp-2xl:    1536px    Large displays

APPROACH
──────────────────────────────────────────────
- Base styles = mobile (no media query)
- @media (min-width: 768px) {} for tablet+
- @media (min-width: 1024px) {} for desktop+
- Never use max-width queries except for edge-case fixes
- Touch targets: minimum 44x44px
- No hover-only interactions — always provide tap alternatives
```

### 2. Readability Above All

```
READABILITY RULES
──────────────────────────────────────────────
- Max content width: 680px for prose (38-42 words/line)
- Max layout width: 1280px with centered container
- Body font-size: minimum 16px on all devices
- Line-height: 1.6–1.75 for body text
- Paragraph spacing: 1.5em between paragraphs
- Contrast ratio: minimum 4.5:1 (WCAG AA), target 7:1 (AAA)
- Sage-700 on warm-white = 7.2:1 ratio (AAA pass)
- Anthracite-700 on warm-white = 9.8:1 ratio (AAA pass)
- No justified text — always left-aligned for web
- Hyphenation: CSS hyphens for German content
- Subpixel rendering: -webkit-font-smoothing: antialiased
```

### 3. Performance Budget

```
TARGETS
──────────────────────────────────────────────
- First Contentful Paint:   < 1.2s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift:  < 0.1
- Total bundle size:        < 200KB gzipped (JS)
- Image formats:            WebP with JPEG fallback, AVIF where supported
- Fonts:                    Self-hosted, subset, preload critical weights
  - Inter: 400, 500 (body)
  - Playfair Display: 400, 700 (headings)
  - Montserrat: 500, 600 (nav, buttons)
- Lazy load all images below the fold
- Use <picture> with srcset for responsive images
- Inline critical CSS, defer non-critical
```

## Tech Stack

```
FRAMEWORK & BUILD
──────────────────────────────────────────────
React 18+          Component architecture
Next.js 14+        SSR, SSG, App Router, Image optimization
TypeScript          Strict mode, no `any` types
Tailwind CSS 3+     Utility-first, custom theme config
Framer Motion       Subtle animations (parallax, fade-ins, reveals)

QUALITY & TOOLING
──────────────────────────────────────────────
ESLint              Strict config with a11y plugin
Prettier            Consistent formatting
Lighthouse CI       Automated perf/a11y scoring in CI
Husky + lint-staged Pre-commit checks

HOSTING & DELIVERY
──────────────────────────────────────────────
Vercel / Netlify    Edge CDN, automatic HTTPS
Cloudflare Images   Image CDN with auto-format/resize (optional)
```

## Tailwind Theme Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        sage: {
          50:  '#f6f7f4',
          100: '#e8ebe3',
          200: '#d1d8c7',
          300: '#b3bfa3',
          400: '#8fa37a',
          500: '#7a9468',
          600: '#637a53',
          700: '#4d6040',
          800: '#3a4a30',
          900: '#283521',
        },
        anthracite: {
          50:  '#f5f5f6',
          100: '#e5e5e7',
          200: '#ccccce',
          300: '#a3a3a7',
          400: '#7a7a80',
          500: '#57575e',
          600: '#434349',
          700: '#333338',
          800: '#242428',
          900: '#18181b',
        },
        warm: {
          white: '#faf9f7',
          cream: '#f5f0ea',
        },
        gold: {
          accent: '#c9a96e',
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Inter"', 'system-ui', 'sans-serif'],
        nav:     ['"Montserrat"', '"Helvetica Neue"', 'sans-serif'],
      },
      fontSize: {
        'hero':  ['clamp(2.75rem, 1.8rem + 4.5vw, 5rem)',    { lineHeight: '1.1' }],
        '4xl':   ['clamp(2.25rem, 1.5rem + 3.5vw, 3.75rem)', { lineHeight: '1.15' }],
        '3xl':   ['clamp(1.875rem, 1.4rem + 2.3vw, 2.75rem)',{ lineHeight: '1.2' }],
        '2xl':   ['clamp(1.5rem, 1.2rem + 1.5vw, 2rem)',     { lineHeight: '1.25' }],
      },
      maxWidth: {
        prose: '680px',
        layout: '1280px',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
    },
  },
};
```

## Component Architecture

### Page Structure

```
SITE MAP (typical interior design website)
──────────────────────────────────────────────
/                   Hero + Featured Projects + Services Teaser + Testimonials
/projekte           Project Gallery Grid with Category Filters
/projekte/[slug]    Single Project — Image Gallery + Description + Details
/leistungen         Services Overview (Beratung, Planung, Umsetzung)
/ueber-uns          About — Team, Philosophy, Process
/kontakt            Contact Form + Map + Business Details
/blog               Design Blog / Journal (optional)
/impressum          Legal / Imprint (required DE/AT)
/datenschutz        Privacy Policy (required DSGVO)
```

### Core Components

```
COMPONENT TREE
──────────────────────────────────────────────
Layout/
  Header            Fixed/sticky, transparent-to-solid on scroll
  Footer            Contact info, nav links, legal links, social
  MobileNav         Slide-out drawer, full-height, sage-900 bg

Hero/
  HeroSection       Full-viewport image + overlay text + CTA
  HeroSlider        Multi-image with crossfade (3-5 projects)

Projects/
  ProjectGrid       Masonry or 2-3 column grid, hover overlays
  ProjectCard       Image + title + category tag + subtle reveal
  ProjectDetail     Lightbox gallery, description, specs table
  CategoryFilter    Pill buttons (Wohnraum, Kuche, Bad, Buro, etc.)

Services/
  ServiceCard       Icon + heading + short description
  ProcessTimeline   3-4 step visual (Beratung > Konzept > Umsetzung)

Content/
  SectionHeading    Serif heading + sage underline accent + subtitle
  ProseBlock        Max-width prose with optimal line length
  Testimonial       Quote + client name + project reference
  TeamMember        Photo + name + role + short bio

Forms/
  ContactForm       Name, email, phone, message, project-type select
  Newsletter        Email-only minimal inline form

UI/
  Button            Primary (sage-500), Secondary (outline), Ghost
  Badge             Category tags, status indicators
  ImageWithAspect   Responsive image wrapper with aspect-ratio
  ScrollReveal      Intersection Observer fade-in/slide-up
  BackToTop         Floating button, appears after scroll
```

### Component Patterns

```jsx
// Button variants — always with focus-visible ring
<Button variant="primary">    // bg-sage-500, text-white, hover:bg-sage-600
<Button variant="secondary">  // border-sage-500, text-sage-700, hover:bg-sage-50
<Button variant="ghost">      // text-anthracite-600, hover:text-sage-600

// Section spacing — generous whitespace is the hallmark of luxury design
<section className="py-16 md:py-24 lg:py-32">

// Content container — centered with readable width
<div className="mx-auto max-w-layout px-5 md:px-8 lg:px-12">

// Prose text — optimal reading width
<div className="mx-auto max-w-prose text-anthracite-600 leading-relaxed text-base md:text-lg">
```

## Design Patterns

### Navigation

```
HEADER BEHAVIOR
──────────────────────────────────────────────
Mobile (< 1024px):
  - Logo left, hamburger icon right
  - Hamburger opens full-screen overlay nav
  - Nav links: large touch targets (py-4), font-nav, uppercase tracking-wide
  - Close button top-right
  - Background: anthracite-800 with sage-400 accent links

Desktop (>= 1024px):
  - Logo left, nav links center or right
  - Transparent on hero, solid warm-white on scroll (with shadow-sm)
  - Active link: sage-500 underline (2px, offset-8)
  - Hover: sage-600 color transition (150ms ease)
  - CTA button in nav: "Kontakt" or "Beratung anfragen"
```

### Hero Section

```
HERO PATTERN
──────────────────────────────────────────────
- Full viewport height (100vh or 100svh for mobile)
- High-quality interior photo as background
- Dark gradient overlay: from anthracite-900/60 to transparent
- Heading: Playfair Display, text-hero, text-white, max-w-3xl
- Subtitle: Inter, text-lg, text-warm-white/80
- CTA: Primary button, large size
- Scroll indicator: animated chevron at bottom

Mobile adjustments:
  - Heading: text-3xl (still fluid via clamp)
  - Reduce overlay opacity slightly for image visibility
  - CTA full-width on mobile (w-full sm:w-auto)
```

### Project Gallery

```
GALLERY LAYOUT
──────────────────────────────────────────────
Mobile:     1 column, full-width cards
Tablet:     2 columns, gap-6
Desktop:    3 columns, gap-8, optional masonry

CARD BEHAVIOR:
  - Image with aspect-ratio: 4/3 or 3/4 (mixed for masonry)
  - Object-fit: cover
  - Hover: subtle scale(1.02) on image, overlay with project title
  - Category badge: top-left, sage-500 bg, text-xs uppercase
  - Title below image: font-heading, text-xl, anthracite-700
  - Transition: transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)
```

### Scroll Animations

```
ANIMATION RULES
──────────────────────────────────────────────
- Respect prefers-reduced-motion: disable all animations
- Use Intersection Observer, not scroll events
- Reveal threshold: 0.15 (15% visible before triggering)
- Default reveal: opacity 0→1, translateY 24px→0, duration 0.6s
- Stagger children: 80ms delay between items
- Never animate layout properties (width, height, top, left)
- Only animate: opacity, transform
- Use will-change sparingly and remove after animation
```

## Security Standards

```
CRITICAL SECURITY REQUIREMENTS
──────────────────────────────────────────────

HTTPS & Headers
  - HTTPS only — redirect all HTTP via 301
  - HSTS: Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  - CSP: Content-Security-Policy with strict directives:
    default-src 'self';
    script-src 'self' 'nonce-{random}';
    style-src 'self' 'unsafe-inline';    (required for Tailwind)
    img-src 'self' data: https:;
    font-src 'self';
    connect-src 'self' https://api.domain.com;
    frame-ancestors 'none';
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: DENY
  - Referrer-Policy: strict-origin-when-cross-origin
  - Permissions-Policy: camera=(), microphone=(), geolocation=()

Forms & Input
  - All form inputs: sanitize on server, validate on client
  - CSRF token on all POST forms (Next.js Server Actions handle this)
  - Rate limit contact form submissions (e.g., 3/min per IP)
  - Honeypot field for spam prevention (no visible captcha — better UX)
  - Email validation: RFC 5322 regex + DNS MX check on server
  - Never reflect unsanitized input in HTML (XSS prevention)

Dependencies
  - Audit with npm audit weekly
  - Pin dependency versions in package-lock.json
  - No inline scripts — all JS bundled and nonced
  - Subresource Integrity (SRI) for any external CDN resources

Privacy (DSGVO/GDPR Compliance — mandatory for DE/AT)
  - Cookie consent banner before any tracking/analytics
  - No Google Fonts CDN — self-host all fonts (avoid DSGVO issues)
  - Analytics: privacy-friendly (Plausible, Fathom, or Umami — no Google Analytics)
  - Contact form: clear data processing disclosure + opt-in checkbox
  - Impressum and Datenschutz pages required and linked from every page
  - No third-party embeds without consent (YouTube, Google Maps → load on click)
```

## Accessibility (WCAG 2.1 AA)

```
A11Y REQUIREMENTS
──────────────────────────────────────────────
- Semantic HTML: <header>, <nav>, <main>, <article>, <section>, <footer>
- All images: descriptive alt text (interior design context)
- Skip-to-content link as first focusable element
- Focus-visible outlines: 2px sage-500 ring with 2px offset
- Keyboard navigation: all interactive elements reachable via Tab
- ARIA landmarks for screen readers
- Color alone never conveys meaning — pair with icons/text
- Form labels: always visible (no placeholder-only labels)
- Error messages: associated with inputs via aria-describedby
- Reduced motion: @media (prefers-reduced-motion: reduce) disables animations
- Dark mode support via @media (prefers-color-scheme: dark) — optional phase 2
- Language attribute: <html lang="de"> for German content
- Minimum touch targets: 44x44px
```

## Image Strategy

```
INTERIOR PHOTOGRAPHY HANDLING
──────────────────────────────────────────────
Format priority:   AVIF > WebP > JPEG
Quality:           Hero: 85%, Gallery: 80%, Thumbnails: 75%
Aspect ratios:     Hero 16:9, Cards 4:3 or 3:4, Detail gallery 3:2

Responsive sizes (srcset):
  - 640w   (mobile)
  - 960w   (tablet)
  - 1280w  (desktop)
  - 1920w  (retina / hero only)

Always define:
  - width and height attributes (CLS prevention)
  - aspect-ratio CSS as fallback
  - loading="lazy" for below-fold images
  - loading="eager" + fetchpriority="high" for hero image
  - Blur placeholder (Next.js blurDataURL or CSS backdrop-filter)

<picture>
  <source srcset="room.avif" type="image/avif" />
  <source srcset="room.webp" type="image/webp" />
  <img src="room.jpg" alt="Moderne Wohnzimmergestaltung in Salbeigruen"
       width="1280" height="720" loading="lazy" />
</picture>
```

## SEO & Meta

```
SEO ESSENTIALS
──────────────────────────────────────────────
- Unique <title> per page: "Leistungen | [Brand] Interior Design"
- Meta description: 150-160 chars, include location + service keywords
- Open Graph tags for social sharing (image: 1200x630px)
- Structured data: LocalBusiness + ImageGallery schema (JSON-LD)
- Sitemap.xml auto-generated
- Canonical URLs on all pages
- Semantic heading hierarchy: single <h1> per page
- Alt text with interior design context (not just "image1.jpg")
- German-language hreflang if multilingual: <link rel="alternate" hreflang="de">
- Core Web Vitals pass on all pages
```

## File & Folder Structure

```
src/
  app/
    layout.tsx              Root layout (fonts, meta, header/footer)
    page.tsx                Homepage
    projekte/
      page.tsx              Project gallery
      [slug]/page.tsx       Single project
    leistungen/page.tsx     Services
    ueber-uns/page.tsx      About
    kontakt/page.tsx        Contact
    impressum/page.tsx      Legal imprint
    datenschutz/page.tsx    Privacy policy
    globals.css             Tailwind imports + CSS custom properties
  components/
    layout/
      Header.tsx
      Footer.tsx
      MobileNav.tsx
    ui/
      Button.tsx
      Badge.tsx
      SectionHeading.tsx
      ScrollReveal.tsx
      ImageWithAspect.tsx
    sections/
      HeroSection.tsx
      ProjectGrid.tsx
      ServiceCards.tsx
      Testimonials.tsx
      ProcessTimeline.tsx
      ContactForm.tsx
  lib/
    utils.ts                cn() helper, formatters
    constants.ts            Site metadata, nav links
    validations.ts          Zod schemas for forms
  content/
    projects/               MDX or JSON project data
    services/               Service descriptions
  public/
    fonts/                  Self-hosted font files (woff2)
    images/                 Optimized images (or use CMS)
    favicon.ico
    robots.txt
    sitemap.xml
```

## Code Quality Rules

```
WHEN WRITING CODE, ALWAYS:
──────────────────────────────────────────────
1. TypeScript strict mode — no `any`, no type assertions unless justified
2. Server Components by default — 'use client' only when needed (interactivity)
3. Semantic HTML first — div-soup is forbidden
4. Tailwind utility classes — no custom CSS unless truly necessary
5. Component props: explicit interfaces, no spreading unknown props
6. Images: always Next.js <Image> or <picture> with srcset
7. Forms: server-side validation (Zod), client-side as progressive enhancement
8. Error boundaries around dynamic sections
9. Loading states for async content (skeleton screens, not spinners)
10. No console.log in production code
11. All text content externalized for i18n readiness
12. Comments only where logic is non-obvious
```

## Anti-Patterns to Avoid

```
NEVER DO THIS
──────────────────────────────────────────────
- Google Fonts via CDN link (DSGVO violation in DE/AT)
- Fixed pixel font sizes (use clamp/rem)
- Layout with absolute positioning (use flexbox/grid)
- Hamburger menu on desktop
- Carousel/slider as primary content (bad UX + a11y)
- Autoplay video with sound
- Infinite scroll without pagination fallback
- Stock photos that look generic — always use client's real project photos
- Animations on every element (subtle and purposeful only)
- Color-only error states on forms
- Third-party tracking without cookie consent
- Inline styles in React components (use Tailwind)
- Import entire icon libraries — tree-shake or use individual SVGs
- justify-center text for paragraphs (left-align for readability)
```

## Content Tone & Language

```
GERMAN INTERIOR DESIGN WEBSITE TONE
──────────────────────────────────────────────
- Professional but warm — not corporate, not casual
- "Sie" form (formal German address)
- Short, confident sentences
- Active voice preferred
- Avoid superlatives ("das Beste") — let the work speak
- Headings: clear and descriptive, not clever/abstract
- CTAs: action-oriented ("Beratung anfragen", "Projekte entdecken")
- Project descriptions: focus on the client's challenge + the design solution
```

## Checklist Before Delivery

```
LAUNCH CHECKLIST
──────────────────────────────────────────────
[ ] Mobile-first responsive on all pages (test 375px, 768px, 1280px)
[ ] Lighthouse scores: Performance > 90, Accessibility > 95, SEO > 95
[ ] All images optimized (WebP/AVIF, lazy loaded, sized)
[ ] Fonts self-hosted and preloaded
[ ] HTTPS + security headers configured
[ ] Cookie consent banner functional
[ ] Contact form works + validation + spam protection
[ ] Impressum + Datenschutz pages live and linked
[ ] Meta tags + OG tags on all pages
[ ] Sitemap.xml + robots.txt deployed
[ ] 404 page styled and helpful
[ ] Keyboard navigation works throughout
[ ] prefers-reduced-motion respected
[ ] No console errors in production
[ ] Cross-browser tested: Chrome, Firefox, Safari, Edge
[ ] Real device testing: iPhone, Android, iPad
```
