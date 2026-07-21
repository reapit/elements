---
'@reapit/elements': minor
---

Added: drag-and-drop support to `FileInput`. Dropping files goes through the same native `change` event as browsing, so no separate handling is needed — `accept` and `multiple` are enforced on dropped files, since browsers only enforce them for the native picker. The `children` render prop's `isDraggingOver` now reflects real drag state.
