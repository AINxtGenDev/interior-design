/**
 * Single source of truth for all page copy, in both languages.
 *
 * German is the primary language and lives at the site root; English is a
 * secondary translation served from /en/. Keeping both in one typed object
 * means a missing translation is a build error rather than a silent gap.
 *
 * Content is derived from businessplan-plessl_20042026.docx.
 */

export type Locale = "de" | "en";

export const LOCALES: Locale[] = ["de", "en"];

/**
 * Prefix for assets referenced as plain attribute strings (video, captions).
 * next/image and next/link handle basePath themselves; raw `src` strings don't.
 */
export const ASSET_PREFIX = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Absolute site origin including basePath, with a trailing slash.
 *
 * Lives here rather than in the two layouts because the JSON-LD needs absolute
 * URLs as well — schema.org @id values and contentUrls cannot be relative — and
 * a third copy of this string would be a third place to forget on the
 * custom-domain switch.
 */
export const SITE_URL = "https://ainxtgendev.github.io/interior-design/";

/** `absoluteUrl("impressum/")` → `https://…/interior-design/impressum/`. */
export function absoluteUrl(path = ""): string {
  return `${SITE_URL}${path.replace(/^\//, "")}`;
}

/** Home URL of a locale — German at the root, English one level down. */
export function localeHome(locale: Locale): string {
  return locale === "de" ? absoluteUrl() : absoluteUrl("en/");
}

/** Business contact details — used by the site, the Impressum and the AGB. */
export const CONTACT = {
  /*
   * `name` is the natural person and stays the legally identifying entry for
   * the Einzelunternehmen — Impressum, AGB and the copyright line use it.
   * `businessName` is the trading name that carries the brand; it is the same
   * string in both locales, because a Firmenwortlaut is not translated.
   */
  name: "Mag. Claudia Plessl",
  businessName: "Mag. Claudia Plessl — Raum & Ordnung",
  street: "Ährengasse 6",
  postalCode: "3424",
  city: "Wolfpassing",
  country: "Österreich",
  countryEn: "Austria",
  email: "claudia.plessl@gmail.com",
  phone: "+43 664 15 17 650",
  phoneHref: "+436641517650",
} as const;

type Service = {
  /** In-page anchor; the four offers are also the "Mein Angebot" submenu. */
  id: string;
  title: string;
  lead: string;
  points: string[];
  /** Entry price, quoted from the package list so it cannot drift. */
  price: string;
};
type Audience = { title: string; profile: string; need: string };
type Step = { title: string; body: string };
type Package = { name: string; scope: string; price: string; audience: string };
type Faq = { q: string; a: string };

export type Content = {
  htmlLang: string;
  meta: { title: string; description: string };
  /** Main navigation, in the order of CI.pptx slide 4. */
  nav: {
    label: string;
    home: string;
    offer: string;
    offerOverview: string;
    about: string;
    projects: string;
    faq: string;
    contact: string;
    /** Secondary links under "Mein Angebot", below the four slide-4 items. */
    audience: string;
    process: string;
    packages: string;
    workshops: string;
    menuOpen: string;
    menuClose: string;
    skip: string;
  };
  langSwitch: { label: string };
  hero: {
    title: string;
    /** The slogan painted into the title image (German). Feeds the image alt
     *  on `/`, the live overlay on `/en/`, and the JSON-LD slogan. */
    tagline: string;
    /** Second line under the slogan in the image. */
    descriptor: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    imageAlt: string;
  };
  video: {
    heading: string;
    lead: string;
    /** Also the EU AI Act Art. 50(4) disclosure: the narration is a synthetic
     *  copy of a real person's voice, so the caption must say so. */
    caption: string;
    unsupported: string;
    captionsLabel: string;
  };
  services: {
    heading: string;
    lead: string;
    /** The four offers of slide 4, in its order. */
    items: Service[];
    moreLabel: string;
    workshops: Service;
  };
  audience: { heading: string; lead: string; items: Audience[] };
  process: { heading: string; lead: string; items: Step[] };
  packages: {
    heading: string;
    lead: string;
    items: Package[];
    note: string;
    tableHeads: { name: string; scope: string; audience: string; price: string };
  };
  about: {
    heading: string;
    body: string[];
    principlesHeading: string;
    principles: string[];
    credentials: {
      heading: string;
      items: { title: string; issuer: string; note: string }[];
    };
  };
  projects: {
    heading: string;
    lead: string;
    status: string;
    tiles: [string, string];
    imageAlt: [string, string];
    imageNote: string;
    cta: string;
  };
  faq: { heading: string; lead: string; items: Faq[] };
  /** CI.pptx slide 9. Kept in English on both pages — it is a brand claim. */
  claim: { text: string; sub: string };
  contact: {
    heading: string;
    lead: string;
    emailLabel: string;
    phoneLabel: string;
    addressLabel: string;
    areaLabel: string;
    area: string;
    mailSubject: string;
    mailBody: string;
  };
  footer: {
    rights: string;
    imprint: string;
    privacy: string;
    terms: string;
    values: string;
    /** Offenlegung, dass das Bildmaterial und die Stimme im Video KI-generiert sind. */
    imageNotice: string;
  };
  legalLinks: { imprint: string; privacy: string; terms: string };
};

