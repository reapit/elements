---
description: Migrates AtAGlance.Card to AtAGlance.ArticleCard
---

# AtAGlance ArticleCard Codemod

Migrates old `AtAGlance.Card` usage to the new `AtAGlance.ArticleCard` component.

## Usage

```bash
# List available codemods
yarn dlx @reapit/elements@beta codemod list

# Show detailed info about this codemod
yarn dlx @reapit/elements@beta codemod info at-a-glance-article-card

# Run on a directory
yarn dlx @reapit/elements@beta codemod apply at-a-glance-article-card src/

# Preview changes without writing files
yarn dlx @reapit/elements@beta codemod apply at-a-glance-article-card src/ --dry-run

# Specify file extensions
yarn dlx @reapit/elements@beta codemod apply at-a-glance-article-card src/ --ext .tsx,.jsx
```

### Facade Package Support

If your project re-exports `@reapit/elements` through an internal facade package, use the `--facade-package` flag:

```bash
yarn dlx @reapit/elements@beta codemod apply at-a-glance-article-card src/ --facade-package @company/ui-components
```

The codemod uses **prefix matching**, so specifying a base package will match all its subpaths:

```bash
# This will match:
# - @company/design-system/elements
# - @company/design-system/core
# - @company/design-system/utils
# - etc.
yarn dlx @reapit/elements@beta codemod apply at-a-glance-article-card src/ --facade-package @company/design-system
```

If you have multiple unrelated facade packages, run the codemod once for each package:

```bash
yarn dlx @reapit/elements@beta codemod apply at-a-glance-article-card src/ --facade-package @company/ui
yarn dlx @reapit/elements@beta codemod apply at-a-glance-article-card src/ --facade-package @another/design-lib
```

**Example with facade package:**

```tsx
// Before (with facade package @habio/design-system)
import { AtAGlanceCard } from "@habio/design-system/elements";
<AtAGlanceCard displayValue="42" label="Total" />;

// After running with --facade-package @habio/design-system
import { AtAGlance } from "@habio/design-system/elements";
<AtAGlance.ArticleCard displayValue="42" label="Total" />;
```

## Background

The `AtAGlance.Card` component API has changed:

- **Old API**: `AtAGlance.Card` accepted props like `displayValue`, `label`, `description`, and `icon` directly
- **New API**: `AtAGlance.Card` is now a primitive for custom layouts using the `grid` prop and subcomponents (`CardIcon`, `CardLabel`, `CardDescription`, `CardValue`)

For standard layouts, use the new element-specific card components:

- `AtAGlance.ArticleCard` - static, non-interactive cards
- `AtAGlance.AnchorCard` - navigable link cards
- `AtAGlance.ButtonCard` - interactive button cards

## Transformations

Both namespaced and direct component usage are converted to the namespaced `AtAGlance.ArticleCard`:

| Before                                              | After                                                      |
| --------------------------------------------------- | ---------------------------------------------------------- |
| `<AtAGlance.Card displayValue="42" label="Total"/>` | `<AtAGlance.ArticleCard displayValue="42" label="Total"/>` |
| `<AtAGlanceCard displayValue="42" label="Total"/>`  | `<AtAGlance.ArticleCard displayValue="42" label="Total"/>` |
| `<AtAGlance.Card grid="..." />`                     | No change (already using new primitive API)                |
| `<AtAGlanceCard grid="..." />`                      | No change (already using new primitive API)                |
| `<AtAGlance.Card>{children}</AtAGlance.Card>`       | No change (already using new primitive API)                |
| `<AtAGlanceCard>{children}</AtAGlanceCard>`         | No change (already using new primitive API)                |
| `<AtAGlance.AnchorCard {...} />`                    | No change (API unchanged)                                  |
| `<AtAGlanceAnchorCard {...} />`                     | No change (API unchanged)                                  |
| `<AtAGlance.ButtonCard {...} />`                    | No change (API unchanged)                                  |
| `<AtAGlanceButtonCard {...} />`                     | No change (API unchanged)                                  |

## Import Handling

The codemod removes `AtAGlanceCard` from imports when it is no longer used and adds the `AtAGlance` import. This works for direct `@reapit/elements` imports and facade packages (when specified via `--facade-package`):

```tsx
// Before
import { AtAGlanceCard } from "@reapit/elements";
<AtAGlanceCard displayValue="42" label="Total" />;

// After
import { AtAGlance } from "@reapit/elements";
<AtAGlance.ArticleCard displayValue="42" label="Total" />;
```

When `AtAGlanceCard` is still used with the new primitive API, the import is kept:

```tsx
// Before
import { AtAGlanceCard } from '@reapit/elements'
<AtAGlanceCard displayValue="42" label="Old" />
<AtAGlanceCard grid="auto"><span>New</span></AtAGlanceCard>

// After
import { AtAGlanceCard } from '@reapit/elements'
<AtAGlance.ArticleCard displayValue="42" label="Old" />
<AtAGlanceCard grid="auto"><span>New</span></AtAGlanceCard>
```
