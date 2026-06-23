# Licensing Review (P3-16)

Status: **findings for legal sign-off — not legal advice.**

## Summary — copyleft removed

As of this build the backend is **free of GPL and LGPL code**. The earlier GPL
grapheme-to-phoneme chain (espeak-ng / phonemizer) and the LGPL number speller
(num2words) have been replaced with permissively-licensed components.

| Component | Role | License | Commercial use |
|-----------|------|---------|----------------|
| **Kokoro-82M** (weights) | TTS model | Apache-2.0 | ✅ |
| kokoro | pipeline | Apache-2.0 | ✅ |
| misaki | G2P front end | MIT | ✅ |
| **DeepPhonemizer** | G2P engine (OOD words) | MIT | ✅ |
| **OpenPhonemizer checkpoint** | G2P weights | BSD-3-Clause-Clear | ✅ |
| **inflect** | number→words | MIT | ✅ |
| torch / numpy / scipy | runtime | BSD-3 | ✅ |
| fastapi / pydantic / loguru | service | MIT | ✅ |
| uvicorn / huggingface_hub | service | BSD-3 / Apache-2.0 | ✅ |
| certifi | CA bundle | MPL-2.0 (file-level) | ✅ (standard) |

**No GPL. No LGPL.** Everything is Apache-2.0 / MIT / BSD. The only remaining
copyleft is `certifi` (MPL-2.0), a CA-certificate bundle that is file-level weak
copyleft and ubiquitous in commercial software; it is used only for HTTPS and is
not invoked when `VAMPRO_FORCE_OFFLINE=1`.

## How the copyleft was removed

1. **GPL espeak/phonemizer → permissive G2P.** `vampro_g2p.install_permissive_g2p()`
   installs `sys.modules` stubs for `misaki.espeak` and `num2words` **before**
   kokoro/misaki are imported, so the GPL/LGPL modules are never imported. The
   espeak fallback for out-of-dictionary words is served by DeepPhonemizer (MIT)
   running the OpenPhonemizer checkpoint (BSD-3-Clause-Clear), mapped to Kokoro's
   phoneme set. Validated: OOD words like "Vampro", "Kubernetes", names, and
   technical terms are pronounced (not dropped).
2. **LGPL num2words → inflect (MIT).** A small `inflect`-backed shim provides the
   `num2words(...)` interface misaki uses (cardinal / ordinal / year / float),
   validated at parity with the original on common inputs.
3. **Build excludes.** `VamproVoiceService.spec` excludes `phonemizer`,
   `espeakng_loader`, `num2words` (and unused cloud-download deps) so none are
   bundled. Verify the shipped `dist/` contains no `espeak-ng.dll`, no
   `phonemizer`, and no `num2words` before release.

## Models / content licenses

- Kokoro-82M weights: **Apache-2.0** (commercial use OK).
- OpenPhonemizer checkpoint: **BSD-3-Clause-Clear** (permissive; no patent grant).
- misaki dictionaries: ship with misaki (MIT).

## Action items

- [x] ~~Remove GPL espeak/phonemizer~~ — done (permissive G2P).
- [x] ~~Remove LGPL num2words~~ — done (inflect).
- [ ] Run a release-time audit of `dist/` to confirm zero GPL/LGPL files ship.
- [ ] Legal sign-off on the (now permissive) component set + Apache-2.0 model.
- [ ] Generate a `THIRD-PARTY-NOTICES` manifest (`pip-licenses`) for the installer.

## Sources

- Kokoro-82M (Apache-2.0): https://huggingface.co/hexgrad/Kokoro-82M
- DeepPhonemizer (MIT): https://github.com/as-ideas/DeepPhonemizer
- OpenPhonemizer (BSD-3-Clause-Clear): https://github.com/NeuralVox/OpenPhonemizer
- OpenPhonemizer checkpoint: https://huggingface.co/openphonemizer/ckpt
- inflect (MIT): https://pypi.org/project/inflect/
