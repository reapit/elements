---
'@reapit/elements': patch
---

Fixed: React 19 consumers no longer see "Invalid DOM property" console warnings for Popover API attributes. `getPopoverTriggerProps` now detects the installed React version at runtime and returns camelCase attributes (`popoverTarget`, `popoverTargetAction`) for React 19 and lowercase attributes (`popovertarget`, `popovertargetaction`) for React 18. The return type adjusts accordingly based on which `@types/react` version is installed.
