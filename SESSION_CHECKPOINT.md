# Session Checkpoint

## Meta

- Datum: 2026-08-16 (Website-Stand 2026-08-15, danach nur Ordnerkonsolidierung)
- Repository: `AINxtGenDev/interior-design` (public)
- Arbeitskopie: `/home/nuc8/05_development/55_laulau/78_plessl-website`
  (**verschoben am 2026-08-16** — vorher `/home/nuc8/05_development/78_plessl-website`)
- Live: https://ainxtgendev.github.io/interior-design/
- Status: Website live und getestet; Vorstellungsvideo produziert und
  eingebettet. Rechtliche Platzhalter und Musikrechte offen.

## Aktuelles Ziel

Professionelle Business-Website für `Mag. Claudia Plessl — Interior Design &
Ordnungscoaching`, zweisprachig (Deutsch primär, Englisch sekundär), mit
Impressum, Datenschutzerklärung und AGB, gehostet auf GitHub Pages.

## Ordnerkonsolidierung (2026-08-16)

Alles zum Projekt Plessl liegt jetzt unter `~/05_development/55_laulau/`.
Die beiden vorher parallel liegenden Ordner wurden dorthin verschoben:

| vorher | jetzt |
|---|---|
| `~/05_development/78_plessl-website` | `~/05_development/55_laulau/78_plessl-website` |
| `~/05_development/79_plessl-video` | `~/05_development/55_laulau/79_plessl-video` |

- Reine `mv`-Verschiebung im selben Dateisystem, Ordnernamen unverändert.
- Git-Repo unbeschädigt: `HEAD == origin/main`, Arbeitsbaum sauber.
- `website/.next` (Build-Cache, gitignored) enthielt noch die alten absoluten
  Pfade → gelöscht und neu gebaut. `npm run build` läuft am neuen Ort fehlerfrei
  (9 statische Routen).
- Pfadangaben in `SESSION_CHECKPOINT.md`, `video-source/README.md` und
  `video-source/BRIEF.md` nachgezogen.
- `scripts/gemini_tts.py` liest weiterhin `55_laulau/.env` — Pfad unverändert
  gültig, da `55_laulau` selbst nicht verschoben wurde.
- GitHub Actions ist von der Verschiebung nicht betroffen (baut aus dem Repo).

**Nach dem Push nachgeprüft (nicht angenommen):**

| Prüfung | Ergebnis |
|---|---|
| Commit | `cbfec36` — nur Doku-Pfade, kein Seitencode |
| Push | `c2530db..cbfec36 main -> main`, danach `HEAD == origin/main` |
| Deploy-Run `31931317375` | **success**, 52 s |
| `/`, `/impressum/`, `/datenschutz/`, `/agb/`, `/en/`, `/en/legal/` | alle 200 |
| `/video/vorstellung.mp4` | 200 |

**Rollback:** `mv ~/05_development/55_laulau/78_plessl-website ~/05_development/`,
dann `git revert cbfec36`.

**Zwei Repos, bewusst getrennt (Stand 2026-08-16):**

| Repo | Sichtbarkeit | Inhalt |
|---|---|---|
| `AINxtGenDev/interior-design` (dieses) | **öffentlich** | nur die Website |
| `AINxtGenDev/plessl-projekt` | **privat** | `55_laulau` — Businessplan, E-A-Prognose, SWOT, Pressemappe, `logo/`, Video-Projekt |

Grund für die Trennung: GitHub Pages liefert von einem privaten Repo nur mit
bezahltem Plan aus. Ein gemeinsames privates Repo hätte die Website offline
genommen, ein gemeinsames öffentliches hätte Finanzdaten, Wohnadresse,
API-Keys und den Queen-Musikbed veröffentlicht.

**Dieses Repo ist öffentlich — hier darf nichts davon hinein.** Das private
Repo ist der Ort für Unterlagen, Rohmaterial und Musik.

## Neues Logo und rotierende Wortmarke (2026-08-16)

Quelle: `55_laulau/logo/` — originalgetreu neu gezeichnete, entpixelte Fassung
mit echtem Alphakanal, ersetzt den bisherigen 300-DPI-Scan. Der komplette Satz
liegt jetzt versioniert unter `brand/logo-optimized/` (inkl.
`logo-dokumentation.md`), damit er nicht nur im nicht gesicherten `55_laulau`
existiert.

| Verwendung | Datei aus dem Logo-Satz | Ziel im Repo |
|---|---|---|
| Header/Footer-Marke | `wpl-logo-256.webp` | `website/src/assets/logo-mark.webp` |
| Favicon (16–256 px) | `favicon.ico` | `website/src/app/favicon.ico` |
| Icon 512 px | `wpl-logo-512.png` | `website/src/app/icon.png` |
| iOS Touch-Icon | `apple-touch-icon.png` | `website/src/app/apple-icon.png` |
| Android/Manifest | `android-chrome-{192,512}.png` | `website/public/icons/` |

