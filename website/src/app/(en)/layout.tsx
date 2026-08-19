import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Jost } from "next/font/google";
import "../globals.css";
import { CONTACT, CONTENT, SITE_URL } from "@/content/site";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: CONTENT.en.meta.title,
  description: CONTENT.en.meta.description,
  alternates: {
    canonical: "/en/",
    languages: { de: "/", en: "/en/", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: `${SITE_URL}en/`,
    siteName: CONTACT.businessName,
    title: CONTENT.en.meta.title,
    description: CONTENT.en.meta.description,
    images: [{ url: "/og-image-en.jpg", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export default function EnRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${jost.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
