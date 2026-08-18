---
description: Migrates ThemeProvider imports from core/theme-provider to utils/theme-provider
---

# ThemeProvider Import Migration Codemod

Migrates imports of `ThemeProvider` and all its related exports from `@reapit/elements/core/theme-provider` to `@reapit/elements/utils/theme-provider`.

## Usage

```bash
# List available codemods
yarn dlx @reapit/elements@beta codemod list

# Show detailed info about this codemod
yarn dlx @reapit/elements@beta codemod info rewrite-theme-provider-imports

# Run on a directory
yarn dlx @reapit/elements@beta codemod apply rewrite-theme-provider-imports src/

# Preview changes without writing files
yarn dlx @reapit/elements@beta codemod apply rewrite-theme-provider-imports src/ --dry-run

# Specify file extensions
yarn dlx @reapit/elements@beta codemod apply rewrite-theme-provider-imports src/ --ext .tsx,.jsx
```

### Facade Package Support

If your project re-exports `@reapit/elements` through an internal facade package, use the `--facade-package` flag:

```bash
yarn dlx @reapit/elements@beta codemod apply rewrite-theme-provider-imports src/ --facade-package @company/ui-components
```

## Background

`ThemeProvider` has moved from `@reapit/elements/core/theme-provider` to `@reapit/elements/utils/theme-provider`. It is a composable utility component rather than a UI component, and belongs alongside other utilities.

This is a **breaking change**. Consumers must update their import paths.

## Transformations

All named exports from `core/theme-provider` move to `utils/theme-provider` without renaming.

| Before                                                                             | After                                                                               |
| ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `import { ThemeProvider } from '@reapit/elements/core/theme-provider'`             | `import { ThemeProvider } from '@reapit/elements/utils/theme-provider'`             |
| `import type { ThemeProviderProps } from '@reapit/elements/core/theme-provider'`   | `import type { ThemeProviderProps } from '@reapit/elements/utils/theme-provider'`   |
| `import { ThemeProvider, useTheme } from '@reapit/elements/core/theme-provider'`   | `import { ThemeProvider, useTheme } from '@reapit/elements/utils/theme-provider'`   |
| `import { ThemeProvider as Provider } from '@reapit/elements/core/theme-provider'` | `import { ThemeProvider as Provider } from '@reapit/elements/utils/theme-provider'` |

Barrel imports from `@reapit/elements` are not affected:

| Import                                             | Result    |
| -------------------------------------------------- | --------- |
| `import { ThemeProvider } from '@reapit/elements'` | Unchanged |

## Limitations

- **Side-effect imports** (`import '@reapit/elements/core/theme-provider'`) are not transformed.
- **Default or namespace imports** (`import * as ThemeProvider from ...`) are not transformed.
- **Dynamic imports** (`import('@reapit/elements/core/theme-provider')`) are not transformed; update these manually.
