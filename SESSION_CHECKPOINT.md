# Session Checkpoint

## Meta

- Datum: 2026-08-18 (Siegel-Logo WOHNEN · ORDNUNG — siehe unten)
- Repository: `AINxtGenDev/interior-design` (public)
- Arbeitskopie: `/home/nuc8/05_development/55_laulau/78_plessl-website`
  (**verschoben am 2026-08-16** — vorher `/home/nuc8/05_development/78_plessl-website`)
- Live: https://ainxtgendev.github.io/interior-design/
- Status: Website live und getestet; Vorstellungsvideo produziert und
  eingebettet. Musik am 2026-08-16 ersetzt (Queen -> Suno-Instrumental);
  rechtliche Platzhalter im Impressum/AGB weiterhin offen.
  **Umbenennung vom 2026-08-17 ist live:** gepusht bis `d0f98d6`,
  GitHub-Actions-Deploy `32004332796` erfolgreich, alle 6 Routen an der
  Live-URL nachgeprüft (neuer Name, neues Logo byte-identisch, KI-Hinweis).

## Alpha-Paket und zweisprachige OG-Karten (2026-08-18, zweiter Durchgang)

**Logo-Quelle gewechselt.** Der Nutzer hat nach dem ersten Deploy das Paket
`logo/03_logo_website_alpha_package/` geliefert — dasselbe Siegel, aber mit
echtem Alphakanal. Es geht von derselben Bildschirmaufnahme aus wie das eigene
`dechecker_matte.py` und loest dasselbe Problem. Beide wurden gegeneinander
gemessen, bevor entschieden wurde:

| | eigenes Matting | Paket |
|---|---:|---:|
| Rueckrechnung gegen die Quelle (mittlerer Fehler) | **0,92**/255 | 1,01/255 |
| freistehende Splitter < 40 px | 1499 | **412** |

Gleichauf bei der Treue, klar besser bei der Kante — deshalb baut
`build_logo_set.py` den Satz jetzt aus `png/wpl-logo-alpha-master-1254.png`.
Die kompakte Marke fuer kleine Icons kommt ebenfalls aus dem Paket
(`wpl-mark-alpha-master.png`, fuellt 92 % ihrer Leinwand), `build_monogram_master()`
maskiert nicht mehr selbst. Das Paket kommt unabhaengig zum selben Schluss wie
die Messung hier: „use the compact mark below approximately 96 CSS pixels".

**Zweisprachige Open-Graph-Karten.** `og-image.jpg` lag unter **beiden**
Sprachen, obwohl der Beschreiber unten im Bild englisch ist — jeder geteilte
deutsche Link zeigte eine deutsche Headline ueber „INTERIOR DESIGN ·
PROFESSIONAL ORGANIZING". Neu: `og-image-de.jpg` und `og-image-en.jpg`, gebaut
von `build_og_images.py`.

Geaendert wird **nur die unterste Zeile**; Foto, Headline, Haarlinie und alle
Abstaende bleiben. Der Streifen wird durch senkrechte Interpolation zwischen den
sauberen Wandzeilen ersetzt (mit angepasster Koernung, sonst faellt er als
glattes Band auf) und mit dem Jost der Website neu gesetzt. Typografie
zurueckgemessen, nicht geschaetzt: Versalhoehe 9 px, Laufweite 2,05 px,
Gestaltungsachse x = 574 (die Karte ist bewusst nicht bildmittig — die
Headline-Zeilen sitzen auf 572,5 und 574,5).

Die neuen Zeilen sind laenger. Die glatte Wand traegt um die Achse 406 px, also
wird je Sprache auf 392 px eingepasst — **ueber die Laufweite** (DE 1,50,
EN 0,80) bei konstanter Schriftgroesse. Die Groesse sieht das Auge, die
Laufweite nicht.

> Die Jost-Kopie im Videoprojekt ist auf ein einziges Glyph reduziert und
> rendert nichts. Verwendet wird `brand/fonts/Jost-latin.ttf` aus dem
> Build-Output der Website selbst.

