---
'@reapit/elements': minor
---

Changed: `Listbox` and `Combobox` keyboard navigation now uses the `aria-activedescendant` pattern — focus stays on the listbox container or search input while the active option is tracked via ARIA attributes. When a `Combobox` renders a `Combobox.SearchInput`, `aria-activedescendant` is set on the search input rather than the listbox for both keyboard and mouse interaction.
