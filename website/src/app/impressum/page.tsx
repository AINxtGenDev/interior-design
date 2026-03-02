import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum — Mag. Claudia PLESSL Interior Design",
};

export default function Impressum() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Gold accent top line */}
      <div className="h-px bg-gold-accent" aria-hidden="true" />

      {/* Navigation */}
      <header className="animate-fade-in border-b border-sage-200/60 px-6 py-5 md:px-12">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link href="/" className="font-heading text-xl font-bold text-sage-800 transition-colors hover:text-sage-600">
            CP
          </Link>
          <p className="font-nav text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-sage-600">
            Interior Design
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-2xl">
          <h1 className="animate-fade-in-up font-heading text-3xl font-bold tracking-tight text-anthracite-800">
            Impressum
          </h1>

          <div className="animate-fade-in-up delay-1 mt-10 space-y-8 text-sm leading-relaxed text-anthracite-600">
            {/* Informationspflicht */}
            <section>
              <h2 className="font-nav text-xs font-semibold uppercase tracking-wider text-sage-700">
                Informationspflicht laut &sect;&nbsp;5 E-Commerce Gesetz (ECG)
              </h2>
              <div className="mt-3 space-y-1">
                <p className="font-semibold text-anthracite-800">
                  Mag. Claudia Plessl
                </p>
                <p>Interior Design</p>
                <address className="mt-2 not-italic">
                  <p>Ährengasse 6</p>
                  <p>3424 Wolfpassing</p>
                  <p>Österreich</p>
                </address>
              </div>
            </section>

            {/* Kontakt */}
            <section>
              <h2 className="font-nav text-xs font-semibold uppercase tracking-wider text-sage-700">
                Kontakt
              </h2>
              <div className="mt-3 space-y-1">
                <p>
                  E-Mail:{" "}
                  <a
                    href="mailto:claudia.plessl@gmail.com"
                    className="underline decoration-sage-300 underline-offset-4 transition-colors hover:text-anthracite-800 hover:decoration-sage-500"
                  >
                    claudia.plessl@gmail.com
                  </a>
                </p>
                <p>
                  Telefon:{" "}
                  <a
                    href="tel:+436641517650"
                    className="underline decoration-sage-300 underline-offset-4 transition-colors hover:text-anthracite-800 hover:decoration-sage-500"
                  >
                    +43 664 15 17 650
                  </a>
                </p>
              </div>
            </section>

            {/* Berufsbezeichnung */}
            <section>
              <h2 className="font-nav text-xs font-semibold uppercase tracking-wider text-sage-700">
                Berufsbezeichnung &amp; Rechtsgrundlage
              </h2>
              <div className="mt-3 space-y-1">
                <p>Berufsbezeichnung: Interior Designer</p>
                <p>Anwendbare Rechtsvorschriften: Gewerbeordnung (GewO)</p>
                <p>Aufsichtsbehörde: Bezirkshauptmannschaft Tulln</p>
              </div>
            </section>

            {/* Haftungsausschluss */}
            <section>
              <h2 className="font-nav text-xs font-semibold uppercase tracking-wider text-sage-700">
                Haftungsausschluss
              </h2>
              <div className="mt-3 space-y-3">
                <p>
                  Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt
                  erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität
                  der Inhalte kann jedoch keine Gewähr übernommen werden.
                </p>
                <p>
                  Als Diensteanbieter sind wir gemäß &sect;&nbsp;7 Abs.&nbsp;1 ECG
                  für eigene Inhalte auf diesen Seiten nach den allgemeinen
                  Gesetzen verantwortlich. Eine Verpflichtung zur Überwachung
                  übermittelter oder gespeicherter fremder Informationen besteht
                  jedoch nicht.
                </p>
              </div>
            </section>

            {/* Links */}
            <section>
              <h2 className="font-nav text-xs font-semibold uppercase tracking-wider text-sage-700">
                Haftung für Links
              </h2>
              <p className="mt-3">
                Unsere Website enthält möglicherweise Links zu externen Websites
                Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die
                Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
                verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
                Verlinkung auf mögliche Rechtsverstöße überprüft. Eine permanente
                inhaltliche Kontrolle ist jedoch ohne konkrete Anhaltspunkte nicht
                zumutbar.
              </p>
            </section>

            {/* Urheberrecht */}
            <section>
              <h2 className="font-nav text-xs font-semibold uppercase tracking-wider text-sage-700">
                Urheberrecht
              </h2>
              <p className="mt-3">
                Die durch den Seitenbetreiber erstellten Inhalte und Werke auf
                diesen Seiten unterliegen dem österreichischen Urheberrecht. Die
                Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der
                schriftlichen Zustimmung von Mag. Claudia Plessl.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-sage-200/60 px-6 py-5 md:px-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 md:flex-row md:justify-between">
          <p className="text-xs text-anthracite-400">
            &copy; 2026 Mag. Claudia Plessl
          </p>
          <nav className="flex items-center gap-4 text-xs text-anthracite-400">
            <Link
              href="/impressum"
              className="text-sage-600"
              aria-current="page"
            >
              Impressum
            </Link>
            <span aria-hidden="true" className="text-anthracite-200">
              |
            </span>
            <Link
              href="/datenschutz"
              className="transition-colors hover:text-sage-600"
            >
              Datenschutz
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
