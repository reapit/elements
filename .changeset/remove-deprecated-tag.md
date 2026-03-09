---
'@reapit/elements': major
---

Removed: `DeprecatedTag`, `DeprecatedTagGroup`, `DeprecatedTagProps`, `ElDeprecatedTag`, `ElDeprecatedTagGroup`, and `ElDeprecatedTagGroupInner` — run the `upgrade-deprecated-tag` codemod before upgrading to migrate to `Tag` and `TagGroup`.

`DeprecatedPageHeader.tags` now renders via `TagGroup` and `Tag`, with legacy `intent` values mapped to deprecated intent classes for migration compatibility.
