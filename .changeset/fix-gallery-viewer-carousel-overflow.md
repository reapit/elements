---
'@reapit/elements': patch
---

Fixed: `GalleryViewer.CarouselLayout` no longer overflows the dialog height. Each layout component now manages its own scroll: `MediaListLayout` scrolls internally and `CarouselLayout` remains fully contained within the available space.
