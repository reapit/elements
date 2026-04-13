import { GalleryViewer } from '../gallery-viewer'
import figma from '@figma/code-connect'

figma.connect(GalleryViewer.ThumbnailButton, '<GALLERY_VIEWER_THUMBNAIL_URL>', {
  example: () => (
    // TODO: Use GalleryViewer.Thumbnail instead if using URLSearchParam navigation to control
    // the active image in the carousel. */}
    <GalleryViewer.ThumbnailButton
      aria-label="TODO: Add label"
      aria-pressed={false /* TODO: wire up state so this is true when displayed in the carousel */}
      src="TODO: add image source"
    />
  ),
})
