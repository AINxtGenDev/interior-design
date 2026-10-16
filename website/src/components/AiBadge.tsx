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
 * explanation. The parent must be `relative`.
 *
 * A plain <img> for the srcset (see BrandLogo). fetchPriority="low" keeps
 * React from preloading it next to the hero image, the page's LCP element.
 */
export default function AiBadge({
  label,
  kind = "image",
  lazy = false,
}: {
  label: string;
  kind?: keyof typeof BADGES;
  lazy?: boolean;
}) {
  const [small, large] = BADGES[kind];
  const corner = kind === "video" ? "top-2 md:top-3" : "bottom-2 md:bottom-3";
  return (
    // eslint-disable-next-line @next/next/no-img-element -- srcset; see BrandLogo
    <img
      src={small.src}
      srcSet={`${small.src} 128w, ${large.src} 192w`}
      sizes="(min-width: 64rem) 48px, (min-width: 48rem) 40px, 32px"
      width={small.width}
      height={small.height}
      alt={label}
      title={label}
      loading={lazy ? "lazy" : "eager"}
      fetchPriority="low"
      decoding="async"
      className={`absolute right-2 h-auto w-8 md:right-3 md:w-10 lg:w-12 ${corner}`}
    />
  );
}