**Nachgeprüft:** nur 53 Pixel ausserhalb des Streifens weichen um mehr als 12
ab (JPEG-Neukodierung), `og:image` je Route korrekt, Build sauber.

**Die Eyebrow-Zeile wurde auf Wunsch NICHT geaendert** — sie beschreibt die
Leistungen, nicht den Firmennamen. Die OG-Karten tragen jetzt denselben Text.

## Siegel-Logo WOHNEN · ORDNUNG (2026-08-18) — **live**

Das quadratische 3D-Monogramm vom 2026-08-17 ist ersetzt durch das **runde
Siegel mit dem Ring-Schriftzug WOHNEN · ORDNUNG**.

`feature/logo-replacement` ist am 2026-08-18 als Fast-Forward nach `main`
gemerged und gepusht (`0a18a5b..dc9c5ec`). GitHub-Actions-Deploy
**`32113099890` success** (2 min 17 s).

**An der Live-URL nachgeprüft, nicht angenommen:**

| Prüfung | Ergebnis |
|---|---|
| 6 Routen + Manifest + 4 Icons + Video | alle 200 |
| `logo-mark.webp` live | **byte-identisch** zu `logo/wpl-logo-256.webp` |
| `favicon.ico`, `icon.png`, `apple-icon.png` live | byte-identisch zur Quelle |
| beide `android-chrome-*` + Maskable live | byte-identisch zur Quelle |
| Live-Manifest | trägt die 3 Icons inkl. `purpose: "maskable"` |
| Ausgeliefertes `apple-icon.png` | 180×180 **RGB, kein Alpha** |
| Ausgeliefertes Maskable | Radius 202,6 von 204,8 px |
| Konsole live | keine Fehler, keine Warnungen |
| Drittanbieter-Requests | **0** — die Datenschutz-Aussage hält weiterhin |
| 320 px × DPR 3 live | kein horizontaler Überlauf |

**Die Lieferdatei war kein transparenter Export.** `03_logo_new_schrift.png`
(1254², RGB, **ohne Alphakanal**) ist eine Bildschirmaufnahme einer
transparenten Datei: das Transparenz-Schachbrett steckt als sichtbares Muster in
den RGB-Pixeln — 24-px-Felder, Graustufen 253,8 und 245,5, per Autokorrelation
und Phasenfit gemessen. Ein Freistellen nach Helligkeit hätte die dünnen
Ring-Buchstaben zerfressen.

`logo/dechecker_matte.py` (privates Repo) modelliert das Schachbrett stattdessen
als bekannten Hintergrund B und löst die Compositing-Gleichung
`I = a·F + (1−a)·B` pro Pixel nach a auf; F kommt aus dem nächstgelegenen
sicheren Motivpixel, a als Kleinste-Quadrate-Projektion über die drei Kanäle.

> **Gegenprobe (nicht angenommen):** das Ergebnis wieder auf das modellierte
> Schachbrett komponiert und mit der Quelle verglichen — mittlerer Fehler
> **0,92/255**, 99. Perzentil 9, 12 Pixel von 1,57 Mio. über 12. Das liegt im
> Eigenrauschen der Datei (SD 1,5). Auf Magenta, Weiß und Schwarz geprüft:
> kein Halo, kein Schachbrettrest.

**Der Ring-Schriftzug ist bei keiner Website-Größe lesbar.** Gemessen über
Zusammenhangskomponenten: 61 Glyphen, Median-Versalhöhe **39,8 px bei 1090 px
Motivdurchmesser = 3,65 %**. Daraus folgt:

| Ort | Box | Versalhöhe des Rings |
|---|---:|---:|
| Header < 768 px (`h-10`) | 40 px | 1,05 CSS-px |
| Header ≥ 768 px (`h-11`) | 44 px | 1,15 CSS-px |
| Footer (`h-16`) | 64 px | 1,68 CSS-px |
| Favicon 32 / 16 | 32 / 16 px | 0,84 / 0,42 CSS-px |

Das ist nicht klein, sondern unsichtbar — und es verschmiert das Monogramm zu
grauem Rauschen. Lesbar wäre der Ring erst ab rund 305 px Höhe im Header. Zwei
Konsequenzen:

