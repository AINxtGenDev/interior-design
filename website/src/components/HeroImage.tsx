/*
 * Built from "Titelbild Homepage.png" by brand/build_web_assets.py in three
 * crops around the slogan painted on the wall. The hero-en-* set has the
 * German slogan removed so the English page can set its own as live text.
 */
import deNarrow640 from "@/assets/hero-narrow-640.webp";
import deNarrow1077 from "@/assets/hero-narrow-1077.webp";
import deMedium800 from "@/assets/hero-medium-800.webp";
import deMedium1200 from "@/assets/hero-medium-1200.webp";
import deMedium1560 from "@/assets/hero-medium-1560.webp";
import deWide1440 from "@/assets/hero-wide-1440.webp";
import deWide1947 from "@/assets/hero-wide-1947.webp";
import enNarrow640 from "@/assets/hero-en-narrow-640.webp";
import enNarrow1077 from "@/assets/hero-en-narrow-1077.webp";
import enMedium800 from "@/assets/hero-en-medium-800.webp";
import enMedium1200 from "@/assets/hero-en-medium-1200.webp";
import enMedium1560 from "@/assets/hero-en-medium-1560.webp";
import enWide1440 from "@/assets/hero-en-wide-1440.webp";
import enWide1947 from "@/assets/hero-en-wide-1947.webp";
import type { Content, Locale } from "@/content/site";

type Img = { src: string; width: number; height: number };

const SETS: Record<Locale, { narrow: Img[]; medium: Img[]; wide: Img[] }> = {
  de: {
    narrow: [deNarrow640, deNarrow1077],
    medium: [deMedium800, deMedium1200, deMedium1560],
    wide: [deWide1440, deWide1947],
  },
  en: {
    narrow: [enNarrow640, enNarrow1077],
    medium: [enMedium800, enMedium1200, enMedium1560],
    wide: [enWide1440, enWide1947],
  },
};

const srcSet = (imgs: Img[]) => imgs.map((i) => `${i.src} ${i.width}w`).join(", ");
const largest = (imgs: Img[]) => imgs[imgs.length - 1];

/**
 * Art-directed title image.
 *
 *   < 640 px    4:3 crop  — the slogan stays ~16 px tall on a 375 px phone
 *   640–1199    1.93:1    — tablets
 *   >= 1200     full 2.41:1 frame, capped at its native 1947 px
 *
 * The full frame on a phone would shrink the painted lettering to ~5 px.
 * Each <source> carries its own width/height so the box is reserved for
 * whichever crop wins (no layout shift). The breakpoints match the
 * `.hero` custom properties in globals.css, which place the English overlay.
 */
export default function HeroImage({
  content,
  locale,
}: {
  content: Content;
  locale: Locale;
}) {
  const set = SETS[locale];
  const [taglineA, taglineB] = content.hero.tagline.split("\n");

  return (
    <figure className="hero mx-auto max-w-[1947px]">
      <picture>
        <source
          media="(min-width: 75rem)"
          srcSet={srcSet(set.wide)}
          sizes="min(100vw, 1947px)"
          width={largest(set.wide).width}
          height={largest(set.wide).height}
        />
        <source
          media="(min-width: 40rem)"
          srcSet={srcSet(set.medium)}
          sizes="100vw"
          width={largest(set.medium).width}
          height={largest(set.medium).height}
        />
        <img
          src={set.narrow[0].src}
          srcSet={srcSet(set.narrow)}
          sizes="100vw"
          width={largest(set.narrow).width}
          height={largest(set.narrow).height}
          alt={content.hero.imageAlt}
          fetchPriority="high"
          decoding="async"
          className="block h-auto w-full"
        />
      </picture>

      {locale === "en" && (
        <div className="hero__slogan">
          <p className="hero__headline">
            {taglineA}
            <br />
            {taglineB}
          </p>
          <span aria-hidden="true" className="rule mx-auto mt-[0.6em]" />
          {/* Each item unbreakable, the "·" glued to the item before it, so
              a wrap never starts a line with the separator. */}
          <p className="hero__sub">
            {content.hero.descriptor.split(" · ").map((part, i, all) => (
              <span key={part} className="whitespace-nowrap">
                {part}
                {i < all.length - 1 && "\u00a0· "}
              </span>
            ))}
          </p>
        </div>
      )}
    </figure>
  );
}
