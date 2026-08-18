import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Jost } from "next/font/google";
import "../globals.css";
import { CONTACT, CONTENT } from "@/content/site";

/*
 * next/font downloads and self-hosts these at build time, so the published
 * site makes no request to fonts.googleapis.com. That is what keeps the
 * Datenschutzerklärung's "no third-party requests" claim true.
 */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = "https://ainxtgendev.github.io/interior-design/";

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
      className={`${cormorant.variable} ${inter.variable} ${jost.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
