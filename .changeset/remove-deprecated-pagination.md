---
'@reapit/elements': major
---

Removed: `DeprecatedPagination`, `DeprecatedPaginationProps`, `DeprecatedPaginationWrap`, `DeprecatedPaginationText`, `DeprecatedPaginationInput`, `DeprecatedPaginationButton`, and related exports from `src/deprecated/pagination`. Use the `Pagination` component from `@reapit/elements/core/pagination` instead.

Run the `replace-deprecated-pagination` codemod to migrate usages of `DeprecatedPagination` and `DeprecatedPaginationProps` automatically. Subcomponents (`DeprecatedPaginationWrap`, `DeprecatedPaginationText`, `DeprecatedPaginationInput`, `DeprecatedPaginationButton`) must be updated manually.

```bash
yarn dlx @reapit/elements@beta codemod apply replace-deprecated-pagination src/
```
