---
description: Rewrite ANZ-specific AppSwitcher imports to @reapit/elements/core/app-switcher/anz
---

# Rewrite ANZ App Switcher Imports Codemod

Rewrites imports of ANZ-specific `AppSwitcher` exports (such as `SupportedProductId`) to use the new
`@reapit/elements/core/app-switcher/anz` subpath. Since the ANZ path re-exports all generic symbols too,
only the module specifier changes — all import bindings remain unchanged.

## Usage

```bash
# List available codemods
yarn dlx @reapit/elements@beta codemod list

# Show detailed info about this codemod
yarn dlx @reapit/elements@beta codemod info rewrite-anz-app-switcher-imports

# Run on a directory
yarn dlx @reapit/elements@beta codemod apply rewrite-anz-app-switcher-imports src/

# Preview changes without writing files
yarn dlx @reapit/elements@beta codemod apply rewrite-anz-app-switcher-imports src/ --dry-run
```

### Facade Package Support

If your project re-exports `@reapit/elements` through an internal facade package, use the `--facade-package` flag:

```bash
yarn dlx @reapit/elements@beta codemod apply rewrite-anz-app-switcher-imports src/ --facade-package @company/ui-components
```

## Transformations

| Before                                                                                 | After                                                                                      |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `import { AppSwitcher, SupportedProductId } from '@reapit/elements/core/app-switcher'` | `import { AppSwitcher, SupportedProductId } from '@reapit/elements/core/app-switcher/anz'` |
