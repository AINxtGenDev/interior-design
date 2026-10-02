"""Build every web asset derived from the CI deliverables (2026-10).

Inputs (repo root, supplied by the client):
    Logo2.png               1325x1187 RGBA, primary logo with real alpha
    Titelbild Homepage.png  1947x808 RGB, homepage title image

Outputs:
    website/src/assets/logo-{480,960}.webp            trimmed logo, lossless
    website/src/assets/hero-{crop}-{w}.webp            art-directed hero crops
    website/src/assets/hero-en-{crop}-{w}.webp         same, headline set in English
    website/src/app/{favicon.ico,icon.png,apple-icon.png}
    website/public/icons/android-chrome-*.png          incl. maskable
    website/public/og-image-{de,en}.jpg                 Open Graph cards

Run from the repo root (OpenCV is only needed for the English hero; its
headline font is brand/fonts/PlayfairDisplay[wght].ttf, SIL OFL):
    uv run --with pillow --with numpy --with opencv-python-headless \
        python brand/build_web_assets.py
Re-running is idempotent.
"""

from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "website/src/assets"
APP = ROOT / "website/src/app"
ICONS = ROOT / "website/public/icons"

# Page background of the CI style guide (slide 5), sampled: #FAFBFA.
PAPER = (250, 251, 250)

# Logo2.png carries ~440 near-invisible specks (alpha <= 8) around the mark.
# Anything at or below this is treated as empty when trimming.
ALPHA_FLOOR = 8

# The monogram ends at row 639; rows 640-643 are empty, the wordmark starts
# below. Measured on Logo2.png — re-measure if the source file changes.
MONOGRAM_BOTTOM = 640


def trim(im: Image.Image, pad: int) -> Image.Image:
    a = np.array(im.getchannel("A"))
    ys, xs = np.where(a > ALPHA_FLOOR)
    box = (xs.min() - pad, ys.min() - pad, xs.max() + 1 + pad, ys.max() + 1 + pad)
    out = im.crop(box)
    # Clear the sub-threshold specks inside the padded box too.
    arr = np.array(out)
    arr[arr[:, :, 3] <= ALPHA_FLOOR] = 0
    return Image.fromarray(arr)


def resize_w(im: Image.Image, w: int) -> Image.Image:
    h = round(im.height * w / im.width)
    return im.resize((w, h), Image.LANCZOS)


def build_logo(logo: Image.Image) -> None:
    lockup = trim(logo, pad=6)
    print(f"logo trimmed to {lockup.size}")
    for w in (480, 960):
        out = resize_w(lockup, w) if w < lockup.width else lockup
        path = ASSETS / f"logo-{w}.webp"
        out.save(path, "WEBP", lossless=True, quality=100, method=6)
        print(f"  {path.relative_to(ROOT)} {out.size} {path.stat().st_size // 1024} KB")


# The headline painted on the wall, measured on the source image: two lines
# of capitals, cap height 36 px, cap tops at y = 304 / 364, each line centred
# on its own axis, colour #3B4538. The face was identified by measurement:
# of 20 OFL serifs, only Playfair Display Medium fits the original word
# widths at natural spacing (+0.4 px) with the same amount of ink. Re-setting
# the German lines with these values gives 406/412 px against 409/409.
HEADLINE_FONT = ROOT / "brand/fonts/PlayfairDisplay[wght].ttf"
HEADLINE_WEIGHT = 500
HEADLINE_CAP = 36
HEADLINE_TOPS = (304, 364)
HEADLINE_AXES = (928, 932)
HEADLINE_COLOR = (59, 69, 56)
HEADLINE_TRACK = 0.4
HEADLINE_EN = ("BEAUTIFUL SPACES.", "A CLEARER DAY.")


