---
description: Inlines deprecated useClickOutside calls and removes Elements imports
---

# Replace Deprecated useClickOutside Codemod

Automates migration away from the deprecated `useClickOutside` hook by replacing each supported call with an inline `useEffect` implementation in consumer code.

## Usage

```bash
# List available codemods
yarn dlx @reapit/elements@beta codemod list

# Show detailed info about this codemod
yarn dlx @reapit/elements@beta codemod info replace-deprecated-use-click-outside

# Run on a directory
yarn dlx @reapit/elements@beta codemod apply replace-deprecated-use-click-outside src/

# Preview changes without writing files
yarn dlx @reapit/elements@beta codemod apply replace-deprecated-use-click-outside src/ --dry-run

# Specify file extensions
yarn dlx @reapit/elements@beta codemod apply replace-deprecated-use-click-outside src/ --ext .tsx,.jsx,.ts
```

### Facade package support

If your project re-exports `@reapit/elements` through an internal facade package, pass `--facade-package`:

```bash
yarn dlx @reapit/elements@beta codemod apply replace-deprecated-use-click-outside src/ --facade-package @company/ui-components
```

## Background

`useClickOutside` is deprecated and will be removed from Reapit Elements. This codemod provides a migration path that removes imports from Elements (or a configured facade package) by inlining equivalent behaviour at each call site.

## Transformations

| Before                                                        | After                                                        |
| ------------------------------------------------------------- | ------------------------------------------------------------ |
| `import { useClickOutside } from '@reapit/elements'`          | _(removed)_                                                  |
| `useClickOutside(popoverRef, closeMenu)`                      | `useEffect(() => { ... }, [popoverRef, closeMenu])`          |
| `import { useRef } from 'react'`                              | `import { useRef, useEffect } from 'react'`                  |
| `import { useClickOutside } from '@company/ui'` (with facade) | _(removed when running with `--facade-package @company/ui`)_ |

## Limitations

- Only direct statement calls with two arguments are auto-transformed.
- Unsupported usage is left in place and annotated with a `TODO` comment for manual migration.
- The codemod reuses the original argument expressions, but they are evaluated in generated local constants before the new effect. Complex or side-effectful expressions should still be reviewed manually.
- This codemod assumes valid React hook usage patterns. Conditional or otherwise invalid hook placements are out of scope and should be migrated manually.
