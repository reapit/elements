---
'@reapit/elements': major
---

Changed: `Image` now requires `width` and `height` props. Pass explicit CSS length strings to all `Image` usages (e.g. `width="300px"` `height="200px"` for fixed dimensions, or `width="100%"` `height="100%"` to fill a container). These props set CSS custom properties and are not forwarded as HTML `img` attributes.
