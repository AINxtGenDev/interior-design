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
            opacity: 0.07,
            transform: "rotate(-12deg)",
            letterSpacing: "0.05em",
          }}
        >
          UNDER CONSTRUCTION!
        </span>
      </div>

      {/* ─── Page Content ─── */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header */}
        <header className="px-6 py-6 md:px-12">
          <p className="font-nav text-sm font-semibold uppercase tracking-widest text-sage-700">
            Claudia Plessl Interior Design
          </p>
        </header>

        {/* Hero */}
        <main className="flex flex-1 items-center justify-center px-6 md:px-12">
          <section className="mx-auto max-w-xl py-20 text-center md:py-32">
            <h1
              className="font-heading font-bold tracking-tight text-anthracite-800"
              style={{ fontSize: "clamp(1.875rem, 1.4rem + 2.3vw, 2.75rem)", lineHeight: "1.2" }}
            >
              Mag. Claudia PLESSL
            </h1>

            <p
              className="mt-3 font-nav font-medium uppercase tracking-widest text-sage-600"
              style={{ fontSize: "clamp(0.833rem, 0.78rem + 0.25vw, 0.875rem)" }}
            >
              Interior Design
            </p>

            <div className="mx-auto mt-12 max-w-sm space-y-4 text-anthracite-600" style={{ lineHeight: "1.7" }}>
              <address className="not-italic">
                <p>Ährengasse 6</p>
                <p>3424 Wolfpassing</p>
              </address>

              <div className="pt-2">
                <p>
                  <a
                    href="mailto:claudia.plessl@gmail.com"
                    className="underline decoration-sage-300 underline-offset-4 transition-colors hover:text-anthracite-800 hover:decoration-sage-500"
                  >
                    claudia.plessl@gmail.com
                  </a>
                </p>
                <p className="mt-1">
                  <a
                    href="tel:+436641517650"
                    className="underline decoration-sage-300 underline-offset-4 transition-colors hover:text-anthracite-800 hover:decoration-sage-500"
                  >
                    +43 664 15 17 650
                  </a>
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="px-6 py-6 md:px-12">
          <nav className="flex items-center justify-center gap-6 text-sm text-anthracite-400">
            <a
              href="/impressum"
              className="transition-colors hover:text-sage-600"
            >
              Impressum
            </a>
            <span aria-hidden="true" className="text-anthracite-200">|</span>
            <a
              href="/datenschutz"
              className="transition-colors hover:text-sage-600"
            >
              Datenschutz
            </a>
          </nav>
        </footer>
      </div>
    </>
  );
}