- `src/app/{favicon.ico,icon.png,apple-icon.png}` sind Next.js-Dateikonventionen
  und erzeugen die `<link>`-Tags automatisch — kein Handverdrahten im Layout.
- Neu: `src/app/manifest.ts` → `manifest.webmanifest`. Nur dadurch sind die
  Android-Icons überhaupt erreichbar. **Achtung:** Next setzt `basePath` in
  Manifest-Strings *nicht* automatisch, `start_url`, `scope` und jedes Icon
  präfixen ihn deshalb selbst über `NEXT_PUBLIC_BASE_PATH`.
- Die Marke ist **22,8 KB statt 87,6 KB** (256er WebP statt Scan). 256 px reicht:
  größte Darstellung ist 64 px im Footer, also 192 px bei 3× Pixeldichte.
- Das neue Logo sitzt auf quadratischer Fläche mit eigenem Schutzraum (Inhalt
  füllt 77 % der Höhe, der Scan füllte 98 %). Header und Footer laufen deshalb
  eine Stufe größer — `h-10 md:h-11` statt `h-9 md:h-10`, Footer `h-16` statt
  `h-14` — sonst wirkte das Logo rund 20 % kleiner als vorher.

### Rotation um die Y-Achse

Neue Komponente `website/src/components/LogoMark.tsx`, benutzt von Header und
Footer (vorher hatten beide den `<Image>`-Block dupliziert).

- 24 s pro Umdrehung, `linear`, endlos — bewusst sehr langsam.
- **Zweiseitige Karte statt einfacher Drehung.** Ein flaches Bild zeigt jenseits
  von 90° sein Spiegelbild, das Monogramm stünde also die halbe Zeit
  seitenverkehrt. Deshalb zwei Flächen, die hintere um 180° vorgedreht, Übergabe
  über `backface-visibility: hidden`. Bei 180° gemessen: Logo liest korrekt.
- `perspective: 300px` — flacher wirkt es wie ein seitliches Stauchen,
  enger wird aus einer Identitätsmarke ein Jahrmarkteffekt.
- **Die Animation existiert ausschließlich innerhalb von
  `@media (prefers-reduced-motion: no-preference)`.** Wer reduzierte Bewegung
  eingestellt hat, bekommt ein stehendes Logo — im CSSOM des Builds geprüft, es
  gibt keine ungegatete Regel. Dauerbewegung in einem Sticky-Header ist genau
  das, wogegen diese Einstellung existiert.

**Geprüft (Build lokal ausgeliefert, nicht angenommen):**

| Prüfung | Ergebnis |
|---|---|
| `npm run build` | 12 Routen inkl. `apple-icon.png`, `manifest.webmanifest` |
| `npx eslint src` | sauber |
| `<link>`-Tags | icon, apple-touch-icon, manifest — alle mit `/interior-design` |
| Manifest-Inhalt | `start_url`, `scope`, beide Icon-Pfade korrekt präfixt |
| Drehung live | `playState: running`, `matrix3d`, 24 s, Werte ändern sich |
| Bei 0°/45°/135°/180° | Logo nie gespiegelt, Perspektive sauber |
| Konsole | keine Fehler, keine Warnungen |
| 320 px mobil | kein horizontales Scrollen (`scrollWidth == 320`) |

**Fallstrick für die nächste lokale Prüfung:** `python3 -m http.server` spricht
per Default HTTP/1.0 und schließt jede Verbindung. Das erzeugt sechs falsche
„preloaded but not used"-Warnungen für die Schriften. Mit
`--protocol HTTP/1.1` verschwinden sie bei identischem Build.

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
  **Überholt am 2026-08-16** — der Scan wurde durch die neu gezeichnete Fassung
  ersetzt, siehe „Neues Logo und rotierende Wortmarke".

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
5. Kein Skip-Link vorhanden — Tastaturnutzer mussten auf jeder Seite durch
   Header und Navigation tabben. Nachgerüstet, zweisprachig, sichtbar erst bei
   Fokus.

### Live-Verifikation (nach Deployment geprüft, nicht angenommen)

Gemessen auf https://ainxtgendev.github.io/interior-design/ :

| Prüfung | Ergebnis |
|---|---|
| Alle 6 Routen | 200 |
| Bilder + Favicon | 200 |
| **Requests gesamt** | **42 — davon 0 an Dritte** |
| Cookies / localStorage | keine / keine |
| Schriften | Cormorant Garamond, Inter, Jost — selbst gehostet geladen |
| Interne Links | alle 200, keine 404 durch `basePath` |
| Konsole | keine Fehler, keine Warnungen |
| Übertragung | 579 KB, 29 Requests, `load` 58 ms |
| Überschriftenstruktur | h1 → h2 → h3, keine Sprünge |
| `alt`-Attribute | vollständig, dekorative Bilder mit leerem `alt` |
| Horizontales Scrollen bei 320 px | keines (im iframe echt gemessen) |

