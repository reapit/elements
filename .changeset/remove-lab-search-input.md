---
'@reapit/elements': major
---

Removed: the experimental lab `SearchInput` component and its associated `SearchInputProps` type. Run the `replace-lab-search-input` codemod to migrate to the stable `SearchInput` in `core/search-input`:

```bash
yarn dlx @reapit/elements@beta codemod apply replace-lab-search-input src/
```
