import type { Metadata } from "next";
import LegalShell, { LegalSection, Todo } from "@/components/LegalShell";
import { CONTACT } from "@/content/site";

export const metadata: Metadata = {
  title: "Impressum | Mag. Claudia Plessl — Raum & Ordnung",
  description:
    "Impressum und Offenlegung gemäß § 5 E-Commerce-Gesetz und § 25 Mediengesetz.",
  robots: { index: true, follow: false },
  alternates: { canonical: "/impressum/" },
};

export default function Impressum() {
  return (
    <LegalShell
      locale="de"
      path="impressum/"
      title="Impressum"
      updated="Stand: August 2026"
      updatedIso="2026-08"
    >
      <LegalSection heading="Informationspflicht laut § 5 E-Commerce-Gesetz (ECG)">
        <p>
          <strong>{CONTACT.name}</strong>
          <br />
          Raum &amp; Ordnung
          <br />
          {CONTACT.street}
          <br />
          {CONTACT.postalCode} {CONTACT.city}
          <br />
          {CONTACT.country}
        </p>
        <p>
          Unternehmensgegenstand: Erstellung von Einrichtungsvorschlägen nach
          rein optischen und geschmacklichen Gesichtspunkten; Ordnungscoaching
          (Aufräumcoach); Trainings und Workshops.
        </p>
        <p>
          Rechtsform: Einzelunternehmen
          <br />
          GISA-Zahl: <Todo>[GISA-Zahl der Gewerbeanmeldung eintragen]</Todo>
          <br />
          Genauer Gewerbewortlaut:{" "}
          <Todo>[Wortlaut laut Gewerbeschein eintragen]</Todo>
          <br />
          UID-Nummer:{" "}
          <Todo>
            [UID eintragen — entfällt bei Anwendung der Kleinunternehmerregelung]
          </Todo>
        </p>
      </LegalSection>

      <LegalSection heading="Kontakt">
        <p>
          E-Mail:{" "}
          <a
            href={`mailto:${CONTACT.email}`}
            className="underline decoration-sage-300 underline-offset-4 hover:decoration-sage-500"
          >
            {CONTACT.email}
          </a>
          <br />
          Telefon:{" "}
          <a
            href={`tel:${CONTACT.phoneHref}`}
            className="underline decoration-sage-300 underline-offset-4 hover:decoration-sage-500"
          >
            {CONTACT.phone}
          </a>
        </p>
      </LegalSection>

      <LegalSection heading="Gewerbebehörde und Mitgliedschaften">
        <p>
          Gewerbebehörde:{" "}
          <Todo>
            [zuständige Bezirkshauptmannschaft laut Gewerbeschein bestätigen —
            für 3424 Wolfpassing voraussichtlich BH Tulln]
          </Todo>
          <br />
          Mitgliedschaft: Wirtschaftskammer Niederösterreich,{" "}
          <Todo>[Fachgruppe ergänzen]</Todo>
          <br />
          Anwendbare Rechtsvorschrift: Gewerbeordnung (GewO),{" "}
          <a
            href="https://www.ris.bka.gv.at"
            className="underline decoration-sage-300 underline-offset-4 hover:decoration-sage-500"
            rel="noopener noreferrer"
            target="_blank"
          >
            ris.bka.gv.at
          </a>
        </p>
      </LegalSection>

      <LegalSection heading="Offenlegung gemäß § 25 Mediengesetz">
        <p>
          Medieninhaberin, Herausgeberin und für den Inhalt verantwortlich:{" "}
          {CONTACT.name}, {CONTACT.street}, {CONTACT.postalCode} {CONTACT.city}.
        </p>
        <p>
          Grundlegende Richtung: Information über die Dienstleistungen des
          Unternehmens in den Bereichen Interior Design, Ordnungscoaching sowie
          Trainings und Workshops.
        </p>
      </LegalSection>

      <LegalSection heading="Haftung für Inhalte">
        <p>
          Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt
          erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der
          Inhalte kann jedoch keine Gewähr übernommen werden. Als
          Diensteanbieterin bin ich gemäß § 7 Abs. 1 ECG für eigene Inhalte auf
          diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Eine
          Verpflichtung zur Überwachung übermittelter oder gespeicherter fremder
          Informationen besteht nicht.
        </p>
      </LegalSection>

      <LegalSection heading="Haftung für Links">
        <p>
          Diese Website enthält Links zu externen Websites Dritter, auf deren
          Inhalte kein Einfluss besteht. Für die Inhalte der verlinkten Seiten
          ist stets der jeweilige Anbieter verantwortlich. Die verlinkten Seiten
          wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße
          überprüft. Eine permanente inhaltliche Kontrolle ist ohne konkrete
          Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden
          von Rechtsverletzungen werden derartige Links umgehend entfernt.
        </p>
      </LegalSection>

      <LegalSection heading="Urheberrecht">
        <p>
          Die auf dieser Website erstellten Inhalte und Werke unterliegen dem
          österreichischen Urheberrecht. Vervielfältigung, Bearbeitung,
          Verbreitung und jede Art der Verwertung außerhalb der Grenzen des
          Urheberrechts bedürfen der schriftlichen Zustimmung von{" "}
          {CONTACT.name}.
        </p>
      </LegalSection>

      <LegalSection heading="Bildnachweis">
        <p>
          <strong>
            Die auf dieser Website verwendeten Bilder wurden mit künstlicher
            Intelligenz erstellt.
          </strong>{" "}
          Sie sind keine Fotografien: Sie zeigen weder reale Räume noch
          konkrete Kundenprojekte, sondern veranschaulichen ausschließlich den
          gestalterischen Stil.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