/*
 * Page-for-page counterparts for the language switch, keyed by the page path
 * (the same `path` the legal pages hand to LegalShell). The German legal
 * pages share one English page, so they land on its matching section.
 */
export const LANG_ALTERNATES: Record<string, string> = {
  "": "/en/",
  "impressum/": "/en/legal/#imprint",
  "datenschutz/": "/en/legal/#privacy",
  "agb/": "/en/legal/#terms",
  "en/": "/",
  "en/legal/": "/impressum/",
};

/*
 * Price lists live outside the content objects so the FAQ can quote them —
 * a price typed twice is a price that will one day disagree with itself.
 */
const dePackages: Package[] = [
  { name: "Raumcheck", scope: "60–90 Minuten Analyse von Ordnung und Gestaltung", audience: "Privat & Betrieb", price: "ab EUR 110" },
  { name: "Ordnungs-Startpaket", scope: "Ein klar abgegrenzter Bereich, z. B. Küche, Schlafzimmer oder Homeoffice", audience: "Privat", price: "ab EUR 220" },
  { name: "Gestaltungsberatung", scope: "Farb-, Material- und Einrichtungsberatung für einen Raum", audience: "Privat", price: "ab EUR 280" },
  { name: "Ordnung & Stil", scope: "Decluttering und anschließende Gestaltung eines Raums", audience: "Privat", price: "ab EUR 480" },
  { name: "Intensivbegleitung", scope: "Mehrere Termine für Organisation und Gestaltung inklusive Nachbetreuung", audience: "Privat", price: "ab EUR 690" },
  { name: "Workshop", scope: "Gruppenworkshop zu Raumgestaltung oder Organisation, halber Tag", audience: "Privat & Betrieb", price: "ab EUR 350" },
  { name: "B2B-Kompakt", scope: "Analyse, Bürogestaltung und Teamworkshop im Paket", audience: "Betrieb", price: "ab EUR 690" },
];

const enPackages: Package[] = [
  { name: "Space check", scope: "60–90 minute assessment of order and design", audience: "Private & business", price: "from EUR 110" },
  { name: "Organizing starter", scope: "One clearly defined area, e.g. kitchen, bedroom or home office", audience: "Private", price: "from EUR 220" },
  { name: "Design consultation", scope: "Colour, material and furnishing advice for one room", audience: "Private", price: "from EUR 280" },
  { name: "Order & style", scope: "Decluttering followed by the design of one room", audience: "Private", price: "from EUR 480" },
  { name: "Intensive support", scope: "Several appointments for organising and design, including follow-up", audience: "Private", price: "from EUR 690" },
  { name: "Workshop", scope: "Half-day group workshop on room design or organisation", audience: "Private & business", price: "from EUR 350" },
  { name: "Business compact", scope: "Assessment, office design and team workshop bundled", audience: "Business", price: "from EUR 690" },
];

