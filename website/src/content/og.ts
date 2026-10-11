import type { Metadata } from "next";
import { CONTACT, absoluteUrl, type Locale } from "./site";

/*
 * Open Graph per page. Next merges metadata shallowly: a page that sets no
 * `openGraph` inherits the layout's whole block, so the legal pages used to
 * announce the home page's URL and title (and Next derives the twitter:* tags
 * from it, so those were wrong too). Every page builds its block here.
 */
const OG_LOCALE: Record<Locale, { locale: string; alternate: string; image: string }> = {
  de: { locale: "de_AT", alternate: "en_GB", image: "/og-image-de.jpg" },
  en: { locale: "en_GB", alternate: "de_AT", image: "/og-image-en.jpg" },
};

export function openGraphFor(
  locale: Locale,
  path: string,
  title: string,
  description: string,
): Metadata["openGraph"] {
  const l = OG_LOCALE[locale];
  return {
    type: "website",
    locale: l.locale,
    alternateLocale: [l.alternate],
    url: absoluteUrl(path),
    siteName: CONTACT.businessName,
    title,
    description,
    // Eigene Karte je Sprache: der Beschreiber unten auf dem Bild ist Pixel,
    // keine Uebersetzung zur Laufzeit.
    images: [{ url: l.image, width: 1200, height: 630 }],
  };
}
