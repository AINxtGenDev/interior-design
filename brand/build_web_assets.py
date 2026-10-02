"""Build every web asset derived from the CI deliverables (2026-10).

Inputs (repo root, supplied by the client):
    Logo2.png               1325x1187 RGBA, primary logo with real alpha
    Titelbild Homepage.png  1947x808 RGB, homepage title image

Outputs:
    website/src/assets/logo-{480,960}.webp            trimmed logo, lossless
    website/src/assets/hero-{crop}-{w}.webp            art-directed hero crops
    website/src/assets/hero-en-{crop}-{w}.webp         same, German slogan removed
    website/src/app/{favicon.ico,icon.png,apple-icon.png}
    website/public/icons/android-chrome-*.png          incl. maskable

Run from the repo root (OpenCV is only needed for the English hero):
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


def remove_slogan(hero: Image.Image) -> Image.Image:
    """The English page sets its slogan as live text, so it needs the wall
    without the German lettering. Only the glyph strokes are masked (dark
    against a morphological-closing background estimate, plus the blush rule)
    and inpainted; a box mask leaves visible blotches on the light gradient.
    """
    import cv2

    im = cv2.cvtColor(np.array(hero), cv2.COLOR_RGB2BGR)
    g = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
    bg = cv2.morphologyEx(g, cv2.MORPH_CLOSE, np.ones((19, 19), np.uint8))
    dark = (bg.astype(int) - g.astype(int)) > 10
    mask = np.zeros(g.shape, np.uint8)
    mask[285:500, 630:1240] = dark[285:500, 630:1240] * 255
    warm = (im[:, :, 2].astype(int) - im[:, :, 0].astype(int)) > 25
    mask[420:445, 860:1010] |= (warm[420:445, 860:1010] * 255).astype(np.uint8)
    mask = cv2.dilate(mask, np.ones((3, 3), np.uint8), iterations=2)
    out = cv2.inpaint(im, mask, 5, cv2.INPAINT_TELEA)
    return Image.fromarray(cv2.cvtColor(out, cv2.COLOR_BGR2RGB))


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


def main() -> None:
    logo = Image.open(ROOT / "Logo2.png").convert("RGBA")
    hero = Image.open(ROOT / "Titelbild Homepage.png").convert("RGB")
    build_logo(logo)
    build_hero(hero)
    build_hero(remove_slogan(hero), prefix="hero-en")
    build_icons(logo)


if __name__ == "__main__":
    main()
