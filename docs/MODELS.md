# Model Bundling & Auto-Update

The app ships a **default model offline** and can **download new models
automatically** when online.

## Default model (offline)

`scripts/fetch-model.ps1` downloads the full Kokoro-82M repo (~348 MB, all 54
voices) into `models/`. The installer bundles it to `{app}\models`. At runtime
`configure_model_cache()` points Hugging Face at that cache, so:

- Synthesis runs **fully offline** — generating audio never needs the network.
- `/health` and `/models` report `model_source: "bundled"`.
- Offline machines fall back to the cache automatically. To hard-disable *all*
  network access (no update checks), set `VAMPRO_FORCE_OFFLINE=1`.

## Auto-update (new models)

A background task scans every `VAMPRO_MODEL_SCAN_INTERVAL` seconds (default 6h;
`0` disables) and downloads any model in the hosted manifest that isn't already
installed. New voices register automatically and appear in `/voices`. Status is
exposed at `GET /models`.

### Manifest schema

Host at `VAMPRO_MODELS_MANIFEST_URL`
(default `https://vampro.in/plugins/voice-generator/models.json`):

```json
{
  "models": [
    {
      "id": "kokoro-82m",
      "repo_id": "hexgrad/Kokoro-82M",
      "version": "1.0",
      "voices": []
    },
    {
      "id": "kokoro-voicepack-2",
      "repo_id": "hexgrad/Kokoro-82M",
      "version": "1.0",
      "voices": [
        { "id": "af_newvoice", "label": "New Voice", "gender": "female",
          "accent": "US", "language": "en-us",
          "model": "kokoro-voicepack-2", "repo_id": "hexgrad/Kokoro-82M" }
      ]
    }
  ]
}
```

- `id` — unique model id; the updater skips models whose `id` is already
  installed.
- `repo_id` — Hugging Face repo the assets are pulled from.
- `voices[]` — voice entries to register; each may carry its own `repo_id`.

### Important constraint

Auto-download covers **Kokoro-compatible voice packs / model revisions** — these
work immediately because synthesis routes by each voice's `repo_id` through the
existing Kokoro pipeline. A **fundamentally different engine** (different
architecture) also needs a code loader, which ships via the app update channel
([UPDATES.md](UPDATES.md)), not the model manifest. Keep auto-update entries to
Kokoro-family models, or pair a new engine with an app release.

### Licensing reminder

Only publish models cleared for commercial use. Confirm each model's license
before adding it to the manifest (the default Kokoro-82M is Apache-2.0). See
[LICENSING.md](LICENSING.md).
