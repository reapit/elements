---
description: Migrates lab/table components to the stable core Table compound API
---

# Replace Lab Table Codemod

Automates migration from experimental `lab/table` components to the stable core `Table` compound component API.

This codemod rewrites imports and JSX usage for the supported lab table symbols, updates renamed props, and inserts TODO comments where manual review is required.

## Usage

```bash
# List available codemods
yarn dlx @reapit/elements@beta codemod list

# Show detailed info about this codemod
yarn dlx @reapit/elements@beta codemod info replace-lab-table

# Run on a directory
yarn dlx @reapit/elements@beta codemod apply replace-lab-table src/

# Preview changes without writing files
yarn dlx @reapit/elements@beta codemod apply replace-lab-table src/ --dry-run

# Specify file extensions
yarn dlx @reapit/elements@beta codemod apply replace-lab-table src/ --ext .tsx,.jsx
```

### Facade Package Support

If your project re-exports `@reapit/elements` through an internal facade package, use `--facade-package`.

```bash
yarn dlx @reapit/elements@beta codemod apply replace-lab-table src/ --facade-package @company/ui
```

When a facade package is provided, rewritten imports remain on the facade specifier.

## Background

The experimental lab table components have been superseded by the stable core table API. The core API is structured around a `Table` compound component (`Table.Body`, `Table.HeaderCell`, and so on), with a different composition model and some prop name changes.

This codemod covers the most common API updates and flags migrations that still need manual judgement.

## Transformations

### Import rewrites

Imports for supported lab table symbols are removed from existing Elements imports and replaced with:

```tsx
import { Table } from '@reapit/elements/core/table'
```

For facade packages, the existing facade specifier is preserved.

### Component rewrites

| Before            | After                    |
| ----------------- | ------------------------ |
| `Table`           | `Table`                  |
| `TableBody`       | `Table.Body`             |
| `TableHead`       | `Table.Head`             |
| `TableHeaderCell` | `Table.HeaderCell`       |
| `TableRow`        | `Table.BodyRow` + TODO   |
| `TableText`       | `Table.PrimaryData`      |
| `TableToolbar`    | `Table.Toolbar`          |
| `SingleLineCell`  | `Table.BodyCell`         |
| `DoubleLineCell`  | `Table.BodyCell` wrapper |
| `TableContainer`  | `div`                    |

### Prop rewrites

| Before                     | After                                               |
| -------------------------- | --------------------------------------------------- |
| `alignment` (header/cells) | `justifySelf` (`left` -> `start`, `right` -> `end`) |
| `description` (toolbar)    | `leftContent`                                       |
| `actions` (toolbar)        | `rightContent`                                      |
| `secondLine` (double line) | `supplementaryData`                                 |
| `firstLine` (double line)  | Child content                                       |
| `width/minWidth/maxWidth`  | Removed + TODO comment                              |

### DoubleLineCell rewrite

`DoubleLineCell` is expanded to match the core composition model:

```tsx
// Before
<DoubleLineCell mediaItem={avatar} firstLine={name} secondLine={email} alignment="left" />

// After
<Table.BodyCell justifySelf="start">
  <Table.DoubleLineLayout mediaItem={avatar} supplementaryData={email}>{name}</Table.DoubleLineLayout>
</Table.BodyCell>
```

### TODO comments

The codemod inserts TODO comments for manual review in two cases:

- `TableRow` migration, to verify whether a row should be `Table.HeaderRow` rather than `Table.BodyRow`
- any removed `width`, `minWidth`, or `maxWidth` prop on `TableHeaderCell`, `SingleLineCell`, or `DoubleLineCell`
- dynamic `alignment` expressions that cannot be safely normalised to the new `justifySelf` value set

## Exclusions

The following lab table areas are intentionally not migrated:

- `table-provider`
- `table-row-selection`

## Limitations

- **Type-only usage of migrated component identifiers** is not rewritten beyond JSX composition patterns.
- **`TableContainer` value references** are not migrated (only JSX element usage is rewritten to `div`).
- **Re-export declarations** are not rewritten and require manual migration.
