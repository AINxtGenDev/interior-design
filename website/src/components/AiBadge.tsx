/*
 * Built from "KI-generiertes Bild – Minimalistisches Siegel.png" and
 * "KI-generiertes Video-Siegel.png" by brand/build_web_assets.py: cut to the
 * disc, WebP with alpha.
 */
import imageBadge128 from "@/assets/ai-badge-128.webp";
import imageBadge192 from "@/assets/ai-badge-192.webp";
import videoBadge128 from "@/assets/ai-video-badge-128.webp";
import videoBadge192 from "@/assets/ai-video-badge-192.webp";

const BADGES = {
  image: [imageBadge128, imageBadge192],
  video: [videoBadge128, videoBadge192],
};

/**
 * The "KI-generiert" seal on an AI-made image (bottom right, Homepage
 * Änderungen 16.10.26, slide 2) or on the film (top right, slide 3: visible
 * on the poster already, not only on hover); hovering it shows the
 * explanation. The parent must be `relative`. The film's seal is smaller
 * (24/28/32 px instead of 32/40/48) and `hidden` fades it out once the
 * opening is over (see IntroVideoFrame).
 *
 * A plain <img> for the srcset (see BrandLogo). fetchPriority="low" keeps
 * React from preloading it next to the hero image, the page's LCP element.
 */
export default function AiBadge({
  label,
  kind = "image",
  lazy = false,
  hidden = false,
}: {
  label: string;
  kind?: keyof typeof BADGES;
  lazy?: boolean;
  hidden?: boolean;
}) {
  const [small, large] = BADGES[kind];
  const placement =
    kind === "video"
      ? "top-2 w-6 md:top-3 md:w-7 lg:w-8"
      : "bottom-2 w-8 md:bottom-3 md:w-10 lg:w-12";
  const sizes =
    kind === "video"
      ? "(min-width: 64rem) 32px, (min-width: 48rem) 28px, 24px"
      : "(min-width: 64rem) 48px, (min-width: 48rem) 40px, 32px";
  return (
    // eslint-disable-next-line @next/next/no-img-element -- srcset; see BrandLogo
    <img
      src={small.src}
      srcSet={`${small.src} 128w, ${large.src} 192w`}
      sizes={sizes}
      width={small.width}
      height={small.height}
      alt={label}
      title={label}
      loading={lazy ? "lazy" : "eager"}
      fetchPriority="low"
      decoding="async"
      aria-hidden={hidden || undefined}
      className={`absolute right-2 h-auto transition-opacity duration-500 md:right-3 ${placement} ${
        hidden ? "pointer-events-none opacity-0" : ""
      }`}
    />
  );
}
