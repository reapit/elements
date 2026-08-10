// url=<GALLERY_VIEWER_CAROUSEL_URL>
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/gallery-viewer/gallery-viewer.tsx
// component=GalleryViewer.Carousel

import figma from "figma";

export default {
  id: "GalleryViewer.Carousel",
  imports: [
    'import { Image } from "#src/utils/image";',
    'import { GalleryViewer } from "@reapit/elements/core/gallery-viewer";',
  ],
  example: figma.code`<GalleryViewer.Carousel aria-label="TODO: add carousel label">
      <GalleryViewer.CarouselButton direction="previous"/>
      <GalleryViewer.CarouselTrack>
        <GalleryViewer.CarouselItem id="TODO: add image/video ID">
          {/* TODO: Use Video from @reapit/elements/utils/video for displaying video
     * items using the native browser video player */}
          <Image alt="TODO: add alt text if available" width="TODO: add image width" height="TODO: add image height" objectFit="contain" src="TODO: add image source"/>
        </GalleryViewer.CarouselItem>
      </GalleryViewer.CarouselTrack>
      <GalleryViewer.CarouselButton direction="next"/>
    </GalleryViewer.Carousel>`,
};
