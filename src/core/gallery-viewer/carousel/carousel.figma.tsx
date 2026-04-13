import { GalleryViewer } from '../gallery-viewer'
import { Image } from '#src/utils/image'
import figma from '@figma/code-connect'

figma.connect(GalleryViewer.Carousel, '<GALLERY_VIEWER_CAROUSEL_URL>', {
  example: () => (
    <GalleryViewer.Carousel aria-label="TODO: add carousel label">
      <GalleryViewer.CarouselButton direction="previous" />
      <GalleryViewer.CarouselTrack>
        <GalleryViewer.CarouselItem id="TODO: add image/video ID">
          {/* TODO: Use Video from @reapit/elements/utils/video for displaying video
           * items using the native browser video player */}
          <Image
            alt="TODO: add alt text if available"
            width="TODO: add image width"
            height="TODO: add image height"
            objectFit="contain"
            src="TODO: add image source"
          />
        </GalleryViewer.CarouselItem>
      </GalleryViewer.CarouselTrack>
      <GalleryViewer.CarouselButton direction="next" />
    </GalleryViewer.Carousel>
  ),
})
