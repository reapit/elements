---
description: Migrates Combobox imports from core/combobox to utils/combobox
---

# Combobox Import Migration Codemod

Migrates imports of the `Combobox` component and all its related exports from `@reapit/elements/core/combobox` to `@reapit/elements/utils/combobox`.

## Usage

```bash
# List available codemods
yarn dlx @reapit/elements@beta codemod list

# Show detailed info about this codemod
yarn dlx @reapit/elements@beta codemod info rewrite-combobox-imports

# Run on a directory
yarn dlx @reapit/elements@beta codemod apply rewrite-combobox-imports src/

# Preview changes without writing files
yarn dlx @reapit/elements@beta codemod apply rewrite-combobox-imports src/ --dry-run

# Specify file extensions
yarn dlx @reapit/elements@beta codemod apply rewrite-combobox-imports src/ --ext .tsx,.jsx
```

### Facade Package Support

If your project re-exports `@reapit/elements` through an internal facade package, use the `--facade-package` flag:

```bash
yarn dlx @reapit/elements@beta codemod apply rewrite-combobox-imports src/ --facade-package @company/ui-components
```

The codemod uses **prefix matching**, so specifying a base package will match all its subpaths:

```bash
# This will match:
# - @company/design-system/elements
# - @company/design-system/core/combobox
# - etc.
yarn dlx @reapit/elements@beta codemod apply rewrite-combobox-imports src/ --facade-package @company/design-system
```

If you have multiple unrelated facade packages, run the codemod once for each package:

```bash
yarn dlx @reapit/elements@beta codemod apply rewrite-combobox-imports src/ --facade-package @company/ui
yarn dlx @reapit/elements@beta codemod apply rewrite-combobox-imports src/ --facade-package @another/design-lib
```

## Background

The `Combobox` component has moved from `@reapit/elements/core/combobox` to `@reapit/elements/utils/combobox`. This change reflects that Combobox is a composable utility component built on top of `@reapit/elements/utils/listbox`, and belongs alongside other composable utilities.

This is a **breaking change**. Consumers must update their import paths.

## Transformations

All named exports from `core/combobox` move to `utils/combobox` without renaming.

| Before                                                                          | After                                                                            |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `import { Combobox } from '@reapit/elements/core/combobox'`                     | `import { Combobox } from '@reapit/elements/utils/combobox'`                     |
| `import type { ComboboxProps } from '@reapit/elements/core/combobox'`           | `import type { ComboboxProps } from '@reapit/elements/utils/combobox'`           |
| `import { Combobox, type ComboboxProps } from '@reapit/elements/core/combobox'` | `import { Combobox, type ComboboxProps } from '@reapit/elements/utils/combobox'` |
| `import { Combobox as MyCombobox } from '@reapit/elements/core/combobox'`       | `import { Combobox as MyCombobox } from '@reapit/elements/utils/combobox'`       |

Barrel imports from `@reapit/elements` are not affected:

| Import                                        | Result    |
| --------------------------------------------- | --------- |
| `import { Combobox } from '@reapit/elements'` | Unchanged |

## Limitations

- **Side-effect imports** (`import '@reapit/elements/core/combobox'`) are not transformed.
- **Default or namespace imports** (`import * as Combobox from ...`) are not transformed.
- **Dynamic imports** (`import('@reapit/elements/core/combobox')`) are not transformed; update these manually.
