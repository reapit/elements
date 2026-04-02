---
'@reapit/elements': minor
---

Added: `GalleryViewerCarousel` now supports dynamic filtering of carousel items. When children are added to or removed from the track at runtime, the carousel automatically observes new items and unobserves removed ones. When the currently visible item is removed, the carousel snaps instantly to the first remaining item.
