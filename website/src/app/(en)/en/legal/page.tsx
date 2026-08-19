import type { Metadata } from "next";
import Link from "next/link";
import LegalShell, { LegalSection } from "@/components/LegalShell";
import { CONTACT } from "@/content/site";

export const metadata: Metadata = {
  title: "Legal information | Mag. Claudia Plessl — Raum & Ordnung",
  description:
    "Imprint, privacy notice and terms and conditions in summary. The binding versions are the German originals.",
  robots: { index: true, follow: false },
  alternates: { canonical: "/en/legal/" },
};

const linkClass =
  "underline decoration-sage-300 underline-offset-4 hover:decoration-sage-500";

export default function Legal() {
  return (
    <LegalShell
      locale="en"
      path="en/legal/"
      title="Legal information"
      updated="As of August 2026"
      updatedIso="2026-08"
    >
      <div className="rounded-sm border border-gold-accent/50 bg-gold-accent/10 p-5">
        <p className="text-sm text-anthracite-700">
          This page is a courtesy summary in English. The business operates
          under Austrian law, and the{" "}
          <strong>German versions are the legally binding ones</strong>. In case
          of any discrepancy, the German text prevails.
        </p>
      </div>

      <LegalSection id="imprint" heading="Imprint">
        <p>
          Information pursuant to § 5 of the Austrian E-Commerce Act (ECG) and
          § 25 of the Media Act (MedienG).
        </p>
        <p>
          <strong>{CONTACT.name}</strong>
          <br />
          Raum &amp; Ordnung
          <br />
          {CONTACT.street}
          <br />
          {CONTACT.postalCode} {CONTACT.city}
          <br />
          {CONTACT.countryEn}
        </p>
        <p>
          Email:{" "}
          <a href={`mailto:${CONTACT.email}`} className={linkClass}>
            {CONTACT.email}
          </a>
          <br />
          Phone:{" "}
          <a href={`tel:${CONTACT.phoneHref}`} className={linkClass}>
            {CONTACT.phone}
          </a>
        </p>
        <p>
          Legal form: sole proprietorship. Business activity: furnishing
          proposals on visual and aesthetic grounds, organizing coaching, and
          training. Regulated under the Austrian Trade Act (Gewerbeordnung);
          member of the Lower Austrian Economic Chamber.
        </p>
        <p>
          Full details, including the trade register (GISA) number and the
          competent trade authority, are in the{" "}
          <Link href="/impressum/" className={linkClass}>
            German Impressum
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection id="privacy" heading="Privacy">
        <p>
          This website sets <strong>no cookies</strong>, uses{" "}
          <strong>no analytics or tracking</strong>, embeds{" "}
          <strong>no social media plugins</strong> and has{" "}
          <strong>no contact form</strong>. Fonts and images are served from the
          same origin as the page, so no third-party requests are made when you
          browse it.
        </p>
        <p>
          The site is hosted on GitHub Pages (GitHub, Inc., USA). The host
          processes technically necessary access data such as IP address, time
          of access and browser identification, on the basis of legitimate
          interest under Art. 6(1)(f) GDPR.
        </p>
        <p>
          If you get in touch by email or phone, the details you provide are
          processed in order to answer your enquiry and, where applicable, to
          perform the contract (Art. 6(1)(b) GDPR). Before-and-after photographs
          taken during on-site work are only ever published with your separate,
          revocable written consent (Art. 6(1)(a) GDPR).
        </p>
        <p>
          You have the right of access, rectification, erasure, restriction,
          data portability and objection, and may lodge a complaint with the
          Austrian Data Protection Authority (
          <a
            href="https://www.dsb.gv.at"
            className={linkClass}
            rel="noopener noreferrer"
            target="_blank"
          >
            dsb.gv.at
          </a>
          ). The full notice is the{" "}
          <Link href="/datenschutz/" className={linkClass}>
            German Datenschutzerklärung
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection id="terms" heading="Terms and conditions">
        <p>
          Services are provided on a best-efforts basis; a specific commercial
          or aesthetic outcome is not owed, since the result depends materially
          on the client&rsquo;s participation. Cleaning, clearance and disposal
          services, structural work, and psychological or therapeutic support
          are expressly outside the scope.
        </p>
        <p>
          Prices shown on this site are non-binding entry prices; the binding
          price is set out in the individual quote following the space check.
          Invoices are payable within 14 days.
        </p>
        <p>
          <strong>Right of withdrawal:</strong> where the contract is concluded
          at a distance or off-premises, consumers have{" "}
          <strong>14 days</strong> to withdraw without giving reasons (§ 11
          FAGG). If, at your express request, work begins before that period
          ends, a proportionate amount is payable for the services already
          rendered (§ 16 FAGG); the right lapses once the service has been fully
          performed with your express consent and acknowledgement (§ 18(1)(1)
          FAGG).
        </p>
        <p>
          <strong>Decisions about your possessions are yours alone.</strong> The
          contractor advises and structures but never decides independently
          about property belonging to others, and accepts no liability for items
          you choose to dispose of.
        </p>
        <p>
          Liability is limited to intent and gross negligence, save where
          mandatory law — in particular the Consumer Protection Act and the
          Product Liability Act — provides otherwise. Personal injury is never
          excluded. Professional indemnity insurance is in place.
        </p>
        <p>
          Austrian law applies. For consumers this choice does not remove the
          protection of mandatory rules of their country of residence, and
          jurisdiction follows § 14 KSchG. The EU Online Dispute Resolution
          platform ceased operating on 20 July 2025; Austrian alternative
          dispute resolution bodies remain available. The full terms are the{" "}
          <Link href="/agb/" className={linkClass}>
            German AGB
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection id="images" heading="Image credits">
        <p>
          <strong>
            The images on this website were created using artificial
            intelligence.
          </strong>{" "}
          They are not photographs: they show neither real rooms nor specific
          client projects, and serve only to illustrate the design style.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
