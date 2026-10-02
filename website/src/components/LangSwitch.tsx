"use client";

import { ASSET_PREFIX, LANG_ALTERNATES, type Locale } from "@/content/site";

const LANGS = [
  { code: "de", short: "DE", name: "Deutsch" },
  { code: "en", short: "EN", name: "English" },
] as const;

/**
 * DE | EN toggle, visible in the header at every width.
 *
 * Each page links to its own counterpart (LANG_ALTERNATES), not just to the
 * other home page. Between the two home pages the section anchors are
 * identical, so the reader's current #section is carried across as well —
 * the only reason this is a client component.
 *
 * Plain <a>, not next/link: the two languages are separate root layouts, so
 * the switch is a full document load either way.
 */
export default function LangSwitch({
  locale,
  path,
  label,
}: {
  locale: Locale;
  path: string;
  label: string;
}) {
  const target = LANG_ALTERNATES[path] ?? (locale === "de" ? "/en/" : "/");
  const href = `${ASSET_PREFIX}${target}`;
  const isHome = path === "" || path === "en/";

  return (
    <nav aria-label={label} className="no-print">
      <ul className="flex rounded border border-sage-mid p-0.5">
        {LANGS.map((l) =>
          l.code === locale ? (
            <li key={l.code}>
              <span
                aria-current="true"
                className="flex h-11 min-w-11 items-center justify-center rounded-sm bg-sage-dark px-2 font-bold text-white"
              >
                <span aria-hidden="true">{l.short}</span>
                <span className="sr-only">{l.name}</span>
              </span>
            </li>
          ) : (
            <li key={l.code}>
              <a
                href={href}
                hrefLang={l.code}
                lang={l.code}
                onClick={(e) => {
                  if (!isHome || target.includes("#") || !window.location.hash) return;
                  e.preventDefault();
                  window.location.assign(href + window.location.hash);
                }}
                className="flex h-11 min-w-11 items-center justify-center rounded-sm px-2 font-bold text-sage-dark transition-colors hover:bg-sage-light hover:text-sage-ink"
              >
                <span aria-hidden="true">{l.short}</span>
                <span className="sr-only">{l.name}</span>
              </a>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
