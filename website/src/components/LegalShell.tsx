import Link from "next/link";
import { getContent, type Locale } from "@/content/site";
import { buildLegalGraph } from "@/content/schema";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import JsonLd from "./JsonLd";

/** Chrome shared by every legal page: header without in-page nav, narrow
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

      <SiteHeader content={c} locale={locale} showNav={false} />

      <main id="main" className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[68ch]">
          <Link
            href={home}
            className="eyebrow no-print inline-flex min-h-11 items-center text-sage-600 transition-colors hover:text-sage-800"
          >
            {locale === "de" ? "← Zur Startseite" : "← Back to home"}
          </Link>

          <h1 className="display-lg mt-6 text-anthracite-800">{title}</h1>
          <div className="rule-gold mt-5 w-24" aria-hidden="true" />
          <p className="mt-4 text-sm text-anthracite-400">
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
    <section id={id} className="mt-10 scroll-mt-20 first:mt-0">
      <h2 className="font-heading text-2xl font-normal text-anthracite-800">
        {heading}
      </h2>
      <div className="mt-4 space-y-4 text-anthracite-600">{children}</div>
    </section>
  );
}

/** Marks a value the founder still has to supply. Visible on purpose — a
 *  silently missing GISA number is worse than an obvious gap. */
export function Todo({ children }: { children: React.ReactNode }) {
  return (
    <mark className="rounded-sm bg-gold-accent/25 px-1.5 py-0.5 text-anthracite-700 not-italic">
      {children}
    </mark>
  );
}
