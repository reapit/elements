---
'@reapit/elements': minor
---

Fixed: Backdrop clicks on `Drawer`, `Dialog`, `GalleryViewerDialog`, `TopBarMenuDrawer`, and `Combobox.Popup` (with `closedBy="any"`) no longer also activate a control on the page behind the backdrop.

Added: `consumeBackdropClick` prop to the `HTMLDialog` utility in `src/utils/dialog`, for building custom dialogs with a fully transparent backdrop that should keep the native click-through behaviour instead.
