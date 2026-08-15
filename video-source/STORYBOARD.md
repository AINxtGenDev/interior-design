---
format: 1080x1920
duration: 58s
message: "Erst Ordnung, dann Gestaltung — und der Raum bleibt so."
arc: "Erkennen → Entlastung → Marke → Angebot → Ablauf → Vertrauen → Einladung"
audience: "Berufstätige Familien, Menschen im Umbruch, EPU und Homeoffice in Wien und NÖ"
mode: autonomous
music: none
---

## Video direction

**Palette & type — from `frame.md`, never invented.** Canvas warm cream `#F3EEE8`, ink
`#333338`, accent sage `#8FA37A`, deep sage `#4D6040` for weight, hairlines in `line`.
Display in **Cormorant Garamond 400**, sentence case, never bold, never uppercase. Body in
**Inter 400**. Tracked uppercase chrome (labels, micro) in **Jost 500**, 2–3px tracking, sage.
Zero shadows. Zero fills. Square corners. 1px hairlines are the only border.

**Motion grammar.** One shot model for the whole film: *the drafting table*. Elements arrive
the way a plan is drawn — a hairline extends, then the thing it measures appears. Every reveal
is a **line first, content second**. No bounce, no elastic, no spring. Single heavy ease
(`power2.out`), 500–800ms. The canvas itself never spins or tilts; only slow push-ins
(≤4% over a full frame) and lateral pans. Type sets by **fading up in place with a 12px rise** —
never letter-by-letter, never typewriter: the brand is calm, and per-character animation reads
as a gimmick against a Cormorant serif.

**Signature thread.** A single sage hairline is the film's spine. It draws in Frame 1, and each
frame inherits it in a new role — underline, column rule, path between stations, the frame of
the end card. It is the one element that survives every cut (see `handoff_out`/`handoff_in`).

**Idle budget & stillness allocation.** Frames 2, 3 and 7 are **deliberately held** — content
lands, then reads still. Frames 1, 4, 5, 6 carry the motion. No frame front-loads: every reveal
is cued to the word that names it in the VO. Roughly 40% of total runtime is a held read; that
is the point, not a shortfall.

**9:16 keep-out.** Bottom 15% and top 8% carry no essential content — Reels/Shorts UI sits
there. Compose to the upper-middle third. Type never smaller than 30px at 1080 wide.

**Negative list.** No before/after reveal of any kind — there are no real client projects, and
implying one would be a lie. No clutter-chaos imagery, no shame framing, no stock-photo people.
No drop shadows, no gradients except the existing gold hairline, no rounded cards, no icons
with rounded strokes. No price shown as a final price — always "ab". No English on screen.

---

## Frame 1 — Der Alltag

- status: animated
- src: compositions/frames/01-der-alltag.html
- duration: 7.5s
- transition_in: cut
- scene: Drei nüchterne Feststellungen setzen sich untereinander, eine sage Haarlinie zieht mit
- voiceover: "Der Schrank ist voll. Der Tisch auch. Und am Wochenende reicht die Zeit nur fürs Nachräumen."
- type: pain_point
- persuasion: Recognition — der Zuseher erkennt sich, ohne beschämt zu werden
- beat: erkennen
- blueprint: kinetic-type-beats (adapt)
- asset_candidates: none
- asset_rationale: reine Typografie auf Creme; ein Bild würde die Aussage illustrieren statt tragen
- handoff_out: sage Haarlinie, x=140px, y=1180px, Breite 800px, opacity 1, ruht (Geschwindigkeit 0)

**Adapt:** Struktur von `kinetic-type-beats` bleibt (drei Textbeats, je auf seinen VO-Cue), aber
die Beats setzen sich als *ganze Zeilen* statt Wort für Wort — die Signature-Bewegung (Beat landet
exakt auf dem gesprochenen Wort) bleibt erhalten, das Kinetische wird ruhiger interpretiert.

Scene 1 (0.0–2.0s): leere Creme-Fläche. Auf „Der Schrank ist voll." fährt Zeile 1 in Cormorant
h2 in der oberen Mitte ein — Fade-up mit 12px Anstieg. Nichts sonst. Centered, ~55% Frame-Breite.
Scene 2 (2.0–3.6s): auf „Der Tisch auch." setzt Zeile 2 direkt darunter, gleiche Bewegung, 300ms
später als das Wort, damit die Stimme führt. Der Satz ist kürzer — die Zeile auch.
Scene 3 (3.6–6.2s): auf „nur fürs Nachräumen" setzt Zeile 3, und **zeitgleich zieht die sage
Haarlinie** von links unter den Block, 800ms, `power2.out`. Die Linie ist neu und wird ab hier
das Rückgrat des Films.
Scene 4 (6.2–7.5s): gehalten. Nichts bewegt sich. Der Block liest still, die Linie steht.

