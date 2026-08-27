---
description: Rewrite ANZ-specific AppSwitcher imports to @reapit/elements/core/app-switcher/anz
---

# Rewrite ANZ App Switcher Imports Codemod

Rewrites imports of ANZ-specific `AppSwitcher` exports (such as `SupportedProductId`) to use the new
`@reapit/elements/core/app-switcher/anz` subpath. Since the ANZ path re-exports all generic symbols too,
only the module specifier changes; all import bindings remain unchanged.

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

The codemod rewrites the module specifier when any ANZ-specific symbol is detected. Import bindings are
preserved unchanged: you do not need to update how you reference the imported names.

| Trigger                                                     | Before                                        | After                                             |
| ----------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------- |
| `SupportedProductId` named import                           | `… from '@reapit/elements/core/app-switcher'` | `… from '@reapit/elements/core/app-switcher/anz'` |
| `ProductConfig` named import                                | `… from '@reapit/elements/core/app-switcher'` | `… from '@reapit/elements/core/app-switcher/anz'` |
| `AppSwitcher.AppAvatar` member access                       | `… from '@reapit/elements/core/app-switcher'` | `… from '@reapit/elements/core/app-switcher/anz'` |
| `AppSwitcher.ProductMenuItem` member access                 | `… from '@reapit/elements/core/app-switcher'` | `… from '@reapit/elements/core/app-switcher/anz'` |
| `AppSwitcher.getDisplayableProductsForYourAppsGroup` access | `… from '@reapit/elements/core/app-switcher'` | `… from '@reapit/elements/core/app-switcher/anz'` |
| `AppSwitcher.getDisplayableProductsForExploreGroup` access  | `… from '@reapit/elements/core/app-switcher'` | `… from '@reapit/elements/core/app-switcher/anz'` |

> **Note:** The codemod only rewrites the import specifier. Uses of deprecated namespace properties such as
> `AppSwitcher.AppAvatar` and `AppSwitcher.ProductMenuItem` will still compile after migration (the namespace
> properties remain, marked `@deprecated`). Replacing them with the direct named exports (`AppAvatar`,
> `AppSwitcherProductMenuItem`) is a manual step.
