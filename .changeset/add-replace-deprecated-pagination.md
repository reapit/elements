---
'@reapit/elements': minor
---

Added: `replace-deprecated-pagination` codemod. Migrates `DeprecatedPagination` and `DeprecatedPaginationProps` to the `Pagination` component from `@reapit/elements/core/pagination`. Rewrites imports, renames JSX tags, migrates props (`callback` → `onPageChange`, `currentPage` → `pageNumber`, `numberPages` → `pageCount`), and inserts TODO comments for `hasStartButton` and `hasEndButton` props that have no direct equivalent in the new API.

Run the codemod to migrate automatically:

```bash
yarn dlx @reapit/elements@beta codemod apply replace-deprecated-pagination src/
```
