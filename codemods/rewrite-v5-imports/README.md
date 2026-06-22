---
description: Rewrites @reapit/elements barrel imports to dedicated subpath imports
---

# Rewrite v5 Imports Codemod

Rewrites root barrel imports from `@reapit/elements` into dedicated subpath imports
(`core/*`, `deprecated/*`, `utils/*`, `icons/*`), enabling tree-shaking and reducing
bundle sizes.

## Usage

```bash
# List available codemods
yarn dlx @reapit/elements@beta codemod list

# Show detailed info about this codemod
yarn dlx @reapit/elements@beta codemod info rewrite-v5-imports

# Run on a directory
yarn dlx @reapit/elements@beta codemod apply rewrite-v5-imports src/

# Preview changes without writing files
yarn dlx @reapit/elements@beta codemod apply rewrite-v5-imports src/ --dry-run

# Specify file extensions
yarn dlx @reapit/elements@beta codemod apply rewrite-v5-imports src/ --ext .tsx,.jsx
```

## Transformations

### Single export

Each named export is moved to its dedicated subpath entry point:

| Before                                              | After                                                               |
| --------------------------------------------------- | ------------------------------------------------------------------- |
| `import { Button } from '@reapit/elements'`         | `import { Button } from '@reapit/elements/core/button'`             |
| `import { DeprecatedIcon } from '@reapit/elements'` | `import { DeprecatedIcon } from '@reapit/elements/deprecated/icon'` |
| `import { Popover } from '@reapit/elements'`        | `import { Popover } from '@reapit/elements/utils/popover'`          |
| `import { MoreIcon } from '@reapit/elements'`       | `import { MoreIcon } from '@reapit/elements/icons/more'`            |

### Multiple exports — same module

Exports that belong to the same module are grouped into a single import statement:

```tsx
// Before
import { Button, AnchorButton } from '@reapit/elements'

// After
import { Button, AnchorButton } from '@reapit/elements/core/button'
```

### Multiple exports — different modules (split)

Exports that belong to different modules are split into separate import statements:

```tsx
// Before
import { Button, Link, DeprecatedIcon, Popover, MoreIcon } from '@reapit/elements'

// After
import { Button } from '@reapit/elements/core/button'
import { Link } from '@reapit/elements/core/link'
import { DeprecatedIcon } from '@reapit/elements/deprecated/icon'
import { Popover } from '@reapit/elements/utils/popover'
import { MoreIcon } from '@reapit/elements/icons/more'
```

### Mixed: subpath-eligible and root-only exports

When a statement imports both subpath-eligible exports and root-only exports
(e.g. `elGlobals` from `styles/globals`), the subpath-eligible exports are moved
and the root-only exports remain in a residual barrel import:

```tsx
// Before
import { Button, elGlobals } from '@reapit/elements'

// After
import { Button } from '@reapit/elements/core/button'
import { elGlobals } from '@reapit/elements'
```

Deprecated style utilities, `Intent`, and `getIntentClassName` are now mapped to
`@reapit/elements/deprecated/styles`:

```tsx
// Before
import { elFlex, getIntentClassName } from '@reapit/elements'

// After
import { elFlex, getIntentClassName } from '@reapit/elements/deprecated/styles'
```

The `Theme` type is now available from `@reapit/elements/utils/theme-provider`:

```tsx
// Before
import type { Theme } from '@reapit/elements'

// After
import type { Theme } from '@reapit/elements/utils/theme-provider'
```

### Type imports

Type-only import declarations and inline `type` specifiers are fully preserved:

```tsx
// Before
import type { Accordion, AccordionProps } from '@reapit/elements'
import { Button, type AccordionProps } from '@reapit/elements'

// After
import type { Accordion, AccordionProps } from '@reapit/elements/core/accordion'
import { Button, type AccordionProps } from '@reapit/elements/core/accordion'
```

### Aliased imports

Custom aliases are preserved:

```tsx
// Before
import { Button as Btn } from '@reapit/elements'

// After
import { Button as Btn } from '@reapit/elements/core/button'
```

### Existing subpath imports (unchanged)

Imports that already use subpath specifiers are left untouched:

```tsx
import { Button } from '@reapit/elements/core/button' // No change
```

## Root-only Exports

The following exports are not in the subpath map and will remain as barrel imports:

- **`styles/globals`** — global CSS reset/base styles (`elGlobals`)

## Export Map

The codemod uses a generated export map (`export-map.ts`) that maps every named
export to its subpath. The map is produced by `generate-export-map.ts`, which
uses ts-morph to resolve all `export *` chains in the source barrels.

To regenerate the map after updating the library:

```bash
node --experimental-strip-types codemods/rewrite-v5-imports/generate-export-map.ts
```
