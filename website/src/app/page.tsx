import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* ─── Under Construction Watermark ─── */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden"
      >
        <span
          className="select-none whitespace-nowrap font-heading font-bold uppercase text-sage-800"
          style={{
            fontSize: "clamp(4rem, 10vw, 10rem)",
            opacity: 0.04,
            transform: "rotate(-12deg)",
            letterSpacing: "0.05em",
          }}
        >
          UNDER CONSTRUCTION!
        </span>
      </div>

      {/* ─── Page Content ─── */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Gold accent top line */}
        <div className="h-1 bg-gold-accent" aria-hidden="true" />

        {/* Top Bar */}
        <header className="border-b border-sage-200 px-6 py-5 md:px-12">
          <div className="mx-auto flex max-w-4xl items-center justify-between">
            <p className="font-nav text-xs font-semibold uppercase tracking-[0.2em] text-sage-700">
              Claudia Plessl
            </p>
            <p className="font-nav text-xs font-semibold uppercase tracking-[0.2em] text-sage-700">
              Interior Design
            </p>
          </div>
        </header>

        {/* Hero */}
        <main className="flex flex-1 items-center justify-center px-4 py-12 md:px-12">
          <section className="animate-fade-in-up mx-auto w-full max-w-lg rounded border border-sage-300 bg-sage-100 px-8 py-14 text-center md:px-14 md:py-20">
            {/* Decorative line above name */}
            <div
              className="mx-auto mb-8 h-px w-10 bg-sage-300"
              aria-hidden="true"
            />

            <h1
              className="font-heading font-bold tracking-tight text-anthracite-800"
              style={{
                fontSize: "clamp(1.875rem, 1.4rem + 2.3vw, 2.75rem)",
                lineHeight: "1.2",
              }}
            >
              Mag. Claudia PLESSL
            </h1>

            {/* Gold accent divider */}
            <div
              className="mx-auto mt-5 h-px w-15 bg-gold-accent"
              aria-hidden="true"
            />

            <p
              className="mt-5 font-nav font-medium uppercase tracking-[0.2em] text-sage-600"
              style={{
                fontSize: "clamp(0.8rem, 0.75rem + 0.25vw, 0.875rem)",
              }}
            >
              Interior Design
            </p>

            {/* Contact Details */}
            <div className="mx-auto mt-12 max-w-xs text-sm text-anthracite-600">
              <dl className="space-y-3">
                <div className="flex justify-between gap-4">
                  <dt className="font-nav text-xs uppercase tracking-wider text-sage-600">
                    Adresse
                  </dt>
                  <dd className="text-right">
                    <address className="not-italic leading-relaxed">
                      Ährengasse 6<br />
                      3424 Wolfpassing
                    </address>
                  </dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="font-nav text-xs uppercase tracking-wider text-sage-600">
                    E-Mail
                  </dt>
                  <dd className="text-right">
                    <a
                      href="mailto:claudia.plessl@gmail.com"
                      className="underline decoration-sage-300 underline-offset-4 transition-colors hover:text-anthracite-800 hover:decoration-sage-500"
                    >
                      claudia.plessl@gmail.com
                    </a>
                  </dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="font-nav text-xs uppercase tracking-wider text-sage-600">
                    Telefon
                  </dt>
                  <dd className="text-right">
                    <a
                      href="tel:+436641517650"
                      className="underline decoration-sage-300 underline-offset-4 transition-colors hover:text-anthracite-800 hover:decoration-sage-500"
                    >
                      +43 664 15 17 650
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Coming Soon Badge */}
            <div className="mt-12">
              <span className="inline-block rounded-full bg-sage-500 px-5 py-1.5 font-nav text-xs font-semibold uppercase tracking-widest text-white">
                Coming Soon
              </span>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-sage-200 px-6 py-5 md:px-12">
          <p className="text-center text-xs text-anthracite-400">
            &copy; 2026 Mag. Claudia Plessl
          </p>
          <nav className="mt-2 flex items-center justify-center gap-4 text-xs text-anthracite-400">
            <Link
              href="/impressum"
              className="transition-colors hover:text-sage-600"
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
        </footer>
      </div>
    </>
  );
}
