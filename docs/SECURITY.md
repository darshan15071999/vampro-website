# Is this app safe? — Verification & Code-Signing Status

**Short answer: yes.** Vampro Voice Generator runs entirely on your computer,
processes your text locally, and does not upload your content. This page explains
the Windows warning you may see and how to verify the installer yourself.

## Why Windows may show a warning

The companion app is **not yet signed with a commercial code-signing
certificate** (one is being obtained). Until then, Windows SmartScreen may show
**"Windows protected your PC — unknown publisher."** This is expected for a new
independent app and does **not** mean the app is unsafe.

To proceed: click **More info → Run anyway**.

> This is a temporary status. Once the certificate is in place, the warning
> disappears and the publisher shows as **Vampro**. Tracking: see PACKAGING.md.

## How to verify you have the genuine installer

1. **Publisher / source:** download only from **https://vampro.in** or the Adobe
   Marketplace listing. Do not trust copies from other sources.
2. **Checksum:** verify the installer's SHA-256 matches the value published at
   `https://vampro.in/plugins/voice-generator/checksums.txt`. In PowerShell:
   ```powershell
   Get-FileHash ".\Vampro Voice Service Companion.exe" -Algorithm SHA256
   ```
   Compare the output to the published hash. A match means the file is intact and
   unaltered.

> Publish the SHA-256 of every release on the download page so users (and IT
> departments) can verify integrity even while the app is unsigned.

## What the app does on your machine

- Runs a local service on `127.0.0.1:8000` — not reachable from the internet.
- Processes text → audio locally; your text/audio never leave the device.
- Network is used only to check for and download updates/models. See
  [PRIVACY.md](PRIVACY.md).

## Reporting a security concern

Email **security@vampro.in**.
