---
'@reapit/elements': major
---

Remove the deprecated `useMediaQuery` hook and related exports.

**Breaking changes**

- Removed `useMediaQuery`, `MediaType`, `MediaStateContext`, `MediaStateProvider`, `MOBILE_BREAKPOINT`, `TABLET_BREAKPOINT`, `DESKTOP_BREAKPOINT`, `WIDESCREEN_BREAKPOINT`, and `SUPER_WIDESCREEN_BREAKPOINT` from `src/deprecated/use-media-query`.

Use the `upgrade-deprecated-use-media-query` codemod to migrate usages automatically.
