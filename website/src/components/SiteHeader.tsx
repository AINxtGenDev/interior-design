import Link from "next/link";
import Image from "next/image";
import logoMark from "@/assets/logo-mark.webp";
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
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:inline-flex focus:min-h-11 focus:items-center focus:rounded-full focus:bg-sage-800 focus:px-5 focus:text-sm focus:text-warm-white"
      >
        {locale === "de" ? "Zum Inhalt springen" : "Skip to content"}
      </a>

      <header className="no-print sticky top-0 z-50 border-b border-sage-200/70 bg-warm-white/90 backdrop-blur-md">
      <div className="rule-gold" aria-hidden="true" />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        {/* Brand lockup: the scanned monogram plus the wordmark as live text,
            which stays crisp at any size and matches the printed card's
            letter-spaced geometric sans. */}
        <Link
          href={home}
          aria-label="Claudia Plessl — Interior Design & Ordnungscoaching"
          className="group inline-flex min-h-11 items-center gap-3"
        >
          <Image
            src={logoMark}
            alt=""
            priority
            className="h-9 w-auto md:h-10"
            sizes="48px"
          />
          <span className="font-nav text-[0.8rem] leading-none font-medium tracking-[0.2em] text-anthracite-700 uppercase transition-colors group-hover:text-sage-700 sm:text-sm">
            Claudia&nbsp;Plessl
          </span>
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
    </>
  );
}
