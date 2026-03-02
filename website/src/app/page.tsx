import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Gold accent top line */}
      <div className="h-px bg-gold-accent" aria-hidden="true" />

      {/* Navigation */}
      <header className="animate-fade-in border-b border-sage-200/60 px-6 py-5 md:px-12">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <p className="font-heading text-xl font-bold text-sage-800">CP</p>
          <p className="font-nav text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-sage-600">
            Interior Design
          </p>
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col justify-center px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto w-full max-w-5xl">
          {/* Decorative line */}
          <div
            className="animate-reveal-line mb-10 h-px w-12 bg-sage-300"
            aria-hidden="true"
          />

          {/* Name — oversized editorial heading */}
          <div className="animate-fade-in-up">
            <h1
              className="font-heading font-bold tracking-tight text-anthracite-800"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                lineHeight: "1.1",
              }}
            >
              Mag. Claudia
              <br />
              <span className="text-sage-700">PLESSL</span>
            </h1>
          </div>

          {/* Gold accent */}
          <div
            className="animate-reveal-line delay-1 mt-6 h-0.5 w-16 bg-gold-accent"
            aria-hidden="true"
          />

          {/* Subtitle */}
          <p
            className="animate-fade-in-up delay-1 mt-6 font-nav text-xs font-semibold uppercase tracking-[0.25em] text-sage-600"
          >
            Interior Design
          </p>

          {/* Tagline */}
          <p
            className="animate-fade-in-up delay-2 mt-4 max-w-md font-heading text-lg italic text-sage-500 md:text-xl"
          >
            Wir gestalten Räume, die Geschichten erzählen.
          </p>

          {/* Photo Gallery — asymmetric editorial grid */}
          <div className="animate-fade-in delay-3 mt-16 md:mt-20">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-4">
              {/* Large — elegant living room */}
              <div className="col-span-2 overflow-hidden md:col-span-7 md:row-span-2">
                <img
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80"
                  alt="Elegantes Wohnzimmer mit neutralen Farbtönen"
                  className="h-full w-full object-cover"
                  loading="eager"
                  style={{ aspectRatio: "4 / 3" }}
                />
              </div>
              {/* Top right — modern bedroom */}
              <div className="overflow-hidden md:col-span-5">
                <img
                  src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80"
                  alt="Modernes Schlafzimmer in hellen Tönen"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  style={{ aspectRatio: "3 / 2" }}
                />
              </div>
              {/* Bottom right — warm bedroom */}
              <div className="overflow-hidden md:col-span-5">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
                  alt="Wohnraum mit warmer Beleuchtung"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  style={{ aspectRatio: "3 / 2" }}
                />
              </div>
            </div>
            {/* Attribution */}
            <p className="mt-3 text-[0.6rem] text-anthracite-300">
              Fotos via{" "}
              <a
                href="https://unsplash.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-anthracite-400"
              >
                Unsplash
              </a>
            </p>
          </div>

          {/* Contact Section */}
          <div className="animate-fade-in-up delay-4 mt-16 md:mt-20">
            <div className="corner-frame inline-block px-6 py-6 md:px-10 md:py-8">
              <div className="flex flex-col gap-6 text-sm text-anthracite-600 md:flex-row md:gap-0">
                {/* Address */}
                <address className="not-italic leading-relaxed md:pr-8">
                  <p>Ährengasse 6</p>
                  <p>3424 Wolfpassing</p>
                  <p>Österreich</p>
                </address>

                {/* Vertical divider (desktop) */}
                <div
                  className="hidden h-auto w-px bg-sage-200 md:block"
                  aria-hidden="true"
                />

                {/* Digital contact */}
                <div className="leading-relaxed md:pl-8">
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
            </div>
          </div>

          {/* Coming Soon Badge */}
          <div className="animate-fade-in-up delay-5 mt-12">
            <span className="inline-block rounded-full border border-sage-400 px-5 py-1.5 font-nav text-[0.65rem] font-semibold uppercase tracking-widest text-sage-500">
              Coming Soon
            </span>
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
        </div>
      </footer>
    </div>
  );
}
