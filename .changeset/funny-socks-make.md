---
'@reapit/elements': major
---

Remove `DeprecatedIcon` component and associated icon assets.

**Breaking changes**

- Removed the `DeprecatedIcon` component (`src/deprecated/icon`). Use icon components from `src/icons` instead (e.g. `SearchIcon`, `CloseIcon`, `InfoIcon`).
- Removed the `DeprecatedIcons` constants (`src/deprecated/icons`).
- Removed legacy icon SVG assets from `assets/icons/` and placeholder images from `assets/placeholder-images/`.

Use the `upgrade-deprecated-icon` codemod to migrate usages automatically.
