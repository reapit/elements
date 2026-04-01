---
'@reapit/elements': minor
---

Added: `replace-deprecated-toggle-radio` codemod. Migrates the deprecated `ToggleRadio` component to `ChipSelect`, expanding inline `options` arrays into declarative `ChipSelect.Option` children and inserting TODO comments where manual follow-up is needed.

Run the codemod to migrate automatically:

```bash
yarn dlx @reapit/elements@beta codemod apply replace-deprecated-toggle-radio src/
```
