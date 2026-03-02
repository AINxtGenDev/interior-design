import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutz — Mag. Claudia PLESSL Interior Design",
};

export default function Datenschutz() {
  return (
    <>
      {/* Gold accent top line */}
      <div className="h-1 bg-gold-accent" aria-hidden="true" />

      <div className="mx-auto max-w-2xl px-6 py-16 md:px-12 md:py-24">
        <Link
          href="/"
          className="font-nav text-xs font-semibold uppercase tracking-[0.2em] text-sage-600 transition-colors hover:text-sage-800"
        >
          &larr; Zurück
        </Link>

        <h1 className="mt-8 font-heading text-3xl font-bold tracking-tight text-anthracite-800">
          Datenschutzerklärung
        </h1>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-anthracite-600">
          {/* Einleitung */}
          <section>
            <h2 className="font-nav text-xs font-semibold uppercase tracking-wider text-sage-700">
              Allgemeines
            </h2>
            <div className="mt-3 space-y-3">
              <p>
                Der Schutz Ihrer persönlichen Daten ist uns ein besonderes
                Anliegen. Wir verarbeiten Ihre Daten daher ausschließlich auf
                Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2003).
              </p>
              <p>
                In dieser Datenschutzerklärung informieren wir Sie über die
                wichtigsten Aspekte der Datenverarbeitung im Rahmen unserer
                Website.
              </p>
            </div>
          </section>

          {/* Verantwortlicher */}
          <section>
            <h2 className="font-nav text-xs font-semibold uppercase tracking-wider text-sage-700">
              Verantwortliche Stelle
            </h2>
            <div className="mt-3 space-y-1">
              <p className="font-semibold text-anthracite-800">
                Mag. Claudia Plessl
              </p>
              <address className="not-italic">
                <p>Ährengasse 6</p>
                <p>3424 Wolfpassing</p>
                <p>Österreich</p>
              </address>
              <p className="mt-2">
                E-Mail:{" "}
                <a
                  href="mailto:claudia.plessl@gmail.com"
                  className="underline decoration-sage-300 underline-offset-4 transition-colors hover:text-anthracite-800 hover:decoration-sage-500"
                >
                  claudia.plessl@gmail.com
                </a>
              </p>
            </div>
          </section>

          {/* Hosting */}
          <section>
            <h2 className="font-nav text-xs font-semibold uppercase tracking-wider text-sage-700">
              Hosting
            </h2>
            <div className="mt-3 space-y-3">
              <p>
                Diese Website wird über GitHub Pages gehostet. Der Anbieter ist
                die GitHub Inc., 88 Colin P Kelly Jr St, San Francisco, CA
                94107, USA. Beim Aufruf dieser Website werden durch GitHub
                automatisch Informationen in sogenannten Server-Log-Dateien
                gespeichert, die Ihr Browser automatisch übermittelt. Dies sind:
              </p>
              <ul className="list-inside list-disc space-y-1 pl-2">
                <li>Browsertyp und Browserversion</li>
                <li>Verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
              <p>
                Die Rechtsgrundlage für die Datenverarbeitung ist Art.&nbsp;6
                Abs.&nbsp;1 lit.&nbsp;f DSGVO (berechtigtes Interesse). Weitere
                Informationen finden Sie in der{" "}
                <a
                  href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-sage-300 underline-offset-4 transition-colors hover:text-anthracite-800 hover:decoration-sage-500"
                >
                  Datenschutzerklärung von GitHub
                </a>
                .
              </p>
            </div>
          </section>

          {/* Kontaktaufnahme */}
          <section>
            <h2 className="font-nav text-xs font-semibold uppercase tracking-wider text-sage-700">
              Kontaktaufnahme
            </h2>
            <p className="mt-3">
              Wenn Sie per E-Mail oder Telefon Kontakt mit uns aufnehmen, werden
              die von Ihnen mitgeteilten Daten (Name, Anfrage, E-Mail-Adresse,
              Telefonnummer) zum Zwecke der Bearbeitung Ihrer Anfrage
              gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung
              weiter. Die Rechtsgrundlage für die Verarbeitung der Daten ist
              Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;b DSGVO (vorvertragliche
              Maßnahmen) bzw. Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO
              (berechtigtes Interesse an der Beantwortung Ihrer Anfrage). Die
              Daten werden gelöscht, sobald sie für die Erreichung des Zweckes
              ihrer Erhebung nicht mehr erforderlich sind.
            </p>
          </section>

          {/* Keine Cookies / Tracking */}
          <section>
            <h2 className="font-nav text-xs font-semibold uppercase tracking-wider text-sage-700">
              Cookies &amp; Tracking
            </h2>
            <p className="mt-3">
              Diese Website verwendet keine Cookies und setzt keine
              Tracking-Tools ein. Es findet keine Analyse des Nutzerverhaltens
              statt.
            </p>
          </section>

          {/* Rechte */}
          <section>
            <h2 className="font-nav text-xs font-semibold uppercase tracking-wider text-sage-700">
              Ihre Rechte
            </h2>
            <div className="mt-3 space-y-3">
              <p>
                Ihnen stehen gemäß DSGVO grundsätzlich folgende Rechte zu:
              </p>
              <ul className="list-inside list-disc space-y-1 pl-2">
                <li>Recht auf Auskunft (Art.&nbsp;15 DSGVO)</li>
                <li>Recht auf Berichtigung (Art.&nbsp;16 DSGVO)</li>
                <li>Recht auf Löschung (Art.&nbsp;17 DSGVO)</li>
                <li>
                  Recht auf Einschränkung der Verarbeitung (Art.&nbsp;18 DSGVO)
                </li>
                <li>Recht auf Datenübertragbarkeit (Art.&nbsp;20 DSGVO)</li>
                <li>Widerspruchsrecht (Art.&nbsp;21 DSGVO)</li>
              </ul>
              <p>
                Sie haben außerdem das Recht, sich bei der österreichischen
                Datenschutzbehörde (
                <a
                  href="https://www.dsb.gv.at"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-sage-300 underline-offset-4 transition-colors hover:text-anthracite-800 hover:decoration-sage-500"
                >
                  www.dsb.gv.at
                </a>
                ) zu beschweren, wenn Sie der Meinung sind, dass die
                Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt.
              </p>
            </div>
          </section>

          {/* Stand */}
          <section className="border-t border-sage-200 pt-6">
            <p className="text-xs text-anthracite-400">
              Stand: März 2026
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
