# Third-Party Notices & Open-Source Attributions

Vampro Voice Generator is built on open-source software and open voice models.
This notice discloses the major components and their licenses. As of this build
the backend ships **no copyleft (GPL/LGPL) code** — the GPL espeak/phonemizer
chain and the LGPL number speller have been replaced with permissively-licensed
components (see [LICENSING.md](LICENSING.md)). Provided for transparency; not
legal advice.

## Voice model & speech engine

- **Kokoro-82M** — © hexgrad — **Apache-2.0**. Neural text-to-speech model.
  https://huggingface.co/hexgrad/Kokoro-82M (based on StyleTTS2).
- **kokoro** (Python package) — Apache-2.0.
- **misaki** — © hexgrad — MIT. Grapheme-to-phoneme front end.

## Text → phoneme (G2P) — permissive replacements

- **DeepPhonemizer** (`deep-phonemizer`) — **MIT**. Neural G2P engine used for
  out-of-dictionary words. https://github.com/as-ideas/DeepPhonemizer
- **OpenPhonemizer model checkpoint** (`openphonemizer/ckpt`) — **BSD-3-Clause-Clear**.
  Bundled under `models/g2p/`. https://huggingface.co/openphonemizer/ckpt
- **inflect** — **MIT**. Spells numbers/ordinals/years as words.
- **spaCy** + `en_core_web_sm` — MIT.

## Runtime & libraries

| Component | License |
|-----------|---------|
| PyTorch (torch) | BSD-3-Clause |
| NumPy / SciPy | BSD-3-Clause |
| FastAPI | MIT |
| Uvicorn | BSD-3-Clause |
| Pydantic | MIT |
| Loguru | MIT |
| huggingface_hub | Apache-2.0 |
| certifi (CA bundle) | MPL-2.0 (file-level; standard) |

## Removed in this build (no longer shipped)

These GPL/LGPL components from earlier builds are **excluded from the bundle**
and never imported at runtime (enforced by `vampro_g2p.install_permissive_g2p()`
and PyInstaller excludes):

- ~~espeak-ng~~ (GPL-3.0)
- ~~phonemizer / phonemizer-fork~~ (GPL-3.0)
- ~~num2words~~ (LGPL)

## Notes

- A full auto-generated dependency-and-license manifest should still be produced
  at build time (e.g. `pip-licenses`) and shipped with the installer.
- `certifi` is MPL-2.0 (file-level weak copyleft) — universally used in
  commercial software; kept for HTTPS. If a strict no-MPL policy is required, the
  service can run fully offline (`VAMPRO_FORCE_OFFLINE=1`).

## Trademarks

Adobe® and Premiere Pro® are trademarks of Adobe Inc. Vampro Voice Generator is
an independent product, not affiliated with or endorsed by Adobe.