1. **Header und Footer behalten das volle Siegel.** Der Ring wirkt dort als
   Textur; den Namen trägt die Wortmarke `MAG. CLAUDIA PLESSL` daneben als
   Live-Text. Das ist bei Siegel-Logos die übliche Lösung.
2. **`favicon.ico` zeigt bis 64 px nur das Monogramm**, geschnitten bei
   Radius 461 px — dort ist die Quelle nachweislich leer (Deckung 0,000).
   128 px und 256 px tragen das volle Siegel. Schalter:
   `ICO_MONOGRAM_UPTO` in `logo/build_logo_set.py`.

**Optischer Ausgleich:** `CONTENT_HEIGHT_RATIO` steigt von 735/1024 = 0,718 auf
**0,76**. Ein Kreis wirkt bei gleicher Höhe kleiner als ein Quadrat; die Marke
trägt damit dasselbe optische Gewicht wie vorher. **Am CSS wurde nichts
geändert** — die Boxen sind weiterhin 40/44/64 px.

**Zwei Altlasten mitbehoben:**

- `apple-icon.png` hatte einen Alphakanal. iOS legt selbst Maske und Ecken an
  und will RGB; die Datei liegt jetzt deckend auf `#faf9f7`.
- Neues **Maskable-Icon** für Android (`purpose: "maskable"` im Manifest, neben
  den bestehenden `"any"`-Icons). Das Motiv sitzt bei **204,6 px** von erlaubten
  204,8 px der 80-%-Sicherheitszone; der Bauschritt bricht mit `assert` ab,
  falls das je überschritten wird.

**Kontrast — gemessen, und der Ausnahme wegen unkritisch:**

| Untergrund | Median | p25 |
|---|---:|---:|
| Header `#faf9f7` | 2,91:1 | 1,84:1 |
| Footer `#f6f4f0` | 2,80:1 | 1,78:1 |
| Tab dunkel `#202124` | 3,98:1 | 3,07:1 |

Der Median liegt auf hellem Grund **unter** den 3:1 von WCAG 2.1 SC 1.4.11.
Die Marke ist davon ausgenommen: das Kriterium erfasst „parts of graphics
required to understand the content", das Logo ist dekorativ (`alt=""`,
`aria-hidden`) und der Name steht daneben als Live-Text. Das W3C-Understanding-
Dokument sagt zudem ausdrücklich, dass Logos ausgenommen sind, solange die
Farben aus den Markenvorgaben stammen und nicht aus einer Gestaltungsentscheidung
des Autors — hier stammen sie aus der gelieferten Datei. Nachgelesen an der
Quelle, nicht aus dem Gedächtnis:
https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html

> Trotzdem festhalten: das Siegel ist auf Warmweiß **blass**. Eine kräftigere
> Fassung wäre eine Design-Entscheidung, keine Barrierefreiheits-Korrektur.

**Kein `srcset`.** `next.config.ts` setzt `images.unoptimized` (statischer
Export hat keinen Optimizer), `next/image` liefert also eine Datei. 256 px deckt
1×, 2× und 3× für beide Platzierungen ohne Hochskalieren ab (Footer 64 px × 3 =
192 px). Eine Aufteilung spärte rund 23 KB und kostete die automatischen
`width`/`height`, die CLS auf 0 halten.

**Nachgeprüft im Browser (chrome-devtools MCP), nicht angenommen:**

| Prüfung | Ergebnis |
|---|---|
| `npm run build` | erfolgreich, 12 statische Seiten, keine TS-Fehler |
| Alle 6 Routen + Manifest + 4 Icon-Dateien | alle 200 |
| Konsole | **keine** Fehler, keine Warnungen |
| Ausgeliefertes `logo-mark.webp` | byte-identisch zu `logo/wpl-logo-256.webp` |
| `favicon.ico` | 6 Frames (16–256), 16–64 Monogramm, 128/256 Siegel |
| Header-Box | 44 px (1440 px Viewport), 40 px (≤ 768 px) |
| Bild-Attribute | `width`/`height` gesetzt, Vorderseite **nicht** `lazy` |
| `alt` / Link-Label | `alt=""`, Link `aria-label` = Firmenwortlaut |
| 320 px × DPR 3 | kein horizontaler Überlauf, 16 px Luft zum Sprachumschalter, Logo 120 Gerätepixel aus 256er Quelle |
| Maskable-Sicherheitszone | 204,6 / 204,8 px |
| `apple-icon.png` | 180×180, **RGB ohne Alpha** |