const de: Content = {
  htmlLang: "de",
  meta: {
    title: `${CONTACT.businessName} | Wien & Niederösterreich`,
    description:
      "Interior Design, Ordnungscoaching und Workshops aus einer Hand. Erst Klarheit schaffen, dann Räume gestalten — für Familien, Menschen in Umbruchsituationen und kleine Unternehmen in Wien und Niederösterreich.",
  },
  nav: {
    label: "Hauptnavigation",
    home: "Home",
    offer: "Mein Angebot",
    offerOverview: "Alle Angebote im Überblick",
    about: "Über mich",
    projects: "Projekte",
    faq: "FAQ",
    contact: "Kontakt",
    audience: "Für wen",
    process: "Ablauf",
    packages: "Pakete & Preise",
    workshops: "Workshops",
    menuOpen: "Menü",
    menuClose: "Menü schließen",
    skip: "Zum Inhalt springen",
  },
  langSwitch: { label: "Sprache wählen" },
  hero: {
    title: "Raumgestaltung und Ordnungscoaching aus einer Hand",
    tagline: "Schöne Räume.\nKlarer Alltag.",
    descriptor: "Interior Design · Professional Organizing",
    lead: "Erst schaffen wir Klarheit, dann gestalten wir den Raum, der dabei frei wird. Persönlich, diskret und systematisch — in Wien und Niederösterreich.",
    ctaPrimary: "Raumcheck anfragen",
    ctaSecondary: "Angebot ansehen",
    imageAlt:
      "Schöne Räume. Klarer Alltag. Interior Design · Professional Organizing — Schriftzug auf heller Wand zwischen einem Wohnbereich mit Sofa und Olivenbaum und einem beleuchteten Regal mit beschrifteten Boxen und Kleiderstange",
  },
  video: {
    heading: "In einer Minute erklärt",
    lead: "Wie aus Ordnung und Gestaltung ein Raum wird, der zu Ihrem Alltag passt.",
    caption: "Vorstellungsvideo, 58 Sekunden, KI-generierte Stimme",
    unsupported: "Ihr Browser kann dieses Video nicht abspielen.",
    captionsLabel: "Deutsch",
  },
  services: {
    heading: "Mein Angebot",
    lead: "Ordnungscoaches räumen. Einrichtungsberaterinnen gestalten. Ich verbinde beides — einzeln oder kombiniert, ganz nach dem, was Ihr Raum braucht.",
    items: [
      {
        id: "raumgestaltung",
        price: `${dePackages[2].name} ${dePackages[2].price}`,
        title: "Raumgestaltung",
        lead: "Beratung und Einrichtungsvorschläge nach optischen und geschmacklichen Gesichtspunkten — damit aus einem aufgeräumten Raum ein Raum wird, in dem Sie gerne sind.",
        points: [
          "Raumanalyse vor Ort, per Foto oder Grundriss",
          "Farb- und Materialberatung",
          "Arbeitsplatz- und Homeoffice-Gestaltung",
          "Begleitung bei Neueinrichtung und Renovierung",
        ],
      },
      {
        id: "ordnungscoaching",
        price: `${dePackages[1].name} ${dePackages[1].price}`,
        title: "Ordnungscoaching",
        lead: "Professionelle Unterstützung beim Reduzieren, Sortieren und Strukturieren — bis ein Ordnungssystem entsteht, das zu Ihrem Alltag passt und ohne mich weiterläuft.",
        points: [
          "Erstanalyse vor Ort oder online",
          "Decluttering und Neuordnung einzelner Bereiche",
          "Papier- und Dokumentenorganisation",
          "Homeoffice- und Kleinbüro-Organisation",
          "Umzug, Downsizing und Haushaltsverkleinerung",
          "Nachbetreuung über Check-in-Termine",
        ],
      },
      {
        id: "raumgestaltung-und-ordnung",
        price: `${dePackages[3].name} ${dePackages[3].price}`,
        title: "Raumgestaltung plus Ordnungscoaching",
        lead: "Ordnung und Gestaltung in einem Ablauf, mit einer Ansprechpartnerin — vom ersten Sortieren bis zum fertig eingerichteten Raum.",
        points: [
          "Decluttering und anschließende Gestaltung eines Raums",
          "Mehrere Termine für Organisation und Gestaltung",
          "Begleitung bei Umzug und Neueinrichtung",
          "Nachbetreuung inklusive",
        ],
      },
      {
        id: "re-design",
        price: "Preis nach dem Raumcheck",
        title: "Re-Design",
        lead: "Neue Wirkung mit dem, was schon da ist: Vorhandene Möbel, Textilien und Accessoires werden neu arrangiert — ergänzt wird nur, was wirklich fehlt.",
        points: [
          "Umstellen und neu arrangieren vorhandener Möbel",
          "Gezielte Farb- und Materialakzente",
          "Einkaufsliste nur für das, was wirklich fehlt",
          "Styling für Verkauf oder Vermietung",
        ],
      },
    ],
    moreLabel: "Außerdem",
    workshops: {
      id: "workshops",
      price: `${dePackages[5].name} ${dePackages[5].price}`,
      title: "Workshops & Training",
      lead: "Praxisnahe Wissensvermittlung für Gruppen und Teams — damit Sie Räume künftig selbst gestalten und Ordnung eigenständig halten können.",
      points: [
        "Halbtages- und Tagesworkshops",
        "Mehrteilige Kursreihen",
        "Firmenworkshops zu Büro- und Arbeitsplatzorganisation",
        "Online-Kurse und Webinare",
        "Vorträge bei Netzwerktreffen und Vereinen",
      ],
    },
  },
  audience: {
    heading: "Für wen ich arbeite",
    lead: "Drei Situationen, in denen sich die Kombination aus Ordnung und Gestaltung am stärksten auszahlt.",
    items: [
      {
        title: "Berufstätige Familien",
        profile: "Doppelverdiener-Haushalte mit Kindern in Wien und im niederösterreichischen Umland.",
        need: "Der Stauraum ist zu klein geworden, für Schule, Papier und Hobbys fehlt ein System — und am Wochenende reicht die Zeit nur zum Nachräumen, nicht zum Neuordnen.",
      },
      {
        title: "Menschen im Umbruch",
        profile: "Umzug, Trennung, Auszug der Kinder, Verkleinerung des Haushalts, Nachlass.",
        need: "Die Entscheidung, was bleibt und was geht, ist emotional und organisatorisch fordernd. Das Umzugsunternehmen trägt, entscheidet aber nicht mit — und die neue Wohnung will trotzdem eingerichtet werden.",
      },
      {
        title: "EPU, Praxen & Homeoffice",
        profile: "Selbständige, Ordinationen, kleine Studios und Agenturen mit ein bis fünf Personen.",
        need: "Die Ablage ist über Jahre gewachsen statt geplant, der Arbeitsplatz hat sich aus dem Wohnraum entwickelt, und für Innenarchitektur ist weder Budget noch Zeit da.",
      },
    ],
  },
  process: {
    heading: "So arbeiten wir zusammen",
    lead: "Ein klarer Ablauf, damit Sie von Anfang an wissen, worauf Sie sich einlassen.",
    items: [
      {
        title: "Raumcheck",
        body: "60 bis 90 Minuten vor Ort oder online. Wir sehen uns gemeinsam an, was funktioniert und was nicht — und Sie bekommen eine ehrliche Einschätzung, welche Schritte wirklich nötig sind.",
      },
      {
        title: "Konzept & Angebot",
        body: "Sie erhalten einen konkreten Vorschlag mit Umfang, Reihenfolge und Fixpreis. Kein Paket, das Sie nicht brauchen.",
      },
      {
        title: "Umsetzung",
        body: "Wir arbeiten Bereich für Bereich. Entschieden wird gemeinsam, geräumt und gestaltet wird zu zweit — Ihr Tempo, Ihre Kriterien.",
      },
      {
        title: "Nachbetreuung",
        body: "Ein Check-in-Termin nach einigen Wochen. Ordnung, die nach drei Monaten noch steht, ist die einzige, die zählt.",
      },
    ],
  },
  packages: {
    heading: "Pakete & Preise",
    lead: "Transparente Einstiegspreise. Der Endpreis wird nach dem Raumcheck fix vereinbart — abhängig von Umfang, Anfahrt und Materialeinsatz.",
    tableHeads: { name: "Paket", scope: "Inhalt", audience: "Für", price: "Preis" },
    items: dePackages,
    note: "Alle Preise verstehen sich netto. Als Kleinunternehmerin wird derzeit keine Umsatzsteuer ausgewiesen. Fahrtkosten außerhalb des Kerngebiets werden gesondert vereinbart.",
  },
  about: {
    heading: "Über mich",
    body: [
      "Ich bin Claudia Plessl und arbeite als Interior Designerin und Ordnungscoach in Wien und Niederösterreich. Was mich an dieser Arbeit interessiert, ist der Punkt, an dem beides zusammenfällt: Ein Raum wird nicht schön, weil neue Möbel darin stehen, sondern weil er endlich zu dem passt, was darin tatsächlich passiert.",
      "Deshalb beginne ich bei der Struktur und nicht beim Katalog. Erst wenn klar ist, was bleibt, welche Wege der Alltag nimmt und wo etwas hakt, lohnt sich die Frage nach Farbe, Material und Einrichtung. Diese Reihenfolge spart Geld und hält länger.",
      "Und weil die besten Lösungen die sind, die ohne mich weiterlaufen, gebe ich das Handwerk in Workshops weiter — für alle, die das lieber selbst können möchten.",
    ],
    principlesHeading: "Worauf Sie sich verlassen können",
    principles: [
      "Diskretion — was ich in Ihrer Wohnung sehe, bleibt dort.",
      "Kein Urteil — es wird sortiert, nicht bewertet.",
      "Ihre Kriterien — ich entscheide nichts über Ihren Besitz.",
      "Nachhaltig — ein System, das Sie ohne mich halten können.",
    ],
    credentials: {
      heading: "Qualifikation",
      items: [
        {
          title: "Zertifizierter Ordnungscoach",
          issuer: "Akademie der Ordnung",
          note: "Zertifizierte Ausbildung in professioneller Ordnungsbegleitung — Methodik, Kundenprozess und praktische Umsetzung.",
        },
        {
          title: "Laufende Fortbildung",
          issuer: "Mindestens eine einschlägige Weiterbildung pro Jahr",
          note: "Farb- und Materiallehre, Didaktik und Ordnungsmethodik.",
        },
      ],
    },
  },
  projects: {
    heading: "Projekte",
    lead: "Hier stelle ich ausgewählte Vorher-Nachher-Projekte vor — selbstverständlich nur mit dem Einverständnis meiner Kundinnen und Kunden.",
    status: "Die ersten Projekte werden gerade dokumentiert und erscheinen in Kürze.",
    tiles: ["Räume, die gut tun.", "Organisation trifft Ästhetik."],
    imageAlt: [
      "Wohnbereich in warmen Naturtönen mit Sofa, Olivenbaum und gerahmter Kunst",
      "Offenes Regalsystem mit beschrifteten Boxen, gefalteter Wäsche und Kleiderstange",
    ],
    imageNote: "Stimmungsbilder, KI-generiert — keine Kundenprojekte.",
    cta: "Ihr Raum als nächstes Projekt?",
  },
  faq: {
    heading: "Häufige Fragen",
    lead: "Kurze Antworten auf das, was vor dem ersten Termin am häufigsten gefragt wird.",
    items: [
      {
        q: "Was kostet der Einstieg?",
        a: `Der Raumcheck dauert 60 bis 90 Minuten und kostet ${dePackages[0].price}. Danach erhalten Sie einen konkreten Vorschlag mit Umfang, Reihenfolge und Fixpreis — Sie entscheiden erst dann, ob und wie es weitergeht.`,
      },
      {
        q: "Wo sind Sie tätig?",
        a: "In Wien und Niederösterreich, bis rund 60 Minuten Fahrzeit. Fahrtkosten außerhalb des Kerngebiets werden gesondert vereinbart.",
      },
      {
        q: "Geht das auch online?",
        a: "Ja. Der Raumcheck ist auch online möglich, und eine Raumanalyse funktioniert ebenso per Foto oder Grundriss.",
      },
      {
        q: "Muss ich mich von vielen Dingen trennen?",
        a: "Nein. Sie entscheiden, was bleibt — es wird sortiert, nicht bewertet, und ich entscheide nichts über Ihren Besitz.",
      },
      {
        q: "Muss ich neue Möbel kaufen?",
        a: "Nicht zwingend. Oft genügt es, Vorhandenes neu zu ordnen und zu arrangieren. Ergänzt wird nur, was wirklich fehlt.",
      },
      {
        q: "Wie diskret ist die Zusammenarbeit?",
        a: "Vollständig. Was ich in Ihrer Wohnung sehe, bleibt dort.",
      },
      {
        q: "Wie schnell bekomme ich eine Antwort?",
        a: "Innerhalb von zwei Werktagen — mit einer ehrlichen Einschätzung, auch dann, wenn ich nicht die Richtige für Ihr Anliegen bin.",
      },
    ],
  },
  claim: { text: "Enjoy your home", sub: "Schöne Räume. Klarer Alltag." },
  contact: {
    heading: "Reden wir über Ihren Raum",
    lead: "Erzählen Sie mir kurz, worum es geht. Sie bekommen innerhalb von zwei Werktagen eine Antwort und eine ehrliche Einschätzung — auch dann, wenn ich nicht die Richtige für Ihr Anliegen bin.",
    emailLabel: "E-Mail",
    phoneLabel: "Telefon",
    addressLabel: "Anschrift",
    areaLabel: "Einsatzgebiet",
    area: "Wien und Niederösterreich, bis rund 60 Minuten Fahrzeit",
    mailSubject: "Anfrage Raumcheck",
    mailBody:
      "Guten Tag Frau Plessl,\n\nich interessiere mich für einen Raumcheck.\n\nUm welche Räume geht es?\n\nWo befindet sich das Objekt?\n\nWas soll sich verändern?\n\nMit freundlichen Grüßen\n",
  },
  footer: {
    rights: "Alle Rechte vorbehalten.",
    imprint: "Impressum",
    privacy: "Datenschutzerklärung",
    terms: "AGB",
    values: "Natürlich • Klar • Lebenswert",
    imageNotice:
      "Die Bilder auf dieser Website und die Stimme im Vorstellungsvideo wurden mit künstlicher Intelligenz erstellt.",
  },
  legalLinks: { imprint: "/impressum/", privacy: "/datenschutz/", terms: "/agb/" },
};