Damit sind die Aussagen der Datenschutzerklärung („keine Cookies, kein
Tracking, keine Drittanbieter-Requests") nachweislich zutreffend.

**Hinweis:** GitHub Pages cached aggressiv. Nach einem Deployment kann die alte
Fassung noch kurz ausgeliefert werden — mit `cache: "reload"` bzw. Hard-Reload
gegenprüfen, bevor man einen Fehler vermutet.

### Vorstellungsvideo (neu)

- 58,3 s · 1080×1920 (hochkant, mobil) · deutscher Voiceover · HyperFrames,
  Workflow `product-launch-video`, Design-Preset `cartesian` auf die Markentokens
  remixt.
- Arbeitsprojekt: `~/05_development/55_laulau/79_plessl-video/videos/claudia-plessl-promo`.
  Plan- und Kompositionsquellen liegen in diesem Repo unter `video-source/`.
- Eingebettet zwischen Hero und Leistungen, **selbst gehostet** —
  `website/public/video/vorstellung.mp4` (4,2 MB, faststart, −14,5 LUFS) mit
  Posterbild und deutscher WebVTT-Untertitelspur. **Untertitel werden nicht
  eingeblendet** (kein `default` am `<track>`) — sie bleiben aber im Player
  zuschaltbar, damit der Film ohne Ton nutzbar bleibt. Bewusst **kein** YouTube-Embed:
  die Seite hat nachweislich null Drittanbieter-Requests, ein iframe würde das
  zerstören und eine Änderung der Datenschutzerklärung erzwingen.
  `preload="metadata"` — wer nicht abspielt, lädt nur ein paar KB.

**Voiceover-Route (nicht frei gewählt, sondern die einzig mögliche):**

| Anbieter | Deutsch? | Ergebnis |
|---|---|---|
| Kokoro (lokal) | nein | Sprachen: en/es/fr/hi/it/ja/pt-br/zh |
| HeyGen starfish | nein | Katalog dieses Accounts: 20 Stimmen, 18 EN / 1 ES / 1 PL |
| **Gemini TTS** | **ja** | `gemini-2.5-flash-preview-tts`, Stimme `Sulafat` ✓ |

Erster Durchgang war zu langsam (~64 wpm, 63 s gesamt), weil der Stilprompt
„echte Pausen" verlangte. Korrigierter Prompt: 96–158 wpm, 46,2 s Sprechzeit.

**Musik:** aus `I Want It All.mp3` (Queen), auf −30 LUFS normalisiert und per
`sidechaincompress` gegen die Stimme geduckt — gemessen 10–11 dB Absenkung
unter Sprache. **Rechte ungeklärt.** Eine musikfreie Fassung ist bereits
gerendert: `renders/claudia-plessl-promo-web-VO-only.mp4` im Arbeitsprojekt,
Austausch ist ein Dateikopieren. Der Musik-Bed wird bewusst **nicht** ins
öffentliche Repo committet.

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
| `website/src/components/LogoMark.tsx` | Rotierende Markenmarke (zweiseitig) |
| `website/src/app/manifest.ts` | Web-App-Manifest, Android-Icons |
| `handout/claudia-plessl-uebersicht.html` | Offline-Onepager fürs Handy |
| `brand/logo-original-scan.pdf` | Quell-Scan des Logos (historisch) |
| `brand/logo-optimized/` | Neu gezeichneter Logo-Satz inkl. Doku (aktuell) |
| `video-source/` | Storyboard, Skript, Kompositionen des Vorstellungsvideos |
| `website/public/video/` | Fertiges Video, Poster, deutsche Untertitel |

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

- Original-Vektorlogo (SVG/AI/EPS) beim Designer anfragen. Die neu gezeichnete
  Fassung ist sauber, aber weiterhin Raster — für Druck und sehr große
  Darstellungen bleibt eine echte Vektorquelle die richtige Lösung.
- Für einen dunklen Header oder Dark Mode fehlt eine helle Negativversion des
  Logos (die Seite ist aktuell bewusst light-only, also noch kein Problem).
- Akademischer Titel/Studium fehlt bei den Qualifikationen (`site.ts`).
- Eigene Domain und domainbasierte E-Mail-Adresse statt `@gmail.com`.
- **Musik im Video vor breiterer Verbreitung ersetzen** (Queen-Titel, siehe oben);
  musikfreie Fassung liegt bereit.
- Echte Vorher-Nachher-Referenzen für einen Projekte-Abschnitt sammeln.

## Reproduzierbare Ausgabe

```bash
cd website
npm ci
npm run build          # statischer Export nach website/out
npx eslint src
```

Deployment erfolgt automatisch via GitHub Actions bei jedem Push auf `main`.
