import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
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
    <footer className="bg-sage-light">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[auto_1fr] md:gap-16 md:py-16 lg:px-8">
        {/* 96 px tall: the largest placement, where the descriptor line of
            the logo is still legible (~9 px cap height). */}
        <BrandLogo sizes="180px" className="h-24" />

        <div className="small space-y-2">
          <p>
            {CONTACT.street} · {CONTACT.postalCode} {CONTACT.city} ·{" "}
            {locale === "de" ? CONTACT.country : CONTACT.countryEn}
          </p>
          <p>
            &copy; {year} {CONTACT.name}. {content.footer.rights}
          </p>
          {/* KI-Offenlegung sichtbar auf jeder Seite, nicht nur im Impressum. */}
          <p className="text-anthrazit-mid">{content.footer.imageNotice}</p>

          <nav aria-label={locale === "de" ? "Rechtliches" : "Legal"} className="pt-2">
            <ul className="flex flex-wrap gap-x-6">
              {links.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="link inline-flex min-h-11 min-w-11 items-center justify-center">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Closing line of the style-guide slide. The non-breaking space keeps
          each "•" off the start of a wrapped line. */}
      <div className="border-t border-sage-soft">
        <div className="eyebrow mx-auto flex max-w-6xl flex-col items-center gap-x-10 gap-y-2 px-4 py-5 text-center text-sage-dark sm:px-6 md:flex-row md:justify-between lg:px-8">
          <p>{"Claudia Plessl — Interior Design • Professional Organizing".replace(/ • /g, "\u00a0• ")}</p>
          <p>{content.footer.values.replace(/ • /g, "\u00a0• ")}</p>
        </div>
      </div>
    </footer>
  );
}
