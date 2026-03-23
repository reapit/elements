---
description: Replaces DeprecatedPagination and DeprecatedPaginationProps with Pagination and Pagination.Props
---

# Replace Deprecated Pagination Codemod

Automates migration from `DeprecatedPagination` and `DeprecatedPaginationProps` to `Pagination` and `Pagination.Props`.

This codemod rewrites imports, JSX usage, value references, type references, and prop names for the deprecated pagination API.

## Usage

```bash
# List available codemods
yarn dlx @reapit/elements@beta codemod list

# Show detailed info about this codemod
yarn dlx @reapit/elements@beta codemod info replace-deprecated-pagination

# Run on a directory
yarn dlx @reapit/elements@beta codemod apply replace-deprecated-pagination src/

# Preview changes without writing files
yarn dlx @reapit/elements@beta codemod apply replace-deprecated-pagination src/ --dry-run

# Specify file extensions
yarn dlx @reapit/elements@beta codemod apply replace-deprecated-pagination src/ --ext .tsx,.jsx
```

### Facade Package Support

If your project re-exports `@reapit/elements` through an internal facade package, use `--facade-package`.

```bash
yarn dlx @reapit/elements@beta codemod apply replace-deprecated-pagination src/ --facade-package @company/ui
```

Facade package imports keep their original specifier.

## Background

`DeprecatedPagination` from `deprecated/pagination` has been superseded by `Pagination` from `core/pagination`.
The new component uses a different prop API and supports composable navigation controls via `leftAction` and `rightAction`.
This codemod provides an automated migration path for the DS-79 API update.

## Transformations

### Import rewrites

| Current import                                  | Rewritten import                   |
| ----------------------------------------------- | ---------------------------------- |
| `@reapit/elements`                              | `@reapit/elements/core/pagination` |
| `@reapit/elements/deprecated/pagination`        | `@reapit/elements/core/pagination` |
| `@company/ui` (facade package)                  | `@company/ui`                      |
| `@company/ui/elements` (facade package subpath) | `@company/ui/elements`             |

### Symbol rewrites

| Before                      | After              |
| --------------------------- | ------------------ |
| `DeprecatedPagination`      | `Pagination`       |
| `DeprecatedPaginationProps` | `Pagination.Props` |

### JSX prop rewrites

| Before                            | After                       |
| --------------------------------- | --------------------------- |
| `callback={fn}`                   | `onPageChange={fn}`         |
| `currentPage={n}`                 | `pageNumber={n}`            |
| `numberPages={n}`                 | `pageCount={n}`             |
| `hasStartButton` / `hasEndButton` | removed with a TODO comment |

### JSX element rewrites

| Before                                                                   | After                                                           |
| ------------------------------------------------------------------------ | --------------------------------------------------------------- |
| `<DeprecatedPagination callback={fn} currentPage={1} numberPages={5} />` | `<Pagination onPageChange={fn} pageNumber={1} pageCount={5} />` |
| `<DeprecatedPagination ...>...</DeprecatedPagination>`                   | `<Pagination ...>...</Pagination>`                              |

## Limitations

- `hasStartButton` and `hasEndButton` have no direct equivalent in the new `Pagination` API. The codemod removes these props and inserts a JSX TODO comment (e.g. `{/* TODO: implement equivalent behaviour using leftAction and rightAction */}`) directing you to implement equivalent behaviour using `leftAction` and `rightAction`.
- Sub-components (`DeprecatedPaginationWrap`, `DeprecatedPaginationText`, `DeprecatedPaginationInput`, `DeprecatedPaginationButton`), helper functions (`deprecatedHandlePageChange`, `deprecatedHandlePageInputChange`, `deprecatedHandlePageInput`), and styled components (`ElDeprecatedPagination*`) are not migrated. Remove or replace these manually.
- Symbols named `DeprecatedPagination` or `DeprecatedPaginationProps` that are not imported from `@reapit/elements` (or your facade package) are left unchanged. The codemod only rewrites symbols it can trace to an Elements import.
- Dynamic or unusual aliasing patterns outside standard import syntax may require manual review.
