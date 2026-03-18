---
'@reapit/elements': major
---

Added: `GalleryViewer.Thumbnail` and `GalleryViewer.ThumbnailButton` components. Both render a thumbnail image with an optional video overlay. `Thumbnail` renders as an anchor for URL-driven navigation; `ThumbnailButton` renders as a button for click-handler-driven selection.

Changed: `Image.Fallback` no longer renders a default message when `children` is omitted. Pass `children` explicitly to display a message.

Changed: `src` is now required on `Image` and `ResponsiveImage`.
