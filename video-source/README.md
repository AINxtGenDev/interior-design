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

- **The music bed.** It lives with the working project in the private repo, not
  here. (Until 2026-08-16 this mattered a great deal — the bed was a Queen
  recording. It is now a Suno instrumental; see below.)
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

## Music

**Replaced on 2026-08-16.** The bed is now `casa_in_ordine.mp3`, an instrumental
generated with Suno (title "Casa in Ordine", tagged `made with suno`), supplied
by the owner. It replaced a bed built from "I Want It All" (Queen), which was
copyrighted and would have been muted or claimed on Instagram and YouTube.

> Check that the Suno plan the track was generated under grants commercial use.
> That is the remaining licence question — it is a question about the account's
> terms, not about a third party's recording.

Section 106.3 s–164.6 s of the 3:26 source, chosen as the steadiest 58.3 s window
(lowest short-term level variance, clear of the intro ramp and the closing fade).
Normalised to −30 LUFS, then sidechain-ducked against the voice: **measured 15.6 dB
lower under speech**, so it never masks the narration.

Two things worth knowing:

- The earlier "~10–11 dB" figure recorded for the Queen bed was wrong. Measured
  properly over the full 58.3 s on a common time grid, that bed ducked **16.5 dB**.
  The new bed at 15.6 dB is close to it.
- The new bed is about **5 dB more present in the gaps** between lines (−31.4 dB
  against the old −36.3 dB). Both beds are normalised to the same −30 LUFS; the
  difference is the material. The Queen section swung wildly (LRA 12.5) so its
  quiet moments dropped away, while this track is steady (LRA 7.8) and therefore
  sits at a consistent level. To pull it back, lower `TARGET_LUFS` in
  `scripts/build_bgm_bed.sh` and re-run both scripts.

A music-free variant is still available at
`renders/claudia-plessl-promo-web-VO-only.mp4` in the working project; swapping
it in is a file copy over `website/public/video/vorstellung.mp4`.

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
