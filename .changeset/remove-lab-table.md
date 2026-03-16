---
'@reapit/elements': major
---

Removed: the experimental lab table components — `Table`, `TableBody`, `TableHead`, `TableHeaderCell`, `TableRow`, `SingleLineCell`, `DoubleLineCell`, `TableContainer`, `TableText`, and `TableToolbar`. Use the `replace-lab-table` codemod to migrate to the stable core `Table` API. The `TableProvider` and `useTableContext`, `TableRowSelection`, and `useRowSelection` exports are unaffected.