**Bewusst nicht geändert:**

- **Das Vorstellungsvideo** — es zeigt weiterhin das flache Logo von 2026-08-15.
- **Die Eyebrow-Zeile** „INTERIOR DESIGN · ORDNUNGSCOACHING · WORKSHOPS" und
  der Text im `og-image.jpg` („INTERIOR DESIGN · PROFESSIONAL ORGANIZING")
  tragen noch die alte Beschreibung. Das ist Inhalt, nicht Logo — hier nicht
  angefasst, aber es fällt beim Teilen auf.
- **Kein `prefers-color-scheme`-Wechsel.** Die Seite ist bewusst hell
  (`color-scheme: light`, keine einzige Dark-Regel); es gibt keinen dunklen
  Untergrund, gegen den eine zweite Fassung nötig wäre.

**Rollback:** `git checkout main -- .` im Website-Repo bzw.
`git revert <commit>`; der alte Satz steckt unverändert in `main`.

## Aktuelles Ziel

Professionelle Business-Website für `Mag. Claudia Plessl — Raum & Ordnung`,
zweisprachig (Deutsch primär, Englisch sekundär), mit Impressum,
Datenschutzerklärung und AGB, gehostet auf GitHub Pages.

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
API-Keys und das Rohmaterial des Videos veröffentlicht.

**Dieses Repo ist öffentlich — hier darf nichts davon hinein.** Das private
Repo ist der Ort für Unterlagen, Rohmaterial und Musik.

## Umbenennung, 3D-Logo, KI-Bildhinweis (2026-08-17)

**Firmenwortlaut jetzt `Mag. Claudia Plessl — Raum & Ordnung`.** Er ersetzt die
beiden bisherigen Fassungen („… — Interior Design & Ordnungscoaching" auf `/`,
„… — Interior Design & Professional Organizing" auf `/en/`) und steht **in
beiden Sprachen gleich** — ein Firmenwortlaut wird nicht übersetzt.

Der Name liegt jetzt an einer Stelle: `CONTACT.businessName` in
`src/content/site.ts`. Davon getrennt bleibt `CONTACT.name` die natürliche
Person und trägt weiterhin Impressum, AGB und Copyright-Zeile.

| Stelle | vorher | jetzt |
|---|---|---|
| `<title>` `/` | … Interior Design & Ordnungscoaching \| Wien & NÖ | `Mag. Claudia Plessl — Raum & Ordnung \| Wien & Niederösterreich` |
| `<title>` `/en/` | … Interior Design & Professional Organizing \| Vienna … | `Mag. Claudia Plessl — Raum & Ordnung \| Vienna & Lower Austria` |
| `<title>` Rechtsseiten | `Impressum — Mag. Claudia Plessl` | `Impressum \| Mag. Claudia Plessl — Raum & Ordnung` (analog übrige) |
| `og:site_name` beide Sprachen | je eigene Fassung | `CONTACT.businessName` |
| Manifest `name` / `short_name` | … Ordnungscoaching / `Claudia Plessl` | `CONTACT.businessName` / `Raum & Ordnung` |
| Header `aria-label` | fix deutscher String | `CONTACT.businessName` |
| Header-/Footer-Wortmarke | `CLAUDIA PLESSL` | **`MAG. CLAUDIA PLESSL`** |
| Footer-Deskriptor | `Interior Design` | `RAUM & ORDNUNG` |
| Impressum / EN-Imprint Zeile 2 | Interior Design & … | `Raum & Ordnung` |

Der Trenner ist ein Geviertstrich; auf den Rechtsseiten trennt `|` statt eines
zweiten Geviertstrichs, damit im Titel nicht zwei Striche stehen.

**Logo:** `logo/logo-3d-transparent.png` (1254², freigestellt) ersetzt die
flache Neuzeichnung in allen Größen. Der Satz entsteht jetzt reproduzierbar über
`logo/build_logo_set.py` im privaten Repo; die Zuordnung Datei → Ziel steht
unverändert in der Tabelle unten.

> Die 3D-Quelle füllt ihre Leinwand stärker aus (85 % Höhenanteil statt 72 %).
> Das Skript normalisiert den Höhenanteil auf den alten Wert (735/1024). Weil
> Header und Footer über die Höhe skalieren, wirkt die Marke dadurch **exakt so
> groß wie vorher — am CSS musste nichts geändert werden.** Die unten
> beschriebene `h-14`-Korrektur von 2026-08-16 gilt unverändert weiter.

**KI-Bildhinweis:** Die Bilder der Seite sind KI-generiert. Neu ausgewiesen
- sichtbar im Footer **jeder** Seite (`content.footer.imageNotice`, zweisprachig),
- ausführlich im „Bildnachweis" des Impressums (der alte Text sprach von
  „Bildmaterial des Unternehmens" und war damit irreführend),
- in einem **neuen** Abschnitt `Image credits` (Anker `#images`) auf
  `/en/legal/` — dort fehlte ein Bildnachweis bisher ganz.

**Im Browser nachgeprüft (chrome-devtools MCP):**

| Prüfung | Ergebnis |
|---|---|
| Build | 12 statische Seiten, keine TS-Fehler |
| Titel/`og:site_name`/Manifest über alle 6 Routen | neuer Name überall |
| alte Namensvarianten im Build | **0 Treffer** |
| Konsole | keine Fehler (nur bekannte `next/font`-Preload-Warnungen) |
| Netzwerk | 41 Requests, alle 200, **keine Drittanbieter-Requests** |
| Logo-Dateien ausgeliefert vs. Quelle | byte-identisch (FNV-1a je Datei) |
| `favicon.ico` | 6 Frames 16–256 px |
| 320 / 375 / 1440 px | kein horizontaler Überlauf; bei 320 px 16 px Luft zwischen Wortmarke und Sprachumschalter |
| Sprachumschalter | `/` ⇄ `/en/` beidseitig |

**Nicht geändert:** das Vorstellungsvideo (zeigt weiter flaches Logo und
„Interior Design · Ordnungscoaching"; Änderung hieße Re-Render) und die
Ich-Form-Texte in `site.ts` („Ich bin Claudia Plessl …") — dort wäre „Mag."
gestelzt.

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

**Musik — am 2026-08-16 ersetzt.** Bis dahin lief ein Bed aus `I Want It All.mp3`
(Queen) mit ungeklärten Rechten. Jetzt: `casa_in_ordine.mp3`, ein mit **Suno**
erzeugtes Instrumental (Abschnitt 106,3–164,6 s), auf −30 LUFS normalisiert und
per `sidechaincompress` gegen die Stimme geduckt — **gemessen 15,6 dB** Absenkung
unter Sprache. Fertiger Mix −14,5 LUFS, Videospur byteidentisch (`5b518475…`).

Zwei frühere Angaben hier waren falsch und sind korrigiert:

- Der Queen-Bed duckte **16,5 dB**, nicht 10–11 dB (sauber über die vollen
  58,3 s auf gemeinsamem Zeitraster nachgemessen).
- Ein Musikwechsel ist **kein** Re-Render — alle Renders teilen dieselbe
  Videospur, die Musikvarianten entstanden immer als reiner Audio-Remux.

Die Kette liegt jetzt als Skript vor (`scripts/build_bgm_bed.sh`,
`scripts/render_web_mix.sh` im Video-Projekt); vorher war sie nirgends
festgehalten. Musikfreie Fassung weiterhin verfügbar:
`renders/claudia-plessl-promo-web-VO-only.mp4`. Der Musik-Bed wird bewusst
**nicht** ins öffentliche Repo committet.

**Offen:** ob der Suno-Tarif, unter dem der Titel erzeugt wurde, kommerzielle
Nutzung erlaubt.

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
