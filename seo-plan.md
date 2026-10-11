# SEO-Plan — claudiaplessl.at

Stand: 2026-10-11 · Status: **Plan, noch nichts umgesetzt** · Version 3.1 (drei kritische Review-Runden: 6/10 → 8/10 → 9/10, letzte Must-Fixes eingearbeitet)
Basis: Code-Audit (`website/out/`, Build 2026-10-11 12:42, Next 16.1.6), Live-Audit (curl, Lighthouse 12.8.2, 2026-10-11), kritisches Gegen-Review mit Prüfung gegen Google-Search-Central- und Next.js-Doku.

## 1. Ziel und Leitplanken

Organische Sichtbarkeit nachhaltig verbessern, **ohne** sichtbaren Inhalt, Design oder UX wesentlich zu ändern.

- Nur Methoden nach Google Search Essentials: Metadaten, strukturierte Daten, Semantik, Performance, Off-Page-Einträge mit echten Daten.
- **Verboten:** versteckter Text, Cloaking, Keyword-Stuffing, unsichtbare Keyword-Blöcke, Keywords im Unternehmensnamen (GBP), gekaufte/incentivierte Bewertungen, Doorway-Seiten je Ort.
- **Strukturierte Daten nach Googles Regel:** Markup muss den sichtbaren Inhalt repräsentieren und darf nichts Falsches oder nur im Markup Vorhandenes behaupten ([Doku](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)). Technische Felder (`priceRange`, `logo`, `geo`, E.164-Telefon) sind zulässig; **Orts- und Leistungsangaben** (`areaServed`, `addressLocality`, Service-Namen) müssen sichtbar auf der Seite stehen (grep-Check).
- **Qualifikation korrekt:** „Ordnungscoaching" ja, „zertifizierter Ordnungscoach" nein — Ausbildung läuft („i.A."). `schema.ts` filtert laufende Qualifikationen bereits; so lassen.
- Ton ruhig, souverän, nicht werblich — auch in Titeln und Descriptions.
- Arbeitsweise wie im Projekt: eine Änderung → `tsc`/`eslint`/`npm run build` → `out/` lokal prüfen → Commit → Push → Deploy → live per curl prüfen → Checkpoint. Rollback je Schritt: `git revert <sha>` + Push.

## 2. Ausgangslage (gemessen)

Technisch ist die Seite in gutem Zustand; **nichts verhindert die Indexierung.** Der verbleibende Hebel liegt vor allem bei lokaler Suche, Relevanz-Signalen und Messbarkeit.

### 2.1 Abdeckung des Auftrags — Bereich für Bereich

| Bereich aus dem Auftrag | Befund (Beleg) | Handlung |
|---|---|---|
| Titel & Descriptions | eindeutig; Titel nur Name + Region; Descriptions 208/233 Zeichen (zu lang) | **H1, H2** |
| Canonicals | absolut, selbstreferenzierend auf allen 6 Seiten; `/index.html` → Canonical `/` | keine |
| robots / Sitemap | `Allow: /`, Sitemap-Link; 6 URLs, alle 200 ohne Redirect; kein `lastmod`; `changefreq`/`priority` (von Google ignoriert) | **M2** |
| Crawlbarkeit / JS-Rendering | gesamter Inhalt im statischen HTML; einzige Client-Komponente `SiteNav` wird serverseitig gerendert | keine — Check: `curl` raw HTML enthält Leistungstexte |
| Semantik / Headings | je Seite 1 `h1`, keine Sprünge; Landmarks + Skip-Link; Sections mit `aria-labelledby` | keine |
| Schema.org | ProfessionalService, Person, Service×5, OfferCatalog, VideoObject, WebSite, WebPage; Legal: WebPage + BreadcrumbList; parsebar | **M3** (Ergänzungen) |
| Interne Verlinkung | One-Pager; Nav als echte `<a href="/#…">`; DE↔EN-Sprachlinks; Footer → Legal. Fragmente sind keine eigenen URLs — Architektur ist so flach wie möglich | keine; Legal-`nofollow` → **M7** |
| URL-Struktur | kurz, sprechend, Kleinschreibung, einheitlich mit Slash (`trailingSlash: true`), ohne→mit Slash per 301 | keine |
| Bilder | WebP, `width`/`height` überall (CLS 0), Alt-Texte beschreibend in DE/EN, Hero nicht lazy; Logo konkurriert mit Hero; Poster JPEG 87 KB; QR-SVG 190 KB; generische Dateinamen; **KI-Bilder ohne maschinenlesbare Kennzeichnung** | **M5, M6, M8** |
| Page Speed / CWV | Lighthouse mobil Perf 94 (`/`) / 89 (`/en/`), LCP *simuliert* 3,1/3,8 s, CLS 0, TBT 40–50 ms; Desktop 100. Unthrottled LCP ~0,2–0,5 s. **CrUX-Felddaten vermutlich noch keine** (Domain seit 2026-10-08) | **M5** (UX, nicht Ranking) |
| Mobile | kein Überlauf 320–2560 px (Checkpoint), Lighthouse A11y/BP/SEO 100 mobil | keine |
| Duplicate Content | http, www, github.io, ohne Slash → je 1 × 301; RSC-Dateien `/index.txt` öffentlich als `text/plain` | **O2** (erst prüfen) |
| Redirects / Broken Links | 58 URLs geprüft: alle 200; einzig `dsb.gv.at` 301 (kosmetisch) | **O5** |
| Open Graph / Twitter | Startseiten vollständig (1200×630 je Sprache); **Legal-Seiten erben og:url/Titel der Startseite**; kein `og:locale:alternate` | **H3** |
| Server / Caching / Kompression | TTFB ~50 ms (Fastly Wien), gzip ja; **kein Brotli, kein HSTS, `max-age=600` überall** — GitHub-Pages-Grenze | **O1** |
| International | `lang="de-AT"`/`en`; hreflang `de`/`en`/x-default reziprok, HTML = Sitemap; Legal ohne hreflang (keine 1:1-Übersetzungen, korrekt) | keine |
| 404 | echter 404 + `noindex`, aber englische Next-Standardseite ohne `lang` und Navigation | **M1** |
| Messung | **keine Search Console, kein Bing WMT** | **K1, H4** |

### 2.2 Plattformgrenzen GitHub Pages

Keine eigenen Header (HSTS, Cache-Control, X-Robots-Tag), kein Brotli, keine Redirect-Regeln. Nur per CDN davor lösbar (O1).

## 3. Realistische Erwartung

- Bei einer Ein-Personen-Dienstleisterin mit einer Hauptseite je Sprache ist **lokale Suche (Google Unternehmensprofil, Bewertungen, Verzeichnisse)** der größte Hebel, nicht weitere Technik.
- **Nähe zählt im Kartenpaket.** Wolfpassing liegt ~40 km von Wien. Realistische Ziele: Maps-Sichtbarkeit Raum Tulln / Krems / St. Pölten / Klosterneuburg; für Wien vor allem **organische** Treffer.
- **Lighthouse ≠ Ranking.** Google nutzt für Page Experience CrUX-Felddaten (28-Tage, echte Chrome-Nutzer). Bei wenig Traffic gibt es keine → kein Rankingeffekt aus LCP-Labordaten. LCP-Arbeit ist UX-Pflege.
- **Video:** Google indexiert Videos nur auf einer Seite, deren Hauptzweck das Video ist (Watch Page, [Doku](https://developers.google.com/search/docs/appearance/video)). Auf der Startseite wird das Video voraussichtlich als „nicht auf einer Watch Page" gemeldet. Kein Video-Rich-Result erwarten; keine Video-Sitemap.
- **Die eigentliche Ranking-Obergrenze** liegt bei eigenen Leistungsseiten (O6) — die ändern sichtbaren Inhalt und sind damit außerhalb dieses Auftrags.

## 4. Maßnahmen nach Priorität

Aufwand: S (< 1 h), M (1–4 h), L (> 4 h). Jede Zeile hat einen **Abnahme-Check** (bestanden/nicht bestanden).

### 4.1 Kritisch — Fundament: Messung und lokale Präsenz (P0)

| ID | Maßnahme | SEO-Nutzen | Aufwand | Risiko | Abnahme-Check |
|---|---|---|---|---|---|
| K1 | **Google Search Console**, Domain-Property `claudiaplessl.at` per DNS-TXT in konsoleH (bündeln mit dem für 2026-10-12 geplanten Workspace-TXT); Sitemap einreichen; URL-Prüfung `/`, `/en/`, „Indexierung beantragen" | Indexstatus, Suchanfragen, Fehler strukturierter Daten, CWV-Bericht — ohne GSC ist nichts messbar | S | Gering, TXT additiv. **DNS nur nach Rückfrage** | Property verifiziert; Sitemap „Erfolgreich", 6 URLs erkannt; URL-Prüfung „URL ist auf Google" für `/` und `/en/` (nach Crawl) |
| K2 | **Google Unternehmensprofil (GBP)** als Servicegebiet-Unternehmen: Adresse **ausblenden** (keine Kundenbesuche am Firmensitz — GBP-Richtlinie), bis zu 20 Servicegebiete (Wien, einzelne Bezirke/Städte in NÖ — **nicht** „Niederösterreich" als Ganzes, Bundesländer/Staaten sind laut [GBP-Hilfe](https://support.google.com/business/answer/9157481) nicht vorgesehen; Gebiete innerhalb ~2 h Fahrzeit), Name exakt wie Impressum **ohne Keywords**, Primärkategorie im GBP-Interface wählen und mit Gewerbewortlaut (GISA) abgleichen, Leistungen + Preise wie Website, **nur echte Fotos (keine KI-Bilder)**, Website-Link mit UTM (`?utm_source=gbp&utm_medium=organic`). Verifizierung voraussichtlich per Video | Größter Hebel für lokale Suche und Maps; Entitäts-Signal für Google | M (+ Verifizierung durch Claudia, Tage bis Wochen) | Daten müssen mit Impressum zeichengleich sein (NAP). Ausgeblendete GBP-Adresse widerspricht der JSON-LD-Adresse **nicht** — die Adresse steht sichtbar auf der Seite (Anschrift, Impressum); bitte nicht „korrigieren" | Profil verifiziert; Primärkategorie dokumentiert; NAP-Abgleich mit Impressum zeichengleich; GBP-URL notiert (für M3 `sameAs`) |
| K3 | **Baseline Tag 0** sichern: Titel/Descriptions, Lighthouse-JSON (Scratchpad `lhp-*.json` ins Repo-fremde Archiv), nach 28 Tagen GSC-Export (Abfragen, Impressionen, Klicks, Position) | Vorher/Nachher-Vergleich | S | Keins | Datei `seo-baseline-2026-10.md` lokal (nicht deployt) mit Zahlen |

### 4.2 Hohe Wirkung (P1)

| ID | Maßnahme | SEO-Nutzen | Aufwand | Risiko | Abnahme-Check |
|---|---|---|---|---|---|
| H1 | **Titel mit Leistungen.** Vorher **Begriffswahl validieren** (Google Trends AT / Keyword Planner, später GSC-Abfragen): „Ordnungscoaching" vs. „Aufräumcoach" vs. „Professional Organizer"; „Interior Design" vs. „Raumgestaltung" (sichtbare H1 nutzt „Raumgestaltung" → angleichen). Kandidaten (gemessen mit Arial 20 px, PIL): DE „Ordnungscoaching & Raumgestaltung · Wien/NÖ \| Claudia Plessl" (60 Z., **579 px**; beide Begriffe sichtbar: „Ordnungscoaching" 50×, „Raumgestaltung" 28× im HTML). EN „Professional Organizing & Interior Design \| Claudia Plessl" (58 Z., **510 px**; Schreibweise wie Seite, „professional organizing" 33×; Region steht in der Description). Heute: 597 px. `og:locale` `en_GB` vs. US-Schreibweise „organizing" ist bewusst gemischt wie auf der Seite — nicht ändern. Datei `src/content/site.ts:225/465`; `businessName` bleibt in `og:site_name`/JSON-LD | Titel ist eines der stärksten On-Page-Signale; bessere Klickrate bei Leistungs-Suchen | S (+ Recherche M) | Google kann Titel umschreiben; Wortlaut mit Claudia abstimmen | Titel-Pixelbreite ≤ 580 px (Messung mit Arial 20 px oder SERP-Simulator); Leistungsbegriff in den ersten 35 Zeichen; Begriff kommt sichtbar auf der Seite vor |
| H2 | **Meta-Descriptions kürzen** auf ~140–155 Zeichen (heute 208/233): Leistung + Region vorn, ruhiger Ton. `site.ts:226/466` | Kein Abschneiden → bessere Klickrate (kein direkter Rankingfaktor) | S | Gering | ≤ ~920 px Desktop; Kernaussage in den ersten 120 Zeichen (mobil) |
| H3 | **Legal-Seiten: eigene OG/Twitter-Metadaten** (`og:url` = Canonical, eigener Titel/Description) + `openGraph.alternateLocale` (`de_AT` ↔ `en_GB`) auf den Startseiten | Keine widersprüchlichen URL-Signale; korrekte Link-Vorschau | S | Keins | `out/*/index.html`: `og:url` == `<link rel=canonical>` auf allen 6 Seiten (Skript-Check) |
| H4 | **Bing Webmaster Tools** (Import aus GSC) + **Bing Places** + **Apple Business** (vormals Business Connect, seit 2026-04-14; Location Management in AT verfügbar — Apple Maps/Siri; Zielgruppe nutzt oft iPhone) | Bing speist Edge/Copilot und teils ChatGPT-Suche; Apple Maps für iPhone-Nutzer | S–M | NAP muss identisch sein | Bing-Site verifiziert, Sitemap übernommen; beide Einträge verifiziert, NAP-Checkliste abgehakt |
| H5 | **Bewertungsprozess** (legitim): Nach Projektabschluss persönliche Bitte um Google-Bewertung mit GBP-Kurzlink (Karte/QR im Handout, E-Mail-Signatur). Keine Anreize, kein Filtern („Review Gating"), Antworten auf jede Bewertung | Bewertungen sind einer der stärksten lokalen Faktoren und Vertrauenssignal für die Zielgruppe | S (Prozess), laufend | Incentives/Gating verstoßen gegen Google-Richtlinien → nie | Kurzlink erstellt; Ablauf im Checkpoint dokumentiert; erste echte Bewertungen |

### 4.3 Mittelfristig (P2)

| ID | Maßnahme | SEO-Nutzen | Aufwand | Risiko | Abnahme-Check |
|---|---|---|---|---|---|
| M1 | **Eigene 404-Seite.** Bei zwei Root-Layouts (`(de)`, `(en)`) greift `app/not-found.tsx` nicht; Next 16 braucht `app/global-not-found.tsx` + `experimental.globalNotFound: true` ([Doku](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)) — **im Review auf einer Scratch-Kopie mit Next 16.1.6 getestet:** `out/404.html` wird mit `lang="de-AT"`, `noindex`, eigenem Titel/h1 erzeugt; Datei rendert eigenes `<html lang="de-AT">`/`<body>`, importiert `globals.css` + Fonts. Inhalt: kurzer Hinweis, Links zu `/` und `/en/` | Nutzer bleiben auf der Seite; saubere Sprache/Signale | M | Experimentelles Flag; Static-Export-Verhalten erst lokal prüfen (`out/404.html`). Fallback: weglassen | Live `/xyz/` → Status 404, `noindex`, `lang="de-AT"`, beide Links 200 |
| M2 | **Sitemap `lastModified`** je URL als fester, gepflegter Wert (nicht Build-Zeit); `changefreq`/`priority` entfernen (von Google ignoriert) | Google nutzt `lastmod`, wenn verlässlich | S | Build-Datum würde jedes Deploy als Änderung melden → Google ignoriert Feld | `sitemap.xml` enthält `lastmod` im Format `YYYY-MM-DD`, Werte = letzte inhaltliche Änderung |
| M3 | **JSON-LD ergänzen — nur sichtbare/öffentliche Fakten:** `geo` (Wolfpassing, Ort steht sichtbar), `sameAs` (GBP, WKO Firmen A–Z, sobald vorhanden), Person `image` (sichtbares Porträt), `jobTitle` nur mit sichtbarer Bezeichnung; WebSite `alternateName: "Claudia Plessl"` (Site-Name-Feature); Legal `dateModified` als volles Datum; VideoObject `uploadDate` mit Zeitzone (kosmetisch). **Kein „Bezirk Tulln"** in `areaServed` — steht nicht auf der Seite | Stärkeres Entitäts-/Lokal-Signal; korrekter Site-Name im Suchergebnis | M | Orts-/Leistungsangaben müssen sichtbar sein (Abschnitt 1) | Rich Results Test + validator.schema.org: 0 Fehler; Skript-grep: jeder `areaServed`-/`addressLocality`-Wert und jeder Service-Name kommt im sichtbaren Text vor |
| M4 | **Verzeichniseinträge** mit identischen NAP-Daten: WKO Firmen A–Z (automatisch über Gewerbe — prüfen/ergänzen), Herold.at, ggf. Fachverband-/Ausbildungs-Verzeichnisse. NAP-Checkliste (Name, Adresse, Telefon, Website) | Lokale Zitierungen, seriöse Backlinks | M | Uneinheitliche Daten schaden; nur seriöse Verzeichnisse | Checkliste mit URL je Eintrag, NAP zeichengleich |
| M5 | **Mobile LCP (UX-Pflege)** — in dieser Reihenfolge, jeweils messen: (a) Header-Logo auf `fetchPriority="low"` + `loading="eager"` setzen (`BrandLogo.tsx:41/42`, `SiteHeader.tsx:89`). Hintergrund: Reacts Server-Renderer legt für **jedes** nicht-lazy `<img>` außerhalb von `<picture>` automatisch einen Preload an — nur `loading="lazy"` oder `fetchPriority="low"` unterdrücken ihn. `fetchPriority="high"` bloß zu entfernen reicht nicht; `priority`-Prop entfernen würde das Logo lazy laden (falsch, above the fold); (b) zusätzliche ~240w-Logo-Variante (verlustbehaftet, mit Alpha) **ergänzend** in `srcset` (480w bleibt für 3×-Displays); (c) nur falls nötig: Hero-Preload per `ReactDOM.preload(href, {as:'image', imageSrcSet, imageSizes, media, fetchPriority:'high'})` mit zwei sich ausschließenden Media-Queries passend zu den `<source>`-Elementen | Schnellere Darstellung auf dem Handy; vorbereitend für spätere CrUX-Daten | S–M | Falscher Preload → doppelter Download | `out/index.html` und `out/en/index.html` enthalten **kein** `<link rel="preload" as="image">` für `logo-*`; Netzwerk-Wasserfall: Hero-Request startet vor dem Logo; Logo ≤ 10 KB übertragen; Hero genau 1×; Lighthouse mobil Median aus 3 Läufen dokumentiert (Ziel LCP sim. < 2,5 s, kein Rückschritt bei CLS/TBT) |
| M6 | **Bilder nachschärfen:** Video-Poster WebP (87 → ≤ 45 KB); QR-SVG mit eingebetteten PNGs (190 KB) als echtes Vektor-SVG/WebP (≤ 30 KB); sprechende Dateinamen für Inhaltsbilder (`claudia-plessl-portrait-…`, `…-projekte-…`) | Weniger Bytes; geringfügig Bildersuche | M | QR muss scannen; alte Dateinamen nur intern referenziert | Byte-Ziele erreicht; QR mit iOS **und** Android gescannt → vCard korrekt; Lighthouse ohne „Improve image delivery" für diese Dateien |
| M7 | **Legal-Seiten `follow: true`** (`agb/page.tsx:10`, `impressum/page.tsx:9`, `datenschutz/page.tsx:9`, `en/legal/page.tsx:10`) | Saubere Signale; geringe Wirkung | S | Keins | `meta robots` = `index, follow` auf 4 Seiten |
| M8 | **KI-Bilder maschinenlesbar kennzeichnen:** IPTC `DigitalSourceType = trainedAlgorithmicMedia` in die WebP-Dateien der KI-Raumbilder (Google nennt die Eigenschaft, [Doku](https://developers.google.com/search/docs/appearance/structured-data/image-license-metadata) — **ob XMP in WebP gelesen wird, ist nicht dokumentiert**; daher vor allem Ehrlichkeitsmaßnahme). Umsetzung **im Build-Skript**: `brand/build_web_assets.py:161` speichert per Pillow ohne `xmp=` → Metadaten gehen verloren; per Hand gesetzte Tags würden beim nächsten Asset-Build gelöscht. Daher XMP-Paket über Pillows `xmp=`-Parameter mitschreiben. Ergänzt die bestehende sichtbare Footer-Kennzeichnung | Ehrlichkeit/E-E-A-T; schützt Vertrauen der Zielgruppe; Rankingnutzen unsicher | S–M | Keins (unsichtbar, ehrlich) | Nach **neu gebauten** Assets: `exiftool` (vorher installieren) bzw. Pillow-Lesetest zeigt `DigitalSourceType = trainedAlgorithmicMedia` auf jeder KI-Bilddatei, lokal und live |

### 4.4 Optional (P3)

| ID | Maßnahme | SEO-Nutzen | Aufwand | Risiko | Abnahme-Check |
|---|---|---|---|---|---|
| O1 | **CDN vor GitHub Pages** (z. B. Cloudflare Free): HSTS, Brotli, lange Cache-Zeiten für `/_next/static/*` | Wiederholungsbesuch ~400 KiB weniger; HSTS. Rankingnutzen gering | L | DNS-Umzug weg von konsoleH (Mail-/Workspace-Records!), neue Fehlerquelle, Datenschutzerklärung anpassen | erst bei konkretem Bedarf |
| O2 | **RSC-`.txt`-Dateien**: erst in GSC prüfen, ob `/index.txt` o. ä. indexiert ist; nur dann `Disallow: /*.txt` (ohne `$`, weil Next Query-Strings wie `?_rsc=` anhängen kann). `Disallow` entfernt bereits indexierte URLs nicht. **Konflikt mit O4:** IndexNow-Schlüsseldatei `/<key>.txt` per `Allow:` ausnehmen | Verhindert Text-Duplikate | S | Gering | GSC „Seiten": keine `.txt`-URL indexiert |
| O3 | **Legacy-JS** (~13 KiB) per `browserslist` modern | Etwas weniger Bytes | S | Ältere Geräte der Zielgruppe → vorher Zielbrowser prüfen | Lighthouse ohne „Legacy JavaScript" |
| O4 | **IndexNow-Ping** im Deploy-Workflow (`.github/workflows/deploy.yml`) nach erfolgreichem Deploy | Schnellere Bing-/Yandex-Erfassung | S | Schlüsseldatei öffentlich (vorgesehen) | Ping HTTP 200/202 im Action-Log |
| O5 | `dsb.gv.at`-Link ohne `www` | Kosmetisch | S | Keins | Link 200 ohne Redirect |
| O6 | **Eigene Leistungsseiten** (Ordnungscoaching, Raumgestaltung, Business) | **Größter langfristiger Ranking-Hebel** für einzelne Suchbegriffe | L | Sichtbare Inhaltsänderung → **außerhalb dieses Auftrags**, nur mit Claudia | Entscheidung nach 12-Wochen-Auswertung (Abschnitt 7) |
| O7 | **Video-Transkript** als `<details>` unter dem Video | Indexierbarer Text | S | Sichtbare Änderung → Freigabe nötig; VTT deckt Barrierefreiheit schon ab | — |

## 5. Bewusst nicht tun

- Keine Orts-Landingpages ohne echten Inhalt (Doorway-Risiko).
- Kein FAQPage-, Review- oder AggregateRating-Markup ohne sichtbare, echte Inhalte.
- Keine `openingHours` erfinden (`schema.ts:13`).
- Kein hreflang auf Legal-Seiten.
- Keine `keywords`-Meta, kein `llms.txt` (Google: für KI-Funktionen keine Spezialdateien nötig, [Doku](https://developers.google.com/search/docs/appearance/ai-features)); KI-Crawler sind per `robots.ts` bereits zugelassen.
- Keine Video-Sitemap (keine Watch Page).
- Keine KI-Bilder im Google Unternehmensprofil.

## 6. Umsetzungsreihenfolge

1. K1 + K2 starten (Vorlaufzeit) → verify: GSC verifiziert, GBP-Verifizierung beantragt.
2. K3 Baseline → verify: Datei mit Zahlen.
3. H1 + H2 nach Begriffsrecherche und Freigabe des Wortlauts (ein Commit) → verify: Pixel-/Zeichenchecks.
4. H3 + M7 (Metadaten, ein Commit) → verify: `og:url` == Canonical, `index, follow`.
5. H4 + H5 (Bing/Apple, Bewertungsprozess).
6. M5 (a) → messen → ggf. (b)/(c) → verify: Wasserfall + Lighthouse.
7. M1 → verify: 404-Check live.
8. M2 + M3 (Sitemap, JSON-LD; nach GBP-URL) → verify: Validatoren 0 Fehler.
9. M6 + M8 (Bilder) → verify: Bytes, QR, exiftool.
10. M4 Verzeichnisse.

## 7. Erfolgsmessung und Entscheidungsregel

- **Tag 0:** Baseline (K3). **Woche 4:** erster GSC-Vergleich. **Woche 12:** Auswertung.
- Kennzahlen: Indexabdeckung 6/6; 0 Fehler strukturierte Daten; Impressionen/Klicks für Leistungs-Suchbegriffe (Ordnungscoaching, Raumgestaltung, Interior Design + Region); GBP-Aufrufe, Website-Klicks (UTM), Anrufe; Anzahl echter Bewertungen.
- **Entscheidungsregel Woche 12:** Erscheint die Seite für Leistungs-Suchbegriffe kaum (Impressionen nahe null außerhalb des Markennamens), ist die technische Obergrenze erreicht → Gespräch mit Claudia über O6 (Leistungsseiten).

## 8. Offene Entscheidungen (Claudia/Nutzer)

- Begriffswahl und Wortlaut neuer Titel/Descriptions (H1/H2). DE-Vorschlag hat nur ~1 px Reserve → **finalen Wortlaut neu messen**.
- GBP: Primärkategorie; Adresse ausblenden (empfohlen) — Bestätigung, dass keine Kundenbesuche in Wolfpassing stattfinden.
- Bewertungsprozess (H5) — wer fragt, wann.
- DNS-Änderung für GSC-TXT (K1) — Rückfrage vor Eintrag.
- CDN (O1) ja/nein; Leistungsseiten (O6) nach Woche 12.
