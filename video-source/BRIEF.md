---
workflow: product-launch-video
flow: automation
storyboard: yes
message: "Erst Ordnung, dann Gestaltung — und der Raum bleibt so."
destination: instagram-reels
aspect: 1080x1920
language: de
audience: "Berufstätige Familien, Menschen im Umbruch (Umzug, Trennung, Verkleinerung 50+) und EPU/Homeoffice in Wien und Niederösterreich"
length: 60s
angle: "Die Kombination aus einer Hand — Ordnungscoaches räumen, Einrichtungsberaterinnen gestalten, Claudia Plessl verbindet beides und gibt das Wissen weiter"
voice: gemini-sulafat
---

## Intent

Ein professionelles Vorstellungsvideo für die neu gegründete Ein-Personen-
Firma von Mag. Claudia Plessl — Interior Design und Ordnungscoaching in Wien
und Niederösterreich. Es soll auf dem Handy funktionieren: hochkant, kurz,
ruhig, und auch ohne Ton verständlich.

Ton: warm, sachlich, entlastend. Ausdrücklich **nicht** aufdringlich verkaufend
und nicht belehrend — die Zielgruppe schämt sich oft für ihre Unordnung. Die
Tonalität der Website gilt weiter: „keine Kontrolle über Personen, sondern
pragmatische Unterstützung". Kein Vorher-Nachher-Schock, kein Aufräum-Drama.

Die Bildsprache kommt vom Brand-Cover: Salbeigrün, warmes Creme, Eiche, feine
Goldlinie, hoher heller Kontrast, viel Luft.

## Assets

- /home/nuc8/05_development/55_laulau/I Want It All.mp3 — Hintergrundmusik, vom User vorgegeben, deutlich unter der Stimme gemischt.
- /home/nuc8/05_development/55_laulau/78_plessl-website/website/src/assets/logo-mark.webp — CP-Monogramm, freigestellt, für Auftakt und Schlussbild.
- /home/nuc8/05_development/55_laulau/78_plessl-website/website/src/assets/hero.webp — Brand-Cover, Innenraum quer.
- /home/nuc8/05_development/55_laulau/78_plessl-website/website/src/assets/detail-living.webp — Wohnbereich hochkant.
- /home/nuc8/05_development/55_laulau/78_plessl-website/website/src/assets/detail-order.webp — Regalsystem hochkant, „Ordnung"-Seite.
- https://ainxtgendev.github.io/interior-design/ — Quelle für Inhalte und Marke.

## Customizations

- **Voiceover Deutsch über Gemini TTS** (`gemini-2.5-flash-preview-tts`, Stimme
  `Sulafat`, warm-weiblich). Nicht HeyGen, nicht Kokoro — Kokoro kann kein
  Deutsch, und im HeyGen-Starfish-Katalog dieses Accounts gibt es keine
  deutsche Stimme. Skript: `scripts/gemini_tts.py`.
- **Deutsche Burn-in-Captions**, weil Reels überwiegend stumm gesehen werden.
  Ruhig gesetzt, nicht als Effekt.
- **Musik deutlich ducken** — Stimme muss jederzeit klar vorne stehen.
- Preis-Einstieg „Raumcheck ab EUR 110" als konkreter Handlungsanreiz.
- Schlussbild mit Logo und Website-URL.

## Notes

- **Musik am 2026-08-16 ersetzt.** Ursprünglich lief „I Want It All" (Queen) —
  ohne Lizenz für ein gewerbliches Promo-Video problematisch, auf
  Instagram/YouTube drohte Stummschaltung oder Claim. Jetzt liegt
  `casa_in_ordine.mp3` darunter, ein mit Suno erzeugtes Instrumental des Users.
  Offen bleibt nur, ob dessen Suno-Tarif kommerzielle Nutzung erlaubt.
- **Keine Kundenprojekte zeigen.** Es gibt noch keine Referenzen, und die
  vorhandenen Bilder sind Marken-Bildwelt, keine echten Aufträge. Nichts darf
  als Vorher-Nachher eines echten Kunden lesbar sein.
- Zertifizierung „Zertifizierter Ordnungscoach" (Akademie der Ordnung) darf
  genannt werden — ist belegt.
- Preise sind Einstiegspreise („ab"), nie als Endpreis darstellen.
- Firmenname exakt: `Mag. Claudia Plessl`. Untertitel `Interior Design ·
  Ordnungscoaching`. Nicht „Ordungscoaching" (Tippfehler aus der Anfrage).
- Das Video wird anschließend selbst gehostet auf der Website eingebettet —
  kein YouTube-Embed, weil die Seite nachweislich null Drittanbieter-Requests
  macht und das so bleiben soll. Dateigröße daher im Blick behalten.
