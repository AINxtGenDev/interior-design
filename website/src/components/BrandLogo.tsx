/*
 * Statically imported so the emitted src carries basePath.
 * Both files are built from Logo2.png by brand/build_web_assets.py: trimmed
 * to the mark, lossless WebP with alpha.
 */
import logo480 from "@/assets/logo-480.webp";
import logo960 from "@/assets/logo-960.webp";

/**
 * The CI logo (Logo2.png): monogram, wordmark and descriptor, never
 * rearranged or recoloured.
 *
 * A plain <img> on purpose. The static export runs with
 * `images.unoptimized`, under which next/image emits a single src and no
 * srcset — the 960 px file would then reach every phone, or the 480 px file
 * would blur on a 3x display. Height is set by the caller; width follows from
 * the intrinsic ratio, and width/height attributes reserve the box (no CLS).
 *
 * `sizes` is the rendered CSS width — the browser multiplies by the device
 * pixel ratio itself.
 */
export default function BrandLogo({
  className,
  sizes,
  priority = false,
}: {
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- see above
    <img
      src={logo480.src}
      srcSet={`${logo480.src} 480w, ${logo960.src} 960w`}
      sizes={sizes}
      width={logo480.width}
      height={logo480.height}
      alt=""
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      loading={priority ? "eager" : "lazy"}
      className={`block w-auto ${className ?? ""}`}
    />
  );
}
