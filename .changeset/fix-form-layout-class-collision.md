---
"@reapit/elements": patch
---

Fixed: deprecated `FormLayout` no longer shares a CSS class name with `core/form-layout`, which was breaking the current `FormLayout` component's rendering when both were present on a page.
