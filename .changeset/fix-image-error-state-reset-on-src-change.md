---
"@reapit/elements": patch
---

Fixed: `Image` and `Avatar` no longer get stuck showing the fallback after a failed image load. Changing `src` now clears the error state and gives the new image a chance to load.
