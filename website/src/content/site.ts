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

type Service = { title: string; lead: string; points: string[] };
type Audience = { title: string; profile: string; need: string };
type Step = { title: string; body: string };
type Package = { name: string; scope: string; price: string; audience: string };

export type Content = {
  htmlLang: string;
  meta: { title: string; description: string };
  nav: { services: string; audience: string; process: string; packages: string; about: string; contact: string };
  langSwitch: { label: string; href: string; hrefLabel: string };
  hero: {
    eyebrow: string;
    name: string;
    tagline: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    imageAlt: string;
  };
  video: {
    heading: string;
    lead: string;
    caption: string;
    unsupported: string;
    captionsLabel: string;
  };
  services: { heading: string; lead: string; items: Service[] };
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
    principles: string[];
    credentials: {
      heading: string;
      items: { title: string; issuer: string; note: string }[];
    };
  };
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
    /** Offenlegung, dass das Bildmaterial KI-generiert ist. */
    imageNotice: string;
  };
  legalLinks: { imprint: string; privacy: string; terms: string };
};

const de: Content = {
  htmlLang: "de",
  meta: {
    title: `${CONTACT.businessName} | Wien & Niederösterreich`,
    description:
      "Interior Design, Ordnungscoaching und Workshops aus einer Hand. Erst Klarheit schaffen, dann Räume gestalten — für Familien, Menschen in Umbruchsituationen und kleine Unternehmen in Wien und Niederösterreich.",
  },
  nav: {
    services: "Leistungen",
    audience: "Für wen",
    process: "Ablauf",
    packages: "Pakete",
    about: "Über mich",
    contact: "Kontakt",
  },
  langSwitch: { label: "Sprache", href: "/en/", hrefLabel: "EN" },
  hero: {
    eyebrow: "Interior Design · Ordnungscoaching · Workshops",
    name: "Mag. Claudia Plessl",
    tagline: "Schöne Räume.\nKlarer Alltag.",
    lead: "Erst schaffen wir Klarheit, dann gestalten wir den Raum, der dabei frei wird. Persönlich, diskret und systematisch — in Wien und Niederösterreich.",
    ctaPrimary: "Raumcheck anfragen",
    ctaSecondary: "Leistungen ansehen",
    imageAlt:
      "Heller Wohnraum in Salbeigrün und warmem Creme mit offenem Ordnungssystem und Sitzbereich",
  },
  video: {
    heading: "In einer Minute erklärt",
    lead: "Wie aus Ordnung und Gestaltung ein Raum wird, der zu Ihrem Alltag passt.",
    caption: "Vorstellungsvideo · 58 Sekunden · mit Ton",
    unsupported: "Ihr Browser kann dieses Video nicht abspielen.",
    captionsLabel: "Deutsch",
  },
  services: {
    heading: "Drei Leistungen, die ineinandergreifen",
    lead: "Ordnungscoaches räumen. Einrichtungsberaterinnen gestalten. Ich verbinde beides — und gebe das Wissen in Workshops weiter.",
    items: [
      {
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
        title: "Innenraumgestaltung",
        lead: "Beratung und Einrichtungsvorschläge nach optischen und geschmacklichen Gesichtspunkten — damit aus einem aufgeräumten Raum ein Raum wird, in dem Sie gerne sind.",
        points: [
          "Raumanalyse vor Ort, per Foto oder Grundriss",
          "Farb- und Materialberatung",
          "Arbeitsplatz- und Homeoffice-Gestaltung",
          "Begleitung bei Neueinrichtung und Renovierung",
          "Styling für Verkauf oder Vermietung",
        ],
      },
      {
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
    ],
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
    items: [
      { name: "Raumcheck", scope: "60–90 Minuten Analyse von Ordnung und Gestaltung", audience: "Privat & Betrieb", price: "ab EUR 110" },
      { name: "Ordnungs-Startpaket", scope: "Ein klar abgegrenzter Bereich, z. B. Küche, Schlafzimmer oder Homeoffice", audience: "Privat", price: "ab EUR 220" },
      { name: "Gestaltungsberatung", scope: "Farb-, Material- und Einrichtungsberatung für einen Raum", audience: "Privat", price: "ab EUR 280" },
      { name: "Ordnung & Stil", scope: "Decluttering und anschließende Gestaltung eines Raums", audience: "Privat", price: "ab EUR 480" },
      { name: "Intensivbegleitung", scope: "Mehrere Termine für Organisation und Gestaltung inklusive Nachbetreuung", audience: "Privat", price: "ab EUR 690" },
      { name: "Workshop", scope: "Gruppenworkshop zu Raumgestaltung oder Organisation, halber Tag", audience: "Privat & Betrieb", price: "ab EUR 350" },
      { name: "B2B-Kompakt", scope: "Analyse, Bürogestaltung und Teamworkshop im Paket", audience: "Betrieb", price: "ab EUR 690" },
    ],
    note: "Alle Preise verstehen sich netto. Als Kleinunternehmerin wird derzeit keine Umsatzsteuer ausgewiesen. Fahrtkosten außerhalb des Kerngebiets werden gesondert vereinbart.",
  },
  about: {
    heading: "Über mich",
    body: [
      "Ich bin Claudia Plessl und arbeite als Interior Designerin und Ordnungscoach in Wien und Niederösterreich. Was mich an dieser Arbeit interessiert, ist der Punkt, an dem beides zusammenfällt: Ein Raum wird nicht schön, weil neue Möbel darin stehen, sondern weil er endlich zu dem passt, was darin tatsächlich passiert.",
      "Deshalb beginne ich bei der Struktur und nicht beim Katalog. Erst wenn klar ist, was bleibt, welche Wege der Alltag nimmt und wo etwas hakt, lohnt sich die Frage nach Farbe, Material und Einrichtung. Diese Reihenfolge spart Geld und hält länger.",
      "Und weil die besten Lösungen die sind, die ohne mich weiterlaufen, gebe ich das Handwerk in Workshops weiter — für alle, die das lieber selbst können möchten.",
    ],
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
    imageNotice:
      "Die Bilder auf dieser Website wurden mit künstlicher Intelligenz erstellt.",
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
    services: "Services",
    audience: "Who I work with",
    process: "How it works",
    packages: "Packages",
    about: "About",
    contact: "Contact",
  },
  langSwitch: { label: "Language", href: "/", hrefLabel: "DE" },
  hero: {
    eyebrow: "Interior Design · Professional Organizing · Workshops",
    name: "Mag. Claudia Plessl",
    tagline: "Beautiful spaces.\nA clearer day.",
    lead: "First we create clarity, then we design the space it frees up. Personal, discreet and systematic — in Vienna and Lower Austria.",
    ctaPrimary: "Request a space check",
    ctaSecondary: "See services",
    imageAlt:
      "Bright living space in sage green and warm cream with an open storage system and seating area",
  },
  video: {
    heading: "Explained in a minute",
    lead: "How order and design combine into a room that fits the way you actually live.",
    caption: "Introduction · 58 seconds · German audio",
    unsupported: "Your browser cannot play this video.",
    captionsLabel: "German",
  },
  services: {
    heading: "Three services that build on each other",
    lead: "Organizers declutter. Interior consultants decorate. I combine the two — and pass the method on in workshops.",
    items: [
      {
        title: "Professional Organizing",
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
        title: "Interior Design",
        lead: "Advice and furnishing proposals on visual and aesthetic grounds — so that a tidy room becomes a room you actually enjoy being in.",
        points: [
          "Room analysis on site, by photo or floor plan",
          "Colour and material consulting",
          "Workspace and home office design",
          "Support with refurnishing and renovation",
          "Styling for sale or rental",
        ],
      },
      {
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
    ],
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
    items: [
      { name: "Space check", scope: "60–90 minute assessment of order and design", audience: "Private & business", price: "from EUR 110" },
      { name: "Organizing starter", scope: "One clearly defined area, e.g. kitchen, bedroom or home office", audience: "Private", price: "from EUR 220" },
      { name: "Design consultation", scope: "Colour, material and furnishing advice for one room", audience: "Private", price: "from EUR 280" },
      { name: "Order & style", scope: "Decluttering followed by the design of one room", audience: "Private", price: "from EUR 480" },
      { name: "Intensive support", scope: "Several appointments for organising and design, including follow-up", audience: "Private", price: "from EUR 690" },
      { name: "Workshop", scope: "Half-day group workshop on room design or organisation", audience: "Private & business", price: "from EUR 350" },
      { name: "Business compact", scope: "Assessment, office design and team workshop bundled", audience: "Business", price: "from EUR 690" },
    ],
    note: "All prices are net. Under the Austrian small-business scheme no VAT is currently charged. Travel outside the core region is agreed separately.",
  },
  about: {
    heading: "About me",
    body: [
      "I am Claudia Plessl and I work as an interior designer and professional organizer in Vienna and Lower Austria. What interests me about this work is the point where the two meet: a room does not become beautiful because new furniture arrives, but because it finally fits what actually happens in it.",
      "That is why I start with structure rather than with a catalogue. Only once it is clear what stays, how daily life moves through the space and where things get stuck is it worth asking about colour, material and furnishing. That order of operations saves money and lasts longer.",
      "And because the best solutions are the ones that keep working without me, I pass the craft on in workshops — for anyone who would rather do it themselves.",
    ],
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
    imageNotice:
      "The images on this website were created using artificial intelligence.",
  },
  legalLinks: { imprint: "/en/legal/#imprint", privacy: "/en/legal/#privacy", terms: "/en/legal/#terms" },
};

export const CONTENT: Record<Locale, Content> = { de, en };

export function getContent(locale: Locale): Content {
  return CONTENT[locale];
}