---

## Frame 2 — Die Entlastung

- status: animated
- src: compositions/frames/02-die-entlastung.html
- duration: 5.0s
- transition_in: crossfade
- scene: Der Block verschwindet, ein einziger Satz bleibt: es fehlt ein System
- voiceover: "Es liegt nicht an Ihnen. Es fehlt ein System."
- type: reframe
- persuasion: Relief — die Schuld wird vom Menschen genommen und aufs fehlende System gelegt
- beat: entlastung
- blueprint: titlecard-reveal (reproduce)
- asset_candidates: none
- asset_rationale: der Satz ist das Bild
- handoff_in: sage Haarlinie, x=140px, y=1180px, Breite 800px, opacity 1, ruht
- handoff_out: sage Haarlinie, x=140px, y=1180px, Breite 800px, opacity 1, ruht

Scene 1 (0.0–1.4s): die drei Zeilen aus Frame 1 faden aus (nicht wegfliegen — sie lösen sich auf).
Die Haarlinie **bleibt exakt stehen**: sie ist die Konstante über den Schnitt.
Scene 2 (1.4–3.2s): auf „Es liegt nicht an Ihnen." erscheint der Satz über der Linie, Cormorant
h1, ink, Fade-up 12px. Centered, ~70% Frame-Breite.
Scene 3 (3.2–5.0s): auf „Es fehlt ein System." wechselt nur das Wort **System** in deep sage
`#4D6040` — kein Zoom, kein Puls, nur der Farbwechsel über 400ms. Danach gehalten. Das ist die
Wende des Films und sie darf still sein.

---

## Frame 3 — Die Marke

- status: animated
- src: compositions/frames/03-die-marke.html
- duration: 6.5s
- transition_in: crossfade
- scene: Das CP-Monogramm setzt sich über der Haarlinie, darunter Name und Claim
- voiceover: "Schöne Räume. Klarer Alltag. Ich bin Claudia Plessl."
- type: brand_reveal
- persuasion: Identity — ein Gesicht und ein Name statt einer Dienstleistung
- beat: marke
- blueprint: logo-assemble-lockup (adapt)
- asset_candidates: logo-mark-2008c2fa.webp — das freigestellte CP-Monogramm im Grundriss-Rahmen
- handoff_in: sage Haarlinie, x=140px, y=1180px, Breite 800px, opacity 1, ruht
- handoff_out: sage Haarlinie, x=140px, y=1180px, Breite 800px, opacity 1, ruht

**Adapt:** `logo-assemble-lockup` baut normalerweise das Logo aus Teilen zusammen. Hier wird das
Monogramm **nicht** zerlegt — es ist gescanntes Original, jede Zerlegung würde künstlich wirken.
Die Signature-Bewegung (Lockup rastet ein) bleibt: der Grundriss-Rahmen des Logos wird von der
Haarlinie *getroffen*, und in dem Moment rastet das Lockup ein.

Scene 1 (0.0–1.8s): auf „Schöne Räume." steigt die Haarlinie von y=1180 auf y=760 (800ms,
`power2.out`) und wird damit zur Grundlinie des Logos. Sonst leer.
Scene 2 (1.8–3.4s): auf „Klarer Alltag." erscheint das CP-Monogramm mittig über der Linie,
Fade-up 12px, ~34% Frame-Breite. Der Grundriss-Rahmen des Logos und die Haarlinie fluchten —
das ist der Einrast-Moment.
Scene 3 (3.4–5.0s): auf „Ich bin Claudia Plessl." setzt unter die Linie **CLAUDIA PLESSL** in
Jost, tracked, ink; darunter in kleinerem Jost sage **INTERIOR DESIGN · ORDNUNGSCOACHING**.
Scene 4 (5.0–6.5s): gehalten. Das Lockup steht ruhig. Ein sehr langsamer Push-in (2%) läuft
darunter, sonst nichts.

---

## Frame 4 — Erst Ordnung, dann Gestaltung

