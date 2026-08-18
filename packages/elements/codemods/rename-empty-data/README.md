---
description: Renames EmptyData to EmptyState
---

# Rename EmptyData Codemod

Migrates `EmptyData` imports and JSX usage to the renamed `EmptyState` component.

## Usage

```bash
# List available codemods
yarn dlx @reapit/elements@beta codemod list

# Show detailed info about this codemod
yarn dlx @reapit/elements@beta codemod info rename-empty-data

# Run on a directory
yarn dlx @reapit/elements@beta codemod apply rename-empty-data src/

# Preview changes without writing files
yarn dlx @reapit/elements@beta codemod apply rename-empty-data src/ --dry-run

# Specify file extensions
yarn dlx @reapit/elements@beta codemod apply rename-empty-data src/ --ext .tsx,.jsx
```

### Facade Package Support

If your project re-exports `@reapit/elements` through an internal facade package, use the `--facade-package` flag:

```bash
yarn dlx @reapit/elements@beta codemod apply rename-empty-data src/ --facade-package @company/ui-components
```

## Transformations

| Before                                         | After                                                            |
| ---------------------------------------------- | ---------------------------------------------------------------- |
| `import { EmptyData } from '@reapit/elements'` | `import { EmptyState } from '@reapit/elements/core/empty-state'` |
| `<EmptyData>`                                  | `<EmptyState>`                                                   |
| `<EmptyData.Action>`                           | `<EmptyState.Action>`                                            |
| `<EmptyData.ActionButton>`                     | `<EmptyState.ActionButton>`                                      |
| `<EmptyData.Description>`                      | `<EmptyState.Description>`                                       |
