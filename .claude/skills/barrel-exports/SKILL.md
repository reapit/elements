---
name: barrel-exports
description: Enforce named-export-only barrel files for top-level component and utility folders. Use when creating a new component or utility, adding exports to an existing barrel, or reviewing a PR that touches an index.ts in src/core, src/utils, or src/lab.
---

# Barrel Export Conventions

## When to Use This Skill

Invoke this skill when:

- Creating a new component or utility in `src/core/`, `src/utils/`, or `src/lab/`
- Adding or removing exports from a top-level `index.ts` barrel file
- Reviewing a PR that touches any `index.ts` inside these directories

## Why This Matters

Each top-level folder in `src/core/`, `src/utils/`, and `src/lab/` becomes a **subpath entry point** for the published package. Every symbol exported from the barrel is part of the public API. Wildcard re-exports (`export *`) leak internal helpers, sub-components, hooks, and types that consumers should never depend on. This makes future refactoring difficult and bloats the API surface.

## Rules

### 1. Use named exports only

Top-level barrel files (`src/core/<name>/index.ts`, `src/utils/<name>/index.ts`, `src/lab/<name>/index.ts`) **MUST NOT** use `export * from` statements. Use explicit named exports instead.

```typescript
// CORRECT
export { ChipSelect } from "./chip-select";

// WRONG: leaks every export from the module
export * from "./chip-select";
```

### 2. Export only the intended public API

Each barrel should export the **minimum** set of symbols that consumers need. In most cases this is a single component or utility function.

Sub-components accessed through the namespace pattern (e.g. `ChipSelect.Option`) do not need separate exports; they travel with the parent component.

```typescript
// CORRECT: one component, sub-components on the namespace
export { ChipSelect } from "./chip-select";

// WRONG: sub-component exported separately
export { ChipSelect } from "./chip-select";
export { Chip } from "./chip";
```

### 3. Exceptions are explicit

Some folders intentionally export more than one symbol (e.g. a component and a companion utility, or sibling components). These are the exception, not the rule. Each export must be a deliberate, named export.

```typescript
// Acceptable: two sibling components
export { AnchorButton } from "./anchor-button";
export { Button } from "./button";

// Acceptable: component plus companion utility
export { SearchInput } from "./search-input";
export { clearSearchInput } from "./clear-search-input";

// Acceptable: component plus public types
export { AppSwitcher } from "./app-switcher";
export { isProductAccessible } from "./is-product-accessible";
export type { SupportedProductId, ProductConfig } from "./config";
```

### 4. Intermediate sub-barrels may use `export *`

Only **top-level** barrels (the `index.ts` sitting directly inside `src/core/<name>/`, `src/utils/<name>/`, or `src/lab/<name>/`) become subpath entry points. Barrels nested deeper (e.g. `src/utils/combobox/button/index.ts`) do not affect the public API and may use `export *` freely.

### 5. Type exports use `export type`

When re-exporting types, use `export type` to make the intent clear and to support `isolatedModules`.

```typescript
export type { FontSize, FontWeight, FontStyle } from "./types";
```

## Process

### Adding a new component or utility

1. Create the component or utility in its own file.
2. Create `index.ts` in the top-level folder with a single named export.
3. Confirm no internal helpers, hooks, or sub-components leak through the barrel.

### Reviewing a barrel change

**Checklist:**

- [ ] No `export *` statements in top-level barrels
- [ ] Every export is an intentional part of the public API
- [ ] Sub-components are accessible via the namespace, not as separate exports
- [ ] Types use `export type`
- [ ] Internal hooks and utilities remain unexported
