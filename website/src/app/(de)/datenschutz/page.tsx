import type { Metadata } from "next";
import LegalShell, { LegalSection, Todo } from "@/components/LegalShell";
import { CONTACT } from "@/content/site";

export const metadata: Metadata = {
  title: "Datenschutzerklärung — Mag. Claudia Plessl",
  description:
    "Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.",
  robots: { index: true, follow: false },
  alternates: { canonical: "/datenschutz/" },
};

const linkClass =
  "underline decoration-sage-300 underline-offset-4 hover:decoration-sage-500";

export default function Datenschutz() {
  return (
    <LegalShell
      locale="de"
      title="Datenschutzerklärung"
      updated="Stand: August 2026"
    >
      <LegalSection heading="Verantwortliche">
        <p>
          Verantwortliche im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
        </p>
        <p>
          <strong>{CONTACT.name}</strong>
          <br />
          {CONTACT.street}, {CONTACT.postalCode} {CONTACT.city},{" "}
          {CONTACT.country}
          <br />
          E-Mail:{" "}
          <a href={`mailto:${CONTACT.email}`} className={linkClass}>
            {CONTACT.email}
          </a>
          <br />
          Telefon:{" "}
          <a href={`tel:${CONTACT.phoneHref}`} className={linkClass}>
            {CONTACT.phone}
          </a>
        </p>
        <p>
          Ein Datenschutzbeauftragter ist gesetzlich nicht erforderlich und
          wurde nicht bestellt.
        </p>
      </LegalSection>

      <LegalSection heading="Grundsatz dieser Website">
        <p>
          Diese Website ist bewusst datensparsam aufgebaut. Sie setzt{" "}
          <strong>keine Cookies</strong>, verwendet{" "}
          <strong>keine Analyse- oder Tracking-Werkzeuge</strong>, bindet{" "}
          <strong>keine Social-Media-Plugins</strong> ein und enthält{" "}
          <strong>kein Kontaktformular</strong>. Schriftarten und Bilder werden
          vom selben Server ausgeliefert wie die Seite selbst; es werden keine
          Inhalte von Drittanbietern wie Google Fonts nachgeladen.
        </p>
      </LegalSection>

      <LegalSection heading="Hosting und Server-Logfiles">
        <p>
          Die Website wird über GitHub Pages betrieben, einen Dienst der GitHub,
          Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA (Teil
          der Microsoft-Unternehmensgruppe).
        </p>
        <p>
          Beim Aufruf der Seite werden durch den Hostinganbieter technisch
          notwendige Zugriffsdaten verarbeitet, insbesondere IP-Adresse,
          Datum und Uhrzeit des Zugriffs, aufgerufene Seite, übertragene
          Datenmenge, Referrer sowie Browser- und Betriebssystemkennung. Diese
          Daten sind für die Auslieferung und Sicherheit der Website
          erforderlich.
        </p>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
          Interesse am sicheren und störungsfreien Betrieb der Website). Auf
          Speicherdauer und Umfang dieser Logfiles besteht kein Einfluss; die
          Verarbeitung erfolgt durch den Hostinganbieter.
        </p>
        <p>
          Da der Anbieter seinen Sitz in den USA hat, kann eine Übermittlung
          personenbezogener Daten in ein Drittland stattfinden. Grundlage dafür
          ist{" "}
          <Todo>
            [vor Veröffentlichung prüfen und konkret benennen: EU-US Data
            Privacy Framework und/oder Standardvertragsklauseln nach Art. 46
            DSGVO]
          </Todo>
          . Details:{" "}
          <a
            href="https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement"
            className={linkClass}
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub Privacy Statement
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="Kontaktaufnahme per E-Mail oder Telefon">
        <p>
          Wenn Sie per E-Mail oder Telefon Kontakt aufnehmen, werden Ihre
          Angaben zur Bearbeitung der Anfrage und für den Fall von
          Anschlussfragen gespeichert. Verarbeitet werden dabei jene Daten, die
          Sie selbst mitteilen — in der Regel Name, Kontaktdaten sowie
          Angaben zum Anliegen und zum Objekt.
        </p>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO
          (vorvertragliche Maßnahmen und Vertragserfüllung) bzw. Art. 6 Abs. 1
          lit. f DSGVO bei allgemeinen Anfragen. Die Daten werden gelöscht,
          sobald sie für die Zweckerreichung nicht mehr erforderlich sind und
          keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
        </p>
      </LegalSection>

      <LegalSection heading="Daten im Rahmen der Beauftragung">
        <p>
          Kommt ein Auftrag zustande, werden die zur Durchführung und
          Abrechnung erforderlichen Daten verarbeitet — insbesondere Name,
          Anschrift des Einsatzortes, Kontaktdaten sowie Termin- und
          Leistungsdaten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO.
        </p>
        <p>
          Rechnungs- und Buchhaltungsdaten unterliegen der gesetzlichen
          Aufbewahrungspflicht nach § 132 BAO und werden für sieben Jahre
          aufbewahrt (Art. 6 Abs. 1 lit. c DSGVO).
        </p>
      </LegalSection>

      <LegalSection heading="Fotodokumentation bei Vor-Ort-Einsätzen">
        <p>
          Bei Ordnungs- und Gestaltungsprojekten können Vorher-Nachher-Fotos
          angefertigt werden. Diese dienen zunächst ausschließlich der internen
          Arbeitsdokumentation.
        </p>
        <p>
          Eine Veröffentlichung — etwa auf dieser Website, in sozialen Medien
          oder in Präsentationen — erfolgt{" "}
          <strong>nur mit Ihrer vorherigen, gesonderten und schriftlichen
          Einwilligung</strong>{" "}
          (Art. 6 Abs. 1 lit. a DSGVO). Diese Einwilligung ist freiwillig, hat
          keinen Einfluss auf die Leistungserbringung und kann jederzeit mit
          Wirkung für die Zukunft widerrufen werden. Personen sowie eindeutig
          identifizierende Gegenstände und Dokumente werden nicht abgebildet
          oder vor einer Veröffentlichung unkenntlich gemacht.
        </p>
      </LegalSection>

      <LegalSection heading="Empfänger von Daten">
        <p>
          Eine Weitergabe erfolgt nur, soweit dies zur Vertragserfüllung
          erforderlich oder gesetzlich vorgeschrieben ist — insbesondere an die
          Steuerberatung sowie an Finanzamt und Sozialversicherung. Mit
          Dienstleistern, die im Auftrag Daten verarbeiten, bestehen
          Auftragsverarbeitungsverträge gemäß Art. 28 DSGVO. Eine Weitergabe zu
          Werbezwecken findet nicht statt.
        </p>
      </LegalSection>

      <LegalSection heading="Ihre Rechte">
        <p>Ihnen stehen gegenüber der Verantwortlichen folgende Rechte zu:</p>
        <ul className="ml-5 list-disc space-y-1.5">
          <li>Auskunft über die verarbeiteten Daten (Art. 15 DSGVO)</li>
          <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
          <li>Löschung (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
          <li>
            Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft
            (Art. 7 Abs. 3 DSGVO)
          </li>
        </ul>
        <p>
          Zur Ausübung genügt eine formlose Nachricht an{" "}
          <a href={`mailto:${CONTACT.email}`} className={linkClass}>
            {CONTACT.email}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="Beschwerderecht">
        <p>
          Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer Daten gegen
          das Datenschutzrecht verstößt, können Sie sich bei der
          Aufsichtsbehörde beschweren:
        </p>
        <p>
          Österreichische Datenschutzbehörde
          <br />
          Barichgasse 40—42, 1030 Wien
          <br />
          <a
            href="https://www.dsb.gv.at"
            className={linkClass}
            rel="noopener noreferrer"
            target="_blank"
          >
            www.dsb.gv.at
          </a>
        </p>
      </LegalSection>
    </LegalShell>
  );
}
