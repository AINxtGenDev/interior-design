import Image from "next/image";
/*
 * Statically imported so the emitted <img src> carries `basePath`. A plain
 * "/x.webp" string would resolve to the domain root and 404 on the
 * project-path Pages URL.
 */
import projects640 from "@/assets/projects-640.webp";
import projects1254 from "@/assets/projects-1254.webp";
import projectsLiving from "@/assets/projects-living-610.webp";
import projectsOrder from "@/assets/projects-order-610.webp";
import portrait480 from "@/assets/portrait-480.webp";
import portrait1045 from "@/assets/portrait-1045.webp";
import { CONTACT, getContent, type Locale } from "@/content/site";
import { buildHomeGraph } from "@/content/schema";
import SiteHeader, { SECTION_IDS } from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import HeroImage from "./HeroImage";
import IntroVideo from "./IntroVideo";
import JsonLd from "./JsonLd";

/**
 * The one-pager, rendered for both locales. German is served at `/`,
 * English at `/en/`; section anchors are identical in both so the language
 * switch keeps the reader in place.
 *
 * Section order follows the navigation of CI.pptx slide 4:
 * Home → Mein Angebot (+ who, how, prices) → Über mich → Projekte → FAQ →
 * the slide-9 claim → Kontakt.
 */
export default function HomePage({ locale }: { locale: Locale }) {
  const c = getContent(locale);

  const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
    c.contact.mailSubject,
  )}&body=${encodeURIComponent(c.contact.mailBody)}`;

  return (
    <>
      <JsonLd graph={buildHomeGraph(locale)} />

      <SiteHeader content={c} locale={locale} path={locale === "de" ? "" : "en/"} />

      <main id="main">
        {/* ─────────── Home ─────────── */}
        <section id={SECTION_IDS.top} aria-labelledby="hero-title">
          <HeroImage content={c} locale={locale} />

          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:px-8">
            <div>
              <h1 id="hero-title" className="h1">
                {c.hero.title}
              </h1>
              <span aria-hidden="true" className="rule mt-6" />
            </div>
            <div>
              <p className="lead">{c.hero.lead}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={mailto} className="btn btn-primary">
                  {c.hero.ctaPrimary}
                </a>
                <a href={`#${SECTION_IDS.services}`} className="btn btn-secondary">
                  {c.hero.ctaSecondary}
                </a>
              </div>
            </div>
          </div>
        </section>

        <IntroVideo content={c} locale={locale} />

        {/* ─────────── Mein Angebot ─────────── */}
        <Section id={SECTION_IDS.services} heading={c.services.heading} lead={c.services.lead}>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {c.services.items.map((s, i) => (
              <article
                key={s.id}
                id={s.id}
                aria-labelledby={`${s.id}-title`}
                className={`flex flex-col rounded border border-anthrazit-light border-t-4 bg-white p-6 sm:p-8 ${
                  i % 2 === 0 ? "border-t-sage-mid" : "border-t-blush-mid"
                }`}
              >
                <p className="eyebrow text-sage-dark">{String(i + 1).padStart(2, "0")}</p>
                <h3 id={`${s.id}-title`} className="h3 mt-2">
                  {s.title}
                </h3>
                <p className="mt-4">{s.lead}</p>
                <BulletList items={s.points} className="mt-6" />
                <PriceHint text={s.price} />
              </article>
            ))}
          </div>

          <article
            id={c.services.workshops.id}
            aria-labelledby="workshops-title"
            className="mt-6 grid gap-6 rounded bg-sage-light p-6 sm:p-8 lg:grid-cols-2 lg:gap-12"
          >
            <div>
              <p className="eyebrow text-sage-dark">{c.services.moreLabel}</p>
              <h3 id="workshops-title" className="h3 mt-2">
                {c.services.workshops.title}
              </h3>
              <p className="mt-4">{c.services.workshops.lead}</p>
              <PriceHint text={c.services.workshops.price} />
            </div>
            <BulletList items={c.services.workshops.points} />
          </article>
        </Section>

        {/* ─────────── Ablauf ─────────── */}
        <Section id={SECTION_IDS.process} heading={c.process.heading} lead={c.process.lead}>
          {/* Two columns at most: four were ~28 characters per line. */}
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:gap-x-16 lg:gap-y-12">
            {c.process.items.map((s, i) => (
              <li key={s.title}>
                {/* Numbered circle, after the badges on the type slide. */}
                <span
                  aria-hidden="true"
                  className="flex size-14 items-center justify-center rounded-full bg-sage-light font-heading text-xl font-bold text-sage-dark"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="h3 mt-4">{s.title}</h3>
                <p className="mt-3 max-w-[34rem]">{s.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* ─────────── Pakete & Preise ─────────── */}
        <Section id={SECTION_IDS.packages} heading={c.packages.heading} lead={c.packages.lead} tone="anthrazit">
          {/* Cards on phones, a table from 768 px up. */}
          <ul className="mt-10 grid gap-4 md:hidden">
            {c.packages.items.map((p) => (
              <li key={p.name} className="rounded border border-blush-soft bg-white p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-bold">{p.name}</h3>
                  <p className="font-bold whitespace-nowrap text-sage-dark">{p.price}</p>
                </div>
                <p className="mt-2">{p.scope}</p>
                <p className="small mt-2 text-anthrazit-mid">
                  {c.packages.tableHeads.audience}: {p.audience}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-12 hidden overflow-x-auto rounded border border-blush-soft bg-white md:block">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">{c.packages.heading}</caption>
              <thead>
                <tr className="border-b-2 border-blush-soft">
                  {[
                    c.packages.tableHeads.name,
                    c.packages.tableHeads.scope,
                    c.packages.tableHeads.audience,
                    c.packages.tableHeads.price,
                  ].map((h, i) => (
                    <th
                      key={h}
                      scope="col"
                      className={`eyebrow px-5 py-4 text-anthrazit-mid ${i === 3 ? "text-right" : ""}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.packages.items.map((p) => (
                  <tr key={p.name} className="border-b border-anthrazit-light align-top last:border-b-0">
                    <th scope="row" className="px-5 py-4 font-bold">
                      {p.name}
                    </th>
                    <td className="px-5 py-4">{p.scope}</td>
                    <td className="px-5 py-4 lg:whitespace-nowrap">{p.audience}</td>
                    <td className="px-5 py-4 text-right font-bold whitespace-nowrap text-sage-dark">
                      {p.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* anthrazit-mid is 4.26:1 on anthrazit-light; small text needs 4.5:1. */}
          <p className="small mt-6 max-w-[40rem] text-anthrazit-dark">{c.packages.note}</p>
        </Section>

        {/* ─────────── Über mich ─────────── */}
        <Section id={SECTION_IDS.about} heading={c.about.heading}>
          {/* Slide 16: portrait and principles on the left, text and
              qualifications on the right. Phones read top to bottom:
              portrait, text, qualifications, principles. */}
          <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-x-16 lg:gap-y-12">
            {/* eslint-disable-next-line @next/next/no-img-element -- srcset; see BrandLogo */}
            <img
              src={portrait480.src}
              srcSet={`${portrait480.src} 480w, ${portrait1045.src} 1045w`}
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 360px, 100vw"
              width={portrait1045.width}
              height={portrait1045.height}
              alt={c.about.portraitAlt}
              loading="lazy"
              decoding="async"
              className="h-auto w-full max-w-[360px] rounded lg:max-w-none"
            />

            <div className="max-w-[40rem] space-y-5 lg:col-start-2 lg:row-start-1">
              {c.about.body.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>

            <div className="lg:col-start-2">
              <h3 className="h3">{c.about.credentials.heading}</h3>
              <dl className="mt-5 space-y-6">
                <div>
                  <dt className="font-bold">{c.about.credentials.experience.title}</dt>
                  <dd className="small mt-1 text-anthrazit-mid">{c.about.credentials.experience.note}</dd>
                </div>
                {c.about.credentials.items.map((item) => (
                  <div key={item.title}>
                    <dt className="font-bold">{item.title}</dt>
                    <dd className="mt-1 text-sage-dark">{item.issuer}</dd>
                    {item.note && <dd className="small mt-1 text-anthrazit-mid">{item.note}</dd>}
                  </div>
                ))}
              </dl>
            </div>

            <div className="lg:col-start-1 lg:row-start-2">
              <h3 className="h3">{c.about.principlesHeading}</h3>
              <ul className="mt-5 space-y-3">
                {c.about.principles.map((p) => (
                  <li key={p} className="border-l-2 border-blush-mid pl-4">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* ─────────── Projekte ─────────── */}
        <Section id={SECTION_IDS.projects} heading={c.projects.heading} lead={c.projects.lead} tone="sage">
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16">
            <div>
              <p className="flex gap-3 rounded border border-sage-soft bg-white p-5">
                <span aria-hidden="true" className="mt-2 size-2.5 shrink-0 rounded-full bg-blush-mid" />
                <span>{c.projects.status}</span>
              </p>
              <a href={`#${SECTION_IDS.contact}`} className="btn btn-secondary mt-6 w-full sm:w-auto">
                {c.projects.cta}
              </a>
            </div>

            {/* The "Anwendungsbeispiele" grid of the style-guide slide. German
                shows the client's collage ("Bild Projekte.png"), whose tiles
                are baked in; English rebuilds it with live-text tiles. */}
            {c.projects.collageAlt ? (
              // eslint-disable-next-line @next/next/no-img-element -- srcset; see BrandLogo
              <img
                src={projects640.src}
                srcSet={`${projects640.src} 640w, ${projects1254.src} 1254w`}
                sizes="(min-width: 1024px) 620px, 100vw"
                width={projects1254.width}
                height={projects1254.height}
                alt={c.projects.collageAlt}
                loading="lazy"
                decoding="async"
                className="h-auto w-full"
              />
            ) : (
              <div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <p className="flex aspect-square items-end bg-sage-dark p-4 font-[family-name:var(--font-accent)] text-[clamp(1rem,0.85rem+0.8vw,1.5rem)] leading-snug text-white sm:p-6">
                    {c.projects.tiles[0]}
                  </p>
                  <Image
                    src={projectsLiving}
                    alt={c.projects.imageAlt[0]}
                    sizes="(min-width: 1024px) 300px, 50vw"
                    className="aspect-square h-full w-full object-cover"
                  />
                  <Image
                    src={projectsOrder}
                    alt={c.projects.imageAlt[1]}
                    sizes="(min-width: 1024px) 300px, 50vw"
                    className="aspect-square h-full w-full object-cover"
                  />
                  {/* Slide 5 sets this tile in tracked capitals; below 640 px a
                      tile is ~110 px wide and "ORGANISATION" would not fit. */}
                  <p className="flex aspect-square flex-col items-center justify-center bg-blush-soft p-4 text-center font-[family-name:var(--font-accent)] text-[clamp(1rem,0.85rem+0.6vw,1.25rem)] leading-snug text-anthrazit-dark sm:p-6 sm:tracking-[0.12em] sm:uppercase">
                    {c.projects.tiles[1]}
                    <span aria-hidden="true" className="rule mt-3 w-10 bg-anthrazit-dark" />
                  </p>
                </div>
              </div>
            )}
          </div>
        </Section>

        {/* ─────────── FAQ ─────────── */}
        <Section id={SECTION_IDS.faq} heading={c.faq.heading} lead={c.faq.lead}>
          <div className="mt-10 max-w-3xl border-t border-anthrazit-soft">
            {c.faq.items.map((f) => (
              <details key={f.q} className="faq border-b border-anthrazit-soft">
                <summary className="flex min-h-14 items-center justify-between gap-4 py-4 text-lg font-bold">
                  {f.q}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="faq__icon size-6 shrink-0 text-sage-dark"
                  >
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </summary>
                <p className="max-w-[40rem] pr-10 pb-6">{f.a}</p>
              </details>
            ))}
          </div>
        </Section>

        {/* ─────────── Claim — CI.pptx slide 9 ─────────── */}
        <div className="bg-mist px-4 py-16 text-center sm:px-6 md:py-24">
          <p className="claim" lang={locale === "de" ? "en" : undefined}>
            {c.claim.text}
          </p>
          <span aria-hidden="true" className="rule mx-auto mt-6" />
          <p className="eyebrow mt-6 text-anthrazit-mid">{c.claim.sub}</p>
        </div>

        {/* ─────────── Kontakt ─────────── */}
        <section
          id={SECTION_IDS.contact}
          aria-labelledby="kontakt-title"
          className="on-dark bg-sage-dark text-white"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
            <h2 id="kontakt-title" className="h2 text-white">
              {c.contact.heading}
            </h2>
            <span aria-hidden="true" className="rule mt-6" />
            <p className="lead mt-6">{c.contact.lead}</p>

            <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
              <div className="flex flex-col gap-3 sm:items-start">
                <a href={mailto} className="btn btn-light w-full sm:w-auto">
                  {c.hero.ctaPrimary}
                </a>
                <a href={`tel:${CONTACT.phoneHref}`} className="btn btn-outline-light w-full sm:w-auto">
                  <span className="sr-only">{c.contact.phoneLabel}: </span>
                  {CONTACT.phone}
                </a>
              </div>

              <dl className="grid gap-6">
                <div>
                  <dt className="eyebrow text-sage-light">{c.contact.emailLabel}</dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="inline-flex min-h-11 items-center underline decoration-sage-mid underline-offset-4 hover:decoration-white"
                    >
                      {CONTACT.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-sage-light">{c.contact.addressLabel}</dt>
                  <dd className="mt-1">
                    {CONTACT.street}, {CONTACT.postalCode} {CONTACT.city},{" "}
                    {locale === "de" ? CONTACT.country : CONTACT.countryEn}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-sage-light">{c.contact.areaLabel}</dt>
                  <dd className="mt-1">{c.contact.area}</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter content={c} locale={locale} />
    </>
  );
}

const TONES = {
  paper: "",
  sage: "bg-sage-light",
  anthrazit: "bg-anthrazit-light",
} as const;

function Section({
  id,
  heading,
  lead,
  tone = "paper",
  children,
}: {
  id: string;
  heading: string;
  lead?: string;
  tone?: keyof typeof TONES;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={TONES[tone]}>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <h2 id={`${id}-heading`} className="h2">
          {heading}
        </h2>
        <span aria-hidden="true" className="rule mt-6" />
        {lead && <p className="lead mt-6">{lead}</p>}
        {children}
      </div>
    </section>
  );
}

/** Entry price at the foot of a service card, linking to the full list. */
function PriceHint({ text }: { text: string }) {
  return (
    <p className="mt-auto pt-6">
      <a href={`#${SECTION_IDS.packages}`} className="link inline-flex min-h-11 items-center font-bold">
        {text}
      </a>
    </p>
  );
}

function BulletList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-2.5 ${className ?? ""}`}>
      {items.map((p) => (
        <li key={p} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-blush-dark" />
          <span>{p}</span>
        </li>
      ))}
    </ul>
  );
}
