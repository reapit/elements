---
'@reapit/elements': patch
---

Fixed: Default `position` for `buildAnchorPositioningCSS` and `Popover` is now `'fixed'` instead of `'absolute'`, preventing unexpected document scrolling when an anchored popup is open inside a scrolled container such as a `Drawer`.
