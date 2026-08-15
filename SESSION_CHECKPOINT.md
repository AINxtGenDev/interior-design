# Session Checkpoint

## Meta

- Datum: 2026-08-15
- Repository: `AINxtGenDev/interior-design` (public)
- Arbeitskopie: `/home/nuc8/05_development/78_plessl-website`
- Live: https://ainxtgendev.github.io/interior-design/
- Status: Website vollständig neu gebaut, deployed und grün. Rechtliche Platzhalter offen.

## Aktuelles Ziel

Professionelle Business-Website für `Mag. Claudia Plessl — Interior Design &
Ordnungscoaching`, zweisprachig (Deutsch primär, Englisch sekundär), mit
Impressum, Datenschutzerklärung und AGB, gehostet auf GitHub Pages.

## Erledigt in dieser Session

### Repository bereinigt

- Altbestand entfernt: `SKILL.md`, `SKILL.md_web`, `generate_pietzinger.py`,
  `plan-pietzinger.dxf/.jpg`, `plan-koeck.pdf`, `a.png`, altes
  `SESSION_CHECKPOINT.md`, `LICENSE` (GPL-3.0, für eine Businessseite falsch).
- Historie auf einen einzigen Initial-Commit zurückgesetzt und force-gepusht.
- Backup der kompletten alten Historie:
  `/home/nuc8/05_development/55_laulau/interior-design-BACKUP-20260815.bundle`
  (Rollback: `git clone` aus dem Bundle, dann force-push).

### Website neu gebaut

- Next.js 16 (App Router, `output: "export"`), Tailwind 4, TypeScript.
- Zwei Root-Layouts über Route Groups `(de)` und `(en)` — dadurch korrektes
  `<html lang>` je Sprache (`de-AT` bzw. `en`).
- Routen: `/`, `/impressum/`, `/datenschutz/`, `/agb/`, `/en/`, `/en/legal/`.
- Gesamter Text zweisprachig in `website/src/content/site.ts` (typisiert —
  fehlende Übersetzung = Build-Fehler).
- Inhalte aus `businessplan-plessl_20042026.docx` abgeleitet: drei Standbeine,
  Top-3-Zielgruppen, Ablauf, Paketpreise als „ab EUR"-Einstiegspreise.
- Design aus `linkedin-cover2.png`: Salbeigrün, warmes Creme, Gold-Haarlinie,
  Cormorant Garamond / Inter / Jost.
- Bilder sind Crops des Cover-Assets — keine Fremdbilder, keine externen
  Requests. Schriften via `next/font` zur Buildzeit selbst gehostet.
- Kontakt ausschließlich `mailto:` und `tel:` — kein Formular, kein Tracking,
  keine Cookies.
- Logo aus `logo.pdf` (300-DPI-Scan) extrahiert: CP-Monogramm als Alpha-Matte
  freigestellt → `logo-mark.webp` + `icon.png` (Favicon). Wortmarke bewusst als
  Live-Text in Jost gesetzt, nicht als Scan.

### Behobene Fehler (waren echte Defekte)

1. `<img src="/hero.webp">` ohne `basePath` → alle Bilder hätten unter
   `/interior-design/` 404 geliefert. Fix: statische Imports aus `src/assets/`.
2. `@theme inline` gibt die Tokens nicht als echte `:root`-Custom-Properties
   aus → jede handgeschriebene CSS-Regel mit `var(--font-heading)` etc. fiel
   still auf die Browser-Standardschrift zurück. Fix: `@theme` statt
   `@theme inline`, und die `next/font`-Variablen auf `<html>` statt `<body>`.
3. ESLint-Config über `FlatCompat` brach mit „Converting circular structure to
   JSON". Fix: `eslint-config-next` exportiert Flat Configs direkt.
4. Tap-Targets unter 24 px bei Footer-Links und Zurück-Link korrigiert.

### Geprüfte Fakten (nicht aus dem Gedächtnis)

- **EU-ODR-Plattform ist seit 20.07.2025 eingestellt** (Verordnung (EU)
  2024/3228). Die AGB enthält den sonst üblichen Boilerplate-Link deshalb
  bewusst **nicht**, sondern verweist auf österreichische Schlichtungsstellen.
- **Kleinunternehmergrenze: EUR 55.000 brutto** seit 2025. Businessplan plant
  EUR 52.000 — wenig Spielraum, im Auge behalten.
- Next.js Static Export unterstützt **keine** Middleware, Rewrites, Redirects
  oder Server Actions → Sprachumschaltung nur über explizite Links.
- Zertifizierung: „Zertifizierter Ordnungscoach", Akademie der Ordnung.

## Wichtige Dateien

| Datei | Beschreibung |
|---|---|
| `website/src/content/site.ts` | Gesamter Seitentext, beide Sprachen |
| `website/src/components/HomePage.tsx` | Die Onepager-Struktur |
| `website/src/app/(de)/agb/page.tsx` | AGB (KSchG/FAGG) |
| `website/src/app/(de)/impressum/page.tsx` | Impressum (§ 5 ECG, § 25 MedienG) |
| `website/src/app/(de)/datenschutz/page.tsx` | Datenschutzerklärung (DSGVO) |
| `website/src/app/globals.css` | Design-Tokens |
| `handout/claudia-plessl-uebersicht.html` | Offline-Onepager fürs Handy |
| `brand/logo-original-scan.pdf` | Quell-Scan des Logos |

## Offene Punkte

**Rechtlich — vor dem Bewerben der Seite zu erledigen:**

- GISA-Zahl, exakter Gewerbewortlaut, UID bzw. Kleinunternehmerstatus
- Zuständige Bezirkshauptmannschaft bestätigen (BH Tulln angenommen, ungeprüft)
- WKO-Fachgruppe
- Drittlandtransfer-Grundlage für GitHub-Hosting konkret benennen
- Stornofristen und -sätze, Anzahlungsschwelle, Workshop-Mindestteilnehmerzahl
- **AGB von WKO oder Anwalt prüfen lassen**

Alle diese Stellen sind auf der Seite als hervorgehobene `[…]`-Marker sichtbar.

**Sonstiges:**

- Original-Vektorlogo (SVG/AI/EPS) beim Designer anfragen — aktuell nur Scan.
- Akademischer Titel/Studium fehlt bei den Qualifikationen (`site.ts`).
- Eigene Domain und domainbasierte E-Mail-Adresse statt `@gmail.com`.
- Echte Vorher-Nachher-Referenzen für einen Projekte-Abschnitt sammeln.

## Reproduzierbare Ausgabe

```bash
cd website
npm ci
npm run build          # statischer Export nach website/out
npx eslint src
```

Deployment erfolgt automatisch via GitHub Actions bei jedem Push auf `main`.
