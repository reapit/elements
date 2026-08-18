---
description: Replaces DeprecatedLabel and DeprecatedLabelProps with LabelText and LabelText.Props
---

# Replace Deprecated Label Codemod

Automates migration from `DeprecatedLabel` and `DeprecatedLabelProps` to `LabelText` and `LabelText.Props`.

This codemod rewrites imports, JSX usage, value references, and type references for the deprecated label API.

## Usage

```bash
# List available codemods
yarn dlx @reapit/elements@beta codemod list

# Show detailed info about this codemod
yarn dlx @reapit/elements@beta codemod info replace-deprecated-label

# Run on a directory
yarn dlx @reapit/elements@beta codemod apply replace-deprecated-label src/

# Preview changes without writing files
yarn dlx @reapit/elements@beta codemod apply replace-deprecated-label src/ --dry-run

# Specify file extensions
yarn dlx @reapit/elements@beta codemod apply replace-deprecated-label src/ --ext .tsx,.jsx
```

### Facade Package Support

If your project re-exports `@reapit/elements` through an internal facade package, use `--facade-package`.

```bash
yarn dlx @reapit/elements@beta codemod apply replace-deprecated-label src/ --facade-package @company/ui
```

Facade package imports keep their original specifier.

## Background

`DeprecatedLabel` from `deprecated/label` has been superseded by `LabelText` from `core/label-text`.
This codemod provides an automated migration path for the DS-76 API update.

## Transformations

### Import rewrites

| Current import                                  | Rewritten import                   |
| ----------------------------------------------- | ---------------------------------- |
| `@reapit/elements`                              | `@reapit/elements/core/label-text` |
| `@reapit/elements/deprecated/label`             | `@reapit/elements/core/label-text` |
| `@company/ui` (facade package)                  | `@company/ui`                      |
| `@company/ui/elements` (facade package subpath) | `@company/ui/elements`             |

### Symbol rewrites

| Before                 | After             |
| ---------------------- | ----------------- |
| `DeprecatedLabel`      | `LabelText`       |
| `DeprecatedLabelProps` | `LabelText.Props` |

### JSX rewrites

| Before                                    | After                         |
| ----------------------------------------- | ----------------------------- |
| `<DeprecatedLabel>Text</DeprecatedLabel>` | `<LabelText>Text</LabelText>` |
| `<DeprecatedLabel />`                     | `<LabelText />`               |

## Limitations

- If `DeprecatedLabel` or `DeprecatedLabelProps` are referenced without an import, the codemod may still rewrite usage but cannot infer project-specific local declarations.
- Dynamic or unusual aliasing patterns outside standard import syntax may require manual review.
