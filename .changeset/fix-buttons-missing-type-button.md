---
"@reapit/elements": patch
---

Fixed: the chevron and clear buttons inside `Select`, `Autocomplete`, and their `Control` variants now have `type="button"` set explicitly, so clicking them inside a `<form>` no longer triggers an unintended form submission.
