# Intro film — source

Plan and composition sources for `website/public/video/vorstellung.mp4`
(58.3 s · 1080×1920 · German voiceover). Built with
[HyperFrames](https://hyperframes.heygen.com) via the `product-launch-video`
workflow; the full working project lives outside this repo at
`~/05_development/55_laulau/79_plessl-video/videos/claudia-plessl-promo`.

| File | What it is |
|---|---|
| `BRIEF.md` | Confirmed intent — audience, angle, constraints, negative list |
| `STORYBOARD.md` | 7 frames with time-coded shot sequences + the `## Video direction` invariants |
| `SCRIPT.md` | Locked German narration, with per-line delivery notes |
| `frame.md` | Design system (`cartesian` preset remixed onto the brand tokens) |
| `compositions/frames/*.html` | The seven frame compositions |
| `audio_meta.json` | Voice + music track wiring |
| `captions-de.vtt` | German subtitles, shipped with the embed |
| `scripts/gemini_tts.py` | Gemini TTS helper used for the voiceover |

## What is deliberately **not** committed

- **The music bed.** It is derived from a commercial recording (see below).
  Committing it to a public repo would distribute copyrighted audio.
- **The voiceover WAVs** — regenerable, ~2 MB. See below.
- `capture/`, `node_modules/`, `renders/` — build artefacts.

## Voiceover

Gemini TTS, model `gemini-2.5-flash-preview-tts`, voice **Sulafat** (warm,
female), `GEMINI_API_KEY` from the local `.env`.

This was not a free choice: **Kokoro has no German** (its languages are
en/es/fr/hi/it/ja/pt-br/zh), and the HeyGen starfish catalogue available to
this account exposes 20 voices — 18 English, 1 Spanish, 1 Polish, no German.
Gemini was the only route that speaks German natively.

Pacing matters: the first pass asked for "echte Pausen" and came back at ~64 wpm
on some lines (63 s total, too slow and too long). The committed prompt asks for
"natürliches, flüssiges Sprechtempo" and lands at 96–158 wpm / 46.2 s.

```bash
python3 scripts/gemini_tts.py "Text" out.wav Sulafat
```

## Music — licence risk, read before publishing wider

The bed is built from **"I Want It All" (Queen)**, supplied by the owner. It is
normalised to −30 LUFS and sidechain-ducked against the voice (music sits ~10–11 dB
lower under speech), so it never masks the narration — but **the recording is
copyrighted**. On Instagram or YouTube this will likely be muted or claimed, and
commercial use without a licence is infringement.

A **music-free variant is already rendered** and ready to drop in:
`renders/claudia-plessl-promo-web-VO-only.mp4` in the working project. Swapping
it is a file copy over `website/public/video/vorstellung.mp4`.

## Rebuilding

```bash
cd ~/05_development/55_laulau/79_plessl-video/videos/claudia-plessl-promo
npx hyperframes check      # lint + runtime + layout + contrast
npx hyperframes snapshot --at 5.5,11,18,27,37.2,46.6,56.3
npx hyperframes render
```

**Do not run `audio.mjs sync-durations`.** It overwrites each frame's `duration`
with the raw voice length, which would delete all 12.1 s of deliberate held
reads and cut the film to 46 s. The property it protects — no frame shorter than
its voice — is satisfied by construction here; every frame runs 1.4–3.6 s past
its narration.
