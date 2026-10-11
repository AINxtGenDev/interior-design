import type { Metadata } from "next";
import "../globals.css";
import { fontVariables } from "../fonts";
import { CONTENT, SITE_URL } from "@/content/site";
import { openGraphFor } from "@/content/og";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: CONTENT.en.meta.title,
  description: CONTENT.en.meta.description,
  alternates: {
    canonical: "/en/",
    languages: { de: "/", en: "/en/", "x-default": "/" },
  },
  openGraph: openGraphFor("en", "en/", CONTENT.en.meta.title, CONTENT.en.meta.description),
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
