---
description: Adds fieldSizing="manual" to Textarea components missing the prop
---

# Apply Textarea Field Sizing Codemod

Adds `fieldSizing="manual"` to `Textarea` components that are missing the prop, preserving v4 behaviour when upgrading to v5.

## Usage

```bash
# List available codemods
yarn dlx @reapit/elements@beta codemod list

# Show detailed info about this codemod
yarn dlx @reapit/elements@beta codemod info apply-textarea-field-sizing

# Run on a directory
yarn dlx @reapit/elements@beta codemod apply apply-textarea-field-sizing src/

# Preview changes without writing files
yarn dlx @reapit/elements@beta codemod apply apply-textarea-field-sizing src/ --dry-run

# Specify file extensions
yarn dlx @reapit/elements@beta codemod apply apply-textarea-field-sizing src/ --ext .tsx,.jsx
```

### Facade Package Support

If your project re-exports `@reapit/elements` through an internal facade package, use the `--facade-package` flag:

```bash
yarn dlx @reapit/elements@beta codemod apply apply-textarea-field-sizing src/ --facade-package @company/ui-components
```

The codemod uses **prefix matching**, so specifying a base package will match all its subpaths:

```bash
# This will match:
# - @company/design-system/elements
# - @company/design-system/core
# - etc.
yarn dlx @reapit/elements@beta codemod apply apply-textarea-field-sizing src/ --facade-package @company/design-system
```

## Recommended Migration Order

When upgrading from v4 to v5, run `rewrite-v4-imports` first to rename `TextArea` imports to `Textarea`. Then run this codemod to add the required `fieldSizing` prop:

```bash
yarn dlx @reapit/elements@beta codemod apply rewrite-v4-imports src/
yarn dlx @reapit/elements@beta codemod apply apply-textarea-field-sizing src/
```

This codemod also handles the case where consumers have already manually renamed their `TextArea` imports to `Textarea`.

## Background

The v4 `TextArea` component did not require a `fieldSizing` prop. In v5, the `Textarea` component requires a mandatory `fieldSizing` prop that controls how the text area sizes itself:

- `"content"` — the text area sizes itself to its content
- `"fixed"` — the text area is sized to a specific number of rows
- `"manual"` — the text area is sized by the user (preserves v4 behaviour)

Without `fieldSizing`, the v5 `Textarea` will produce a TypeScript error. This codemod sets `fieldSizing="manual"` on all `Textarea` usages that are missing the prop, which preserves the v4 sizing behaviour and eliminates the type errors introduced by the migration.

## Transformations

| Before                                   | After                                                 |
| ---------------------------------------- | ----------------------------------------------------- |
| `<Textarea />`                           | `<Textarea fieldSizing="manual" />`                   |
| `<Textarea placeholder="..." />`         | `<Textarea placeholder="..." fieldSizing="manual" />` |
| `<TextArea />` (aliased from `Textarea`) | `<TextArea fieldSizing="manual" />`                   |
| `<Textarea fieldSizing="content" />`     | No change (prop already present)                      |
| `<Textarea fieldSizing="fixed" />`       | No change (prop already present)                      |
| `<Textarea fieldSizing="manual" />`      | No change (prop already present)                      |

## Limitations

- This codemod only targets `Textarea` components imported from `@reapit/elements` (or a configured facade package). Components named `Textarea` from other packages are not affected.
- If you are using a `fieldSizing` value other than `"manual"` intentionally, those usages are left unchanged.
- Dynamic `fieldSizing` values (e.g. `fieldSizing={someVariable}`) are left unchanged regardless of their runtime value.
