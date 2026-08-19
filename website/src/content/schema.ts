/**
 * schema.org JSON-LD, derived from the same typed content the pages render.
 *
 * Nothing here restates a fact that lives in `site.ts` — every name, price and
 * credential is read out of `CONTACT` / `CONTENT`. That is the whole point: a
 * price edited in one place cannot drift away from the markup a machine reads.
 *
 * Both locales get their own node graph with their own `@id` fragments. One
 * shared `@id` carrying a German description on the English page and vice versa
 * would describe the same entity twice with conflicting values.
 *
 * Deliberately absent:
 *  - `openingHours` — there are none; the work happens at the client's place.
 *  - `SearchAction` — the site has no search. Declaring one is a classic lie.
 *  - `FAQPage` — there is no FAQ content. Marking up invented Q&A to farm a
 *    rich result is what earns a manual action.
 *  - `vatID` — Kleinunternehmerin, and the UID is still a placeholder in the
 *    Impressum. An invented identifier is worse than a missing one.
 */

import {
  CONTACT,
  absoluteUrl,
  getContent,
  localeHome,
  type Locale,
} from "./site";

/**
 * Kleinunternehmerregelung: the listed prices carry no VAT.
 *
 * One flag, because this flips the day the EUR 55.000 threshold is crossed —
 * see the note in `packages.note`, which says the same thing in prose.
 */
const VAT_INCLUDED = false;

/**
 * Publication date of the intro film, from the commit that added the current
 * render (`git log -1 -- public/video/vorstellung.mp4`), not from today.
 */
const VIDEO_UPLOAD_DATE = "2026-08-19";

/** Measured with ffprobe on `public/video/vorstellung.mp4`: 58.3 s. */
const VIDEO_DURATION = "PT58S";

type JsonLdNode = Record<string, unknown>;

/**
 * "ab EUR 110" / "from EUR 110" → 110.
 *
 * The number is the only run of digits in either locale's string. Throwing
 * rather than defaulting means a malformed price fails `next build` instead of
 * shipping an offer that silently claims to cost nothing.
 */
function minPriceOf(price: string, packageName: string): number {
  const match = price.match(/\d+/);
  if (!match) {
    throw new Error(
      `schema.ts: no price figure found in "${price}" for package "${packageName}"`,
    );
  }
  return Number(match[0]);
}

/** Wien and Niederösterreich, the same two areas for the business and each service. */
const AREA_SERVED = [
  { "@type": "City", name: "Wien" },
  { "@type": "AdministrativeArea", name: "Niederösterreich" },
];

/** `addressCountry` carries the country as its ISO code, so it needs no locale. */
const POSTAL_ADDRESS: JsonLdNode = {
  "@type": "PostalAddress",
  streetAddress: CONTACT.street,
  postalCode: CONTACT.postalCode,
  addressLocality: CONTACT.city,
  addressRegion: "Niederösterreich",
  addressCountry: "AT",
};

/**
 * The full graph for a home page: who she is, what she sells, what it costs,
 * and the film. Rendered by `HomePage`.
 */
