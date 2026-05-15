---
'@reapit/elements': major
---

Changed: `ChipSelect` single-select now works without a form association or shared `name` attribute. `ChipSelectChip` is now purely presentational and no longer auto-deselects siblings when checked — that behaviour now lives in `ChipSelect.Option`. Consumers relying on the previous `ChipSelectChip` behaviour should wrap chips in `ChipSelect` with `ChipSelect.Option`, or manage selection state themselves.
