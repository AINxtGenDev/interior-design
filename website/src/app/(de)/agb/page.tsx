import type { Metadata } from "next";
import Link from "next/link";
import LegalShell, { LegalSection, Todo } from "@/components/LegalShell";
import { CONTACT } from "@/content/site";

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen | Mag. Claudia Plessl — Raum & Ordnung",
  description:
    "Allgemeine Geschäftsbedingungen für Ordnungscoaching, Innenraumgestaltung sowie Workshops und Trainings.",
  robots: { index: true, follow: false },
  alternates: { canonical: "/agb/" },
};

const linkClass =
  "underline decoration-sage-300 underline-offset-4 hover:decoration-sage-500";

export default function AGB() {
  return (
    <LegalShell
      locale="de"
      title="Allgemeine Geschäftsbedingungen"
      updated="Fassung: August 2026"
    >
      <LegalSection heading="1. Geltungsbereich">
        <p>
          Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge
          über Leistungen von {CONTACT.name}, {CONTACT.street},{" "}
          {CONTACT.postalCode} {CONTACT.city} (im Folgenden „Auftragnehmerin“)
          mit ihren Kundinnen und Kunden (im Folgenden „Auftraggeber“) in den
          Bereichen Ordnungscoaching, Innenraumgestaltung sowie Workshops und
          Trainings.
        </p>
        <p>
          Abweichende Bedingungen des Auftraggebers werden nur wirksam, wenn sie
          ausdrücklich schriftlich anerkannt werden. Ist der Auftraggeber
          Verbraucher im Sinne des Konsumentenschutzgesetzes (KSchG), gelten die
          zwingenden Bestimmungen des KSchG und des Fern- und
          Auswärtsgeschäfte-Gesetzes (FAGG) vorrangig vor diesen AGB.
        </p>
      </LegalSection>

      <LegalSection heading="2. Leistungsgegenstand und Abgrenzung">
        <p>
          Die Auftragnehmerin erbringt Beratungs-, Begleit- und
          Schulungsleistungen. Der konkrete Leistungsumfang ergibt sich aus dem
          jeweiligen schriftlichen Angebot bzw. der Auftragsbestätigung.
        </p>
        <p>Ausdrücklich nicht Gegenstand des Vertrages sind:</p>
        <ul className="ml-5 list-disc space-y-1.5">
          <li>Reinigungs-, Entrümpelungs- und Entsorgungsdienstleistungen</li>
          <li>
            bauliche Eingriffe, Handwerks- und Montageleistungen sowie
            Planungsleistungen, die dem reglementierten Gewerbe der
            Innenarchitektur oder einem Ziviltechnikerberuf vorbehalten sind
          </li>
          <li>
            psychologische, psychotherapeutische oder medizinische Beratung und
            Behandlung
          </li>
          <li>Rechts-, Steuer- oder Unternehmensberatung im reglementierten Sinn</li>
        </ul>
        <p>
          Die Leistungen der Auftragnehmerin stellen eine Bemühungsverpflichtung
          dar. Ein bestimmter wirtschaftlicher oder gestalterischer Erfolg wird
          nicht geschuldet, da das Ergebnis wesentlich von der Mitwirkung des
          Auftraggebers abhängt.
        </p>
      </LegalSection>

      <LegalSection heading="3. Angebot und Vertragsabschluss">
        <p>
          Darstellungen auf der Website sind unverbindliche Informationen und
          kein bindendes Anbot. Nach einer Anfrage erstellt die Auftragnehmerin
          ein individuelles Angebot mit Leistungsumfang, Terminrahmen und Preis.
        </p>
        <p>
          Der Vertrag kommt mit ausdrücklicher Annahme dieses Angebots durch den
          Auftraggeber in Textform (z. B. E-Mail) und deren Bestätigung durch
          die Auftragnehmerin zustande. Angebote sind, sofern nicht anders
          angegeben, 14 Tage ab Ausstellungsdatum gültig.
        </p>
      </LegalSection>

      <LegalSection heading="4. Preise und Nebenkosten">
        <p>
          Es gelten die im Angebot genannten Preise. Auf der Website angeführte
          Beträge sind unverbindliche Einstiegspreise („ab“-Preise); der
          verbindliche Preis wird nach dem Raumcheck im Angebot festgelegt.
        </p>
        <p>
          <Todo>
            [Vor Veröffentlichung festlegen: Umsatzsteuer-Status]
          </Todo>{" "}
          — Bei Anwendung der Kleinunternehmerregelung gemäß § 6 Abs. 1 Z 27
          UStG wird keine Umsatzsteuer ausgewiesen; Rechnungen enthalten den
          Hinweis „Umsatzsteuerbefreit aufgrund der Kleinunternehmerregelung“.
        </p>
        <p>
          Fahrtkosten innerhalb des Kerngebiets sind im Preis enthalten. Für
          Einsatzorte außerhalb dieses Gebiets wird ein Kilometergeld bzw. eine
          Wegpauschale gesondert vereinbart und im Angebot ausgewiesen.
          Materialien, Ordnungshilfsmittel und Einrichtungsgegenstände werden
          vom Auftraggeber selbst beschafft und bezahlt, sofern nichts anderes
          vereinbart ist.
        </p>
      </LegalSection>

      <LegalSection heading="5. Zahlungsbedingungen">
        <p>
          Rechnungen sind, sofern im Angebot nichts anderes vereinbart ist,
          binnen 14 Tagen ab Rechnungsdatum ohne Abzug zur Zahlung fällig.
        </p>
        <p>
          Bei Aufträgen ab einem Auftragswert von{" "}
          <Todo>[Schwellenwert festlegen, z. B. EUR 600]</Todo> kann eine
          Anzahlung von{" "}
          <Todo>[Prozentsatz festlegen, z. B. 30 %]</Todo> vereinbart werden.
          Workshop- und Kursgebühren sind vor Veranstaltungsbeginn fällig.
        </p>
        <p>
          Bei Zahlungsverzug werden gegenüber Verbrauchern die gesetzlichen
          Verzugszinsen von 4 % p. a. verrechnet; gegenüber Unternehmern gelten
          die gesetzlichen Verzugszinsen nach § 456 UGB. Notwendige und
          zweckentsprechende Mahn- und Inkassokosten werden in angemessener
          Höhe in Rechnung gestellt.
        </p>
      </LegalSection>

      <LegalSection heading="6. Rücktrittsrecht für Verbraucher (FAGG)">
        <p>
          Wird der Vertrag ausschließlich im Fernabsatz (z. B. per E-Mail oder
          Telefon) oder außerhalb der Geschäftsräume der Auftragnehmerin
          — insbesondere in der Wohnung des Auftraggebers — geschlossen, steht
          dem Auftraggeber als Verbraucher ein{" "}
          <strong>Rücktrittsrecht von 14 Tagen</strong> ab Vertragsabschluss zu
          (§ 11 FAGG). Eine Begründung ist nicht erforderlich.
        </p>
        <p>
          Für den Rücktritt genügt eine eindeutige Erklärung in Textform an{" "}
          <a href={`mailto:${CONTACT.email}`} className={linkClass}>
            {CONTACT.email}
          </a>
          . Zur Wahrung der Frist reicht die rechtzeitige Absendung.
        </p>
        <p>
          <strong>Beginn der Leistung innerhalb der Rücktrittsfrist:</strong>{" "}
          Soll die Leistung bereits vor Ablauf der Rücktrittsfrist beginnen,
          bedarf dies eines ausdrücklichen Verlangens des Auftraggebers. Tritt
          der Auftraggeber danach zurück, hat er gemäß § 16 FAGG einen der
          bereits erbrachten Leistung wertmäßig entsprechenden anteiligen Betrag
          zu zahlen.
        </p>
        <p>
          <strong>Erlöschen des Rücktrittsrechts:</strong> Das Rücktrittsrecht
          erlischt bei vollständig erbrachten Dienstleistungen, wenn die
          Ausführung mit ausdrücklicher Zustimmung des Auftraggebers und dessen
          Kenntnisnahme vom Verlust des Rücktrittsrechts bei vollständiger
          Vertragserfüllung begonnen hat (§ 18 Abs. 1 Z 1 FAGG).
        </p>
      </LegalSection>

      <LegalSection heading="7. Termine, Storno und Verschiebung">
        <p>
          Vereinbarte Termine sind verbindlich. Unabhängig vom Rücktrittsrecht
          nach Punkt 6 gilt für die Absage einzelner Termine:
        </p>
        <ul className="ml-5 list-disc space-y-1.5">
          <li>
            Absage bis <Todo>[Frist, z. B. 7 Tage]</Todo> vor dem Termin:
            kostenfrei
          </li>
          <li>
            Absage bis <Todo>[Frist, z. B. 48 Stunden]</Todo> vor dem Termin:{" "}
            <Todo>[z. B. 50 %]</Todo> des vereinbarten Honorars
          </li>
          <li>
            spätere Absage oder Nichterscheinen:{" "}
            <Todo>[z. B. 100 %]</Todo> des vereinbarten Honorars
          </li>
        </ul>
        <p>
          Eine einmalige Terminverschiebung ist bei rechtzeitiger Ankündigung
          kostenfrei möglich. Bei Verhinderung aus wichtigem Grund (z. B.
          Krankheit, Pflegefall, Trauerfall) wird einvernehmlich ein
          Ersatztermin gesucht; Stornogebühren entfallen in diesen Fällen.
        </p>
        <p>
          Ist die Auftragnehmerin an der Leistungserbringung verhindert, wird
          ehestmöglich informiert und ein Ersatztermin angeboten. Bereits
          geleistete Zahlungen für nicht erbrachte Leistungen werden
          rückerstattet. Weitergehende Ansprüche bestehen nur bei Vorsatz oder
          grober Fahrlässigkeit.
        </p>
      </LegalSection>

      <LegalSection heading="8. Workshops und Trainings">
        <p>
          Die Anmeldung zu Workshops ist verbindlich. Die Durchführung setzt
          eine Mindestteilnehmerzahl von{" "}
          <Todo>[Anzahl festlegen, z. B. 5]</Todo> Personen voraus. Wird diese
          nicht erreicht, kann die Veranstaltung bis{" "}
          <Todo>[Frist, z. B. 5 Tage]</Todo> vor dem Termin abgesagt werden;
          bereits bezahlte Gebühren werden in diesem Fall vollständig
          rückerstattet.
        </p>
        <p>
          Bei Absage durch den Auftraggeber gelten die Stornoregelungen nach
          Punkt 7 sinngemäß. Die Nennung einer Ersatzteilnehmerin oder eines
          Ersatzteilnehmers ist jederzeit kostenfrei möglich.
        </p>
      </LegalSection>

      <LegalSection heading="9. Mitwirkungspflichten des Auftraggebers">
        <p>
          Der Auftraggeber stellt sicher, dass die Räumlichkeiten zum
          vereinbarten Termin zugänglich sind und die Arbeit gefahrlos möglich
          ist. Er sorgt für die Anwesenheit der entscheidungsbefugten Person,
          soweit Entscheidungen über Gegenstände zu treffen sind.
        </p>
        <p>
          Der Auftraggeber informiert vorab über besondere Umstände am
          Einsatzort — insbesondere über Tiere, gesundheitsgefährdende
          Belastungen wie Schimmel oder Ungeziefer sowie über Gegenstände von
          besonderem materiellem oder ideellem Wert.
        </p>
        <p>
          Kommt der Auftraggeber diesen Pflichten nicht nach und ist die
          Leistung dadurch nicht oder nur eingeschränkt möglich, gilt der Termin
          als konsumiert.
        </p>
      </LegalSection>

      <LegalSection heading="10. Eigentum, Aussonderung und Entsorgung">
        <p>
          Sämtliche Entscheidungen über das Aussondern, Verschenken, Verkaufen
          oder Entsorgen von Gegenständen trifft{" "}
          <strong>ausschließlich der Auftraggeber</strong>. Die Auftragnehmerin
          berät und strukturiert, entscheidet jedoch niemals eigenständig über
          fremdes Eigentum.
        </p>
        <p>
          Für den Verlust ausgesonderter Gegenstände sowie für Entscheidungen,
          die der Auftraggeber im Zuge des Prozesses trifft, wird keine Haftung
          übernommen. Die Auftragnehmerin schuldet keine Bewertung von
          Gegenständen; für Schätzungen ist ein Sachverständiger beizuziehen.
        </p>
        <p>
          Die tatsächliche Entsorgung, Abholung und Verwertung ist nicht
          Leistungsgegenstand und wird gegebenenfalls vom Auftraggeber direkt
          mit Dritten beauftragt.
        </p>
      </LegalSection>

      <LegalSection heading="11. Haftung">
        <p>
          Die Auftragnehmerin haftet für Schäden nur bei Vorsatz und grober
          Fahrlässigkeit. Die Haftungsbeschränkung gilt{" "}
          <strong>nicht</strong> für Personenschäden sowie in Fällen, in denen
          zwingendes Recht — insbesondere das KSchG gegenüber Verbrauchern und
          das Produkthaftungsgesetz — eine weitergehende Haftung vorsieht.
        </p>
        <p>
          Für leichte Fahrlässigkeit wird gegenüber Unternehmern nicht gehaftet.
          Die Haftung ist der Höhe nach mit dem jeweiligen Auftragswert
          begrenzt, soweit dies gesetzlich zulässig ist.
        </p>
        <p>
          Es besteht eine Betriebs- und Berufshaftpflichtversicherung. Schäden
          sind unverzüglich, spätestens jedoch binnen drei Tagen nach
          Entdeckung, anzuzeigen.
        </p>
      </LegalSection>

      <LegalSection heading="12. Fotodokumentation">
        <p>
          Fotos zur Arbeitsdokumentation werden nur mit Zustimmung des
          Auftraggebers angefertigt. Eine Veröffentlichung erfolgt ausschließlich
          auf Grundlage einer gesonderten, jederzeit widerrufbaren schriftlichen
          Einwilligung. Näheres regelt die{" "}
          <Link href="/datenschutz/" className={linkClass}>
            Datenschutzerklärung
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection heading="13. Urheberrecht und Nutzungsrechte">
        <p>
          An Konzepten, Moodboards, Farb- und Materialkonzepten, Raumplänen,
          Kursunterlagen und sonstigen Arbeitsergebnissen verbleiben sämtliche
          Urheber- und Nutzungsrechte bei der Auftragnehmerin.
        </p>
        <p>
          Der Auftraggeber erhält nach vollständiger Bezahlung ein einfaches,
          nicht übertragbares Nutzungsrecht für den eigenen, privaten bzw.
          betriebsinternen Gebrauch am jeweiligen Objekt. Eine Weitergabe an
          Dritte, Veröffentlichung oder gewerbliche Verwertung — insbesondere
          von Kurs- und Workshopunterlagen — bedarf der vorherigen schriftlichen
          Zustimmung.
        </p>
      </LegalSection>

      <LegalSection heading="14. Verschwiegenheit">
        <p>
          Die Auftragnehmerin verpflichtet sich, über sämtliche im Rahmen der
          Tätigkeit bekannt gewordenen persönlichen, wirtschaftlichen und
          betrieblichen Verhältnisse Stillschweigen zu bewahren. Diese
          Verpflichtung besteht über das Ende des Vertragsverhältnisses hinaus.
        </p>
      </LegalSection>

      <LegalSection heading="15. Streitbeilegung">
        <p>
          Es wird angestrebt, Meinungsverschiedenheiten zunächst im direkten
          Gespräch zu klären.
        </p>
        <p>
          Die Europäische Online-Streitbeilegungsplattform (ODR-Plattform) wurde
          mit 20. Juli 2025 eingestellt und steht nicht mehr zur Verfügung.
          Verbraucherinnen und Verbraucher können sich stattdessen an eine
          anerkannte Alternative Streitbeilegungsstelle wenden, etwa an die{" "}
          <a
            href="https://www.ombudsstelle.at"
            className={linkClass}
            rel="noopener noreferrer"
            target="_blank"
          >
            Internet Ombudsstelle
          </a>{" "}
          oder die{" "}
          <a
            href="https://www.verbraucherschlichtung.at"
            className={linkClass}
            rel="noopener noreferrer"
            target="_blank"
          >
            Schlichtung für Verbrauchergeschäfte
          </a>
          . Eine Verpflichtung zur Teilnahme an einem Schlichtungsverfahren
          besteht nicht.
        </p>
      </LegalSection>

      <LegalSection heading="16. Anwendbares Recht und Gerichtsstand">
        <p>
          Es gilt österreichisches Recht unter Ausschluss der
          Verweisungsnormen des internationalen Privatrechts und des
          UN-Kaufrechts.
        </p>
        <p>
          Gegenüber Verbrauchern gilt diese Rechtswahl nur insoweit, als dadurch
          der durch zwingende Bestimmungen des Rechts des Aufenthaltsstaates
          gewährte Schutz nicht entzogen wird. Für Klagen gegen Verbraucher, die
          ihren Wohnsitz, gewöhnlichen Aufenthalt oder Beschäftigungsort im
          Inland haben, ist gemäß § 14 KSchG ausschließlich das Gericht des
          Ortes zuständig, an dem einer dieser Anknüpfungspunkte liegt.
        </p>
        <p>
          Im Geschäftsverkehr mit Unternehmern wird als Gerichtsstand das
          sachlich zuständige Gericht am Sitz der Auftragnehmerin vereinbart.
        </p>
      </LegalSection>

      <LegalSection heading="17. Schlussbestimmungen">
        <p>
          Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden,
          bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. An die
          Stelle der unwirksamen Bestimmung tritt eine Regelung, die dem
          wirtschaftlichen Zweck der unwirksamen Bestimmung am nächsten kommt.
        </p>
        <p>
          Änderungen und Ergänzungen des Vertrages bedürfen der Textform. Es
          gilt die zum Zeitpunkt des Vertragsabschlusses aktuelle Fassung dieser
          AGB.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
