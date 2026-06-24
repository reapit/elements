---
'@reapit/elements': patch
---

Fixed: `DeprecatedTable` now correctly renders icon names passed as strings (e.g. `icon="contact"`) as icon components rather than plain text. Icons resolved from strings default to `md` size and `primary` colour.
