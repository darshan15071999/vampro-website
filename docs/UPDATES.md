# Update Channel (#7)

The panel checks for newer versions on load and shows a non-blocking banner with
a link. It never blocks generation and stays silent when offline or when the
manifest is not hosted yet.

## How it works

1. On load the panel reads the local service version from `GET /health`
   (`version`) and its own `PANEL_VERSION` constant (kept in sync with
   `manifest.json`).
2. It fetches the hosted manifest at `UPDATE_MANIFEST_URL`
   (`https://vampro.in/plugins/voice-generator/update.json`).
3. If the local service or panel is behind `latest`, it shows the update banner
   linking to the download URL (opened via `uxp.shell.openExternal`).

`https://vampro.in` is whitelisted in `manifest.json` `requiredPermissions.network`.

## Manifest schema

Host this JSON at the `UPDATE_MANIFEST_URL`. Bump `latest` when you ship a new
build; point `url` at the download/landing page.

```json
{
  "service": {
    "latest": "1.2.0",
    "min_supported": "1.1.0",
    "url": "https://vampro.in/plugins/voice-generator/download"
  },
  "panel": {
    "latest": "1.2.0",
    "url": "https://vampro.in/plugins/voice-generator"
  }
}
```

- `service.latest` / `panel.latest` — newest available versions.
- `service.min_supported` — reserved for a future hard-block of incompatible
  service versions (panel currently surfaces an upgrade prompt only).
- `url` — where the banner's "Update" link sends the user.

A ready-to-host starting point is committed at `docs/update.sample.json`.

## Release checklist (per version)

1. Bump `SERVICE_VERSION` (server.py), `version` (manifest.json), and
   `PANEL_VERSION` (index.js) together.
2. Build + sign (see PACKAGING.md), publish the new installer.
3. Update the hosted `update.json` `latest` values and `url`.
   Existing users see the banner on next panel open.

> The panel is also distributed via the Adobe Marketplace, which updates the
> panel independently. The hosted manifest is what carries **service** (`.exe`)
> updates to users, since the marketplace does not manage the companion app.
