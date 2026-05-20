---
'@reapit/elements': patch
---

Fixed: `TagGroup` contained CSS selectors for `data-overflow='hidden'` and `data-overflow='scroll'` that were unreachable — the prop type only allows `'auto'` and `'visible'`. Also corrected the invalid `scrollbar-width: 0` to `scrollbar-width: none`.
