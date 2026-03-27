---
'@reapit/elements': patch
---

Internal: Update `DescriptionList` Figma Code Connect to target the new Figma component node, retaining the deprecated node as a fallback connection. Wire `layout` and `children` props via `figma.enum` for stacked, inline, and grid variants, and add `size` prop mapping to `DescriptionList.Item` for stacked and inline item connections
