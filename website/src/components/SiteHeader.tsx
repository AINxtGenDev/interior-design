import Link from "next/link";
import type { Content, Locale } from "@/content/site";

const SECTION_IDS = {
  services: "leistungen",
  audience: "fuer-wen",
  process: "ablauf",
  packages: "pakete",
  about: "ueber-mich",
  contact: "kontakt",
} as const;

export { SECTION_IDS };

/**
 * Sticky top bar. The nav links are in-page anchors, so they only make sense
 * on the one-pager — `showNav` is false on the legal pages, which link home
 * instead.
 */
export default function SiteHeader({
  content,
  locale,
  showNav = true,
}: {
  content: Content;
  locale: Locale;
  showNav?: boolean;
}) {
  const home = locale === "de" ? "/" : "/en/";
  const nav = [
    ["services", content.nav.services],
    ["audience", content.nav.audience],
    ["process", content.nav.process],
    ["packages", content.nav.packages],
    ["about", content.nav.about],
    ["contact", content.nav.contact],
  ] as const;

  return (
    <header className="no-print sticky top-0 z-50 border-b border-sage-200/70 bg-warm-white/90 backdrop-blur-md">
      <div className="rule-gold" aria-hidden="true" />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <Link
          href={home}
          className="inline-flex min-h-11 items-center font-heading text-lg leading-none tracking-tight text-anthracite-800 transition-colors hover:text-sage-700"
        >
          Claudia&nbsp;Plessl
        </Link>

        {showNav && (
          <nav
            aria-label={locale === "de" ? "Hauptnavigation" : "Main navigation"}
            className="hidden items-center gap-7 lg:flex"
          >
            {nav.map(([key, label]) => (
              <a
                key={key}
                href={`#${SECTION_IDS[key]}`}
                className="eyebrow text-anthracite-500 transition-colors hover:text-sage-700"
              >
                {label}
              </a>
            ))}
          </nav>
        )}

        <Link
          href={content.langSwitch.href}
          hrefLang={locale === "de" ? "en" : "de"}
          aria-label={
            locale === "de" ? "Switch to English" : "Auf Deutsch wechseln"
          }
          className="eyebrow flex h-11 min-w-11 items-center justify-center rounded-full border border-sage-300 px-3 text-sage-700 transition-colors hover:border-sage-500 hover:bg-sage-50"
        >
          {content.langSwitch.hrefLabel}
        </Link>
      </div>
    </header>
  );
}
