---
description: Migrates AtAGlance.Card to AtAGlance.ArticleCard
---

# AtAGlance ArticleCard Codemod

Migrates old `AtAGlance.Card` usage to the new `AtAGlance.ArticleCard` component.

## Usage

```bash
# List available codemods
yarn codemod list

# Show detailed info about this codemod
yarn codemod info at-a-glance-article-card

# Run on a directory
yarn codemod apply at-a-glance-article-card src/

# Preview changes without writing files
yarn codemod apply at-a-glance-article-card src/ --dry-run

# Specify file extensions
yarn codemod apply at-a-glance-article-card src/ --ext .tsx,.jsx
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

The codemod removes `AtAGlanceCard` from imports when it is no longer used and adds the `AtAGlance` import:

```tsx
// Before
import { AtAGlanceCard } from '@reapit/elements'
;<AtAGlanceCard displayValue="42" label="Total" />

// After
import { AtAGlance } from '@reapit/elements'
;<AtAGlance.ArticleCard displayValue="42" label="Total" />
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