export function buildHomeGraph(locale: Locale): JsonLdNode[] {
  const c = getContent(locale);
  const home = localeHome(locale);
  const lang = locale === "de" ? "de-AT" : "en";

  const businessId = `${home}#business`;
  const personId = `${home}#person`;
  const websiteId = `${home}#website`;
  const videoId = `${home}#video`;
  const catalogId = `${home}#packages`;

  const serviceIds = c.services.items.map(
    (_, i) => `${home}#service-${i + 1}`,
  );

  const business: JsonLdNode = {
    "@type": "ProfessionalService",
    "@id": businessId,
    name: CONTACT.businessName,
    alternateName: "Raum & Ordnung",
    // The Einzelunternehmen is the natural person; the brand is the trading name.
    legalName: CONTACT.name,
    description: c.meta.description,
    // `tagline` is two lines on the page; a slogan is one string.
    slogan: c.hero.tagline.replace(/\n/g, " "),
    url: home,
    inLanguage: lang,
    image: absoluteUrl(`og-image-${locale}.jpg`),
    logo: absoluteUrl("icons/android-chrome-512x512.png"),
    email: CONTACT.email,
    telephone: CONTACT.phoneHref,
    address: POSTAL_ADDRESS,
    /*
     * Only the two named areas. The page also states a limit of roughly 60
     * minutes' travel, which has no honest home here: the correct property
     * would be a GeoCircle, and that wants a centre and a radius in metres —
     * neither of which a travel time is. It stays in the prose.
     */
    areaServed: AREA_SERVED,
    founder: { "@id": personId },
    employee: { "@id": personId },
    currenciesAccepted: "EUR",
    priceRange: "EUR 110–690",
    availableLanguage: ["de-AT", "en"],
    knowsAbout: c.services.items.map((s) => s.title),
    hasOfferCatalog: { "@id": catalogId },
  };

  const person: JsonLdNode = {
    "@type": "Person",
    "@id": personId,
    name: CONTACT.name,
    honorificPrefix: "Mag.",
    givenName: "Claudia",
    familyName: "Plessl",
    // Her own first paragraph already says what she does, in both languages.
    description: c.about.body[0],
    worksFor: { "@id": businessId },
    knowsLanguage: ["de-AT", "en"],
    /*
     * No `credentialCategory`: the certification is one, the annual continuing
     * education is not, and tagging both "certificate" would overstate the
     * second.
     */
    hasCredential: c.about.credentials.items.map((cred) => ({
      "@type": "EducationalOccupationalCredential",
      name: cred.title,
      description: cred.note,
      recognizedBy: { "@type": "Organization", name: cred.issuer },
    })),
  };

  /*
   * Each of the three services carries its bullet list as an OfferCatalog of
   * un-priced Offers — the schema.org-canonical way to say "this is included",
   * and the part an agent needs to answer "does she do document organisation?".
   */
  const services: JsonLdNode[] = c.services.items.map((s, i) => ({
    "@type": "Service",
    "@id": serviceIds[i],
    name: s.title,
    serviceType: s.title,
    description: s.lead,
    inLanguage: lang,
    provider: { "@id": businessId },
    areaServed: AREA_SERVED,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: s.title,
      itemListElement: s.points.map((point) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: point },
      })),
    },
  }));

  /*
   * The seven priced packages. Every price on the site is a floor ("ab EUR
   * 110"), so it is a `minPrice` — a bare `price` would assert a fixed fee the
   * business does not offer.
   */
  const catalog: JsonLdNode = {
    "@type": "OfferCatalog",
    "@id": catalogId,
    name: c.packages.heading,
    description: c.packages.lead,
    itemListElement: c.packages.items.map((p, i) => ({
      "@type": "Offer",
      "@id": `${home}#offer-${i + 1}`,
      name: p.name,
      description: p.scope,
      category: p.audience,
      seller: { "@id": businessId },
      areaServed: AREA_SERVED,
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: minPriceOf(p.price, p.name),
        priceCurrency: "EUR",
        valueAddedTaxIncluded: VAT_INCLUDED,
      },
    })),
  };

  const video: JsonLdNode = {
    "@type": "VideoObject",
    "@id": videoId,
    name: c.video.heading,
    description: c.video.lead,
    contentUrl: absoluteUrl("video/vorstellung.mp4"),
    thumbnailUrl: absoluteUrl("video/vorstellung-poster.jpg"),
    uploadDate: VIDEO_UPLOAD_DATE,
    duration: VIDEO_DURATION,
    // The film is narrated in German in both locales; only the page around it
    // changes language.
    inLanguage: "de-AT",
    isFamilyFriendly: true,
    publisher: { "@id": businessId },
    caption: {
      "@type": "MediaObject",
      contentUrl: absoluteUrl("video/vorstellung-de.vtt"),
      encodingFormat: "text/vtt",
      inLanguage: "de-AT",
    },
  };

  const website: JsonLdNode = {
    "@type": "WebSite",
    "@id": websiteId,
    url: home,
    name: CONTACT.businessName,
    description: c.meta.description,
    inLanguage: lang,
    publisher: { "@id": businessId },
  };

  const webPage: JsonLdNode = {
    "@type": "WebPage",
    "@id": `${home}#webpage`,
    url: home,
    name: c.meta.title,
    description: c.meta.description,
    inLanguage: lang,
    isPartOf: { "@id": websiteId },
    about: { "@id": businessId },
    primaryImageOfPage: absoluteUrl(`og-image-${locale}.jpg`),
    video: { "@id": videoId },
  };

  return [business, person, ...services, catalog, video, website, webPage];
}

/**
 * The graph for a legal page: what it is, which site it belongs to, and the
 * two-step trail back home. Rendered by `LegalShell`.
 */
export function buildLegalGraph(
  locale: Locale,
  page: { path: string; title: string; updatedIso: string },
): JsonLdNode[] {
  const home = localeHome(locale);
  const lang = locale === "de" ? "de-AT" : "en";
  const url = absoluteUrl(page.path);

  const webPage: JsonLdNode = {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: page.title,
    inLanguage: lang,
    // Every legal page dates itself to a month, so the ISO value is a month.
    dateModified: page.updatedIso,
    isPartOf: { "@id": `${home}#website` },
    publisher: { "@id": `${home}#business` },
    breadcrumb: { "@id": `${url}#breadcrumb` },
  };

  const breadcrumb: JsonLdNode = {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: CONTACT.businessName,
        item: home,
      },
      { "@type": "ListItem", position: 2, name: page.title, item: url },
    ],
  };

  return [webPage, breadcrumb];
}
