# Voices & Models

The panel builds its voice menu from `GET /voices`, so voices — and entire new
models in a future update — can be added **without changing panel code**.

## Current roster

27 English voices from **Kokoro-82M** (Apache-2.0), all running fully offline
through the bundled English G2P:

- **US English** — 11 female, 8 male (`af_*`, `am_*`)
- **UK English** — 4 female, 4 male (`bf_*`, `bm_*`)

The built-in list lives in `DEFAULT_VOICES` in `server.py`.

## Adding voices (same model)

Ship a `voices.json` next to `VamproVoiceService.exe`. It overrides the built-in
list. Each entry:

```json
{
  "voices": [
    { "id": "af_heart", "label": "Heart", "gender": "female",
      "accent": "US", "language": "en-us", "model": "kokoro-82m" }
  ]
}
```

- `id` — Kokoro voice id; its first character is the language/pipeline code.
- `gender` — `female` | `male` (drives the panel's Gender dropdown).
- `accent` / `language` — shown in the label and reserved for filtering.
- `model` — which engine serves it (see below).

For voices in **non-English** languages, the matching misaki G2P package
(`misaki[ja]`, `misaki[zh]`, …) and any language assets must be bundled in the
build first, or generation for those voices will fail offline.

## Adding a new model (future update)

The architecture is engine-agnostic by design:

1. Add the model's voices to the registry with a new `model` value
   (e.g. `"model": "my-new-tts"`).
2. Implement loading/synthesis for that engine behind the same
   `get_pipeline()` / `generate_audio()` seam in `server.py`, dispatching on the
   voice's `model` field.
3. Bundle the model weights into `./models` (see PACKAGING.md) so it stays
   offline, and ship a new installer + bump the update manifest (UPDATES.md).

No panel change is required — the new voices appear automatically via `/voices`.

## Note on alternatives

As of this review, Kokoro-82M remains the best small, **commercially-licensed**,
CPU-friendly local TTS model. Most alternatives are either non-commercial
(`cc-by-nc`) or multi-GB and unsuitable for a local companion app. Re-evaluate
periodically; the registry makes swapping in a better model low-cost.
