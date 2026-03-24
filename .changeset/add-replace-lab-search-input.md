---
'@reapit/elements': minor
---

Added: `replace-lab-search-input` codemod. Migrates `SearchInput` from `lab/search-input` to `SearchInput` from `core/search-input`, rewriting imports, renaming `inputSize` to `size` and `isDisabled` to `disabled`, and removing `unstable_onSearch` with a TODO comment pointing to `onChange`.
