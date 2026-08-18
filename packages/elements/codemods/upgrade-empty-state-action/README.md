---
description: Migrates EmptyState.Action / EmptyState.ActionButton to plain AnchorButton / Button usage
---

# Upgrade EmptyState Action Codemod

Automates migrating from the deprecated `EmptyState.Action` and `EmptyState.ActionButton` subcomponents to plain `AnchorButton` / `Button` usage. This codemod rewrites JSX elements and imports, explicitly writing the `size`, `variant`, and `useLinkStyle` props that the deprecated components previously baked in.

## Usage

```bash
# List available codemods
yarn dlx @reapit/elements@beta codemod list

# Show detailed info about this codemod
yarn dlx @reapit/elements@beta codemod info upgrade-empty-state-action

# Run on a directory
yarn dlx @reapit/elements@beta codemod apply upgrade-empty-state-action src/

# Preview changes without writing files
yarn dlx @reapit/elements@beta codemod apply upgrade-empty-state-action src/ --dry-run

# Specify file extensions
yarn dlx @reapit/elements@beta codemod apply upgrade-empty-state-action src/ --ext .tsx,.jsx
```

### Facade Package Support

If your project re-exports `@reapit/elements` through an internal facade package, use the `--facade-package` flag:

```bash
yarn dlx @reapit/elements@beta codemod apply upgrade-empty-state-action src/ --facade-package @company/ui-components
```

## Background

`EmptyState.Action` and `EmptyState.ActionButton` were thin wrappers around `AnchorButton` and `Button` respectively, always rendering with `size="medium" variant="tertiary" useLinkStyle` and forwarding every other prop unchanged. They have been deprecated in favour of using `AnchorButton` / `Button` directly, so this codemod un-wraps existing usages and writes the three previously-implicit props explicitly, preserving visual and behavioural parity.

## Transformations

| Before                                                                  | After                                                                                          |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `<EmptyState.Action href="/items">Add</EmptyState.Action>`              | `<AnchorButton href="/items" size="medium" variant="tertiary" useLinkStyle>Add</AnchorButton>` |
| `<EmptyState.ActionButton onClick={fn}>Retry</EmptyState.ActionButton>` | `<Button onClick={fn} size="medium" variant="tertiary" useLinkStyle>Retry</Button>`            |
| `import { EmptyStateAction } from '@reapit/elements'`                   | `import { AnchorButton } from '@reapit/elements/core/button'`                                  |
| `import { EmptyStateActionButton } from '@reapit/elements'`             | `import { Button } from '@reapit/elements/core/button'`                                        |

The `EmptyState` import and any other `EmptyState` usage (the wrapper itself, `EmptyState.Description`, etc.) are left untouched.

## Limitations

- `<EmptyState.Action>` / `<EmptyState.ActionButton>` are matched by exact tag text. If the `EmptyState` import itself is aliased (e.g. `import { EmptyState as ES } from '@reapit/elements'` then `<ES.Action />`), the namespaced tag will not be recognised and must be migrated manually. Directly-imported `EmptyStateAction` / `EmptyStateActionButton` aliases are handled correctly.
- Spread props (`{...rest}`) and dynamic/conditional JSX (e.g. `condition ? <EmptyState.Action /> : null` combined with computed props) are transformed as written; review the diff for correctness.
- Test mocks and snapshots referencing `EmptyState.Action` / `EmptyState.ActionButton` are not updated.
