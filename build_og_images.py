#!/usr/bin/env python3
"""Baut die beiden Open-Graph-Karten aus der bestehenden `og-image.jpg`.

Die Karte war handgemacht: Foto, Headline und Beschreiber liegen als Pixel in
einer JPEG-Datei, es gibt keine Ebenen und keinen Generator. Geaendert wird
deshalb **nur die unterste Zeile** — Foto, Headline "SCHOENE RAEUME. KLARER
ALLTAG.", Haarlinie und jeder Abstand bleiben unberuehrt.

Zwei Gruende fuer den Eingriff:

1. Die alte Zeile lautete "INTERIOR DESIGN · PROFESSIONAL ORGANIZING" — also
   **englisch**, obwohl dieselbe Datei auch unter der deutschen Seite lag.
   Wer einen deutschen Link teilte, bekam eine deutsche Headline mit
   englischem Beschreiber darunter.
2. Der Beschreiber nannte die Workshops nicht, die Eyebrow-Zeile der Seite
   aber schon. Jetzt sind beide identisch.

Typografie aus der Vorlage zurueckgemessen, nicht geschaetzt: Jost (die
Schnittdatei der Website selbst), Versalhoehe 9 px, Laufweite 2,05 px,
Zeilenmitte auf der Gestaltungsachse x = 574 (die Headline-Zeilen sitzen auf
572,5 und 574,5 — die Karte ist bewusst nicht bildmittig).

Die neuen Zeilen sind laenger als die alte. Die glatte Wandflaeche traegt um
die Achse herum 406 px; damit die Zeile nicht auf das Regal laeuft, wird
**die Laufweite** je Sprache auf 392 px eingepasst und die Schriftgroesse
konstant gehalten — die Groesse sieht das Auge, die Laufweite nicht.
"""

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).parent
SOURCE = HERE / "website" / "public" / "og-image.jpg"
OUT_DIR = HERE / "website" / "public"

# Schnittdatei der Website selbst (next/font, latin subset) — nicht die stark
# reduzierte Kopie aus dem Videoprojekt, die nur ein 'A' enthaelt.
FONT = HERE / "brand" / "fonts" / "Jost-latin.ttf"

TEXTS = {
    "de": "INTERIOR DESIGN  ·  ORDNUNGSCOACHING  ·  WORKSHOPS",
    "en": "INTERIOR DESIGN  ·  PROFESSIONAL ORGANIZING  ·  WORKSHOPS",
}

AXIS = 574          # Gestaltungsachse, aus den Headline-Zeilen gemessen
CAP_TOP = 319       # Oberkante der Versalien der alten Zeile
SIZE = 11.25        # ergibt exakt die gemessenen 9 px Versalhoehe
MAX_WIDTH = 392     # glatte Wand um die Achse (406 px) minus Sicherheitsrand
ERASE = (304, 314, 778, 334)   # zu uebermalender Streifen: x0,y0,x1,y1
CLEAN_ABOVE = (306, 314)       # saubere Wandzeilen darueber
CLEAN_BELOW = (334, 342)       # und darunter
SUPERSAMPLE = 8


def ink_colour(img: np.ndarray) -> np.ndarray:
    """Kernfarbe der alten Schrift — 5. Perzentil, nicht der Kantenmittelwert."""
    band = img[315:332, 395:775]
    mask = band.mean(axis=2) < 170
    return np.percentile(band[mask], 5, axis=0)


def erase_line(img: np.ndarray) -> np.ndarray:
    """Streifen durch senkrechte Interpolation zwischen sauberen Wandzeilen."""
    out = img.copy()
    x0, y0, x1, y1 = ERASE
    top = img[CLEAN_ABOVE[0] : CLEAN_ABOVE[1], x0:x1].mean(axis=0)
    bot = img[CLEAN_BELOW[0] : CLEAN_BELOW[1], x0:x1].mean(axis=0)
    n = y1 - y0
    for i in range(n):
        t = (i + 0.5) / n
        out[y0 + i, x0:x1] = top * (1 - t) + bot * t
    # Die Wand hat Sensorrauschen; ohne etwas Koernung faellt der Streifen als
    # unnatuerlich glattes Band auf.
    rng = np.random.default_rng(20260818)
    sd = float(img[CLEAN_BELOW[0] : CLEAN_BELOW[1], x0:x1].std(axis=0).mean())
    out[y0:y1, x0:x1] += rng.normal(0, sd, out[y0:y1, x0:x1].shape)
    return out


def render_line(text: str, tracking: float, colour: np.ndarray) -> Image.Image:
    f = ImageFont.truetype(str(FONT), int(SIZE * SUPERSAMPLE))
    widths = [f.getlength(c) for c in text]
    total = sum(widths) + tracking * SUPERSAMPLE * (len(text) - 1)
    big = Image.new("L", (int(total) + 200, int(SIZE * SUPERSAMPLE * 2.2)), 0)
    d = ImageDraw.Draw(big)
    x = 100.0
    for c, w in zip(text, widths):
        d.text((x, SIZE * SUPERSAMPLE * 0.5), c, font=f, fill=255)
        x += w + tracking * SUPERSAMPLE
    alpha = big.resize((big.width // SUPERSAMPLE, big.height // SUPERSAMPLE), Image.LANCZOS)
    plate = Image.new("RGB", alpha.size, tuple(int(v) for v in colour))
    plate.putalpha(alpha)
    return plate.crop(plate.getbbox())


def fit_tracking(text: str, colour: np.ndarray) -> float:
    best = 0.0
    for t in np.arange(0.0, 2.61, 0.05):
        if render_line(text, float(t), colour).width <= MAX_WIDTH:
            best = float(t)
    return best


def main() -> None:
    src = np.asarray(Image.open(SOURCE).convert("RGB")).astype(np.float64)
    colour = ink_colour(src)
    print("Kernfarbe der alten Zeile:", np.round(colour).astype(int))
    base = np.clip(erase_line(src), 0, 255)

    for lang, text in TEXTS.items():
        track = fit_tracking(text, colour)
        line = render_line(text, track, colour)
        card = Image.fromarray(base.round().astype(np.uint8), "RGB")
        pos = (AXIS - line.width // 2, CAP_TOP)
        card.paste(line, pos, line)
        out = OUT_DIR / f"og-image-{lang}.jpg"
        card.save(out, quality=90, subsampling=0, optimize=True)
        print(f"  {lang}: Laufweite {track:.2f}  Breite {line.width} px  "
              f"x {pos[0]}..{pos[0]+line.width}  -> {out.name}")


if __name__ == "__main__":
    main()
