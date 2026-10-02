import type { Metadata } from "next";
import "../globals.css";
import { fontVariables } from "../fonts";
import { CONTACT, CONTENT, SITE_URL } from "@/content/site";

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
      className={fontVariables}
    >
      <body>{children}</body>
    </html>
  );
}
