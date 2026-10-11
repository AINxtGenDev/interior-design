import type { Metadata } from "next";
import "../globals.css";
import { fontVariables } from "../fonts";
import { CONTENT, SITE_URL } from "@/content/site";
import { openGraphFor } from "@/content/og";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: CONTENT.de.meta.title,
  description: CONTENT.de.meta.description,
  alternates: {
    canonical: "/",
    languages: { de: "/", en: "/en/", "x-default": "/" },
  },
  openGraph: openGraphFor("de", "", CONTENT.de.meta.title, CONTENT.de.meta.description),
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
