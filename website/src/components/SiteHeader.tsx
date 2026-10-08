import BrandLogo from "@/components/BrandLogo";
import LangSwitch from "@/components/LangSwitch";
import SiteNav, { type NavModel } from "@/components/SiteNav";
import { ASSET_PREFIX, CONTACT, type Content, type Locale } from "@/content/site";

/*
 * Section anchors. Identical in both languages so the language switch can
 * keep the reader in place; the older ids (leistungen, fuer-wen, ablauf,
 * pakete) are kept so existing links still land.
 */
export const SECTION_IDS = {
  top: "top",
  services: "leistungen",
  audience: "fuer-wen",
  process: "ablauf",
  packages: "pakete",
  about: "ueber-mich",
  projects: "projekte",
  faq: "faq",
  contact: "kontakt",
} as const;

/**
 * Sticky top bar: logo, main navigation (CI.pptx slide 4), DE | EN switch.
 *
 * Every nav link points at the home page's anchors with the full path, so the
 * same header works on the legal pages too. Plain hrefs need basePath added
 * by hand; next/link would do it, but these are same-document jumps on the
 * home page and must not trigger client-side routing.
 */
export default function SiteHeader({
  content,
  locale,
  path,
}: {
  content: Content;
  locale: Locale;
  /** Current page path, as in LANG_ALTERNATES ("" for the German home). */
  path: string;
}) {
  const home = `${ASSET_PREFIX}${locale === "de" ? "/" : "/en/"}`;
  const at = (id: string) => `${home}#${id}`;
  const n = content.nav;

  const model: NavModel = {
    label: n.label,
    home: { label: n.home, href: at(SECTION_IDS.top) },
    offer: {
      label: n.offer,
      overview: { label: n.offerOverview, href: at(SECTION_IDS.services) },
      children: content.services.items.map((s) => ({ label: s.title, href: at(s.id) })),
      // Not in slide 4, but without them prices and workshops were
      // unreachable from the menu. Shown below a divider.
      more: [
        { label: n.audience, href: at(SECTION_IDS.audience) },
        { label: n.process, href: at(SECTION_IDS.process) },
        { label: n.packages, href: at(SECTION_IDS.packages) },
        { label: n.workshops, href: at(content.services.workshops.id) },
      ],
    },
    rest: [
      { label: n.about, href: at(SECTION_IDS.about) },
      { label: n.projects, href: at(SECTION_IDS.projects) },
      { label: n.faq, href: at(SECTION_IDS.faq) },
    ],
    contact: { label: n.contact, href: at(SECTION_IDS.contact) },
    menuOpen: n.menuOpen,
    menuClose: n.menuClose,
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:inline-flex focus:min-h-11 focus:items-center focus:rounded focus:bg-sage-dark focus:px-5 focus:font-bold focus:text-white"
      >
        {n.skip}
      </a>

      <header className="no-print sticky top-0 z-50 border-b border-anthrazit-light bg-paper/95 backdrop-blur-md">
        {/* As wide as the title image below it, so logo and menu sit at the
            image edges (Homepage Änderungen 8.10.26, slide 2). */}
        <div className="mx-auto flex h-[var(--header-h)] max-w-[1947px] items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:px-8">
          <a
            href={home}
            aria-label={`${CONTACT.businessName} – ${n.home}`}
            className="mr-auto flex min-h-11 shrink-0 items-center"
          >
            {/* 48 px tall on phones, 56 px from 1024 px: the wordmark is
                ~29 % of the logo's height, so this keeps it at 14–16 px. */}
            <BrandLogo priority sizes="(min-width: 1024px) 105px, 90px" className="h-12 lg:h-14" />
          </a>

          <SiteNav
            model={model}
            langSwitch={
              <LangSwitch locale={locale} path={path} label={content.langSwitch.label} />
            }
          />
        </div>
      </header>
    </>
  );
}
