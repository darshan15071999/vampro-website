# Privacy Policy — Vampro Voice Generator

_Last updated: 2026-06-21. Template for review by the publisher; not legal advice._

Vampro Voice Generator ("the app") is a local text-to-speech tool for Adobe
Premiere Pro. We designed it to keep your content on your own machine.

## What stays on your device (everything that matters)

- **All voice synthesis happens locally.** The text you enter and the audio you
  generate are processed entirely on your computer by the companion service
  running on `127.0.0.1` (localhost).
- **Your text and audio are never transmitted** to us or any third party.
- Generated audio files are saved locally in the app's `generated_audio` folder
  and are not uploaded anywhere.

## What uses the network (and only this)

1. **Update checks.** The app periodically contacts `vampro.in` to check whether
   a newer version of the app or new voice models are available. These requests
   necessarily reveal your IP address, approximate time, and app version to the
   server, like any web request. No content from your projects is sent.
2. **Model downloads.** If you accept (or have auto-update enabled) the service
   may download new voice models from `vampro.in` and/or Hugging Face
   (`huggingface.co`). Only model files are downloaded; nothing is uploaded.
3. **First-run model download (fallback only).** If the offline model bundle is
   not present, the service downloads the default voice model once from Hugging
   Face. Standard installs ship the model offline and skip this.

## What we do NOT collect

- No accounts, no telemetry, no analytics, no advertising identifiers.
- No recording of your text, audio, projects, or usage.

## Your controls

- **Disable auto-updates / network model fetching:** set the environment
  variable `VAMPRO_FORCE_OFFLINE=1` (the service then makes no network calls).
- **Delete generated audio:** remove files from the `generated_audio` folder at
  any time; the app never auto-deletes them.
- **Logs:** the service writes local diagnostic logs to its `logs` folder
  (rotated, 14-day retention). They stay on your device.

## Third-party services

Model downloads are served by Hugging Face; their privacy practices apply to
those requests. See https://huggingface.co/privacy.

## Contact

Questions: privacy@vampro.in · https://vampro.in