- status: animated
- src: compositions/frames/04-ordnung-gestaltung.html
- duration: 9.7s
- transition_in: wipe
- scene: Die Fläche teilt sich — links das Regalsystem (Ordnung), rechts der Wohnraum (Gestaltung)
- voiceover: "Ich schaffe zuerst Ordnung — und gestalte dann den Raum, der dabei frei wird. Beides aus einer Hand."
- type: value_prop
- persuasion: Differentiation — die Kombination ist der USP, nicht die Einzelleistung
- beat: angebot
- blueprint: comparison-split (adapt)
- asset_candidates: offenes-regalsystem-mit-beschrifteten-bo.webp — Regalsystem, die „Ordnung"-Seite; wohnbereich-in-warmen-naturtnen-mit-sofa.webp — Wohnbereich, die „Gestaltung"-Seite
- handoff_in: sage Haarlinie, x=140px, y=760px, Breite 800px, opacity 1, ruht
- handoff_out: sage Haarlinie **vertikal**, x=540px (Bildmitte), y=560–1360px, opacity 1, ruht

**Adapt:** `comparison-split` stellt normalerweise zwei Optionen gegeneinander. Hier sind die
zwei Seiten **keine Alternativen, sondern eine Reihenfolge** — deshalb kommt die zweite Hälfte
nicht gleichzeitig, sondern *nachdem* die erste steht. Signature-Bewegung (die Teilung selbst)
bleibt; die Gegenüberstellung wird zur Abfolge.

Scene 1 (0.0–1.2s): die horizontale Haarlinie kippt in die Vertikale und steht als Trennlinie
in der Bildmitte (700ms). Beide Hälften noch leer.
Scene 2 (1.2–3.8s): auf „zuerst Ordnung" füllt sich die **linke** Hälfte mit dem Regalsystem-Bild,
Fade-up mit leichtem Push-in. Label in Jost sage darüber: **ORDNUNG**. Rechts bleibt Creme leer —
sichtbar wartend.
Scene 3 (3.8–6.6s): auf „gestalte dann den Raum" füllt sich die **rechte** Hälfte mit dem
Wohnbereich, gleiche Bewegung. Label: **GESTALTUNG**. Jetzt stehen beide.
Scene 4 (6.6–8.4s): auf „Beides aus einer Hand." zieht die Trennlinie sich zu einem kurzen
sage Strich zusammen und die beiden Labels rücken zur Mitte zusammen — die Teilung wird zur
Verbindung. 600ms, `power2.out`.
Scene 5 (8.4–9.7s): gehalten.

---

## Frame 5 — Der Ablauf

- status: animated
- src: compositions/frames/05-der-ablauf.html
- duration: 10.4s
- transition_in: crossfade
- scene: Drei Stationen entlang der Linie — Raumcheck, Konzept, Umsetzung
- voiceover: "Wir starten mit einem Raumcheck. Sie bekommen ein Konzept mit Fixpreis. Dann arbeiten wir Bereich für Bereich, in Ihrem Tempo."
- type: how_it_works
- persuasion: Risk reduction — ein klarer Ablauf nimmt die Angst vor dem ersten Termin
- beat: ablauf
- blueprint: spatial-pan-stations (reproduce)
- asset_candidates: none
- asset_rationale: Typografie und Haarlinien-Stationen; ein Bild würde von der Struktur ablenken
- handoff_in: sage Haarlinie vertikal, x=540px, y=560–1360px, opacity 1, ruht
- handoff_out: sage Haarlinie horizontal, x=140px, y=1120px, Breite 800px, opacity 1, ruht

Scene 1 (0.0–1.0s): die vertikale Linie legt sich zurück in die Horizontale und wird zum
**Pfad**, auf dem die drei Stationen sitzen. Drei feine Teilstriche markieren die Positionen.
Scene 2 (1.0–3.4s): auf „Raumcheck" rastet Station 01 ein: Ziffer in Cormorant sage, darunter
**Raumcheck** in Cormorant ink und eine Zeile Inter body-sm: „60 bis 90 Minuten, vor Ort oder
online". Die Kamera sitzt auf Station 1.
Scene 3 (3.4–6.2s): auf „Konzept mit Fixpreis" **pant die Kamera lateral** zu Station 02 —
Station 1 wandert nach links aus dem Bild, 02 rastet ein: „Konzept & Angebot", darunter
„Umfang, Reihenfolge, Fixpreis".
Scene 4 (6.2–9.0s): auf „Bereich für Bereich" pant es weiter zu Station 03: „Umsetzung",
darunter „Ihr Tempo, Ihre Kriterien". Der Pfad läuft rechts weiter aus dem Bild — es geht
nach dem Video weiter.
Scene 5 (9.0–10.4s): gehalten auf Station 03.

---

## Frame 6 — Warum mit mir

