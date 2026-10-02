"use client";

import { useEffect, useId, useRef, useState } from "react";

export type NavLink = { label: string; href: string };
export type NavModel = {
  label: string;
  home: NavLink;
  offer: { label: string; overview: NavLink; children: NavLink[]; more: NavLink[] };
  rest: NavLink[];
  contact: NavLink;
  menuOpen: string;
  menuClose: string;
};

/** Close a disclosure on Escape (returning focus) and on outside pointer. */
function useDismiss(
  open: boolean,
  close: () => void,
  root: React.RefObject<HTMLElement | null>,
  trigger: React.RefObject<HTMLButtonElement | null>,
) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      close();
      trigger.current?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, close, root, trigger]);
}

const linkBase =
  "inline-flex min-h-11 items-center rounded-sm px-3 text-anthrazit-dark transition-colors hover:text-sage-dark hover:underline hover:decoration-sage-mid hover:underline-offset-[0.35em]";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path d="M3.5 6 8 10.5 12.5 6" fill="none" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

/**
 * Main navigation in the order of CI.pptx slide 4:
 * Home · Mein Angebot (4 sub-items) · Über mich · Projekte · FAQ · Kontakt.
 *
 * Two renderings of one model:
 *  - from 1024 px, an inline list; "Mein Angebot" is a disclosure button
 *    (click/tap/Enter, not hover — hover menus fail on touch tablets).
 *  - below that, a "Menü" button revealing the full tree, sub-items always
 *    expanded so nothing hides behind a second tap.
 *
 * `langSwitch` is slotted between the two so the DE | EN toggle sits next to
 * the menu button on phones and at the end of the bar on desktop.
 */
export default function SiteNav({
  model,
  langSwitch,
}: {
  model: NavModel;
  langSwitch: React.ReactNode;
}) {
  const [offerOpen, setOfferOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const offerRoot = useRef<HTMLLIElement>(null);
  const offerBtn = useRef<HTMLButtonElement>(null);
  const menuRoot = useRef<HTMLDivElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const offerId = useId();
  const menuId = useId();

  const closeOffer = () => setOfferOpen(false);
  const closeMenu = () => setMenuOpen(false);
  useDismiss(offerOpen, closeOffer, offerRoot, offerBtn);
  useDismiss(menuOpen, closeMenu, menuRoot, menuBtn);

  return (
    <>
      {/* ─── Desktop ─── */}
      <nav aria-label={model.label} className="hidden lg:block">
        <ul className="flex items-center gap-1 xl:gap-2">
          <li>
            <a href={model.home.href} className={linkBase}>
              {model.home.label}
            </a>
          </li>
          <li
            ref={offerRoot}
            className="relative"
            onBlur={(e) => {
              if (!offerRoot.current?.contains(e.relatedTarget as Node)) closeOffer();
            }}
          >
            <button
              ref={offerBtn}
              type="button"
              aria-expanded={offerOpen}
              aria-controls={offerId}
              onClick={() => setOfferOpen((o) => !o)}
              className={`${linkBase} gap-1.5`}
            >
              {model.offer.label}
              <Chevron open={offerOpen} />
            </button>
            <ul
              id={offerId}
              hidden={!offerOpen}
              className="absolute top-full left-0 mt-2 w-80 rounded border border-anthrazit-light bg-white p-2 shadow-lg"
            >
              {[model.offer.overview, ...model.offer.children, ...model.offer.more].map((l, i) => (
                <li
                  key={l.href}
                  className={
                    i === model.offer.children.length + 1
                      ? "mt-1 border-t border-anthrazit-light pt-1"
                      : undefined
                  }
                >
                  <a
                    href={l.href}
                    onClick={closeOffer}
                    className={`flex min-h-11 items-center rounded-sm px-3 py-2 leading-snug transition-colors hover:bg-sage-light ${
                      i === 0
                        ? "mb-1 border-b border-anthrazit-light pb-3 text-sage-dark"
                        : i > model.offer.children.length
                          ? "text-anthrazit-mid hover:text-anthrazit-dark"
                          : "text-anthrazit-dark"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          {model.rest.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={linkBase}>
                {l.label}
              </a>
            </li>
          ))}
          <li className="ml-2">
            <a href={model.contact.href} className="btn btn-primary min-h-11 px-5">
              {model.contact.label}
            </a>
          </li>
        </ul>
      </nav>

      {langSwitch}

      {/* ─── Phones and tablets ─── */}
      <div ref={menuRoot} className="lg:hidden">
        <button
          ref={menuBtn}
          type="button"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((o) => !o)}
          className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded border border-sage-mid px-2.5 font-bold text-sage-dark transition-colors hover:bg-sage-light"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6">
            {menuOpen ? (
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" />
            )}
          </svg>
          <span className="sr-only min-[25rem]:not-sr-only">
            {menuOpen ? model.menuClose : model.menuOpen}
          </span>
        </button>

        <nav
          id={menuId}
          aria-label={model.label}
          hidden={!menuOpen}
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-var(--header-h))] overflow-y-auto overscroll-contain border-b border-anthrazit-light bg-paper shadow-lg"
        >
          <ul className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
            <li>
              <a href={model.home.href} onClick={closeMenu} className="flex min-h-12 items-center text-lg">
                {model.home.label}
              </a>
            </li>
            <li>
              <a href={model.offer.overview.href} onClick={closeMenu} className="flex min-h-12 items-center text-lg">
                {model.offer.label}
              </a>
              <ul className="mb-2 ml-1 border-l-2 border-sage-soft pl-4">
                {[...model.offer.children, ...model.offer.more].map((l, i) => (
                  <li
                    key={l.href}
                    className={
                      i === model.offer.children.length
                        ? "mt-1 border-t border-anthrazit-light pt-1"
                        : undefined
                    }
                  >
                    <a
                      href={l.href}
                      onClick={closeMenu}
                      className={`flex min-h-11 items-center py-1.5 leading-snug ${
                        i < model.offer.children.length ? "text-anthrazit-dark" : "text-anthrazit-mid"
                      }`}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            {[...model.rest, model.contact].map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={closeMenu} className="flex min-h-12 items-center text-lg">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
