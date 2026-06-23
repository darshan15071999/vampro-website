# Packaging & Release

This covers the build/infra steps that pair with the in-code changes: code
signing (P1-5) and bundling the voice model for offline first-run (P1-6).

## Release build order

```
1. pyinstaller VamproVoiceService.spec
2. pyinstaller VamproLauncher.spec
3. scripts/fetch-model.ps1            # populate ./models (once, build machine)
4. scripts/sign-release.ps1          # sign the two service .exe files
5. Inno Setup compile (install.iss)  # auto-signs the installer (see below)
6. signtool verify /pa <installer>   # final check
```

## P1-5 — Code signing

`signtool` does not ship by default: `winget install Microsoft.WindowsSDK`.

Since June 2023 the signing key must live on hardware. Get a certificate on a
**USB token** or a **cloud HSM** (DigiCert KeyLocker, SSL.com eSigner, or Azure
Trusted Signing). **EV is strongly recommended** — it grants immediate
SmartScreen trust, so new users never see the "unrecognized app" warning. OV
starts from zero reputation and warnings persist until enough installs accrue.
A USB token cannot be automated in CI (PIN prompt); a cloud HSM can.

Sign the inner binaries with `scripts/sign-release.ps1`. Sign the **installer**
either by passing `-Installer <path>` to that script, or by letting Inno Setup
sign during compile:

1. Inno Setup IDE → *Tools → Configure Sign Tools…* → add one named `signtool`:
   ```
   signtool sign /tr http://timestamp.digicert.com /td sha256 /fd sha256 $f
   ```
2. Add to the `[Setup]` section of `install.iss`:
   ```ini
   SignTool=signtool
   ```

Always sign **after** UPX (the spec sets `upx=True`); compressing a signed
binary strips the signature.

## P1-6 — Offline model bundling

The service auto-detects a bundled model: if a non-empty `models/` folder sits
next to the executable, `configure_model_cache()` (server.py) sets `HF_HOME` to
it and forces `HF_HUB_OFFLINE=1`, so there is **no first-run download** and no
silent failure behind firewalls/VPNs. `/health` reports `model_source:
"bundled"` vs `"download"`.

To produce the folder:

```powershell
# in the build virtualenv, with internet
./scripts/fetch-model.ps1
```

Then ship it next to `VamproVoiceService.exe`. Add to `install.iss` `[Files]`:

```ini
Source: "models\*"; DestDir: "{app}\models"; Flags: ignoreversion recursesubdirs createallsubdirs
```

After this, the runtime layout is:

```
{app}\VamproVoiceService.exe
{app}\models\           <-- bundled HF cache (offline)
{app}\_internal\...
```

If `models/` is absent the service falls back to the old download-on-first-run
behaviour (now with a clear error surfaced to the panel on failure).
