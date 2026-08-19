import Image from "next/image";
/*
 * Statically imported so the emitted <img src> carries `basePath`. A plain
 * "/hero.webp" string would resolve to the domain root and 404 on the
 * project-path Pages URL.
 */
import heroImage from "@/assets/hero.webp";
import detailLiving from "@/assets/detail-living.webp";
import detailOrder from "@/assets/detail-order.webp";
import { CONTACT, getContent, type Locale } from "@/content/site";
import { buildHomeGraph } from "@/content/schema";
import SiteHeader, { SECTION_IDS } from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import IntroVideo from "./IntroVideo";
import JsonLd from "./JsonLd";

/**
 * The one-pager, rendered for both locales. German is served at `/`,
 * English at `/en/`; section anchors are identical in both so the language
 * switch keeps the reader roughly in place.
 */
export default function HomePage({ locale }: { locale: Locale }) {
  const c = getContent(locale);

  const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
    c.contact.mailSubject,
  )}&body=${encodeURIComponent(c.contact.mailBody)}`;

  return (
    <>
      <JsonLd graph={buildHomeGraph(locale)} />

      <SiteHeader content={c} locale={locale} />

      <main id="main">
        {/* ─────────── Hero ─────────── */}
        <section className="bg-warm-cream/60 px-5 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24">
          <div className="mx-auto max-w-6xl">
            <p className="eyebrow animate-fade-in-up text-sage-600">
              {c.hero.eyebrow}
            </p>

            <div
              className="animate-reveal-line delay-1 rule-gold mt-5 w-24"
              aria-hidden="true"
            />

            <h1 className="animate-fade-in-up delay-1 display-xl mt-8 whitespace-pre-line text-anthracite-800">
              {c.hero.tagline}
            </h1>

            <p className="animate-fade-in-up delay-2 mt-8 max-w-2xl text-lg text-anthracite-600 md:text-xl">
              {c.hero.lead}
            </p>

            <div className="animate-fade-in-up delay-3 mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={mailto}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-sage-700 px-8 text-sm font-medium tracking-wide text-warm-white transition-colors hover:bg-sage-800"
              >
                {c.hero.ctaPrimary}
              </a>
              <a
                href={`#${SECTION_IDS.services}`}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-sage-400 px-8 text-sm font-medium tracking-wide text-sage-700 transition-colors hover:bg-sage-50"
              >
                {c.hero.ctaSecondary}
              </a>
            </div>
          </div>
        </section>

        {/* ─────────── Brand band ─────────── */}
        <section aria-hidden="true" className="relative">
          <Image
            src={heroImage}
            alt=""
            priority
            sizes="100vw"
            className="h-[38vh] w-full object-cover md:h-[52vh]"
          />
        </section>

        {/* ─────────── Intro film ─────────── */}
        <IntroVideo content={c} locale={locale} />

        {/* ─────────── Services ─────────── */}
        <Section
          id={SECTION_IDS.services}
          heading={c.services.heading}
          lead={c.services.lead}
        >
          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {c.services.items.map((s, i) => (
              <article key={s.title} className="flex flex-col">
                <p className="eyebrow text-sage-600">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-heading text-2xl font-normal text-anthracite-800 md:text-[1.75rem]">
                  {s.title}
                </h3>
                <div className="rule-gold mt-4 w-12" aria-hidden="true" />
                <p className="mt-5 text-anthracite-600">{s.lead}</p>
                <ul className="mt-6 space-y-2.5 text-sm text-anthracite-500">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sage-400"
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        {/* ─────────── Audience ─────────── */}
        <div className="bg-warm-cream/60">
          <Section
            id={SECTION_IDS.audience}
            heading={c.audience.heading}
            lead={c.audience.lead}
          >
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {c.audience.items.map((a) => (
                <article
                  key={a.title}
                  className="flex flex-col border-t border-sage-300 pt-6"
                >
                  <h3 className="font-heading text-xl font-normal text-anthracite-800">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium text-sage-700">
                    {a.profile}
                  </p>
                  <p className="mt-4 text-sm text-anthracite-600">{a.need}</p>
                </article>
              ))}
            </div>
          </Section>
        </div>

        {/* ─────────── Process ─────────── */}
        <Section
          id={SECTION_IDS.process}
          heading={c.process.heading}
          lead={c.process.lead}
        >
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {c.process.items.map((s, i) => (
              <article key={s.title}>
                <p className="font-heading text-4xl font-light text-sage-500">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-heading text-xl font-normal text-anthracite-800">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm text-anthracite-600">{s.body}</p>
              </article>
            ))}
          </div>
        </Section>

        {/* ─────────── Packages ─────────── */}
        <div className="bg-warm-cream/60">
          <Section
            id={SECTION_IDS.packages}
            heading={c.packages.heading}
            lead={c.packages.lead}
          >
            {/* Cards on small screens, a table from md up. */}
            <div className="mt-12 grid gap-4 md:hidden">
              {c.packages.items.map((p) => (
                <div
                  key={p.name}
                  className="rounded-sm border border-sage-200 bg-warm-white p-5"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-heading text-lg font-normal text-anthracite-800">
                      {p.name}
                    </h3>
                    <p className="shrink-0 font-nav text-sm font-medium text-sage-700">
                      {p.price}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-anthracite-600">{p.scope}</p>
                  <p className="eyebrow mt-3 text-anthracite-400">
                    {p.audience}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 hidden overflow-x-auto md:block">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-sage-300">
                    {[
                      c.packages.tableHeads.name,
                      c.packages.tableHeads.scope,
                      c.packages.tableHeads.audience,
                      c.packages.tableHeads.price,
                    ].map((h, i) => (
                      <th
                        key={h}
                        scope="col"
                        className={`eyebrow pb-3 text-anthracite-400 ${
                          i === 3 ? "text-right" : ""
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.packages.items.map((p) => (
                    <tr
                      key={p.name}
                      className="border-b border-sage-200/70 align-top"
                    >
                      <th
                        scope="row"
                        className="py-4 pr-6 font-heading text-lg font-normal text-anthracite-800"
                      >
                        {p.name}
                      </th>
                      <td className="py-4 pr-6 text-sm text-anthracite-600">
                        {p.scope}
                      </td>
                      <td className="py-4 pr-6 text-sm whitespace-nowrap text-anthracite-500">
                        {p.audience}
                      </td>
                      <td className="py-4 text-right font-nav text-sm font-medium whitespace-nowrap text-sage-700">
                        {p.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 max-w-3xl text-xs text-anthracite-400">
              {c.packages.note}
            </p>
          </Section>
        </div>

        {/* ─────────── About ─────────── */}
        <Section id={SECTION_IDS.about} heading={c.about.heading}>
          <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div>
              {c.about.body.map((p) => (
                <p key={p.slice(0, 40)} className="mt-5 text-anthracite-600 first:mt-0">
                  {p}
                </p>
              ))}

              <ul className="mt-10 grid gap-3 sm:grid-cols-2">
                {c.about.principles.map((p) => (
                  <li
                    key={p}
                    className="border-l-2 border-sage-300 pl-4 text-sm text-anthracite-600"
                  >
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-12 border-t border-sage-200 pt-8">
                <h3 className="eyebrow text-sage-600">
                  {c.about.credentials.heading}
                </h3>
                <dl className="mt-6 grid gap-6 sm:grid-cols-2">
                  {c.about.credentials.items.map((item) => (
                    <div key={item.title}>
                      <dt className="font-heading text-lg font-normal text-anthracite-800">
                        {item.title}
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-sage-700">
                        {item.issuer}
                      </dd>
                      <dd className="mt-2 text-sm text-anthracite-500">
                        {item.note}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-1 lg:gap-4">
              <Image
                src={detailLiving}
                alt={
                  locale === "de"
                    ? "Wohnbereich in warmen Naturtönen mit Sofa, Olivenbaum und gerahmter Kunst"
                    : "Living area in warm natural tones with a sofa, olive tree and framed art"
                }
                sizes="(max-width: 1024px) 45vw, 320px"
                className="h-full w-full rounded-sm object-cover"
              />
              <Image
                src={detailOrder}
                alt={
                  locale === "de"
                    ? "Offenes Regalsystem mit beschrifteten Boxen, gefalteter Wäsche und Kleiderstange"
                    : "Open shelving system with labelled boxes, folded textiles and a clothes rail"
                }
                sizes="(max-width: 1024px) 45vw, 320px"
                className="h-full w-full rounded-sm object-cover"
              />
            </div>
          </div>
        </Section>

        {/* ─────────── Contact ─────────── */}
        <div className="bg-sage-800 text-warm-white">
          <section
            id={SECTION_IDS.contact}
            className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 md:px-8 md:py-28"
          >
            <h2 className="display-lg text-warm-white">{c.contact.heading}</h2>
            <div className="rule-gold mt-6 w-24" aria-hidden="true" />
            <p className="mt-8 max-w-2xl text-sage-100">{c.contact.lead}</p>

            <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
              <div className="flex flex-col gap-4">
                <a
                  href={mailto}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-warm-white px-8 text-sm font-medium tracking-wide text-sage-800 transition-colors hover:bg-sage-50 sm:w-auto"
                >
                  {c.hero.ctaPrimary}
                </a>
                <a
                  href={`tel:${CONTACT.phoneHref}`}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-sage-400 px-8 text-sm font-medium tracking-wide text-warm-white transition-colors hover:bg-sage-700 sm:w-auto"
                >
                  {CONTACT.phone}
                </a>
              </div>

              <dl className="grid gap-5 text-sm">
                <div>
                  <dt className="eyebrow text-sage-300">
                    {c.contact.emailLabel}
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="underline decoration-sage-500 underline-offset-4 transition-colors hover:decoration-warm-white"
                    >
                      {CONTACT.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-sage-300">
                    {c.contact.addressLabel}
                  </dt>
                  <dd className="mt-1 text-sage-100">
                    {CONTACT.street}, {CONTACT.postalCode} {CONTACT.city},{" "}
                    {locale === "de" ? CONTACT.country : CONTACT.countryEn}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-sage-300">
                    {c.contact.areaLabel}
                  </dt>
                  <dd className="mt-1 text-sage-100">{c.contact.area}</dd>
                </div>
              </dl>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter content={c} locale={locale} />
    </>
  );
}

function Section({
  id,
  heading,
  lead,
  children,
}: {
  id: string;
  heading: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 md:px-8 md:py-28"
    >
      <h2 className="display-lg text-anthracite-800">{heading}</h2>
      <div className="rule-gold mt-6 w-24" aria-hidden="true" />
      {lead && (
        <p className="mt-6 max-w-2xl text-lg text-anthracite-600">{lead}</p>
      )}
      {children}
    </section>
  );
}
