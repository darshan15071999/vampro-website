# Market-Readiness Checklist

Honest status of what makes the product ready for commercial mass distribution.
"Done" = completed and verified in this repo. "You" = requires action only you
can take (procurement, hosting, accounts). Lawyer review is intentionally out of
scope per your instruction, but is still recommended before scaling.

## ✅ Done & verified

- [x] **No GPL / LGPL in the backend.** espeak/phonemizer (GPL) replaced with
      OpenPhonemizer checkpoint (BSD-3-Clause-Clear) via DeepPhonemizer (MIT);
      num2words (LGPL) replaced with inflect (MIT). Verified at the code level in
      the shipped `dist/` (no `espeak-ng.dll`, no `phonemizer`, no `num2words`).
- [x] **SBOM** — `Release 1.0/THIRD-PARTY-SBOM.cdx.json` (CycloneDX 1.6, ~103
      components incl. the two model artifacts). Regenerate with
      `scripts/generate-notices.py` (aborts if any GPL/LGPL appears).
- [x] **Third-party attribution** — `Release 1.0/THIRD-PARTY-NOTICES.txt` with the
      full verbatim license text of every shipped component (required by MIT/BSD/
      Apache). Both files are installed to `{app}` by `install.iss`.
- [x] **Offline model bundled** — works with no first-run download.
- [x] **Disclosures in-app** — first-run disclaimer (mandated companion-app text
      first), privacy/terms/licenses links, attribution footer.
- [x] **Only remaining copyleft is MPL-2.0** (`certifi`, `pathspec`) and `tqdm`
      (dual MPL/MIT, used under MIT) — file-level weak copyleft, standard in
      commercial software, source available from PyPI; not invoked when
      `VAMPRO_FORCE_OFFLINE=1`.

## ⚠️ You — required before "market ready"

- [ ] **Code signing.** There is currently **no certificate and no `signtool`**
      on the build machine, so the binaries ship **unsigned** (SmartScreen warns
      on every install). To finish:
      1. `winget install Microsoft.WindowsSDK` (for `signtool.exe`).
      2. Obtain an **OV or EV** code-signing certificate (EV avoids SmartScreen
         from day one) on a USB token or cloud HSM — see PACKAGING.md.
      3. Run `scripts/sign-release.ps1` (signs both exes + the installer) and
         uncomment `SignTool=signtool` in `install.iss`.
      A self-signed certificate is **not** a substitute — it stays untrusted and
      still triggers SmartScreen, so it is not done here.
- [ ] **Host the legal pages** the panel links to: `vampro.in/.../privacy`,
      `/terms`, `/licenses` (publish `THIRD-PARTY-NOTICES.txt` at `/licenses`).
- [ ] **Host the update manifests**: `update.json` (UPDATES.md) and `models.json`
      (MODELS.md) so the update + model auto-download features work in production.
- [ ] **Adobe Marketplace submission** — separate review gate for the panel.

## 🔵 Recommended (not blocking)

- [ ] **Shrink the installer.** `models/` is ~1.1 GB (Kokoro + the 175 MB G2P
      checkpoint, doubled by the Windows HF cache layout). Strip the G2P
      checkpoint's optimizer state and de-duplicate the HF blob/snapshot copies.
- [ ] **Fix `requirements.txt`** (currently UTF-16/mojibake) and pin the new
      deps (`deep-phonemizer`, `inflect`) for reproducible builds.
- [ ] **Lawyer review** of the (now permissive) component set, the Apache-2.0
      model, and the privacy/terms before mass distribution.

## Build → release order

1. `pyinstaller VamproVoiceService.spec` (+ VamproLauncher)
2. `scripts/generate-notices.py` (regenerate SBOM + notices)
3. `scripts/sign-release.ps1` (sign exes — needs cert)
4. Inno Setup compile `install.iss` (signs installer via SignTool directive)
5. `signtool verify /pa` the installer
