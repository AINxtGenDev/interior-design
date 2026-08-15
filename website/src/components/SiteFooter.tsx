import Link from "next/link";
import { CONTACT, type Content, type Locale } from "@/content/site";

export default function SiteFooter({
  content,
  locale,
}: {
  content: Content;
  locale: Locale;
}) {
  const year = 2026;
  const links = [
    [content.legalLinks.imprint, content.footer.imprint],
    [content.legalLinks.privacy, content.footer.privacy],
    [content.legalLinks.terms, content.footer.terms],
  ] as const;

  return (
    <footer className="border-t border-sage-200/70 bg-warm-cream/50 px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-anthracite-500">
          <p className="font-heading text-base text-anthracite-700">
            {CONTACT.name}
          </p>
          <p className="mt-1">
            {CONTACT.street} · {CONTACT.postalCode} {CONTACT.city} ·{" "}
            {locale === "de" ? CONTACT.country : CONTACT.countryEn}
          </p>
          <p className="mt-1">
            &copy; {year} {CONTACT.name}. {content.footer.rights}
          </p>
        </div>

        <nav
          aria-label={locale === "de" ? "Rechtliches" : "Legal"}
          className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"
        >
          {links.map(([href, label], i) => (
            <span key={href} className="flex items-center gap-5">
              {i > 0 && (
                <span aria-hidden="true" className="text-sage-300">
                  |
                </span>
              )}
              <Link
                href={href}
                className="inline-flex min-h-11 items-center text-anthracite-500 underline decoration-sage-300 underline-offset-4 transition-colors hover:text-sage-700 hover:decoration-sage-500"
              >
                {label}
              </Link>
            </span>
          ))}
        </nav>
      </div>
    </footer>
  );
}
