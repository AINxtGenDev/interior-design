import { Manrope, Montserrat } from "next/font/google";

/*
 * CI.pptx slide 6: Manrope Bold (headlines), Manrope Regular (body text and
 * subtitles), Montserrat Regular (accents and quotes). Both are SIL Open Font
 * License, so embedding is permitted.
 *
 * next/font downloads and self-hosts them at build time, so the published
 * site makes no request to fonts.googleapis.com. That is what keeps the
 * Datenschutzerklärung's "no third-party requests" claim true.
 *
 * Shared by both root layouts — next/font must be called at module scope,
 * and one module means one set of font files.
 */
export const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  display: "swap",
});

export const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  display: "swap",
});

export const fontVariables = `${manrope.variable} ${montserrat.variable}`;
