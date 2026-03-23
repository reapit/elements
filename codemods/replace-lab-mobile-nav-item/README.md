---
description: Migrates MobileNavItem from lab/mobile-nav-item to TopBar components from core/top-bar
---

# Replace Lab MobileNavItem Codemod

Automates migration from the experimental `MobileNavItem` component (`lab/mobile-nav-item`) to the stable `TopBar` components (`core/top-bar`).

This codemod rewrites imports, JSX usage, and type references. It handles all three variants of `MobileNavItem` — anchor, button, and expandable — and inserts TODO comments wherever manual review is required.

## Usage

```bash
# List available codemods
yarn dlx @reapit/elements@beta codemod list

# Show detailed info about this codemod
yarn dlx @reapit/elements@beta codemod info replace-lab-mobile-nav-item

# Run on a directory
yarn dlx @reapit/elements@beta codemod apply replace-lab-mobile-nav-item src/

# Preview changes without writing files
yarn dlx @reapit/elements@beta codemod apply replace-lab-mobile-nav-item src/ --dry-run

# Specify file extensions
yarn dlx @reapit/elements@beta codemod apply replace-lab-mobile-nav-item src/ --ext .tsx,.jsx
```

### Facade package support

If your project re-exports `@reapit/elements` through an internal facade package, use `--facade-package`.

```bash
yarn dlx @reapit/elements@beta codemod apply replace-lab-mobile-nav-item src/ --facade-package @company/ui
```

Facade package imports keep their original specifier.

## Background

`MobileNavItem` in `lab/mobile-nav-item` has been superseded by the `TopBar` component suite in `core/top-bar`. The core components provide stable APIs, use the native `<details>`/`<summary>` disclosure pattern for expandable groups, and integrate with the full `TopBar.Menu` system.

The three variants of `MobileNavItem` each map to a different `TopBar` component:

- Anchor variant (`href` prop) → `TopBar.MenuItem`
- Button variant (`onClick` prop) → `TopBar.MenuItemButton`
- Expandable variant (JSX children) → `TopBar.MenuGroup` + `TopBar.MenuGroupSummary` + `TopBar.MenuSubmenu`

## Transformations

### Import rewrites

| Current import                                     | Rewritten import                  |
| -------------------------------------------------- | --------------------------------- |
| `@reapit/elements`                                 | `@reapit/elements/core/top-bar`   |
| `@reapit/elements/lab/mobile-nav-item`             | `@reapit/elements/core/top-bar`   |
| `@company/ui` (facade package)                     | `@company/ui`                     |
| `@company/ui/lab/mobile-nav-item` (facade subpath) | `@company/ui/lab/mobile-nav-item` |

### Symbol rewrites

| Before                | After                  |
| --------------------- | ---------------------- |
| `MobileNavItem`       | `TopBar`               |
| `MobileNavItem.Props` | `TopBar.MenuItemProps` |

### JSX rewrites — anchor variant

`MobileNavItem` with an `href` prop becomes `TopBar.MenuItem`.

| Before                                                     | After                                                                   |
| ---------------------------------------------------------- | ----------------------------------------------------------------------- |
| `<MobileNavItem label="Home" href="/" />`                  | `<TopBar.MenuItem aria-current={false} href="/">Home</TopBar.MenuItem>` |
| `<MobileNavItem label="Home" href="/" isActive />`         | `<TopBar.MenuItem aria-current="page" href="/">Home</TopBar.MenuItem>`  |
| `<MobileNavItem label="Home" href="/" isActive={false} />` | `<TopBar.MenuItem aria-current={false} href="/">Home</TopBar.MenuItem>` |

### JSX rewrites — button variant

`MobileNavItem` with an `onClick` prop and no `href` becomes `TopBar.MenuItemButton`.

| Before                                                         | After                                                                               |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `<MobileNavItem label="Save" onClick={handleSave} />`          | `<TopBar.MenuItemButton onClick={handleSave}>Save</TopBar.MenuItemButton>`          |
| `<MobileNavItem label="Save" onClick={handleSave} hasBadge />` | `<TopBar.MenuItemButton onClick={handleSave} hasBadge>Save</TopBar.MenuItemButton>` |

### JSX rewrites — expandable variant

`MobileNavItem` with JSX children becomes `TopBar.MenuGroup`.

