import type { Metadata } from "next";
import "../globals.css";
import { fontVariables } from "../fonts";
import { CONTACT, CONTENT, SITE_URL } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: CONTENT.de.meta.title,
  description: CONTENT.de.meta.description,
  alternates: {
    canonical: "/",
    languages: { de: "/", en: "/en/", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    locale: "de_AT",
    url: SITE_URL,
    siteName: CONTACT.businessName,
    title: CONTENT.de.meta.title,
    description: CONTENT.de.meta.description,
    // Eigene Karte je Sprache: der Beschreiber unten auf dem Bild ist Pixel,
    // keine Uebersetzung zur Laufzeit. Vorher lag hier eine englische Zeile
    // unter einer deutschen Headline.
    images: [{ url: "/og-image-de.jpg", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export default function DeRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de-AT"
      className={fontVariables}
    >
      <body>{children}</body>
    </html>
  );
}
