---
'@reapit/elements': major
---

Changed: Move `Combobox` from `@reapit/elements/core/combobox` to `@reapit/elements/utils/combobox`.

The component is also available from the `@reapit/elements/utils` barrel. Run the `rewrite-combobox-imports` codemod to migrate automatically:

```bash
yarn dlx @reapit/elements@beta codemod apply rewrite-combobox-imports src/
```
