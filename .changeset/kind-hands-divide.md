---
'@reapit/elements': major
---

Removed `DeprecatedButton`, `DeprecatedButtonGroup`, and `DeprecatedFloatingButton` and all associated types and styles. Run the `upgrade-deprecated-button` codemod to migrate `DeprecatedButton` usages to the `Button` API before upgrading. Run the `upgrade-deprecated-button-group` codemod to migrate `DeprecatedButtonGroup` usages. `DeprecatedFloatingButton` usages must be migrated manually.
