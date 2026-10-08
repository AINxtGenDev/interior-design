/*
 * Built from "Titelbild Homepage.png" by brand/build_web_assets.py: the full
 * frame, and three panels for phones (living room, slogan, wardrobe). The
 * hero-en-* files carry the English headline, painted in the same face
 * (Playfair Display Medium, identified by measurement); the living and
 * wardrobe panels have no headline and serve both languages.
 */
import deFull800 from "@/assets/hero-full-800.webp";
import deFull1200 from "@/assets/hero-full-1200.webp";
import deFull1440 from "@/assets/hero-full-1440.webp";
import deFull1947 from "@/assets/hero-full-1947.webp";
import deSlogan480 from "@/assets/hero-slogan-480.webp";
import deSlogan670 from "@/assets/hero-slogan-670.webp";
import enFull800 from "@/assets/hero-en-full-800.webp";
import enFull1200 from "@/assets/hero-en-full-1200.webp";
import enFull1440 from "@/assets/hero-en-full-1440.webp";
import enFull1947 from "@/assets/hero-en-full-1947.webp";
import enSlogan480 from "@/assets/hero-en-slogan-480.webp";
import enSlogan670 from "@/assets/hero-en-slogan-670.webp";
import living480 from "@/assets/hero-living-480.webp";
import living725 from "@/assets/hero-living-725.webp";
import wardrobe480 from "@/assets/hero-wardrobe-480.webp";
import wardrobe672 from "@/assets/hero-wardrobe-672.webp";
import type { Content, Locale } from "@/content/site";

type Img = { src: string; width: number; height: number };

const SETS: Record<Locale, { full: Img[]; slogan: Img[] }> = {
  de: {
    full: [deFull800, deFull1200, deFull1440, deFull1947],
    slogan: [deSlogan480, deSlogan670],
  },
  en: {
    full: [enFull800, enFull1200, enFull1440, enFull1947],
    slogan: [enSlogan480, enSlogan670],
  },
};
const LIVING = [living480, living725];
const WARDROBE = [wardrobe480, wardrobe672];

/** 1×1 transparent GIF: wins the <source> wherever the full frame shows, so hidden panels never download. */
const BLANK = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
/** Must match the `full` variant in globals.css. */
const FULL_FROM = "(min-width: 48rem), (orientation: landscape)";

const srcSet = (imgs: Img[]) => imgs.map((i) => `${i.src} ${i.width}w`).join(", ");
const largest = (imgs: Img[]) => imgs[imgs.length - 1];

/** A phone panel; with the full frame it collapses to an undownloaded blank. */
function Panel({ imgs, sizes, className }: { imgs: Img[]; sizes: string; className?: string }) {
  return (
    <picture className={`block full:hidden ${className ?? ""}`}>
      <source media={FULL_FROM} srcSet={BLANK} />
      <img
        src={imgs[0].src}
        srcSet={srcSet(imgs)}
        sizes={sizes}
        width={largest(imgs).width}
        height={largest(imgs).height}
        alt=""
        decoding="async"
        className="block h-auto w-full"
      />
    </picture>
  );
}

/**
 * The title image, always shown in full (Homepage Änderungen 8.10.26, slide 2).
 *
 *   portrait < 768 px  the painted slogan full width (~23 px caps on a 375 px phone,
 *               ~7 px in the full 2.41:1 frame), living room and wardrobe
 *               side by side below it — the whole picture in ~380 px of
 *               height at 375 px, so the H1 stays on the first screen
 *   otherwise          the full frame (incl. landscape phones), capped at its native 1947 px
 *
 * Each image carries width/height, so the boxes are reserved before load
 * (no layout shift). The living-room <img> doubles as the full frame and
 * holds the alt text for the whole picture.
 */
export default function HeroImage({
  content,
  locale,
}: {
  content: Content;
  locale: Locale;
}) {
  const set = SETS[locale];

  return (
    <figure className="mx-auto grid max-w-[1947px] grid-cols-2 gap-1 full:block">
      <picture className="block">
        <source
          media={FULL_FROM}
          srcSet={srcSet(set.full)}
          sizes="min(100vw, 1947px)"
          width={largest(set.full).width}
          height={largest(set.full).height}
        />
        <img
          src={LIVING[0].src}
          srcSet={srcSet(LIVING)}
          sizes="50vw"
          width={largest(LIVING).width}
          height={largest(LIVING).height}
          alt={content.hero.imageAlt}
          fetchPriority="high"
          decoding="async"
          className="block h-auto w-full"
        />
      </picture>
      <Panel imgs={WARDROBE} sizes="50vw" />
      <Panel imgs={set.slogan} sizes="100vw" className="order-first col-span-2" />
    </figure>
  );
}