- status: animated
- src: compositions/frames/06-warum-mit-mir.html
- duration: 9.2s
- transition_in: crossfade
- scene: Drei Vertrauenskarten setzen sich untereinander, zuletzt die Zertifizierung
- voiceover: "Zertifizierter Ordnungscoach. Diskret, ohne Urteil. Und ein System, das Sie ohne mich halten können."
- type: proof
- persuasion: Trust — Qualifikation belegt, Haltung benannt, Ergebnis versprochen
- beat: vertrauen
- blueprint: grid-card-assemble (adapt)
- asset_candidates: none
- asset_rationale: Text trägt; ein Zertifikats-Scan liegt nicht vor und würde erfunden wirken
- handoff_in: sage Haarlinie horizontal, x=140px, y=1120px, Breite 800px, opacity 1, ruht
- handoff_out: sage Haarlinie horizontal, x=140px, y=1120px, Breite 800px, opacity 1, ruht

**Adapt:** `grid-card-assemble` baut ein Raster gleichzeitig auf. Hier setzen die drei Einträge
**nacheinander** auf ihren VO-Cue, weil jeder ein eigener Gedanke ist. Signature-Bewegung
(Karten rasten in ein gemeinsames Raster) bleibt — nur zeitversetzt.

Scene 1 (0.0–2.6s): auf „Zertifizierter Ordnungscoach." setzt Eintrag 1 oben: Titel in Cormorant
ink, darunter in Jost sage tracked **AKADEMIE DER ORDNUNG**. Links davon ein 1px Haarlinien-Anschnitt
als Marker — kein Kasten, kein Icon.
Scene 2 (2.6–4.8s): auf „Diskret, ohne Urteil." setzt Eintrag 2 darunter, gleiche Struktur,
mit Inter body-sm: „Was ich in Ihrer Wohnung sehe, bleibt dort."
Scene 3 (4.8–7.8s): auf „ohne mich halten können" setzt Eintrag 3: „Ein System, das bleibt",
darunter „Ein Check-in nach einigen Wochen." Die drei linken Marker fluchten jetzt zu **einer**
durchgehenden Haarlinie — das ist der Einrast-Moment des Rasters.
Scene 4 (7.8–9.2s): gehalten.

---

## Frame 7 — Die Einladung

- status: animated
- src: compositions/frames/07-die-einladung.html
- duration: 10.0s
- transition_in: crossfade
- scene: Endkarte — Monogramm, Preis-Einstieg, Einsatzgebiet, Website
- voiceover: "Raumcheck ab einhundertzehn Euro, in Wien und Niederösterreich. Schreiben Sie mir."
- type: cta
- persuasion: Low-friction ask — konkreter Einstiegspreis und eine einzige Handlung
- beat: einladung
- blueprint: cta-morph-press (adapt)
- asset_candidates: logo-mark-2008c2fa.webp — Monogramm als Absender der Endkarte
- handoff_in: sage Haarlinie horizontal, x=140px, y=1120px, Breite 800px, opacity 1, ruht

**Adapt:** `cta-morph-press` endet auf einem gedrückten Button. Ein simulierter Klick wäre hier
falsch — es gibt kein Formular, der Kontakt läuft über E-Mail. Die Signature-Bewegung (das
CTA-Element rastet als letzte Bewegung des Films ein) bleibt, das „press" entfällt.

Scene 1 (0.0–1.6s): die Haarlinie zieht sich zu einem **Rahmen** zusammen, der die untere
Bildhälfte fasst — die letzte Verwandlung des Rückgrats.
Scene 2 (1.6–3.4s): auf „Raumcheck ab einhundertzehn Euro" setzt im Rahmen die Zeile
**Raumcheck ab EUR 110** — „Raumcheck ab" in Inter body, **EUR 110** in Cormorant stat-figure,
deep sage. Darunter klein in Inter: „Endpreis nach dem Raumcheck".
Scene 3 (3.4–5.6s): auf „Wien und Niederösterreich" setzt darunter in Jost tracked sage
**WIEN · NIEDERÖSTERREICH**.
Scene 4 (5.6–7.6s): auf „Schreiben Sie mir." setzt über dem Rahmen das CP-Monogramm klein,
darunter **claudia.plessl@gmail.com** in Inter ink und die URL
**ainxtgendev.github.io/interior-design** in Jost sage, kleiner.
Scene 5 (7.6–10.0s): gehalten, komplett still. Kein Push-in. Der Film endet ruhig, damit die
Kontaktzeile lesbar stehen bleibt.