def english_headline(hero: Image.Image) -> Image.Image:
    """The German headline, replaced by the English one in the same face.

    Only the two headline lines are removed (glyph strokes against a
    morphological-closing background estimate, then inpainted — a box mask
    leaves blotches on the light gradient). The blush rule and the line
    "INTERIOR DESIGN • PROFESSIONAL ORGANIZING" are already English and stay
    as original pixels.
    """
    import cv2
    from PIL import ImageDraw, ImageFont

    im = cv2.cvtColor(np.array(hero), cv2.COLOR_RGB2BGR)
    g = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
    bg = cv2.morphologyEx(g, cv2.MORPH_CLOSE, np.ones((19, 19), np.uint8))
    dark = (bg.astype(int) - g.astype(int)) > 10
    mask = np.zeros(g.shape, np.uint8)
    mask[288:408, 630:1240] = dark[288:408, 630:1240] * 255
    mask = cv2.dilate(mask, np.ones((3, 3), np.uint8), iterations=2)
    clean = cv2.inpaint(im, mask, 5, cv2.INPAINT_TELEA)
    out = Image.fromarray(cv2.cvtColor(clean, cv2.COLOR_BGR2RGB)).convert("RGBA")

    ss = 4  # supersampling for clean antialiasing
    size = 20.0
    while True:
        font = ImageFont.truetype(str(HEADLINE_FONT), int(size * ss))
        font.set_variation_by_axes([HEADLINE_WEIGHT])
        cap_box = font.getbbox("H")
        if cap_box[3] - cap_box[1] >= HEADLINE_CAP * ss:
            break
        size += 0.25

    for text, top, axis in zip(HEADLINE_EN, HEADLINE_TOPS, HEADLINE_AXES):
        width = int(font.getlength(text) + HEADLINE_TRACK * ss * len(text)) + 40 * ss
        layer = Image.new("L", (width, HEADLINE_CAP * 3 * ss))
        draw = ImageDraw.Draw(layer)
        x = 20 * ss
        for ch in text:
            draw.text((x, HEADLINE_CAP * ss - cap_box[1]), ch, font=font, fill=255)
            x += font.getlength(ch) + HEADLINE_TRACK * ss
        layer = layer.resize((layer.width // ss, layer.height // ss), Image.LANCZOS)
        xs = np.where((np.array(layer) > 40).any(0))[0]
        ink = Image.new("RGBA", layer.size, (*HEADLINE_COLOR, 255))
        ink.putalpha(layer)
        out.alpha_composite(ink, (round(axis - (xs.min() + xs.max()) / 2), top - HEADLINE_CAP))
    return out.convert("RGB")


def build_hero(hero: Image.Image, prefix: str = "hero") -> None:
    """Three crops around the slogan baked into the image (centre x ~ 932).

    The slogan is part of the picture, so narrow screens get a tighter crop
    instead of a full-width strip in which the lettering would be ~5 px tall.
    """
    cx = 932
    crops = {
        # name: (crop width in source px, output widths)
        "wide": (hero.width, (1440, 1947)),
        "medium": (1560, (800, 1200, 1560)),
        "narrow": (1077, (640, 1077)),  # 4:3
    }
    for name, (cw, widths) in crops.items():
        left = min(max(cx - cw // 2, 0), hero.width - cw)
        crop = hero.crop((left, 0, left + cw, hero.height))
        for w in widths:
            out = resize_w(crop, w) if w < crop.width else crop
            path = ASSETS / f"{prefix}-{name}-{w}.webp"
            out.save(path, "WEBP", quality=84, method=6)
            print(f"  {path.relative_to(ROOT)} {out.size} {path.stat().st_size // 1024} KB")


def square(mark: Image.Image, size: int, fill: float, bg=None) -> Image.Image:
    """Centre the mark on a square canvas, its longer side at `fill` of it."""
    scale = fill * size / max(mark.size)
    m = mark.resize(
        (round(mark.width * scale), round(mark.height * scale)), Image.LANCZOS
    )
    canvas = Image.new("RGBA", (size, size), (*bg, 255) if bg else (0, 0, 0, 0))
    canvas.alpha_composite(m, ((size - m.width) // 2, (size - m.height) // 2))
    return canvas


def build_icons(logo: Image.Image) -> None:
    mono = logo.crop((0, 0, logo.width, MONOGRAM_BOTTOM))
    mono = trim(mono, pad=0)
    print(f"monogram {mono.size}")

    ico_frames = [square(mono, s, 0.94) for s in (16, 32, 48, 64, 128, 256)]
    ico_frames[-1].save(
        APP / "favicon.ico", sizes=[f.size for f in ico_frames], append_images=ico_frames[:-1]
    )
    square(mono, 512, 0.86).save(APP / "icon.png", optimize=True)
    # iOS applies its own mask and wants an opaque RGB image.
    square(mono, 180, 0.72, PAPER).convert("RGB").save(APP / "apple-icon.png", optimize=True)

    square(mono, 192, 0.86).save(ICONS / "android-chrome-192x192.png", optimize=True)
    square(mono, 512, 0.86).save(ICONS / "android-chrome-512x512.png", optimize=True)

    # Maskable: everything must sit inside the 80 % safe circle (r = 204.8 px).
    mask = square(mono, 512, 0.56, PAPER)
    a = np.array(square(mono, 512, 0.56).getchannel("A"))
    ys, xs = np.where(a > ALPHA_FLOOR)
    r = np.sqrt((xs + 0.5 - 256) ** 2 + (ys + 0.5 - 256) ** 2).max()
    assert r <= 204.8, f"maskable motif reaches r={r:.1f} > 204.8"
    print(f"  maskable motif radius {r:.1f} / 204.8")
    mask.convert("RGB").save(ICONS / "android-chrome-maskable-512x512.png", optimize=True)


# Open Graph cards (1200x630), after the top band of the CI style guide
# (slide 5): the logo on the paper ground at left, a hairline, and the title
# image with its painted slogan at right. File names stay og-image-{de,en}.jpg
# so the layouts and the JSON-LD need no change.
OG_W, OG_H = 1200, 630
OG_PANEL = 400                 # paper panel with the logo
OG_LOGO_W = 330                # logo width inside the panel
OG_HAIRLINE = (199, 201, 204)  # anthrazit-soft #C7C9CC
OG_RULE = (228, 168, 159)      # blush-mid #E4A89F
# Left edge of the photo crop in the title image. Centring on the slogan
# (x 419) cut the book title to "ESS CLUTTER"; the stack starts at x ~ 362.
OG_CROP_LEFT = 340


def build_og(logo: Image.Image, heroes: dict) -> None:
    from PIL import ImageDraw

    lockup = trim(logo, pad=0)
    lw = OG_LOGO_W
    lh = round(lockup.height * lw / lockup.width)
    mark = lockup.resize((lw, lh), Image.LANCZOS)

    photo_w = OG_W - OG_PANEL
    for lang, hero in heroes.items():
        # Crop the title image to the photo panel's aspect, full height, then
        # scale to the panel.
        cw = round(hero.height * photo_w / OG_H)
        left = OG_CROP_LEFT
        photo = hero.crop((left, 0, left + cw, hero.height)).resize((photo_w, OG_H), Image.LANCZOS)

        card = Image.new("RGBA", (OG_W, OG_H), (*PAPER, 255))
        card.paste(photo, (OG_PANEL, 0))
        gap = 34
        top = (OG_H - (lh + gap + 2)) // 2
        card.alpha_composite(mark, ((OG_PANEL - lw) // 2, top))
        d = ImageDraw.Draw(card)
        d.rectangle([OG_PANEL // 2 - 32, top + lh + gap, OG_PANEL // 2 + 31, top + lh + gap + 1], fill=OG_RULE)
        d.rectangle([OG_PANEL - 1, 0, OG_PANEL - 1, OG_H - 1], fill=OG_HAIRLINE)

        path = ROOT / "website/public" / f"og-image-{lang}.jpg"
        card.convert("RGB").save(path, "JPEG", quality=88, subsampling=0, optimize=True)
        print(f"  {path.relative_to(ROOT)} {OG_W}x{OG_H} {path.stat().st_size // 1024} KB (crop x {left}..{left + cw})")


def main() -> None:
    logo = Image.open(ROOT / "Logo2.png").convert("RGBA")
    hero = Image.open(ROOT / "Titelbild Homepage.png").convert("RGB")
    build_logo(logo)
    build_hero(hero)
    hero_en = english_headline(hero)
    build_hero(hero_en, prefix="hero-en")
    build_icons(logo)
    build_og(logo, {"de": hero, "en": hero_en})


if __name__ == "__main__":
    main()
