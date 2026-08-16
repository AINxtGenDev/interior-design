import Image from "next/image";
import logoMark from "@/assets/logo-mark.webp";

/**
 * The brand monogram, turning slowly and continuously around its vertical axis.
 *
 * A flat image rotated past 90° shows its own mirror image, which would print
 * the monogram backwards for half of every turn. So the mark is built as a
 * two-sided card: both faces carry the logo, the back one pre-flipped, and
 * `backface-visibility` hands over between them. The logo therefore always
 * reads correctly, whichever way it is facing.
 *
 * The turn is decorative and is switched off entirely under
 * `prefers-reduced-motion` (see globals.css) — continuous motion in a sticky
 * header is exactly what that preference exists to stop.
 */
export default function LogoMark({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <span className={`logo-spin ${className ?? ""}`} aria-hidden="true">
      <span className="logo-spin__inner">
        <Image src={logoMark} alt="" priority={priority} className="logo-spin__face" />
        <Image
          src={logoMark}
          alt=""
          aria-hidden="true"
          className="logo-spin__face logo-spin__face--back"
        />
      </span>
    </span>
  );
}
