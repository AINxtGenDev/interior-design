# Session Checkpoint

## Meta

- Datum: 2026-10-09 abends (alles gepusht und live; Sitzungsende, bereit für /clear)
- Repository: `AINxtGenDev/interior-design` (public)
- Arbeitskopie: `/home/nuc8/05_development/55_laulau/78_plessl-website`
  (**verschoben am 2026-08-16** — vorher `/home/nuc8/05_development/78_plessl-website`)
- Live: **https://claudiaplessl.at/** (seit 2026-10-08; `www` und die alte
  URL `ainxtgendev.github.io/interior-design/…` leiten per 301 dorthin um)
- Status (2026-10-09): Website live auf CI-Stand, DE und EN, Video **58 s** live. Am 2026-10-09 per
  Screenshot-Aufträgen umgesetzt und live (Einzelheiten je Abschnitt unten): „Für wen ich arbeite"
  entfernt · Ordnungscoach „(i.A.)" · „Gepr. ArbeitsplatzExpertin" ergänzt · „Laufende Fortbildung"
  entfernt · Projekte-Collage `Bild Projekte.png` · Pakete & Preise auf `#e9eaec` · vCard-QR im Kontakt · **Video Frame 1 neues Schrankbild** (`6ee860b`) · **Video Frame 3 Logo unter der Linie** (`7e8fd77`) · Video-Bildunterschrift ohne Dauer (`c7d5c23`) · **Video Frame 4 neue Bilder Ordnung/Gestaltung** (`09c724f`) · **Video Szene 6 „Warum mit mir" gestrichen, Film 58 s** (`2e5f248`). · **Workshops ohne Preis/Aufzählung, Paket „Workshop" entfernt (7 Pakete)** (`a1222f5`) · **Über mich: Qualifikation als eigener Kartenblock, Grundsätze rechts unter dem Text** (`675ab16`) · **Handout auf Website-Stand** (`8223bd2`, nur lokal, nicht deployt) · **Impressum: GISA/Gewerbewortlaut/BH Tulln, UID entfernt** (`8ecf358`) · Impressum ohne „Raum & Ordnung"-Zeile (`7d4d580`) und ohne „WKNÖ" (`9ec6c39`) · Datenschutz „Datenübermittlung in die USA" (`e2dd379`) · AGB: Kleinunternehmerregelung, Anzahlung, Storno, Workshops (`24433dc`…`f12d7c0`) — **keine Platzhalter mehr auf der Website** · Handout mit AGB-Kernpunkten.
  Letzte Prüfung (2026-10-09 abends, Stand `46ca1d9`, live): 6 Seiten + robots/sitemap/manifest 200; alle 25 verlinkten
  Assets 200; JSON-LD parsebar; 7 Pakete, kein „350", Qualifikationsblock da; Impressum 2× GISA, kein UID, FG gesetzt;
  Browser 393 px alle 6 Seiten: kein Überlauf, keine kaputten Bilder, keine Konsolenfehler. Davor (`2e5f248`): `vorstellung.mp4` (`3f7edc26…`), `-de.vtt`, `-poster.jpg` live = lokal; JSON-LD `PT58S`. Lighthouse mobil `/` (lokal) zuletzt 100/100/100/100 (vor den Video-Änderungen, nicht neu gemessen).
- **Offen — mit Claudia klären:**
  - ArbeitsplatzExpertin: Beschreibungszeile, EN-Titel „Certified Workplace Expert", Schreibweise
    „Mensch & Büro-Akademie".
  - EN-Projekte-Collage (DE-Collage hat Texte eingebrannt; EN zeigt flache Live-Text-Kacheln).
  - Rosa Linie/Kartenränder in Pakete & Preise auch grau? (bewusst nicht geändert)
  - ~~Workshops „in Kürze" vs. Preise~~ (erledigt: Preis + Paket entfernt); „Zahlreiche umgesetzte Projekte" vs. Projekte-Text;
    ~~Video sagt noch „Zertifizierter Ordnungscoach"~~ (erledigt: Szene 6 gestrichen); ~~Handout veraltet~~ (erledigt 2026-10-09).
  - Re-Design-Text bestätigen; Firmenwortlaut „Raum & Ordnung" vs. Logo-Unterzeile; rechtliche
    Platzhalter: keine mehr — Impressum, Datenschutz und AGB vollständig (2026-10-09).
