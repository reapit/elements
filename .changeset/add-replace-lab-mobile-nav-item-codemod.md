---
'@reapit/elements': minor
---

Added: `replace-lab-mobile-nav-item` codemod. Migrates `MobileNavItem` from `@reapit/elements/lab/mobile-nav-item` to the stable `TopBar` core components.

- Anchor variant (`href` prop) → `TopBar.MenuItem` with `aria-current`
- Button variant (`onClick` prop, no `href`) → `TopBar.MenuItemButton`
- Expandable variant (JSX children) → `TopBar.MenuGroup` with `TopBar.MenuGroupSummary` and `TopBar.MenuSubmenu`
- `MobileNavItem.Props` type references → `TopBar.MenuItemProps`

Run the codemod to migrate automatically:

```bash
yarn dlx @reapit/elements@beta codemod apply replace-lab-mobile-nav-item src/
```