```tsx
// Before
<MobileNavItem label="Products" isActive hasBadge>
  <MobileNavItem label="Overview" href="/products" isActive />
  <MobileNavItem label="Add new" onClick={handleAdd} />
</MobileNavItem>

// After
// TODO: Children have been wrapped in TopBar.MenuSubmenu. Verify that the submenu children are correct TopBar sub-components.
<TopBar.MenuGroup isActive summary={<TopBar.MenuGroupSummary hasBadge>Products</TopBar.MenuGroupSummary>}>
  <TopBar.MenuSubmenu>
    <TopBar.MenuSubmenuItem aria-current="page" href="/products">Overview</TopBar.MenuSubmenuItem>
    <TopBar.MenuSubmenuItemButton onClick={handleAdd}>Add new</TopBar.MenuSubmenuItemButton>
  </TopBar.MenuSubmenu>
</TopBar.MenuGroup>
```

### Prop changes

| Prop       | Anchor (`TopBar.MenuItem`)                        | Button (`TopBar.MenuItemButton`)   | Expandable (`TopBar.MenuGroup`)            |
| ---------- | ------------------------------------------------- | ---------------------------------- | ------------------------------------------ |
| `label`    | Becomes `children` text                           | Becomes `children` text            | Becomes `TopBar.MenuGroupSummary` children |
| `isActive` | → `aria-current="page"` or `aria-current={false}` | Dropped + TODO comment             | → `isActive` (same prop, same semantics)   |
| `hasBadge` | Unchanged                                         | Unchanged                          | Moved to `TopBar.MenuGroupSummary`         |
| `href`     | Unchanged                                         | —                                  | —                                          |
| `onClick`  | —                                                 | Unchanged (`ButtonHTMLAttributes`) | —                                          |

### TODO comments

The codemod inserts a TODO comment in the following situations:

| Situation                                           | Comment                                                                                                                               |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `isActive` on button variant                        | `TODO: MobileNavItem isActive has no equivalent on TopBar.MenuItemButton. Verify the intended behaviour.`                             |
| Dynamic `isActive` expression on anchor variant     | `TODO: MobileNavItem isActive was a boolean; aria-current expects 'page' or false. Verify this expression.`                           |
| Expandable children wrapped in `TopBar.MenuSubmenu` | `TODO: Children have been wrapped in TopBar.MenuSubmenu. Verify that the submenu children are correct TopBar sub-components.`         |
| Spread-only usage (`{...props}`)                    | `TODO: MobileNavItem could not be automatically migrated. Rewrite using TopBar.MenuItem, TopBar.MenuItemButton, or TopBar.MenuGroup.` |

## Limitations

- **`isActive` on the button variant is dropped** — `TopBar.MenuItemButton` has no `aria-current` prop. Review each flagged usage to determine whether the active state should be communicated another way (e.g. via a parent `TopBar.MenuGroup isActive` prop).
- **Dynamic `isActive` expressions** — when `isActive` holds a runtime value (e.g. `isActive={isCurrentPage}`), the codemod emits `aria-current={isCurrentPage ? 'page' : false}`. Verify the result compiles and the expression evaluates to the correct type.
- **Expandable children** — children are wrapped in `TopBar.MenuSubmenu` verbatim. When children include conditional expressions, mapped arrays, or non-`MobileNavItem` JSX, verify the result uses the correct `TopBar.MenuSubmenu.Item` or `TopBar.MenuSubmenu.ItemButton` sub-components.
- **`label` as a JSX expression** — when `label` holds a runtime value (e.g. `label={title}`), the codemod moves it to children as `{title}`. Verify the expression is `ReactNode`-compatible.
- **Spread-only usage** — `<MobileNavItem {...props} />` cannot be statically analysed. These elements are left unchanged and flagged with a TODO for manual migration.
- **Re-exports are skipped** — `export { MobileNavItem } from '…'` declarations are left unchanged and require manual migration.
- **Aliased non-JSX value references** — when `MobileNavItem` is imported under an alias (e.g. `import { MobileNavItem as NavItem } from '…'`), the codemod rewrites JSX usages but removes the `MobileNavItem as NavItem` import and does not introduce a new `NavItem` binding. Bare value references to the alias (e.g. `const C = NavItem`) will therefore break and must be migrated manually.
