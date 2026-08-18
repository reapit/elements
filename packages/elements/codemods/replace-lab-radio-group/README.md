---
description: Migrates RadioGroup from lab/radio-group to RadioGroupControl from core/radio-group-control
---

# Replace Lab Radio Group Codemod

Automates migration from the experimental `RadioGroup` component (`lab/radio-group`) to the stable `RadioGroupControl` component (`core/radio-group-control`).

This codemod rewrites imports, JSX usage, value references, type references, and renamed props.

## Usage

```bash
# List available codemods
yarn dlx @reapit/elements@beta codemod list

# Show detailed info about this codemod
yarn dlx @reapit/elements@beta codemod info replace-lab-radio-group

# Run on a directory
yarn dlx @reapit/elements@beta codemod apply replace-lab-radio-group src/

# Preview changes without writing files
yarn dlx @reapit/elements@beta codemod apply replace-lab-radio-group src/ --dry-run

# Specify file extensions
yarn dlx @reapit/elements@beta codemod apply replace-lab-radio-group src/ --ext .tsx,.jsx
```

### Facade Package Support

If your project re-exports `@reapit/elements` through an internal facade package, use `--facade-package`.

```bash
yarn dlx @reapit/elements@beta codemod apply replace-lab-radio-group src/ --facade-package @company/ui
```

Facade package imports keep their original specifier.

## Background

`RadioGroup` in `lab/radio-group` has been superseded by `RadioGroupControl` in `core/radio-group-control`. The core component provides a stable API backed by a native `<fieldset>` element, proper form association, and accessibility support via `FormControl`.

Two props were renamed as part of this stabilisation:

- `isRequired` aligns with the HTML attribute name `required`
- `errorMessage` aligns with the `errorText` naming convention used across core form components

## Transformations

### Import rewrites

| Current import                                 | Rewritten import                            |
| ---------------------------------------------- | ------------------------------------------- |
| `@reapit/elements`                             | `@reapit/elements/core/radio-group-control` |
| `@reapit/elements/lab/radio-group`             | `@reapit/elements/core/radio-group-control` |
| `@company/ui` (facade package)                 | `@company/ui`                               |
| `@company/ui/lab/radio-group` (facade subpath) | `@company/ui/lab/radio-group`               |

### Symbol rewrites

| Before            | After                     |
| ----------------- | ------------------------- |
| `RadioGroup`      | `RadioGroupControl`       |
| `RadioGroupProps` | `RadioGroupControl.Props` |

### JSX rewrites

| Before                       | After                                      |
| ---------------------------- | ------------------------------------------ |
| `<RadioGroup>…</RadioGroup>` | `<RadioGroupControl>…</RadioGroupControl>` |
| `<RadioGroup />`             | `<RadioGroupControl />`                    |

### Prop renames

| Before         | After       |
| -------------- | ----------- |
| `isRequired`   | `required`  |
| `errorMessage` | `errorText` |

## Limitations

- **Children require manual review** — `RadioGroup` accepted any children, while `RadioGroupControl` expects `RadioGroupControl.Option` children (which wrap individual radio buttons). Verify that child elements are updated to use `RadioGroupControl.Option` after running this codemod.
- **HTML attribute passthrough changes** — `RadioGroup` extended `HTMLAttributes<HTMLDivElement>`; `RadioGroupControl` extends `FieldsetHTMLAttributes<HTMLFieldSetElement>`. Any `div`-specific attributes passed through may need manual adjustment.
- **Re-exports are skipped** — `export { RadioGroup } from '…'` declarations are left unchanged and require manual migration.
- **Dynamic or non-standard aliasing** — unusual aliasing patterns outside standard import syntax may require manual review.
