---
'@reapit/elements': major
---

Removed: the experimental `MobileNavItem` component from `@reapit/elements/lab/mobile-nav-item`.

Run the `replace-lab-mobile-nav-item` codemod to migrate to `TopBar` components:

```bash
yarn dlx @reapit/elements@beta codemod apply replace-lab-mobile-nav-item src/
```