const en: Content = {
  htmlLang: "en",
  meta: {
    title: `${CONTACT.businessName} | Vienna & Lower Austria`,
    description:
      "Interior design, professional organizing and workshops from a single source. Create clarity first, then design the space it frees up — for families, people in transition and small businesses in Vienna and Lower Austria.",
  },
  nav: {
    label: "Main navigation",
    home: "Home",
    offer: "My services",
    offerOverview: "All services at a glance",
    about: "About me",
    projects: "Projects",
    faq: "FAQ",
    contact: "Contact",
    audience: "Who I work with",
    process: "How it works",
    packages: "Packages & pricing",
    workshops: "Workshops",
    menuOpen: "Menu",
    menuClose: "Close menu",
    skip: "Skip to content",
  },
  langSwitch: { label: "Choose language" },
  hero: {
    title: "Interior design and professional organizing from a single source",
    tagline: "Beautiful spaces.\nA clearer day.",
    descriptor: "Interior Design · Professional Organizing",
    lead: "First we create clarity, then we design the space it frees up. Personal, discreet and systematic — in Vienna and Lower Austria.",
    ctaPrimary: "Request a space check",
    ctaSecondary: "See my services",
    // The slogan is live text on /en/, so the picture itself is decorative.
    imageAlt: "",
  },
  video: {
    heading: "Explained in a minute",
    lead: "How order and design combine into a room that fits the way you actually live.",
    caption: "Introduction, 58 seconds, AI-generated voice",
    unsupported: "Your browser cannot play this video.",
    captionsLabel: "German",
  },
  services: {
    heading: "My services",
    lead: "Organizers declutter. Interior consultants decorate. I combine the two — on their own or together, depending on what your space needs.",
    items: [
      {
        id: "raumgestaltung",
        price: `${enPackages[2].name} ${enPackages[2].price}`,
        title: "Interior design",
        lead: "Advice and furnishing proposals on visual and aesthetic grounds — so that a tidy room becomes a room you actually enjoy being in.",
        points: [
          "Room analysis on site, by photo or floor plan",
          "Colour and material consulting",
          "Workspace and home office design",
          "Support with refurnishing and renovation",
        ],
      },
      {
        id: "ordnungscoaching",
        price: `${enPackages[1].name} ${enPackages[1].price}`,
        title: "Professional organizing",
        lead: "Professional support in reducing, sorting and structuring — until you have a system that fits your daily life and keeps working without me.",
        points: [
          "Initial assessment on site or online",
          "Decluttering and reorganising individual areas",
          "Paperwork and document organisation",
          "Home office and small office organisation",
          "Moving, downsizing and household reduction",
          "Follow-up check-in appointments",
        ],
      },
      {
        id: "raumgestaltung-und-ordnung",
        price: `${enPackages[3].name} ${enPackages[3].price}`,
        title: "Interior design plus organizing",
        lead: "Organising and design in one process, with one person — from the first sort-out to the finished room.",
        points: [
          "Decluttering followed by the design of one room",
          "Several appointments for organising and design",
          "Support with moving and refurnishing",
          "Follow-up included",
        ],
      },
      {
        id: "re-design",
        price: "Priced after the space check",
        title: "Re-design",
        lead: "A new look with what you already own: existing furniture, textiles and accessories are rearranged — only what is genuinely missing gets added.",
        points: [
          "Rearranging the furniture you already have",
          "Targeted colour and material accents",
          "A shopping list only for what is really missing",
          "Styling for sale or rental",
        ],
      },
    ],
    moreLabel: "Also",
    workshops: {
      id: "workshops",
      price: `${enPackages[5].name} ${enPackages[5].price}`,
      title: "Workshops & Training",
      lead: "Hands-on knowledge transfer for groups and teams — so you can design your spaces and maintain order on your own.",
      points: [
        "Half-day and full-day workshops",
        "Multi-part course series",
        "Company workshops on office and workspace organisation",
        "Online courses and webinars",
        "Talks at networking events and associations",
      ],
    },
  },
  audience: {
    heading: "Who I work with",
    lead: "Three situations where combining order and design pays off the most.",
    items: [
      {
        title: "Working families",
        profile: "Dual-income households with children in Vienna and the surrounding Lower Austrian region.",
        need: "Storage has become too small, there is no system for school, paperwork and hobbies — and the weekend only ever stretches to tidying up, never to reorganising.",
      },
      {
        title: "People in transition",
        profile: "Moving house, separation, children leaving home, downsizing, settling an estate.",
        need: "Deciding what stays and what goes is demanding both emotionally and practically. The moving company carries boxes but takes no decisions — and the new home still needs furnishing.",
      },
      {
        title: "Sole traders, practices & home offices",
        profile: "Self-employed professionals, medical practices, small studios and agencies of one to five people.",
        need: "Filing has grown over years rather than been planned, the workspace evolved out of the living room, and there is neither budget nor time for an interior architect.",
      },
    ],
  },
  process: {
    heading: "How we work together",
    lead: "A clear sequence, so you know from the outset what you are signing up for.",
    items: [
      {
        title: "Space check",
        body: "60 to 90 minutes on site or online. We look together at what works and what does not — and you get an honest assessment of which steps are genuinely needed.",
      },
      {
        title: "Concept & quote",
        body: "You receive a concrete proposal with scope, sequence and a fixed price. No package you do not need.",
      },
      {
        title: "Implementation",
        body: "We work area by area. Decisions are made together, clearing and designing happen side by side — your pace, your criteria.",
      },
      {
        title: "Follow-up",
        body: "A check-in appointment a few weeks later. The only order that counts is the one still standing after three months.",
      },
    ],
  },
  packages: {
    heading: "Packages & pricing",
    lead: "Transparent entry prices. The final price is agreed after the space check — depending on scope, travel and materials.",
    tableHeads: { name: "Package", scope: "Scope", audience: "For", price: "Price" },
    items: enPackages,
    note: "All prices are net. Under the Austrian small-business scheme no VAT is currently charged. Travel outside the core region is agreed separately.",
  },
  about: {
    heading: "About me",
    body: [
      "I am Claudia Plessl and I work as an interior designer and professional organizer in Vienna and Lower Austria. What interests me about this work is the point where the two meet: a room does not become beautiful because new furniture arrives, but because it finally fits what actually happens in it.",
      "That is why I start with structure rather than with a catalogue. Only once it is clear what stays, how daily life moves through the space and where things get stuck is it worth asking about colour, material and furnishing. That order of operations saves money and lasts longer.",
      "And because the best solutions are the ones that keep working without me, I pass the craft on in workshops — for anyone who would rather do it themselves.",
    ],
    principlesHeading: "What you can rely on",
    principles: [
      "Discretion — what I see in your home stays there.",
      "No judgement — we sort, we do not assess.",
      "Your criteria — I decide nothing about your possessions.",
      "Built to last — a system you can maintain without me.",
    ],
    credentials: {
      heading: "Qualifications",
      items: [
        {
          title: "Certified Organizing Coach",
          issuer: "Akademie der Ordnung",
          note: "Certified training in professional organizing — methodology, client process and hands-on implementation.",
        },
        {
          title: "Continuing education",
          issuer: "At least one relevant course per year",
          note: "Colour and material theory, teaching methods and organizing methodology.",
        },
      ],
    },
  },
  projects: {
    heading: "Projects",
    lead: "This is where I will present selected before-and-after projects — only, of course, with my clients' consent.",
    status: "The first projects are being documented now and will appear here soon.",
    tiles: ["Rooms that do you good.", "Organisation meets aesthetics."],
    imageAlt: [
      "Living area in warm natural tones with a sofa, olive tree and framed art",
      "Open shelving system with labelled boxes, folded textiles and a clothes rail",
    ],
    imageNote: "Mood images, AI-generated — not client projects.",
    cta: "Could your space be the next project?",
  },
  faq: {
    heading: "Frequently asked questions",
    lead: "Short answers to what people most often ask before the first appointment.",
    items: [
      {
        q: "What does it cost to get started?",
        a: `The space check takes 60 to 90 minutes and costs ${enPackages[0].price}. Afterwards you receive a concrete proposal with scope, sequence and a fixed price — only then do you decide whether and how to continue.`,
      },
      {
        q: "Where do you work?",
        a: "In Vienna and Lower Austria, up to roughly 60 minutes' travel. Travel outside the core region is agreed separately.",
      },
      {
        q: "Can we work online?",
        a: "Yes. The space check is also available online, and a room analysis works just as well by photo or floor plan.",
      },
      {
        q: "Will I have to part with a lot of things?",
        a: "No. You decide what stays — we sort, we do not assess, and I decide nothing about your possessions.",
      },
      {
        q: "Do I have to buy new furniture?",
        a: "Not necessarily. Often it is enough to reorganise and rearrange what you already have. Only what is genuinely missing gets added.",
      },
      {
        q: "How discreet is the work?",
        a: "Completely. What I see in your home stays there.",
      },
      {
        q: "How quickly will I hear back?",
        a: "Within two working days — with an honest assessment, including when I am not the right person for your situation.",
      },
    ],
  },
  claim: { text: "Enjoy your home", sub: "Beautiful spaces. A clearer day." },
  contact: {
    heading: "Let's talk about your space",
    lead: "Tell me briefly what it is about. You will get a reply and an honest assessment within two working days — including when I am not the right person for your situation.",
    emailLabel: "Email",
    phoneLabel: "Phone",
    addressLabel: "Address",
    areaLabel: "Service area",
    area: "Vienna and Lower Austria, up to roughly 60 minutes' travel",
    mailSubject: "Space check enquiry",
    mailBody:
      "Dear Ms Plessl,\n\nI am interested in a space check.\n\nWhich rooms are involved?\n\nWhere is the property located?\n\nWhat would you like to change?\n\nKind regards\n",
  },
  footer: {
    rights: "All rights reserved.",
    imprint: "Imprint",
    privacy: "Privacy",
    terms: "Terms",
    values: "Natural • Clear • Worth living",
    imageNotice:
      "The images on this website and the voice in the introduction video were created using artificial intelligence.",
  },
  legalLinks: { imprint: "/en/legal/#imprint", privacy: "/en/legal/#privacy", terms: "/en/legal/#terms" },
};

export const CONTENT: Record<Locale, Content> = { de, en };

export function getContent(locale: Locale): Content {
  return CONTENT[locale];
}
