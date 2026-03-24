---
description: Migrates SearchInput from lab/search-input to SearchInput from core/search-input
---

# Replace Lab SearchInput Codemod

Automates migration from the experimental `SearchInput` component (`lab/search-input`) to the stable `SearchInput` component (`core/search-input`).

This codemod rewrites imports, type references, and renamed or removed props. Where `unstable_onSearch` is removed, it inserts a TODO comment before the containing JSX statement, prompting manual migration to `onChange`.

## Usage

```bash
# List available codemods
yarn dlx @reapit/elements@beta codemod list

# Show detailed info about this codemod
yarn dlx @reapit/elements@beta codemod info replace-lab-search-input

# Run on a directory
yarn dlx @reapit/elements@beta codemod apply replace-lab-search-input src/

# Preview changes without writing files
yarn dlx @reapit/elements@beta codemod apply replace-lab-search-input src/ --dry-run

# Specify file extensions
yarn dlx @reapit/elements@beta codemod apply replace-lab-search-input src/ --ext .tsx,.jsx
```

### Facade Package Support

If your project re-exports `@reapit/elements` through an internal facade package, use `--facade-package`.

```bash
yarn dlx @reapit/elements@beta codemod apply replace-lab-search-input src/ --facade-package @company/ui
```

Facade package imports keep their original specifier.

## Background

`SearchInput` in `lab/search-input` has been superseded by `SearchInput` in `core/search-input`. The core component provides a stable API, supports both controlled and uncontrolled usage, and is built on top of `TextInput`.

Three props were renamed or removed as part of this stabilisation:

- `inputSize` is renamed to `size` to align with the standard prop name used across core components
- `isDisabled` is renamed to `disabled` to match the HTML attribute name
- `unstable_onSearch` has no equivalent in the core component; consumers should use the standard `onChange` handler instead

## Transformations

### Import rewrites

This table covers both `SearchInput` and `SearchInputProps` specifiers. A `SearchInputProps`-only import also produces a `SearchInput` import at the target specifier (so that the rewritten `SearchInput.Props` reference resolves).

| Current import                                  | Rewritten import                     |
| ----------------------------------------------- | ------------------------------------ |
| `@reapit/elements`                              | `@reapit/elements/core/search-input` |
| `@reapit/elements/lab/search-input`             | `@reapit/elements/core/search-input` |
| `@company/ui` (facade package)                  | `@company/ui`                        |
| `@company/ui/lab/search-input` (facade subpath) | `@company/ui/lab/search-input`       |

### Symbol rewrites

| Before             | After               |
| ------------------ | ------------------- |
| `SearchInputProps` | `SearchInput.Props` |

### Prop changes

| Before              | After       | Notes                                                               |
| ------------------- | ----------- | ------------------------------------------------------------------- |
| `inputSize`         | `size`      | Renamed to align with other core components                         |
| `isDisabled`        | `disabled`  | Renamed to match the HTML attribute name                            |
| `unstable_onSearch` | _(removed)_ | No equivalent; use `onChange` instead (flagged with a TODO comment) |

### TODO comments

A comment is inserted before each JSX statement from which `unstable_onSearch` was removed:

```tsx
// TODO: Replace the removed unstable_onSearch prop with onChange.
const el = <SearchInput size="medium" />
```

## Limitations

- **`unstable_onSearch` is removed** — the core component has no equivalent prop. Each removed usage is flagged with a TODO comment. Replace it with a standard `onChange` handler.
- **The lab component was uncontrolled-only** — the core `SearchInput` supports both controlled (`value`) and uncontrolled (`defaultValue`) usage. Review any usage that relied on the lab component's internal state management.
- **Re-exports are skipped** — `export { SearchInput } from '…'` declarations are left unchanged and require manual migration.
- **Aliased non-JSX value references are not renamed** — when `SearchInput` is imported under an alias (e.g. `import { SearchInput as SI } from '…'`), bare value references (e.g. `const C = SI`) are left unchanged because the alias itself is preserved on the rewritten import. No manual changes are required for these references.
- **Unaliased non-JSX value references require no special handling** — bare value references such as `const C = SearchInput` or `forwardRef(SearchInput)` resolve correctly after migration because the component keeps its name (`SearchInput`) in the core package. The import rewrite alone is sufficient.
