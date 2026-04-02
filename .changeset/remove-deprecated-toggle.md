---
'@reapit/elements': major
---

Removed: `Toggle`, `ToggleRadio`, `ToggleProps`, `ToggleRadioProps`, `ToggleRadioOption`, `ToggleWrapped`, and `ToggleRadioWrapped` from `src/deprecated/toggle`.

Run the `replace-deprecated-toggle` codemod to migrate `Toggle` to `Switch`:

```bash
yarn dlx @reapit/elements@beta codemod apply replace-deprecated-toggle src/
```

Run the `replace-deprecated-toggle-radio` codemod to migrate `ToggleRadio` to `ChipSelect`:

```bash
yarn dlx @reapit/elements@beta codemod apply replace-deprecated-toggle-radio src/
```
