/*
 * Built from "KI-generiertes Bild – Minimalistisches Siegel.png" by
 * brand/build_web_assets.py: trimmed to the disc, WebP with alpha.
 */
import aiBadge128 from "@/assets/ai-badge-128.webp";
import aiBadge192 from "@/assets/ai-badge-192.webp";

/**
 * The "KI-generiert" seal in the bottom-right corner of an AI-made image
 * (Homepage Änderungen 16.10.26, slide 2); hovering it shows the
 * explanation. The parent must be `relative`.
 *
 * A plain <img> for the srcset (see BrandLogo). fetchPriority="low" keeps
 * React from preloading it next to the hero image, the page's LCP element.
 */
export default function AiBadge({ label, lazy = false }: { label: string; lazy?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- srcset; see BrandLogo
    <img
      src={aiBadge128.src}
      srcSet={`${aiBadge128.src} 128w, ${aiBadge192.src} 192w`}
      sizes="(min-width: 64rem) 48px, (min-width: 48rem) 40px, 32px"
      width={aiBadge128.width}
      height={aiBadge128.height}
      alt={label}
      title={label}
      loading={lazy ? "lazy" : "eager"}
      fetchPriority="low"
      decoding="async"
      className="absolute right-2 bottom-2 h-auto w-8 md:right-3 md:bottom-3 md:w-10 lg:w-12"
    />
  );
}
