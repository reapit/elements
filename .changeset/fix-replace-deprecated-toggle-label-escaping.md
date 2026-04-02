---
'@reapit/elements': patch
---

Fixed: `replace-deprecated-toggle` codemod now correctly escapes `"` and `&` characters in extracted `ElToggleItem` label text, preventing malformed JSX attribute values in the output.
