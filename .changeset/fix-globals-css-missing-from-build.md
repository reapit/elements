---
'@reapit/elements': patch
---

Fixed: Include global styles (design tokens, box-sizing reset, z-index custom properties) in the build output. These were unintentionally dropped when the root entry point was removed.
