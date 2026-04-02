---
'@reapit/elements': minor
---

Added: `replace-deprecated-toggle` codemod. Migrates the deprecated `Toggle` component to `Switch`, rewrites `ToggleProps` type references to `Switch.Props`, removes internal styled component imports (`ElToggleItem`, `ElToggleCheckbox`, `ElToggleLabel`), and extracts the first `ElToggleItem` child's text as the `label` prop. Self-closing elements and empty children receive an `aria-label="TODO: add accessible label"` placeholder. `ToggleRadio` is not affected.

Run the codemod to migrate automatically:

```bash
yarn dlx @reapit/elements@beta codemod apply replace-deprecated-toggle src/
```
