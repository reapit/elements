import { GalleryViewer } from '../gallery-viewer'
import { Image } from '#src/utils/image'
import figma from '@figma/code-connect'

figma.connect(GalleryViewer.MediaListItem, '<GALLERY_VIEWER_IMAGE_CARD_URL>', {
  example: () => (
    <GalleryViewer.MediaListItem id="TODO: add image/video ID">
      {/* TODO: Use Video from @reapit/elements/utils/video for displaying video
       * items using the native browser video player */}
      <Image
        alt="TODO: add alt text if available"
        width="TODO: add image width"
        height="TODO: add image height"
        objectFit="contain"
        src="TODO: add image source"
      />
    </GalleryViewer.MediaListItem>
  ),
})
