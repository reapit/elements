---
description: Migrates Radio from lab/radio to RadioButton from core/radio-group-control
---

# Replace Lab Radio Codemod

Automates migration from the experimental `Radio` component (`lab/radio`) to the stable `RadioButton` component (`core/radio-group-control`).

This codemod rewrites imports, JSX usage, value references, type references, and renamed props. It also inserts a TODO comment before each migrated JSX statement, encouraging use of `RadioGroupControl` rather than direct `RadioButton` usage.

## Usage

```bash
# List available codemods
yarn dlx @reapit/elements@beta codemod list

# Show detailed info about this codemod
yarn dlx @reapit/elements@beta codemod info replace-lab-radio

# Run on a directory
yarn dlx @reapit/elements@beta codemod apply replace-lab-radio src/

# Preview changes without writing files
yarn dlx @reapit/elements@beta codemod apply replace-lab-radio src/ --dry-run

# Specify file extensions
yarn dlx @reapit/elements@beta codemod apply replace-lab-radio src/ --ext .tsx,.jsx
```

### Facade Package Support

If your project re-exports `@reapit/elements` through an internal facade package, use `--facade-package`.

```bash
yarn dlx @reapit/elements@beta codemod apply replace-lab-radio src/ --facade-package @company/ui
```

Facade package imports keep their original specifier.

## Background

`Radio` in `lab/radio` has been superseded by `RadioButton` in `core/radio-group-control`. The core component provides a stable API and is designed for use within `RadioGroupControl`, which handles grouping, labelling, error display, and form association.

Where possible, prefer using `RadioGroupControl` with `RadioGroupControl.Option` children rather than rendering `RadioButton` directly. The TODO comments added by this codemod flag each migrated usage as a prompt to consider that upgrade.

Two props were renamed or removed as part of this stabilisation:

- `isRequired` aligns with the HTML attribute name `required`
- `hasError` has no direct equivalent on `RadioButton`; error state is managed at the group level via `RadioGroupControl`

## Transformations

### Import rewrites

| Current import                           | Rewritten import                            |
| ---------------------------------------- | ------------------------------------------- |
| `@reapit/elements`                       | `@reapit/elements/core/radio-group-control` |
| `@reapit/elements/lab/radio`             | `@reapit/elements/core/radio-group-control` |
| `@company/ui` (facade package)           | `@company/ui`                               |
| `@company/ui/lab/radio` (facade subpath) | `@company/ui/lab/radio`                     |

### Symbol rewrites

| Before       | After               |
| ------------ | ------------------- |
| `Radio`      | `RadioButton`       |
| `RadioProps` | `RadioButton.Props` |

### JSX rewrites

| Before             | After                          |
| ------------------ | ------------------------------ |
| `<Radio>…</Radio>` | `<RadioButton>…</RadioButton>` |
| `<Radio />`        | `<RadioButton />`              |

### Prop changes

| Before       | After       | Notes                                                         |
| ------------ | ----------- | ------------------------------------------------------------- |
| `isRequired` | `required`  | Renamed to match the HTML attribute name                      |
| `hasError`   | _(removed)_ | No direct equivalent; use `RadioGroupControl` for error state |

### TODO comments

A comment is inserted before each JSX statement containing a migrated element:

```tsx
// TODO: Consider using RadioGroupControl rather than RadioButton directly.
const el = <RadioButton label="Option" />;
```

## Limitations

- **`hasError` is removed**: `RadioButton` has no equivalent prop. Error state is managed at the group level via `RadioGroupControl`'s `errorText` prop. Review usages of `hasError` and migrate them to `RadioGroupControl` where appropriate.
- **`label` is now required**: `Radio` had an optional `label` prop; `RadioButton.Props` requires it. Any usage without `label` will produce a TypeScript error after migration.
- **Children require manual review**: `RadioButton` does not accept children. Any children passed to the original `Radio` must be removed or migrated.
- **Consider upgrading to RadioGroupControl**: `RadioButton` is intended for use inside `RadioGroupControl`. The TODO comments added by this codemod flag each migrated usage as a prompt to consider that upgrade.
- **Re-exports are skipped**: `export { Radio } from '…'` declarations are left unchanged and require manual migration.
- **Aliased non-JSX value references are not renamed**: when `Radio` is imported under an alias (e.g. `import { Radio as R } from '…'`), JSX usages (`<R />`) are renamed correctly via the alias binding, but bare value references (e.g. `const C = R`) are left unchanged because the alias itself is preserved on the rewritten import (`RadioButton as R`). No manual changes are required for these references.
- **Dynamic or non-standard aliasing**: unusual aliasing patterns outside standard import syntax may require manual review.
