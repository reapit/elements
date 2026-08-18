---
description: Migrates deprecated Snack, SnackHolder, SnackProvider, and useSnack to the Toaster system
---

# Replace Deprecated Snack Codemod

Automates migration from the deprecated `Snack` system (`SnackProvider`, `useSnack`, `Snack`, `SnackHolder`, and related types) to the `Toaster` component and `toast` helper from `@reapit/elements/core/toaster`.

## Usage

```bash
# List available codemods
yarn dlx @reapit/elements@beta codemod list

# Show detailed info about this codemod
yarn dlx @reapit/elements@beta codemod info replace-deprecated-snack

# Run on a directory
yarn dlx @reapit/elements@beta codemod apply replace-deprecated-snack src/

# Preview changes without writing files
yarn dlx @reapit/elements@beta codemod apply replace-deprecated-snack src/ --dry-run

# Specify file extensions
yarn dlx @reapit/elements@beta codemod apply replace-deprecated-snack src/ --ext .tsx,.jsx
```

### Facade Package Support

If your project re-exports `@reapit/elements` through an internal facade package, use `--facade-package`.

```bash
yarn dlx @reapit/elements@beta codemod apply replace-deprecated-snack src/ --facade-package @company/ui
```

Facade package imports keep their original specifier.

## Background

The `Snack` system (`SnackProvider`, `useSnack`, `Snack`, `SnackHolder`) has been superseded by the `Toaster` component and `toast` helper from `core/toaster`. The new API is imperative — call `toast.success()`, `toast.error()`, and so on directly without a provider or hook. This codemod provides an automated migration path for the DS-164 API update.

## Transformations

### Import rewrites

| Current import                                      | Rewritten import                |
| --------------------------------------------------- | ------------------------------- |
| `@reapit/elements`                                  | `@reapit/elements/core/toaster` |
| `@reapit/elements/deprecated/use-snack`             | `@reapit/elements/core/toaster` |
| `@company/ui` (facade package)                      | `@company/ui/core/toaster`      |
| `@company/ui/deprecated/use-snack` (facade subpath) | `@company/ui/core/toaster`      |

### Symbol rewrites

| Before          | After                      |
| --------------- | -------------------------- |
| `SnackProvider` | `Toaster` (JSX tag)        |
| `useSnack()`    | removed (variable removed) |
| `snack.success` | `toast.success`            |
| `snack.error`   | `toast.error`              |
| `snack.info`    | `toast.info`               |
| `snack.warning` | `toast.warning`            |

### Type reference rewrites

| Before               | After                      |
| -------------------- | -------------------------- |
| `UseSnack`           | `never` + TODO comment     |
| `SnackProps`         | `never` + TODO comment     |
| `SnackHolderProps`   | `never` + TODO comment     |
| `SnackContextProps`  | `never` + TODO comment     |
| `SnackProviderProps` | `never` + TODO comment     |
| `SnackContext`       | `undefined` + TODO comment |

### JSX element rewrites

| Before                                   | After                        |
| ---------------------------------------- | ---------------------------- |
| `<SnackProvider><App /></SnackProvider>` | `<Toaster><App /></Toaster>` |
| `<SnackProvider />`                      | `<Toaster />`                |

### Before / After

**Before:**

```tsx
import { SnackProvider, useSnack } from "@reapit/elements";

function Root() {
  return (
    <SnackProvider>
      <App />
    </SnackProvider>
  );
}

function App() {
  const snack = useSnack();

  const handleSave = async () => {
    await save();
    snack.success("Saved", 3000);
  };
}
```

**After:**

```tsx
import { Toaster, toast } from "@reapit/elements/core/toaster";

function Root() {
  return (
    <Toaster>
      <App />
    </Toaster>
  );
}

function App() {
  const handleSave = async () => {
    await save();
    toast.success("Saved", { duration: 3000 });
  };
}
```

## Limitations

- `snack.custom()` has no direct equivalent in the `toast` API. The codemod adds a `// TODO` comment above each call site directing you to migrate it manually.
- `<Snack>` and `<SnackHolder>` have no direct equivalent. The codemod adds a `// TODO` comment above each usage but leaves the elements in place.
- Destructured `useSnack()` bindings (e.g. `const { success } = useSnack()`) cannot be automated safely. The codemod adds a `// TODO` comment and leaves the declaration in place.
- Type references (`UseSnack`, `SnackProps`, etc.) are replaced with `never` and a TODO comment. Update these types manually.
- Symbols named after deprecated exports that are not imported from `@reapit/elements` (or your facade package) are left unchanged.
