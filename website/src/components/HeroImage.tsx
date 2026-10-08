/*
 * Built by brand/build_web_assets.py from "Titelbild Homepage.png" (full
 * frame) and "Titelbild Handy.png" (the client's phone version: living room,
 * slogan and wardrobe stacked). The hero-en-* files carry the English
 * headline, painted in the same face (Playfair Display Medium, identified by
 * measurement).
 */
import deFull800 from "@/assets/hero-full-800.webp";
import deFull1200 from "@/assets/hero-full-1200.webp";
import deFull1440 from "@/assets/hero-full-1440.webp";
import deFull1947 from "@/assets/hero-full-1947.webp";
import dePhone480 from "@/assets/hero-phone-480.webp";
import dePhone633 from "@/assets/hero-phone-633.webp";
import enFull800 from "@/assets/hero-en-full-800.webp";
import enFull1200 from "@/assets/hero-en-full-1200.webp";
import enFull1440 from "@/assets/hero-en-full-1440.webp";
import enFull1947 from "@/assets/hero-en-full-1947.webp";
import enPhone480 from "@/assets/hero-en-phone-480.webp";
import enPhone633 from "@/assets/hero-en-phone-633.webp";
import type { Content, Locale } from "@/content/site";

type Img = { src: string; width: number; height: number };

const SETS: Record<Locale, { full: Img[]; phone: Img[] }> = {
  de: {
    full: [deFull800, deFull1200, deFull1440, deFull1947],
    phone: [dePhone480, dePhone633],
  },
  en: {
    full: [enFull800, enFull1200, enFull1440, enFull1947],
    phone: [enPhone480, enPhone633],
  },
};

/** Where the full frame takes over from the phone picture. */
const FULL_FROM = "(min-width: 48rem), (orientation: landscape)";

const srcSet = (imgs: Img[]) => imgs.map((i) => `${i.src} ${i.width}w`).join(", ");
const largest = (imgs: Img[]) => imgs[imgs.length - 1];

/**
 * The title image, always shown in full (Homepage Änderungen 8.10.26, slide 2).
 *
 *   portrait < 768 px  the phone picture (slide 2, "Handy"), full width
 *   otherwise          the full frame (incl. landscape phones), capped at its native 1947 px
 *
 * Both carry width/height, so the box is reserved before load (no layout
 * shift); the browser downloads only the one that matches.
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
    <picture className="mx-auto block max-w-[1947px]">
      <source
        media={FULL_FROM}
        srcSet={srcSet(set.full)}
        sizes="min(100vw, 1947px)"
        width={largest(set.full).width}
        height={largest(set.full).height}
      />
      <img
        src={set.phone[0].src}
        srcSet={srcSet(set.phone)}
        sizes="100vw"
        width={largest(set.phone).width}
        height={largest(set.phone).height}
        alt={content.hero.imageAlt}
        fetchPriority="high"
        decoding="async"
        className="block h-auto w-full"
      />
    </picture>
  );
}
