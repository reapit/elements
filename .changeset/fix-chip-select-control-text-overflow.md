---
'@reapit/elements': patch
---

Fixed: `ChipSelectControl` text overflow and truncation now work correctly. The `FormControl` fieldset's implicit `min-width: min-content` was preventing chips from shrinking, so long text could not truncate or wrap as expected.
