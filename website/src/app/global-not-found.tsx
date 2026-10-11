import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { fontVariables } from "./fonts";
import { CONTACT, getContent } from "@/content/site";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

/*
 * 404 for unmatched URLs. With two root layouts — (de) and (en) — there is
 * no single layout an app/not-found.tsx could render in, so Next's
 * global-not-found (experimental.globalNotFound) bypasses layouts and this
 * file brings its own <html>, styles and fonts. German first, as on the
 * site, with one line leading English readers to /en/. Next adds
 * <meta name="robots" content="noindex"> itself.
 */
export const metadata: Metadata = {
  title: `Seite nicht gefunden | ${CONTACT.businessName}`,
};

export default function GlobalNotFound() {
  const c = getContent("de");

  return (
    <html lang="de-AT" className={fontVariables}>
      <body>
        <SiteHeader content={c} locale="de" path="" />

        <main id="main" className="px-4 py-12 sm:px-6 md:py-20">
          <div className="mx-auto max-w-[42rem]">
            <h1 className="h1">Seite nicht gefunden</h1>
            <span aria-hidden="true" className="rule mt-5" />
            <p className="mt-6">
              Diese Seite gibt es nicht oder nicht mehr. Alles Wichtige finden Sie auf der Startseite.
            </p>
            <p className="mt-6">
              <Link href="/" className="link inline-flex min-h-11 items-center">
                ← Zur Startseite
              </Link>
            </p>
            <p lang="en" className="small mt-8 text-anthrazit-mid">
              Page not found.{" "}
              <Link href="/en/" className="link">
                Continue to the English site
              </Link>
            </p>
          </div>
        </main>

        <SiteFooter content={c} locale="de" />
      </body>
    </html>
  );
}
