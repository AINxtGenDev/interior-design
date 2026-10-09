import Link from "next/link";
import { getContent, type Locale } from "@/content/site";
import { buildLegalGraph } from "@/content/schema";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import JsonLd from "./JsonLd";

/** Chrome shared by every legal page: the full site header, narrow
 *  reading measure, back-link, footer.
 *
 *  `path` and `updatedIso` are the machine-readable halves of what the page
 *  already shows: the first anchors the page's own `@id` and its breadcrumb,
 *  the second is the ISO form of the "Stand: …" line, used by both the
 *  `<time>` element and the graph's `dateModified`. */
export default function LegalShell({
  locale,
  path,
  title,
  updated,
  updatedIso,
  children,
}: {
  locale: Locale;
  path: string;
  title: string;
  updated: string;
  updatedIso: string;
  children: React.ReactNode;
}) {
  const c = getContent(locale);
  const home = locale === "de" ? "/" : "/en/";

  return (
    <>
      <JsonLd graph={buildLegalGraph(locale, { path, title, updatedIso })} />

      <SiteHeader content={c} locale={locale} path={path} />

      <main id="main" className="px-4 py-12 sm:px-6 md:py-20">
        <div className="mx-auto max-w-[42rem]">
          <Link href={home} className="link no-print inline-flex min-h-11 items-center">
            {locale === "de" ? "← Zur Startseite" : "← Back to home"}
          </Link>

          <h1 className="h1 mt-6">{title}</h1>
          <span aria-hidden="true" className="rule mt-5" />
          <p className="small mt-4 text-anthrazit-mid">
            <time dateTime={updatedIso}>{updated}</time>
          </p>

          <div className="legal-body mt-12">{children}</div>
        </div>
      </main>

      <SiteFooter content={c} locale={locale} />
    </>
  );
}

/** Section heading used inside legal documents. */
export function LegalSection({
  id,
  heading,
  children,
}: {
  id?: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-12 first:mt-0">
      <h2 className="h3">{heading}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}