- Ungetrackt im Repo-Root, **bewusst nicht committen** (Nutzer 2026-10-09): `Logo_kurz.png` = Initialen des Nutzers („my initials");
  `Video Ordnung Gestaltung.png` = nur zum Testen.
  Neu aufgetaucht, Zweck noch offen (nicht angefasst): `Video Start.png`, `Video Start_landscape.png`.
- Arbeitsweise: Änderung → `tsc`/`eslint`/`npm run build` → lokal `out/` auf Port 5000 im Browser prüfen →
  Commit + Push → Deploy abwarten → Live per curl prüfen → Checkpoint „LIVE" nachtragen.
  Video-Änderungen: Frame in `79_plessl-video/…/compositions/frames/` → `npm run check` → `hyperframes@0.8.2 snapshot`
  → Critic-Subagent → `render -q standard --crf 26 -o renders/claudia-plessl-promo-web-VO-only.mp4` → MD5-Wächter in
  `scripts/render_{vo_only,web_mix}.sh` nachziehen → beide Skripte → MP4 nach `website/public/video/vorstellung.mp4`,
  geänderte Frames nach `video-source/` spiegeln. Lokal Video prüfen nur mit Range-Server
  (`npx http-server@14.1.1 -p 5000 -s` in `website/out`; `python -m http.server` kann nicht seeken) und `?cb=` gegen Cache.
- Nächste Schritte: offene Punkte oben mit Claudia klären; Video-Takes abhören lassen (Key bis ~2026-10-15).

## AGB: Kleinunternehmerregelung festgelegt (2026-10-09, Nutzerauftrag) — **LIVE** (`24433dc`, Deploy `37969847549` success; live `/agb/` 200, Satz da, Platzhalter weg)

- `src/app/(de)/agb/page.tsx`, Punkt 4: Platzhalter „[Vor Veröffentlichung festlegen: Umsatzsteuer-Status] — Bei Anwendung …"
  → „Es gilt die Kleinunternehmerregelung gemäß §&nbsp;6 Abs. 1 Z 27 UStG. Es wird daher keine Umsatzsteuer ausgewiesen;
  Rechnungen enthalten den Hinweis „Umsatzsteuerbefreit aufgrund der Kleinunternehmerregelung"." Fassung → Oktober 2026.
- Zitat geprüft auf RIS (UStG 1994 § 6, Gesetzesnummer 10004873): Abs. 1 Z 27 = „die Umsätze der Kleinunternehmer", Grenze 55 000 Euro.
- Nachtrag (Nutzerauftrag per Screenshot): Punkt 5 Anzahlung → „Bei Aufträgen ab einem Auftragswert von EUR 600 kann eine
  Anzahlung von 30 % vereinbart werden." (geschützte Leerzeichen; Nutzertext hatte „Auftragwert" — Schreibweise „Auftragswert" beibehalten).
  **LIVE** (`f6525ca`, Deploy `37970072535` success).
- Nachtrag (Nutzerauftrag): Punkt 7 Storno → bis 7 Tage vorher kostenfrei · bis 48 Stunden vorher 50 % · später/Nichterscheinen 100 %
  des vereinbarten Honorars. **LIVE** (`84d4d2f`, Deploy `37970299918` success).
- Nachtrag (Nutzerauftrag): Punkt 8 Workshops → Mindestteilnehmerzahl 5 Personen, Absage durch die Veranstalterin bis 5 Tage vor dem
  Termin. **LIVE** (`f12d7c0`, Deploy `37970552284` success; live alle 6 Seiten 200, 0 Platzhalter).
- **Keine Platzhalter mehr auf der ganzen Website** (0 `<mark>` in allen 6 Seiten). Dadurch verwaiste `Todo`-Komponente aus
  `LegalShell.tsx` entfernt (Imports in AGB entfernt).
- Geprüft: build grün; Text im gebauten HTML; 6 Routen lokal 200; `/agb/` 393 px ok, „§ 6" nicht getrennt, keine Konsolenfehler.

## Datenschutz: Abschnitt „Datenübermittlung in die USA" (2026-10-09, Nutzerauftrag per Screenshot + Text) — **LIVE** (`e2dd379`, Deploy `37969232002` success; live `/datenschutz/` 200, Abschnitt da, Platzhalter weg)

- `src/app/(de)/datenschutz/page.tsx`: Platzhalter („vor Veröffentlichung prüfen … DPF und/oder SCC") samt Absatz unter
  Hosting entfernt; neuer eigener Abschnitt nach „Hosting und Server-Logfiles" mit dem Nutzertext wörtlich: GitHub DPF-zertifiziert,
  Angemessenheitsbeschluss Art. 45 Abs. 1 DSGVO (DB (EU) 2023/1795 vom 10.07.2023); Links als sichtbare URLs (`break-all`):
  GitHub General Privacy Statement (`docs.github.com/en/…`) und DPF-Register `participant/6174`. Stand → Oktober 2026.
  Datenschutz hat damit **keine `<Todo>` mehr** (Import entfernt). EN-Legal (`/en/legal/`) unverändert (nennt nur Hosting bei GitHub, USA).
- Geprüft: build grün; Text zeichengleich im gebauten HTML; beide Links 200; DPF-Register im Browser: 6174 = **GitHub, EU-U.S. DPF
  „Active", nächste Rezertifizierung 2027-08-03** (UK-Extension ebenfalls aktiv); 393 px ohne Überlauf, keine Konsolenfehler.
- Hinweis: DPF-Status vor 2027-08-03 erneut prüfen.

## Impressum: „WKNÖ" aus der Mitgliedschaft entfernt (2026-10-09, Nutzerauftrag per Screenshot) — **LIVE** (`9ec6c39`, Deploy `37967943630` success; live kein „WKNÖ", FG vorhanden)

Jetzt: „Mitgliedschaft: Wirtschaftskammer Niederösterreich, FG Persönliche Dienstleister". Geprüft: build grün, 6 Routen lokal 200,
`/impressum/` 393 px ok, keine Konsolenfehler.

## Impressum/Legal: Zeile „Raum & Ordnung" unter dem Namen entfernt (2026-10-09, Nutzerauftrag per Screenshot) — **LIVE** (`7d4d580`, Deploy `37967736056` success; live `/impressum/` + `/en/legal/` 200, Zeile weg)

Anschriftblock jetzt Name → Straße → PLZ Ort → Land. Gleicher Block auch in `/en/legal/` → dort ebenfalls entfernt.
Markenname „Mag. Claudia Plessl — Raum & Ordnung" (`CONTACT.businessName`, Seitentitel, Footer, JSON-LD) unverändert.
Geprüft: tsc/eslint/build grün; 6 Routen lokal 200; `/impressum/` 393 px Screenshot ok, kein Überlauf, keine Konsolenfehler.

## Impressum: GISA-Zahlen, Gewerbewortlaute, BH Tulln; UID entfernt (2026-10-09, Nutzerauftrag) — **LIVE** (`8ecf358`, Deploy `37966895387` success; live `/impressum/` 200, beide GISA-Zahlen + BH Tulln vorhanden, kein „UID")

- `src/app/(de)/impressum/page.tsx`: Platzhalter ersetzt durch Nutzerangaben — **zwei Gewerbe**: GISA 40024813
  (Geomantische Beratung (Feng-Shui) sowie Erstellung von Einrichtungsvorschlägen … ergonomischen Gesichtspunkten) und
  GISA 40024837 (Beratung privater Haushalte betreffend das Aussortieren nicht mehr benötigter Güter (Aufräumcoach)),
  Wortlaute wörtlich übernommen. Gewerbebehörde: **Bezirkshauptmannschaft Tulln**. **UID-Zeile entfernt.** Stand → Oktober 2026.
- `schema.ts`: nur Kommentar zu `vatID` angepasst (keine UID).
- Nachtrag (Nutzerauftrag): Mitgliedschaft „Wirtschaftskammer Niederösterreich, FG Persönliche Dienstleister" (WKNÖ später entfernt) —
  Impressum hat damit **keine `<Todo>`-Platzhalter mehr** (ungenutzten `Todo`-Import entfernt). **LIVE** (`2a1142e`, Deploy `37967169338` success). Unverändert: „Unternehmensgegenstand" (nennt noch
  „Trainings und Workshops", kein Feng-Shui) und EN-Legal-Kurzfassung (verweist nur auf das DE-Impressum).
- Geprüft: tsc/eslint/build grün; gebautes `/impressum/` enthält beide Wortlaute zeichengleich, kein „UID"; 6 Routen lokal 200;
  393 px ohne Überlauf, keine Konsolenfehler.

## Handout an Website angeglichen (2026-10-09, Nutzerauftrag) — **gepusht**, nicht Teil des Deploys (`8223bd2`)

`handout/claudia-plessl-uebersicht.html` (nur lokal, nicht deployt) inhaltlich auf DE-Website-Stand, Design unverändert:
Kopfzeile „Raumgestaltung · Ordnungscoaching", Hero-Text; „Drei Leistungen" → **„Mein Angebot"** mit den 4 Angeboten
(Texte, Punkte, „ab"-Preis je Karte) + Workshops „Werden in Kürze angeboten."; **7 Pakete** wie Website (Re-Design-Beratung 280,
Gestaltungsberatung 320, kein Workshop); Ablauf- und Preis-Fußnote wortgleich; Qualifikation = 3 Website-Einträge
(„Laufende Fortbildung", „Zertifizierter Ordnungscoach" ohne i.A. weg); Fußzeile „Stand Oktober 2026".
Geprüft: Skript vergleicht mit `website/out/index.html` — 7/7 Pakete inkl. Inhalt/Preis, jeder Handout-Satz wortgleich auf der
Website; 393 px hell + dunkel ohne Überlauf, keine Konsolenfehler. Rollback: `git revert 8223bd2`.

Nachprüfung 2026-10-09 abends (Nutzerauftrag „update the handout to match the website"): seit `8223bd2` nur Impressum-Änderungen
(GISA/UID/FG/„Raum & Ordnung"-Zeile/WKNÖ) — Handout enthält keine Impressum-Angaben; Skriptvergleich: alle Handout-Texte wortgleich
auf der Website außer handout-eigenen Formulierungen (Kopfzeile, einzeilige Anschrift, Linktext, Fußzeile) → **keine Änderung nötig**.
Erneut geprüft nach Datenschutz-Änderung (`e2dd379`): Handout enthält keine Datenschutz-Inhalte (Fußzeile verweist nur auf die
Website), Skriptvergleich unverändert → **keine Änderung nötig**.
Erneut geprüft nach AGB-Änderungen (`24433dc`…`f12d7c0`): Handout enthält keine AGB-Bedingungen (Anzahlung/Storno/Workshops);
Kleinunternehmer-Satz identisch mit Preis-Fußnote der Website → **keine Änderung nötig**.
**AGB-Kernpunkte ergänzt (2026-10-09, Nutzerauftrag):** neuer Abschnitt „Wichtige Bedingungen" nach „So arbeiten wir zusammen":
Karte „Zahlung" (14 Tage, Anzahlung 30 % ab EUR 600) und „Termine & Storno" (7 Tage kostenfrei / 48 h 50 % / später 100 %,
einmalige Verschiebung kostenfrei, wichtiger Grund ohne Gebühr) — wortgleich aus AGB Punkt 5 und 7; Einleitungssatz ohne Verweis
auf Punkt 6 gekürzt; Hinweis „Auszug — es gelten die vollständigen AGB auf claudiaplessl.at/agb". Workshop-Bedingungen bewusst
weggelassen (Workshops „in Kürze"). Geprüft: Textvergleich mit gebautem `/agb/`, 393 px hell + dunkel, Link erreichbar, keine Konsolenfehler.

## Über mich: Qualifikation als eigener Block (2026-10-09, Nutzerauftrag per Screenshot) — **LIVE** (`675ab16`, Deploy `37964809805` success; live DE/EN 200, neuer Block vorhanden)

- „Qualifikation" nicht mehr in der Porträt-Grid-Spalte, sondern eigener Unterabschnitt **unter** dem Grid, weiter in
  `#ueber-mich`: Trennlinie (`border-t`), H3 + Blush-Rule, 3 weiße Karten (Erfahrung · Ordnungscoach i.A. · ArbeitsplatzExpertin)
  mit abwechselnd Salbei/Blush-Oberkante wie die Angebotskarten; `md:` 3 Spalten, mobil gestapelt. `dl`-Semantik bleibt.
- Folgeänderung Layout: Porträt jetzt `lg:row-span-2` links, Text **und** „Worauf Sie sich verlassen können" rechts
  (vorher Grundsätze links unter dem Porträt → rechts große Lücke). Mobile Reihenfolge unverändert: Porträt, Text, Grundsätze, Qualifikation.
- Nur `HomePage.tsx`; Inhalte/JSON-LD unverändert.
- Getestet lokal (chrome-devtools): tsc/eslint/build grün; DE 1440 px Screenshot ok; 768 px 3 Karten à 219 px, 393 px EN gestapelt,
  kein Überlauf, keine Konsolenfehler.
- Rollback: `git revert 675ab16`.

## Workshops: Preis und Aufzählung entfernt, Paket „Workshop" aus Pakete & Preise (2026-10-09, Nutzerauftrag per 2 Screenshots) — **LIVE** (`a1222f5`, Deploy `37963634201` success; live DE/EN 200, kein „350", 7 Pakete)

- Workshops-Karte (DE/EN) zeigt nur noch „Außerdem · Workshops & Training · Werden in Kürze angeboten." — Preislink
  „Workshop ab EUR 350" und die 5 Aufzählungspunkte weg; Karte einspaltig (`HomePage.tsx`).
- Paketzeile „Workshop … ab EUR 350" aus `dePackages`/`enPackages` entfernt → **7 Pakete** (B2B-Kompakt jetzt Index 6).
  `services.workshops` hat dafür kein `price`/`points` mehr (Typ `Pick<Service, "id"|"title"|"lead">`) — sonst hätte
  `dePackages[6]` still auf B2B-Kompakt gezeigt.
- JSON-LD (`schema.ts`): Service „Workshops & Training" bleibt, aber ohne `hasOfferCatalog`; Paketkatalog 7 Einträge.
- Nav-Eintrag „Workshops" und `knowsAbout` unverändert (Karte existiert weiter).
- Getestet lokal (`out/`, chrome-devtools): tsc/eslint/build grün; 6 Routen 200; DE 1440 px + EN 393 px mobil: Tabelle 7 Zeilen,
  kein „350" im HTML, kein Überlauf, keine Konsolenfehler.
- Nicht geändert: `handout/claudia-plessl-uebersicht.html` nennt Workshops noch mit Aufzählung (Handout ohnehin veraltet).
- Rollback: `git revert a1222f5`.

## Video: Szene 6 „Warum mit mir" gestrichen, Film 58,2 s (2026-10-09, Nutzerauftrag) — **LIVE** (`2e5f248`, Deploy `37962189609` success)

Rückfrage per Auswahl → Nutzer: **ganze Szene + Sprechzeile** entfernen (Bildtexte „Über 10 Jahre …", „Zertifizierter
Ordnungscoach (in Ausbildung)", „Diskret, ohne Urteil", „Ein System, das bleibt"; VO Zeile 6).
- Videoprojekt (`85ae957`): Frame 6 aus `index.html` und Datei gelöscht; Frame 7 Start 62,2 → **48,2 s**; Film 72,2 → **58,2 s**.
  `vo-timeline.wav`: 48,2–62,2 s herausgeschnitten (beide Schnitte in Sprechpausen; Rest sample-identisch geprüft).
  `bed.mp3` mit `build_bgm_bed.sh casa_in_ordine.mp3 106.3` neu auf 58,2 s (−33,4 LUFS, Ausblendung am neuen Ende).
  VTT: Cues 8/9 weg, Endkarten-Cue 48,2–54,4 s (VO-Einsatz gemessen 48,21 s). Videospur-MD5 `3f15caa9…`, −14,5 LUFS.
- Bild 0–48,2 s unverändert (alle Frames PSNR ≥ 60 dB), Endkarte = alte 62,2–72,2 s bis auf Encoderrauschen (SSIM 0,998).
- Website: `vorstellung.mp4` + `-de.vtt` neu, `schema.ts` `VIDEO_DURATION` `PT1M12S` → `PT58S`, `VIDEO_UPLOAD_DATE` → 2026-10-09
  (Datei heute mehrfach geändert). Poster t = 29 s pixelgleich → unverändert. Überschrift „In einer Minute erklärt" passt jetzt wieder.
- Getestet lokal (chrome-devtools): iPhone 15 393×852 DE — Dauer 58,2, 8 Cues, Endkarte ok, Bildunterschrift „Vorstellungsvideo",
  kein Überlauf, keine Konsolenfehler; Desktop 1920×1080 EN — 58,2 s, Player 360 px, „Introduction". Alle 9 lokalen Pfade 200.
- Hinweis `npm run check`: neue Kontrast-Warnung in **Frame 5** bei t = 42,03 s (Station mitten im Einblenden, 2,37:1) — Frame 5
  unverändert, nur der Stichproben-Zeitpunkt verschob sich mit der neuen Länge.
- Rollback: `git revert 2e5f248` (Website) bzw. `git revert 85ae957` (Projekt).

## Video Frame 4: neue Bilder Ordnung | Gestaltung (2026-10-09, Nutzerauftrag) — **LIVE** (`09c724f`, Deploy `37960533665` success)

`Video Ordnung.png` (links) / `Video Gestaltung.png` (rechts), je 1122×1402 mit weißem Rand und **eingebranntem
Serifen-Label** (Fotokante 1205 vs 1158 — ungleich hoch). Nur Fototeil verwendet → `assets/video-{ordnung,gestaltung}.webp`
(548×1204 / 565×1157); die animierten CI-Labels (Montserrat) bleiben. Alte Bilddateien bleiben (in `capture/` referenziert).
- Layout neu: Panes 450×960 bei x 80/550 (vorher 500×940 mit 40 px Überlappung), Teilerlinie im 20-px-Spalt; Labels 32 → **42 px**,
  `text-indent` gleicht das Nachlauf-Letterspacing aus (Wortmitte = Panemitte ±1 px); Labels rücken bei 11,45 s ±40 zusammen.
- Zentrierung: bis 14,8 s Block y 440–1491 (Mitte 965,5); dann gleiten Panes+Labels 68 px hoch, Schlusszeile kommt → y 372–1551 (Mitte 961,5).
- Critic Runde 1 **REJECT** (Teiler-Stummel 77 px schwebte im Spalt; Labels ≈ 5 px auf iPhone SE; 68 px dezentriert) → alle drei behoben
  (Teiler schrumpft auf 0). Nur 19,4–37,8 s geändert. Videospur-MD5 `66d11790…`, −14,5 LUFS; Datei 5,3 MB (vorher 4,27 — detailreichere Bilder).
- **Poster neu** (t = 29 s liegt in Frame 4): `ffmpeg -ss 29 … -q:v 5` → 145 KB.
- Rollback: `git revert 09c724f` (Website) bzw. `git revert 662eeee` (Projekt).

## Video-Bildunterschrift ohne Laufzeit (2026-10-09, Nutzerauftrag) — **LIVE** (`c7d5c23`, Deploy `37957513816` success)

`video.caption` in `site.ts`: „Vorstellungsvideo, 72 Sekunden" → „Vorstellungsvideo"; EN analog „Introduction, 72 seconds"
→ „Introduction" (nicht ausdrücklich verlangt, zur Konsistenz). Live per curl geprüft (DE/EN, kein „72 Sekunden" mehr).
JSON-LD `duration PT1M12S` bleibt (Maschinenangabe, weiterhin korrekt).

## Video Frame 3: Logo unter der Linie (2026-10-09, Nutzerauftrag) — **LIVE** (`7e8fd77`, Deploy `37957158925` success)

`Logo ohne cp.png` (Wortmarke + Unterzeile, **auf Schwarz, ohne Alpha**) → per Farb-Keying (Salbei `#657558`/Rosa)
freigestellt → `assets/logo-ohne-cp.webp` (lossless, 1266×281, kein Schwarzsaum). In F3 760 px breit unter der
Haarlinie; Porträt + Linie + Logo als Gruppe zentriert (Inhalt y 412–1503, Mitte 957,5; Porträt 423–1231,5, Linie
1263,5, Logo 1328,5–1497). Linie gleitet jetzt 0,0–0,7 s um +83,5 px nach unten (vorher −60 hoch), damit sie das
einblendende Porträt nie kreuzt. Logo blendet bei 3,7 s ein (VO „Ich bin Claudia Plessl" ab 3,63 s).
Critic: **APPROVE** (Unterzeile auf iPhone SE ≈ 7,6 px — als Logo akzeptiert). Nur 12,5–19 s geändert.
Videospur-MD5 `cbe2da29…`, −14,5 LUFS. Lokal iPhone SE geprüft; live 6 Routen 200, MP4 SHA-256 = lokal.
Hinweis: der Browser zeigte lokal erst den alten Film aus dem Cache — mit `?cb=` neu laden.
Rollback: `git revert 7e8fd77` (Website) bzw. `git revert 65da12e` (Projekt).

## Video Frame 1: neues Schrankbild, Text oben/unten (2026-10-09, Nutzerauftrag) — **LIVE** (`6ee860b`, Deploy `37954240052` success)

Screenshot-Auftrag: Bild durch `Schank unordentlich.png` ersetzen, darüber „Der Schrank ist voll. / Der Tisch auch.",
darunter „Und am Wochenende reicht die Zeit nur fürs Nachräumen." — plus Qualitätsvorgabe (Mobile-Lesbarkeit,
exakte Zentrierung, Visual-Quality-Critic-Subagent, iterativ).
- Videoprojekt (`plessl-projekt` `cb003fe`): F1 als Flex-Block auf Bildmitte (gemessen Mitte y=960,5, L/R ±3 px),
  Manrope 500 **70 px** (vorher 52), Bild 820×860 (`object-position 50% 40%`), Abstände 44 px; Inhalt y 329–1592
  (Keep-out oben 154 / unten 1632 frei). Haarlinie zieht jetzt in **F2** bei 0,45 s (Bild deckt y=1180); F2-Ghost
  an neues Layout angepasst. Nur 0–12,5 s geändert (alle späteren Frames PSNR ≥ 60 dB zum alten Film).
- Subagenten: Device-Validator (Playerbreite je Gerät) + Visual Quality Critic: Runde 1 **REJECT** (64 px ≈ 13 px auf
  iPhone SE, Unterzeile breiter als Bild, knapp am Keep-out) → Runde 2 **APPROVE**.
- Effektive Schrift: iPhone SE (Player 216–263 px) ≈ 14 px, typische Handys ≈ 17–19 px, Desktop/iPad (360 px) ≈ 23 px.
- Render `hyperframes@0.8.2 -q standard --crf 26`, Videospur-MD5 `a4106c84…` (Wächter in beiden Mix-Skripten),
  −14,5 LUFS, 72,2 s, Datei 4,27 MB (vorher 3,9). Poster (t = 29 s) und VTT unverändert.
- Lokal geprüft (chrome-devtools, Range-Server nötig — `python -m http.server` kann nicht seeken): iPhone SE, Pixel 8,
  iPad, Laptop 1366×768 — zentriert, kein Überlauf, keine Konsolenfehler. Live: 6 Routen 200, `vorstellung.mp4` SHA-256 = lokal.
- `video-source/` war seit 2026-10-08 veraltet → komplett mit dem Videoprojekt synchronisiert.
- Bekannt/akzeptiert: pausiert legt Chromes Steuerleisten-Verlauf sich leicht über die Unterzeile; eingeschaltete
  Untertitel überdecken sie (Untertitel standardmäßig aus). Critic-Hinweis außerhalb des Auftrags: F2-Satz ist linksbündig.
- Rollback: `git revert 6ee860b` (Website) bzw. `git revert cb003fe` (Projekt).

## vCard-QR ersetzt — jetzt mit Telefonnummer (2026-10-09, Nutzerauftrag) — **LIVE** (`636c596`, Deploy `37899401393` success)

Neue `claudia-plessl-vcard-logo-cp.svg` vom Nutzer (930², **85 Module**, Fehlerkorrektur H, Logo-Mitte) ersetzt die
alte in `website/public/` (gleicher Name, kein Code-Pfad geändert; nur Kommentar 81 → 85 Module).
Dekodiert: wie vorher **plus `TEL;TYPE=CELL:+43 664 15 17 650`** (= Telefonnummer der Website).
Lesbarkeit: SVG gerendert → zxing ab 120 px, OpenCV ab 400 px (240 ✗); **Browser-Screenshot 288 px, DPR 1
(3,27 px/Modul): zxing ✓, OpenCV ✓**, OpenCV 2× ✓. Keine Konsolenfehler, kein Überlauf.

## vCard-QR im Kontaktabschnitt (2026-10-09, Nutzerauftrag) — **LIVE** (`ae4472b`, Deploy `37897499665` success)

`claudia-plessl-vcard-logo-cp.svg` (vom Nutzer, 890², 81 Module, Fehlerkorrektur **H**, CP-Logo 13×13 Module
in der Mitte, eigene weiße Ruhezone) nach `website/public/` verschoben; links unter den Kontakt-Buttons als
`<figure>` 288×288 CSS-px mit Bildunterschrift + Alt-Text DE/EN (`contact.qrAlt`, `contact.qrCaption`).
Inhalt (dekodiert): N/FN, Adresse, E-Mail, URL — alles ohnehin öffentlich; **keine Telefonnummer**.
Lesbarkeit geprüft (zxing-cpp + OpenCV): SVG gerendert 120–890 px → zxing ab 120, OpenCV ab 240;
Browser-Screenshot bei 288 px/DPR 1 → zxing ✓, OpenCV erst bei DPR 2 ✓ (Handys/Laptops); Kontrast 6,1:1.
`<dl>` rechts `content-start`, sonst zog der höhere linke Block die Zeilen auseinander.
Lighthouse mobil `/en/` 100/100/100/100, kein Überlauf (passt auf 320 px: 288 + 2×16).
Empfehlung: einmal mit echtem Handy vom Bildschirm scannen.

## Pakete & Preise: Hintergrund Blush → `#e9eaec` (2026-10-09, Nutzerauftrag per Screenshot) — **LIVE** (`d4f4156`, Deploy `37895991378` success)

`#e9eaec` = CI-Token `anthrazit-light` (Folie 5). `Section`-Ton `blush` (`bg-blush-light`, nur hier benutzt)
→ `anthrazit` (`bg-anthrazit-light`), DE und EN. Folge: Preis-Fußnote in `anthrazit-mid` hätte auf dem neuen Grund
nur 4,26:1 (AA braucht 4,5:1) → Fußnote jetzt `anthrazit-dark` (10,9:1). Rosa Kartenrand (`blush-soft`) und
Blush-Linie unter der Überschrift unverändert. Build/tsc/eslint grün; Lighthouse mobil `/` 100/100/100/100, 0 Fehler.

## Projekte-Raster durch `Bild Projekte.png` ersetzt (2026-10-09, Nutzerauftrag) — **LIVE** (`d29a22a`, Deploy `37895386330` success; live DE/EN 200, alle 4 Bilder 200)

Neue Kunden-Collage (1254², 2×2, **deutsche Kacheltexte eingebrannt**: „Räume, die gut tun." /
„Organisation trifft Ästhetik.") im Repo-Root, gebaut von `build_projects()` in `brand/build_web_assets.py`.
- **DE:** Collage als ein Bild (`projects-{640,1254}.webp`, srcset), Alt-Text beschreibt alle 4 Felder
  (`projects.collageAlt`, nur DE gesetzt → steuert die Darstellung).
- **EN:** HTML-Raster mit englischen Live-Text-Kacheln bleibt, die zwei Fotos kommen jetzt aus der Collage
  (`projects-{living,order}-610.webp`, 2 px innerhalb der gemessenen Stege geschnitten). EN-Kacheln
  sind weiterhin flach (ohne Blattschatten/Serifenschrift der DE-Collage) — englische Collage nur, falls
  Claudia eine liefert.
- `detail-{living,order}.webp` entfernt (verwaist). Asset-Neubau: alle übrigen Dateien byte-identisch.
- Build/tsc/eslint grün; lokal DE/EN geprüft: richtige Bilder geladen, keine Konsolenfehler, kein Überlauf.

## Qualifikation „Laufende Fortbildung" entfernt (2026-10-09, Nutzerauftrag per Screenshot) — **LIVE** (`33af442`, Deploy `37893421377` success)

Eintrag „Laufende Fortbildung" / „Continuing education" (DE/EN) unter Über mich → Qualifikation entfernt; damit
auch aus JSON-LD `hasCredential` (enthält jetzt nur noch die ArbeitsplatzExpertin). Verwaister Kommentar in
`schema.ts` und README-Satz („ongoing training") nachgezogen. Build/tsc/eslint grün, lokal DE/EN geprüft.

## Qualifikation „Gepr. ArbeitsplatzExpertin" ergänzt (2026-10-09, Nutzerauftrag) — **LIVE** (`bff9d0f`, Deploy `37892861506` success; live DE/EN 200, Eintrag vorhanden)

Über mich → Qualifikation, nach dem Ordnungscoach: DE „Gepr. ArbeitsplatzExpertin", EN „Certified Workplace
Expert", Aussteller „Mensch & Büro-Akademie" (Nutzer schrieb „Mensch&Büro-Akademie"; Leerzeichen gesetzt —
offizielle Schreibweise nicht geprüft). **Keine Beschreibungszeile** (Kursinhalt unbekannt, nicht erfunden) →
`note` jetzt optional, `HomePage.tsx` rendert sie nur wenn vorhanden. Erworben → steht im JSON-LD
`hasCredential` (ohne `description`). Build/tsc/eslint grün, lokal DE/EN geprüft, keine Konsolenfehler.
**Offen:** Beschreibungszeile und EN-Titel von Claudia bestätigen lassen.

## „Zertifizierter Ordnungscoach (in Ausbildung)" → „(i.A.)" (2026-10-09, Nutzerauftrag; Schreibweise ohne Leerzeichen laut Nutzer) — **LIVE** (`241c5b2`, Deploy `37892624768` success)

Nur DE (`site.ts`, Über mich). EN bleibt „(in training)" — „i.A." ist auf Englisch unverständlich.
`inTraining: true` bleibt → weiterhin nicht im JSON-LD `hasCredential`. Vgl. offener Punkt B unten.
Hinweis: „i.A." heißt in AT meist „im Auftrag" — mehrdeutig, aber so im Kundendeck („(i.A.)").

## Abschnitt „Für wen ich arbeite" entfernt (2026-10-09, Nutzerauftrag per Screenshot) — **LIVE** (`0975e3d`, Deploy `37892070140` success; live `/` + `/en/` 200, Abschnitt weg)

Ganzer Abschnitt (3 Karten Familien / Umbruch / EPU) **DE und EN** entfernt, dazu Menüeintrag
„Für wen"/„Who I work with" unter „Mein Angebot", Anker `#fuer-wen` (`SECTION_IDS.audience`), Typ
`Audience`, Felder `nav.audience` und `audience` in `site.ts`. Paket-Spalte „Für"/`p.audience` bleibt
(anderes Feld). tsc/eslint/Build grün; lokal geprüft: Abschnitt und Menülink in DE/EN weg, keine
Konsolenfehler, kein Überlauf. Folge: Leistungen und Ablauf liegen jetzt beide auf Papiergrund
direkt hintereinander (größere Lücke, liest sauber). Meta-Description nennt die Zielgruppen weiterhin.
Alte Links auf `#fuer-wen` landen am Seitenanfang. Rollback: `git revert 0975e3d` + push.

## Homepage-Änderungen nach `Homepage Änderngen_081026.pptx` (2026-10-08) — **LIVE** (Deploy `37833797964`, success)

**Rollback-Punkt:** Tag `backup/pre-aenderungen-2026-10-08` (= `4eb4c06`, lokal, nicht gepusht) +
Tarball `../backups/plessl-website_2026-10-08_pre-aenderungen_4eb4c06.tar.gz` (ohne node_modules/.next).
Zurück: `git reset --hard backup/pre-aenderungen-2026-10-08` (nur nach Rückfrage).

Deck: 16 Folien. Folien 2–3 + 10–16 = Website, **Folien 4–9 = Vorstellungsvideo** (CI-Schrift,
Bild unaufgeräumter Schrank, Porträt auf Sage light statt Logo, neue Texte, Endkarte Logo/Bild/Kontakt,
**neuer gesprochener Satz → Voice-Clone neu**). Nutzerentscheid: erst Website, Video danach separat
in `79_plessl-video`. Folie 14 = Einleitungssatz „Drei Situationen…" weg; Folie 15 (leer) = unverändert;
EN wird mitübersetzt.

Umgesetzt (lokal, Build/Lint/TS grün):
- Header-Container `max-w-[1947px]` (Logo links / Menü rechts am Bildrand).
- Hero: < 640 px drei gestapelte Paneele (Wohnraum / Slogan / Garderobe), ab 640 px volles Bild;
  Laptop-Höhenbegrenzung (object-fit cover) entfernt → H1 auf 1366×768 unter dem Falz (bewusst).
  `build_web_assets.py`: `PANELS`, `living_panel()` (Slogan-Reste per Inpainting entfernt), `build_portrait()`.
  Alte `hero-{narrow,medium,wide}`-Dateien gelöscht.
- Texte DE/EN: Hero-Lead, Angebot-Lead, Raumgestaltung (Lead + 4 Punkte), Re-Design (Punkt + Preis),
  Workshops „Werden in Kürze angeboten.", Für-wen-Einleitung entfernt.
- Preise: Gestaltungsberatung 280 → **320**; neue Paketzeile **Re-Design-Beratung ab EUR 280** (Index-Verweise angepasst).
- Über mich: Porträt (`Portrait Homepage.png` aus Folie 6), Layout nach Folie 16, „Über 10 Jahre Erfahrung…",
  „Zertifizierter Ordnungscoach (in Ausbildung)" — in JSON-LD `hasCredential` herausgefiltert (`inTraining`).

**Stand Ende Sitzung:** lokal committet `cb76d4c..c9b59e7` (4 Commits), **nicht gepusht**.
Hero final: Hochformat < 768 px = Slogan-Paneel oben voll breit, Wohnraum | Garderobe nebeneinander
(gleiches Seitenverhältnis 0,897); sonst (≥ 768 px **oder** Querformat) volles Bild. Tailwind-Variante
`full` (Block-Form, zwei @media — Kurzform mit Komma verlor die Landscape-Regel!).
Mobile-Critic: produktionsreif (375×667: H1 bei 488 px; keine Überläufe 320–767; je Fall genau ein Bildsatz geladen).
Content-Verifier-Befunde eingearbeitet: EN-Meta, KI-Hinweis → „Raumbilder", Preiszeilen aufsteigend,
FAQ „per Grundriss und Fotos", README, `.gitignore` `*.pptx`.

**Offen — Entscheidungen Claudia/Nutzer:**
- A Workshops „in Kürze": Preis-Hinweis, Tabellenzeile, JSON-LD-Offer, Nav, Meta „…und Workshops", B2B „Teamworkshop" verkaufen sie weiter.
- B „Zertifizierter Ordnungscoach (in Ausbildung)" (Deck: „(i.A.)") — Alternative „Ausbildung zur zertifizierten Ordnungscoachin (laufend)".
- „Zahlreiche umgesetzte Projekte" vs. Projekte-Abschnitt „erste Projekte werden dokumentiert".
- Über-mich-Text „gebe ich das Handwerk in Workshops weiter" (Gegenwart).
- **Video (Blocker für Konsistenz):** sagt „Zertifizierter Ordnungscoach" (Ton, Bild, VTT) → Folien 4–9-Job.
- Handout `handout/` veraltet (EUR 280, zertifiziert, Workshops).
**Gepusht 2026-10-08 ~21:41** (`4eb4c06..1e261f2`, Nutzer: „commit and push"), Deploy `37833797964` success.
Live geprüft (curl, Cache-Buster): `/`, `/en/`, `/impressum/`, `/datenschutz/`, `/agb/` = 200;
`hero-phone-633`, `hero-en-phone-633`, `portrait-480` = 200; „Re-Design-Beratung", „320", „in Ausbildung",
„Über 10 Jahre Erfahrung", „Werden in Kürze angeboten" vorhanden, „Drei Situationen" weg.
Rollback live: `git revert 4eb4c06..HEAD` + push (oder Tag `backup/pre-aenderungen-2026-10-08`, nur nach Rückfrage).
**Video (Folien 4–9) live 2026-10-08 ~23:00** — `d3629ec`, Deploy `37843112338` success: neuer Film 72,2 s, 3,9 MB,
Poster t = 29 s, Untertitel 10 Cues, Caption „72 Sekunden"/„72 seconds", JSON-LD `PT1M12S`, Upload 2026-10-08.
Live-Dateien per SHA-256 = lokal. Einzelheiten und offene Punkte: Checkpoint `55_laulau`, Abschnitt „Video nach … Folien 4–9".
Nächster Schritt: offene Punkte oben + Video-Takes mit Claudia klären.
Lokale Vorschau (nach Deploy gestoppt): `python3 -m http.server 5000 --bind 0.0.0.0` in `website/out` (Port 5000 ist in ufw offen,
8765 nicht) → Handy im WLAN: `http://192.168.178.24:5000/`.

**Korrektur Nutzer (21:37): Handy muss das ganze Bild zeigen wie Folie 2 „Handy".** Das Handy-Mockup
(pptx `image2.png`, 637×1063) ist ein **eigenes Bild** von Claudia, kein Ausschnitt des Titelbilds →
als `Titelbild Handy.png` im Repo, Build schneidet 4 px links/1 px oben ab (`PHONE_CROP`) und malt für EN
die englische Headline (`english_headline()` parametrisiert, `PHONE_HEADLINE`: Cap 30, Tops 491/541, Achse 320).
Paneele (`PANELS`, `living_panel()`, `hero-{slogan,living,wardrobe}`) und Tailwind-Variante `full` entfernt;
`HeroImage.tsx` = ein `<picture>`: Hochformat < 768 px Handy-Bild, sonst volles Bild. Geprüft 390×844@3:
nur `hero-phone-633` geladen, Bild 391×655, H1 bei 764 px (knapp unter dem ersten Bildschirm — Kundenwunsch),
kein Überlauf; EN sauber; Querformat 844×390 → volles Bild. Auflösung 633 px = ~1,6× auf 3×-Handys
(leicht weicher) — höher aufgelöstes Original bei Claudia anfragen, falls vorhanden.

## CI-Redesign nach `CI.pptx` (2026-10-02) — **live**

Gepusht bis `6d8db34`, Deploy `36978097543` **success**. An der Live-URL geprüft:
alle 6 Routen + Manifest, Favicon, Poster 200; neue Inhalte DE/EN ausgeliefert
(inkl. EN-Hero-Overlay); `logo-480/960`, `hero-narrow-640/1077` und Poster
**byte-identisch** zur lokalen Fassung.

Auftrag: Website auf neue CI — `Logo2.png`, `Titelbild Homepage.png`,
`CI.pptx` Folien 4/5/6/9; DE **und** EN; sichtbarer DE|EN-Umschalter.

**CI aus dem Deck (Folien-XML/Medien entpackt):**
- Folie 4 Navigation: Home · Mein Angebot (Raumgestaltung, Ordnungscoaching,
  Raumgestaltung plus Ordnungscoaching, Re-Design) · Über mich · Projekte · FAQ · Kontakt.
- Folie 5 Palette (Sage/Blush/Anthrazit je 4 Töne, Grund `#FAFBFA`).
  Kontrast gemessen: blush-dark 3,3:1 → nur Deko/≥ 24 px.
- Folie 6: Manrope Bold/Regular, Montserrat Regular. Folie 9: „ENJOY YOUR HOME".

**Nachtrag (Nutzer, Android):** Auf `/en/` fehlte am Handy die Zeile
„INTERIOR DESIGN · PROFESSIONAL ORGANIZING" im Hero — war unter 640 px bewusst
ausgeblendet. Jetzt sichtbar, Größe `min(14px, 3.5cqw)` (12–14 px auf 360–430 px),
Overlay 72 % breit. Dabei einen eigenen Fehler gefunden: der Umbruchpunkt lag
**innerhalb** der `nowrap`-Spans → 34–48 px horizontaler Überlauf auf allen
Handys (vor dem Push gemessen, nie live). Leerzeichen jetzt zwischen den Spans;
geprüft auf 11 Breiten 320–1920: 2 Zeilen am Handy, kein Überlauf.

**Nachtrag 2 (Nutzer):** KI-Stimmhinweis unter dem Video (2 Sätze, DE/EN)
auf Wunsch entfernt — nach Rückfrage **gekürzt statt gestrichen**: die
Bildunterschrift direkt am Video lautet jetzt „Vorstellungsvideo, 58 Sekunden,
KI-generierte Stimme" / „Introduction, 58 seconds, AI-generated voice"
(EU AI Act Art. 50(4)/(5): Offenlegung beim ersten Kontakt). Feld
`video.voiceNotice` entfernt; Footer-Hinweis unverändert.

**Nachtrag 6 (Nutzer, 2026-10-02):** DE|EN-Umschalter startet die Seite jetzt
immer oben. Vorher trug `LangSwitch` auf der Startseite den aktuellen
`#abschnitt` mit (z. B. `#kontakt` → Sprung fast ans Ende). onClick entfernt,
Komponente ist kein Client-Component mehr. Lokal im Browser geprüft: DE `#kontakt`
→ EN y = 0, EN gescrollt → DE y = 0. Ausnahme bleibt: Rechtsseiten
(`impressum/` → `/en/legal/#imprint` usw.) springen auf den passenden Abschnitt.
**Live** (`d630c98`, Deploy `37003521424` success).

**Nachtrag 5 (Nutzer, 2026-10-02):** „KI-generierte Stimme" / „AI-generated
voice" aus der Bildunterschrift am Video entfernt — Begründung Nutzer: der
Footer-Hinweis (`footer.imageNotice`) nennt die KI-Stimme bereits. Unterschrift
jetzt „Vorstellungsvideo, 58 Sekunden" / „Introduction, 58 seconds". **Live**
(`26d83ed`, Deploy `36982930304` success; DE/EN-Unterschrift live geprüft).

**Nachtrag 3 (Nutzer, Android: „english is absolutely bad"):** Screenshot
zeigte `/en/` **ganz ohne CSS**. Live waren CSS und HTML zu dem Zeitpunkt
korrekt (beide 200). Ursache (sehr wahrscheinlich, nicht direkt beobachtet):
Pages liefert HTML mit `max-age=600`; drei Deploys in ~15 min, zwei davon mit
neuem CSS-Hash → gecachtes HTML zeigte auf gelöschte CSS-Datei. Fix:
`.github/keep-live-assets.sh` + Workflow-Schritt übernimmt vor dem Upload die
von der Live-Seite referenzierten `/_next/static/`-Dateien (inkl. Fonts aus
altem CSS). Lokal getestet: leeres Out → 34 Dateien übernommen, aktueller
Build → 0. Origin im Workflow beim Domainwechsel anpassen.
Workflow-Schritt live (`ee4945d`, Deploy success, „kept 0" — korrekt, CSS
unverändert).

**Open-Graph-Karten mit neuem Logo (2026-10-02, Nutzerauftrag) — live** (`bacb4c6`, Deploy `36982182100`; beide Karten live byte-identisch, `og:image` je Route korrekt, altes `og-image.jpg` 404; vom Nutzer freigegeben): Die alten
Karten hatten **gar kein Logo** (altes Foto mit schwarzen Balken, alte
Schriften). Neu erzeugt von `build_og()` in
`brand/build_web_assets.py`: Layout wie Kopfband von CI-Folie 5 — Logo2 auf
Papiergrund links (330 px, Blush-Linie), Haarlinie, rechts Titelbild (DE
Original-Slogan, EN gemalte englische Headline), Bildausschnitt ab x = 340,
damit „LESS CLUTTER MORE LIFE" nicht angeschnitten ist. Dateinamen unverändert
(`og-image-de/en.jpg`), Layouts/JSON-LD unverändert. Entfernt (verwaist,
`build_og_images.py` hätte die neuen Karten überschrieben):
`build_og_images.py`, `website/public/og-image.jpg`, `brand/fonts/Jost-latin.ttf`
— in Git-Historie. Alle anderen Assets byte-identisch beim Neu-Build.

**Vorstellungsvideo mit CI-Logo neu gerendert (2026-10-02) — live** (`ff62a5b`,
Deploy `36981729149`, Live-Datei byte-identisch; vom Nutzer freigegeben): `vorstellung.mp4` ersetzt (4,72 MB, 58,3 s, 1749 Frames).
Frame 3 + 7 zeigen Logo2 statt Siegel; alle übrigen Frames identisch
(0,000/255), Ton per Stream-Copy bit-identisch (Audio-MD5 `375e8a8c…`).
Poster bleibt (24 s, unverändert). JSON-LD `uploadDate` → 2026-10-02. Im
Browser geprüft: lädt, 58,3 s, Logo bei 18 s, keine Konsolenfehler.
Einzelheiten im Checkpoint des privaten Repos (`afa8676`).

**README nachgezogen (2026-10-02, Nutzerauftrag):** Abschnitt *Accessibility*
war veraltet („no mobile nav menu", alte Token-Namen, rotierendes Logo) →
neu geschrieben; *Intro film* um Poster-Wechsel, verbleibendes Siegel im Film
und KI-Offenlegung in der Bildunterschrift ergänzt; Tabelle *Verified on the
live site* als Stand 2026-08-19 gekennzeichnet.

**Nachtrag 4 (Nutzer) — live (`4dbfa99`, Deploy `36980764201`):** Bildunterschrift „Stimmungsbilder, KI-generiert —
keine Kundenprojekte." unter dem Projekte-Raster (DE/EN) entfernt — der
KI-Hinweis im Footer jeder Seite deckt die Bilder ab; der Abschnitt sagt
weiterhin, dass Projekte erst dokumentiert werden. Feld `projects.imageNote`
entfernt, `<figure>` → `<div>`.

**EN-Headline wie DE — live** (`e3ac5a3`, Deploy `36980241790` success). Live
geprüft: kein Overlay mehr im HTML, `hero-en-narrow-640` byte-identisch, neues
CSS 200. **Cache-Schutz bestanden:** dieser Deploy änderte das CSS, der neue
Schritt übernahm 8 Dateien, das vorige CSS `8e9cb15b…css` wird weiter mit 200
ausgeliefert → gecachte Seiten bleiben gestylt.

**Verlauf (Nutzer: „make the english headline look like german"):** EN-Hero
soll wie DE aussehen — gemalte Serifen-Headline im Bild statt Live-Overlay.
Plan: nur die 2 Headline-Zeilen entfernen (Strich-Maske, y 288–408), Blush-Linie
und Unterzeile „INTERIOR DESIGN • PROFESSIONAL ORGANIZING" bleiben Original-
pixel; „BEAUTIFUL SPACES. / A CLEARER DAY." in Serifenschrift einsetzen
(Kapitälchenhöhe 36 px, Zeilen-Oberkante y 304/364, Breite ~409 px, Mitte
x≈930, Farbe #3B4538). Schrift wird per Messung gewählt: 20 OFL-Kandidaten
(Google-Fonts-Repo) rendern „SCHÖNE RÄUME." und gegen das Original vergleichen.
Cormorant Garamond allein: Buchstaben zu breit → stoßen an.
**Ergebnis Schriftsuche:** Messung über 20 Kandidaten × 3 Gewichte mit
wortweiser Laufweite: **Playfair Display Medium** passt bei natürlicher
Laufweite (+0,4 px), Tintenmenge 1,00, Match 0,81 (nur Prata ähnlich; alle
anderen brauchen −3…−5 px Stauchung). Gegenprobe: deutsche Zeilen damit neu
gesetzt → 406/412 px gegen Original 409/409, optisch kaum unterscheidbar.
Schrift + OFL unter `brand/fonts/`.
**Umgesetzt:** `english_headline()` im Build-Skript ersetzt `remove_slogan()`
(nur die 2 Headline-Zeilen werden entfernt und englisch neu gemalt; Linie +
Unterzeile bleiben Originalpixel). Live-Overlay samt CSS (`.hero__*`,
Container-Units) und Feld `hero.descriptor` entfernt; EN-Alt-Text enthält den
gemalten Text. Neu-Build ändert nur die 7 `hero-en-*`-Dateien (DE + Icons
byte-identisch). Geprüft lokal: kein Überlauf 320–1920 DE/EN, Lighthouse mobil
`/en/` 100/100/100/100.

**Umgesetzt:** `globals.css` (Tokens, Typo-Skala, Base in `@layer base`),
`src/app/fonts.ts`, `site.ts` (Nav, 4 Angebote + Workshops mit Preis-Hinweis aus
der Paketliste, Projekte, FAQ, Claim, `LANG_ALTERNATES`), neue Komponenten
`BrandLogo`, `HeroImage`, `SiteNav`, `LangSwitch`; `HomePage`, `SiteHeader`,
`SiteFooter`, `IntroVideo`, `LegalShell`, Rechtsseiten angepasst;
`brand/build_web_assets.py` (Logo, 3 Hero-Crops DE + EN, Icons);
Video-Poster auf Frame t = 24 s (ohne altes Siegel); README-Abschnitte Logo/CI.
Entfernt: `LogoMark.tsx`, `logo-mark.webp`, `hero.webp` (Logo-Rotation entfällt).

**Reviews (3 Subagenten) — wichtigste Befunde und was daraus wurde:**
- Kontakt-H2 dunkel auf Dunkelgrün 2,4:1 (Basisregel ungelayert schlug
  `text-white`) → `@layer base`, jetzt 5,38:1.
- H1/CTA unter dem Fold auf Laptops → Hero-Höhe ab 1024 px gedeckelt; H1 + CTA
  sichtbar bei 1280×720, 1366×768, 1920×1080.
- Preise/Workshops nicht im Menü → unter „Mein Angebot" nach Trennlinie ergänzt.
- Redundanzen (Hero-Eyebrow, doppelte Sätze, Claim-Unterzeile) entfernt/umformuliert.
- Ablauf 4 → 2 Spalten (28 → ~55 Zeichen/Zeile), Notiz-Breite 40rem,
  Eyebrows 15 px, Umschalter 44 px hoch, Hyphenation für H1/H2, Punkt-Trenner
  nie am Zeilenanfang, Footer-Linie wie Folie 5, Blush-Kachel wie Folie 5.
- Bewusst NICHT umgesetzt: Projekte aus Nav nehmen (Folie 4 verlangt es),
  Leistungs-Bullets einklappen, Sticky-CTA, „€" statt „EUR" (Projektkonvention).

**Verifiziert lokal:** Build 14 Routen, tsc/eslint sauber; kein horizontaler
Überlauf auf 15 Viewports 320–2560 (DE/EN/Datenschutz); Lighthouse mobil `/` und
`/en/` **100/100/100/100**, 56 bestanden, 0 Fehler.

**Offen / Nutzer muss entscheiden:**
- **Re-Design**-Text ist aus der Branchenbedeutung formuliert → Claudia prüfen lassen.
- ~~Video zeigt im Film noch das alte Siegel~~ — **erledigt 2026-10-02**,
  Film mit Logo2 neu gerendert und live (siehe oben).
- Firmenwortlaut „Raum & Ordnung" (Meta/Impressum) vs. Logo-Unterzeile
  „interior design • professional organizing".
- ~~OG-Karten zeigen altes Bild/Schrift~~ — **erledigt 2026-10-02**, neu mit
  Logo2 und Titelbild, live (siehe oben).
- `Logo2.png` und `Titelbild Homepage.png` sind committet (Quellen des
  Build-Skripts, ohnehin öffentlich auf der Seite).
- Vom Nutzer freigegeben und gepusht: `b9bfe3f` (Assets), `edf16b4` (Redesign),
  danach Doku-Commit. `CI.pptx` **bewusst nicht** hier committet (öffentliches
  Repo) — am 2026-10-02 ins private Repo verschoben: `55_laulau/ci/CI.pptx`
  (`plessl-projekt` `b3c7643`, SHA-256 vor/nach identisch).

**Rollback:** `git revert edf16b4 b9bfe3f` und pushen (Deploy läuft automatisch).

## Video mit Claudias Stimme (2026-09-27) — **live**

Vom Nutzer freigegeben, gepusht bis `3f55a81`, Deploy `36337544189` **success**.
An der Live-URL geprüft: alle 6 Routen + VTT 200, `vorstellung.mp4` und VTT
**byte-identisch** zur lokalen Fassung, KI-Hinweis DE/EN ausgeliefert,
`uploadDate` 2026-09-27.

Das Vorstellungsvideo spricht jetzt mit Claudias replizierter Stimme — **gleiches
Skript (7 Zeilen), Bild byte-identisch** (Video-MD5 `e2619707…` vor und nach).

- Die Frames cuen ihre Animation auf Phrasenanfänge der alten Stimme. Jede neue
  Zeile wurde deshalb **nur über die Pausen** ans Bild gelegt: jeder Cue-Phrase
  beginnt 0,45 s vor bis 0,10 s nach dem alten Einsatz, keine Sprache gedehnt.
  Jede Zeile endet ≥ 1,15 s vor dem Frame-Schnitt. Größter Eingriff: Pause vor
  „Beides aus einer Hand." 0,93 → 1,24 s.
- Pegel wie vorher (VO −15,9 statt −15,8 LUFS, Limiter traf 0,14 % der Samples),
  Ducking 13,9 statt 14,1 dB, Mix −14,5 LUFS. Whisper über den fertigen Film:
  alle 95 Skriptwörter in Reihenfolge.
- Timeline- und Bed-Bau vorher gegen die ausgelieferten Dateien geprüft:
  Timeline-Rebuild bitgleich, Bed byte-identisch.
- **Website:** `vorstellung.mp4` ersetzt; Untertitel-Endzeiten nachgezogen
  (alle 3 Kopien); **KI-Hinweis unter dem Video** (DE/EN, EU AI Act Art. 50(4),
  am Normtext geprüft: gilt ab 2026-08-02) und Footer-Hinweis erweitert;
  JSON-LD `uploadDate` → 2026-09-27; Doku in `video-source/` nachgezogen.
- Geprüft lokal (chrome-devtools): Video 58,3 s, 7 Cues, Hinweis sichtbar,
  keine Konsolenfehler, kein Überlauf; Lighthouse mobil `/` und `/en/`
  **100/100/100/100**, 54 bestanden, 0 Fehler.
- **Rollback:** `git checkout HEAD~1 -- website/public/video video-source website/src`
  bzw. im Videoprojekt `git checkout c0d6cdb -- 79_plessl-video/videos/claudia-plessl-promo/`
  (Sicherungsordner am 2026-09-28 gelöscht, Inhalt in Git bestätigt).


## Stimmklon für den Vorstellungstext (2026-09-27) — erzeugt

Audiodatei des neuen Vorstellungstexts in Claudias eigener Stimme, über Gemini
Voice Replication: `55_laulau/voice/claudia-plessl-vorstellung.{wav,m4a}`,
41,8 s, −16,1 LUFS. **Wartet auf Abhören durch Claudia.** Alles dazu —
Stimmprobe, Einwilligung, Skripte, Takes — liegt im **privaten** Repo unter
`55_laulau/voice/`, Einzelheiten in dessen Checkpoint.

**Stimmdaten gehören nicht in dieses öffentliche Repo.** Die
Einwilligungsaufnahme lag am 2026-09-27 kurz ungetrackt hier im Repo-Root und
wurde vor jedem Commit nach `voice/` verschoben.

## Kontrast auf WCAG AA gebracht (2026-08-19) — **live**

Deploy zu `4331ec3` erfolgreich. Lighthouse (mobil, Live-URL) auf allen drei
Seitentypen — Startseite, `/en/`, Impressum — jetzt **100 / 100 / 100 / 100**
(Accessibility, Best Practices, SEO, Agentic Browsing), 54 Audits bestanden,
**null Fehler**. Vorher: Accessibility 96 mit 20 Elementen unter dem
Kontrastminimum.

Der Mangel ist **älter als die JSON-LD-Arbeit**, das Audit hat ihn nur
sichtbar gemacht: Eyebrow-Labels, Video-Bildunterschrift, Fußnoten und beide
Sätze Schrittnummern.

**Zwei Tokens** wurden um das **kleinstmögliche Maß** abgedunkelt, das 4,5:1
gegen den ungünstigsten der drei Hintergründe (`#f6f3ee`, die
`warm-cream/60`-Mischung) erreicht — Farbton und Sättigung gehalten, damit die
Palette gleich liest:

| Token | vorher | nachher | Kontrast auf `#f6f3ee` |
|---|---|---|---|
| `--color-anthracite-400` | `#7a7a80` | `#6e6e74` | 3,85 → 4,58 |
| `--color-sage-600` | `#637a53` | `#5f7550` | 4,27 → 4,58 |

`sage-600` bewegt sich kaum — es lag mit 4,50 / 4,27 genau auf der Grenze.

Beide Tokens werden **ausschließlich für Text** verwendet, das Abdunkeln trifft
also nichts anderes. `sage-300` und `sage-500` zeichnen dagegen auch Haarlinien,
Unterstreichungen und die Fußzeilen-Striche — dort wäre es eine sichtbare
Designänderung gewesen. Deshalb an den zwei betroffenen Stellen stattdessen eine
andere Stufe:

- Leistungsnummern 01–03: `sage-500` → `sage-600` (10,4 px, braucht 4,5:1)
- Ablaufnummern 01–04: `sage-300` → `sage-500` (36 px, braucht nur 3:1 → 3,19)

**Die drei Kontaktlabels bleiben auf `sage-300`.** Sie stehen auf der dunklen
Salbeifläche, wo dieselbe Farbe **4,95:1** erreicht — axe hatte recht, sie nicht
zu melden, und Abdunkeln hätte sie *schlechter* gemacht. Ein pauschales Ersetzen
von `text-sage-300` wäre hier der Fehler gewesen.

## Maschinenlesbare Ebene ergänzt (2026-08-19) — **live**

Deploy `32236749811` erfolgreich, gepusht bis `855d7df` (vier Commits).

Die Seite war für Menschen geschrieben, aber für Crawler und Assistenten gab es
bisher **keine strukturierten Daten, keine `robots.txt` und keine
`sitemap.xml`**. Das ist jetzt nachgezogen.

**Neu:**

- `website/src/content/schema.ts` — JSON-LD, **abgeleitet aus `site.ts`**, nicht
  von Hand geschrieben. Ein Preis, der im Inhaltsobjekt geändert wird, kann
  damit nicht von dem abweichen, was eine Maschine liest.
- `website/src/components/JsonLd.tsx` — rendert einen Graphen als
  `<script type="application/ld+json">`.
- `website/src/app/robots.ts` und `sitemap.ts`.
- `SITE_URL` liegt jetzt in `site.ts` statt doppelt in den beiden Layouts —
  das JSON-LD braucht absolute URLs, und eine dritte Kopie wäre eine dritte
  Stelle, die man beim Domainwechsel vergisst.
- `LegalShell` bekommt `path` und `updatedIso`; letzteres speist sowohl das neue
  `<time datetime="2026-08">` als auch `dateModified` im Graphen.

**Zwei bewusste Entscheidungen:**

- Jeder Preis auf der Seite ist eine Untergrenze („ab EUR 110"), also
  `priceSpecification` mit **`minPrice`** statt `price`. Ein blankes `price`
  würde einen Fixpreis behaupten, den es nicht gibt.
  `valueAddedTaxIncluded: false` steht als **eine Konstante** in `schema.ts`,
  weil es beim Überschreiten der 55.000-EUR-Grenze kippt.
- Nicht behauptet wird: `openingHours` (gibt es nicht), `SearchAction` (keine
  Suche), `FAQPage` (keine FAQ — erfundene Q&A für ein Rich Result ist genau
  das, was eine Manual Action einbringt), `vatID` (im Impressum noch Platzhalter).

**Wichtige Einschränkung:** `robots.txt` wirkt erst mit der eigenen Domain.
Crawler lesen sie ausschließlich vom Origin-Root; unter
`…github.io/interior-design/` landet sie auf `/interior-design/robots.txt`, wo
niemand nachsieht. Sitemap und JSON-LD sind davon nicht betroffen und wirken
sofort. Der Punkt steht jetzt in der Domain-Checkliste im README.

`llms.txt` wurde **bewusst nicht** angelegt: reine Community-Konvention ohne
Standardisierungsgremium, Google hat im Juli 2025 öffentlich erklärt, die Datei
nicht zu lesen, und Crawler-Logs zeigen, dass KI-Bots direkt das HTML holen.
Vermerkt als optionaler Schritt beim Domainwechsel.

**An der Live-URL nachgeprüft**, nicht nur im Build: alle sechs Seiten sowie
`/robots.txt` und `/sitemap.xml` liefern 200, und das Prüfskript lief gegen die
**von der Live-URL zurückgeholten** Seiten durch — je genau ein JSON-LD-Block
pro Seite, valides JSON, alle 14 `@id`-Referenzen auflösbar und absolut,
7 Angebote je Sprache mit den Preisen aus `site.ts` (110/220/280/480/690/350/
690), kein blankes `price`, Videodauer `PT58S` gegen die per ffprobe gemessenen
58,3 s, alle referenzierten Mediendateien per HTTP erreichbar, 6 Sitemap-URLs
die je auf eine ausgelieferte Seite zeigen. `tsc --noEmit` und `eslint src`
sauber.

Die `robots.txt`-Einschränkung ist dabei **belegt statt behauptet**:
`https://ainxtgendev.github.io/robots.txt` — die Adresse, die Crawler
tatsächlich lesen — liefert **404**, während die Datei unter
`/interior-design/robots.txt` sauber ausgeliefert wird. Genau diese Lücke
schließt der Domainwechsel.

**Offen:** JSON-LD gegen
[Schema Markup Validator](https://validator.schema.org/) und
[Rich Results Test](https://search.google.com/test/rich-results) prüfen. Beide
sind Web-UIs ohne brauchbare API, das ist ein manueller Schritt im Browser.

## Vorstellungsvideo auf das Siegel nachgezogen (2026-08-19) — **live**

Deploy `32228876740` erfolgreich. Die Datei wurde von der Live-URL
zurückgeholt und ist **byte-identisch** zum Projekt-Render; −14,5 LUFS,
1749 Frames, und der Markenframe bei t = 18,0 s zeigt Siegel, Wortmarke und
Firmenwortlaut.

`website/public/video/vorstellung.mp4` und `-poster.jpg` sind neu. Frame 3 zeigt
das Siegel mit `MAG. CLAUDIA PLESSL` / `RAUM & ORDNUNG`, Frame 7 das Siegel als
Absender. Das Poster stammt aus dem neuen Render bei t = 18,0 s — vorher zeigte
es noch die alte Marke, und das ist das Bild vor dem Klick auf Play.

**Der Ton ist unverändert.** Die Sprachspur wurde per Remux übernommen (MD5 vor
und nach identisch), der Mix läuft weiterhin auf **−14,5 LUFS**; Hüllkurven-
Korrelation zwischen alter und neuer Tonspur **1,00000** bei 0,00 dB mittlerer
Abweichung. Geändert hat sich ausschließlich das Bild.

**Dabei mitbehoben:** zwei der drei Marken-Schriften des Videoprojekts waren
Subsets ohne lateinische Glyphen — Jost war der kyrillische Schnitt, Inter
ebenfalls lateinlos. Beide fielen still auf Arial bzw. system-ui zurück, die
Wortmarke im ausgelieferten Film war also **Liberation Sans**. Ersetzt durch die
Latin-Subsets aus dem Build dieser Website. Einzelheiten im Checkpoint des
privaten Repos.

Dateigröße 4,75 MB gegen 4,40 MB (+8 %); ein erster Lauf mit `-q high` ergab
6,31 MB und war am Siegel nicht unterscheidbar (0,567/255), deshalb `standard`
wie zuvor.

Die gespiegelten Kompositionsquellen unter `video-source/` sind mitgezogen.

## Aufgeraeumt (2026-08-18)

`brand/logo-optimized/logo-dokumentation.md` entfernt: die Datei beschrieb den
**quadratischen Grundrissrahmen** des 3D-Logos vom 2026-08-17 und war beim runden
Siegel schlicht falsch. Die aktuelle Beschreibung des Logos steht im Paket des
Nutzers (`logo/03_logo_website_alpha_package/README.md`, privates Repo) sowie im
Abschnitt „Logo" der README hier. Im privaten Repo fielen dabei die Quellen der
beiden abgeloesten Logo-Generationen weg — Einzelheiten dort.

Zurueckholen: `git checkout 2142daf -- brand/logo-optimized/logo-dokumentation.md`.

**Nicht geloescht:** `website/public/og-image.jpg`. Sie ist nach der Umstellung
auf `og-image-de/-en.jpg` von keiner Seite mehr verlinkt und sieht darum verwaist
aus, ist aber die **Eingangsdatei** von `build_og_images.py`.

## Alpha-Paket und zweisprachige OG-Karten (2026-08-18, zweiter Durchgang) — **live**

Gepusht bis `f8628fb`, Deploy `32117394078` **success**. An der Live-URL geprüft:
`og:image` liefert auf `/`, `/impressum/`, `/agb/` die deutsche Karte und auf
`/en/`, `/en/legal/` die englische; Logo, Favicon, apple-icon, Maskable und beide
OG-Karten byte-identisch zur lokalen Quelle; Konsole fehlerfrei; weiterhin null
Drittanbieter-Requests; kein horizontaler Überlauf bei 320 px × DPR 3.

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
  **E-Mail-Entscheidung 2026-10-08:** keine Domain-Mailadresse; geschäftlich
  wird `claudiaplessl@gmail.com` verwendet (dasselbe Postfach wie
  `claudia.plessl@gmail.com` — Gmail ignoriert Punkte). Umgestellt in
  `site.ts` (Website, Impressum, Datenschutz, AGB, EN-Legal) und im Handout.
  Video Frame 7 / STORYBOARD zeigen noch die Punkt-Schreibweise (funktioniert
  weiter; Neu-Rendern optional). Verworfen: Google Workspace (~98 €/Jahr),
  Hetzner Webhosting S (~23 €/Jahr), Gratis-Weiterleitung + Send-as.
  Live seit Deploy `37744990526` (`489804e`) — an allen 6 Routen geprüft.
  **DNS-Mail-Bereinigung 2026-10-08** (Domain versendet/empfängt keine
  Mails): MX, `autoconfig`-CNAME und 4 SRV (Hetzner-Defaults) entfernt; SPF
  `v=spf1 -all`; neu `_dmarc` TXT `v=DMARC1; p=reject`. SOA-Serial
  2026100802, an allen 3 Hetzner-Nameservern per dig geprüft; Website,
  `www`, GitHub-TXT unverändert, Pages-Domain weiter `verified`.
  Rollback: alte Werte = MX `10 www4.your-server.de.`, SPF
  `v=spf1 +a +mx ?all`, autoconfig → `mail.your-server.de.`, SRV
  `_autodiscover/_imaps/_pop3s/_submission._tcp` → `mail.your-server.de.`
  (443/993/995/587). **Falls später Domain-Mail kommt:** MX/SPF/DKIM neu
  setzen und DMARC von `reject` auf `none` zurücknehmen, sonst werden
  eigene Mails abgewiesen.
  **2026-10-08: `claudiaplessl.at` bei Hetzner (konsoleH) registriert**
  (nur Domain, 13,20 €/Jahr inkl. 20 % USt.). Inhaberin Claudia Plessl
  (Typ Person, Feld Organisation „interior-design-plessl"). NIC.AT-whois
  bestätigt: Registrar Hetzner, Nameserver ns1.your-server.de /
  ns.second-ns.com / ns3.second-ns.de.
  **DNS 2026-10-08 gesetzt** (Hetzner Console → DNS → Zonefile-Import,
  SOA-Serial 2026100801): Apex A 185.199.108–111.153, AAAA
  2606:50c0:8000–8003::153, `www` CNAME `ainxtgendev.github.io.`, TXT
  `_github-pages-challenge-ainxtgendev` (Hetzner lehnt Großbuchstaben ab;
  DNS ist case-insensitiv). Hetzner-Mail-Defaults (MX/SRV/SPF/autoconfig)
  unverändert. Vorher: A/AAAA auf Hetzner-Webhosting 88.198.219.246 /
  2a01:4f8:d0a:27bd::2 — Rollback = Zonefile mit diesen Werten
  re-importieren. An `ns1.your-server.de` per dig geprüft.
  .at-Delegation ~09:05 aktiv; Domain unter github.com/settings/pages für
  Konto AINxtGenDev **verifiziert** (TXT-Record nicht löschen, sonst
  verfällt die Verifizierung).
  **Site umgestellt 2026-10-08 — live:** Commit `5c938f0` (kein basePath
  mehr, `SITE_URL` = `https://claudiaplessl.at/`, keep-live-assets-Origin
  neu, README), Custom Domain per `gh api` gesetzt, Deploy `37741752932`
  success. Geprüft (über GitHub-IP): alle 6 Routen, robots.txt, Sitemap,
  Manifest, Video, OG-Bild, CSS = 200; Zertifikat (Let's Encrypt via GitHub)
  für Apex + `www`, gültig bis 2027-01-06; HTTPS erzwungen, http → 301 https.
  Rollback: `git revert 5c938f0` + `gh api -X PUT
  repos/AINxtGenDev/interior-design/pages -F cname=`.
  **Hinweis:** Lokaler DNS `192.168.1.35` hatte ~09:10 noch ein
  NXDOMAIN aus der Zeit vor der Delegation im Cache (Pi-hole; nuc8 nutzt
  ihn über enp5s0, Handy/Tablet über WLAN die FritzBox 192.168.178.1, die
  früher frei war). Gegen 09:25 abgelaufen — Seite laut Nutzer jetzt auf
  Handy, Tablet und nuc8 erreichbar. Einmaliger Effekt, keine Änderung nötig.
  **Offen:** JSON-LD mit Schema Markup Validator / Rich Results Test an der
  neuen URL prüfen; Handout auf claudiaplessl.at aktualisiert (2026-10-08);
  alte URL nur noch im gerenderten Video (Frame 7) — leitet um,
  Aktualisierung optional; `llms.txt` offen;
  Google Search Console für die neue Domain anlegen (optional).
- ~~Musik im Video ersetzen (Queen-Titel)~~ — am 2026-08-16 erledigt (Suno-
  Instrumental, siehe „Vorstellungsvideo"); offen ist nur noch die Suno-Lizenz.
- Echte Vorher-Nachher-Referenzen für einen Projekte-Abschnitt sammeln.

## Reproduzierbare Ausgabe

```bash
cd website
npm ci
npm run build          # statischer Export nach website/out
npx eslint src
```

Deployment erfolgt automatisch via GitHub Actions bei jedem Push auf `main`.
