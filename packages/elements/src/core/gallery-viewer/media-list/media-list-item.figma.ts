// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=17644-20476&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/gallery-viewer/gallery-viewer.tsx
// component=GalleryViewer.MediaListItem

import figma from "figma";

export default {
  id: "GalleryViewer.MediaListItem",
  imports: [
    'import { Image } from "#src/utils/image";',
    'import { GalleryViewer } from "@reapit/elements/core/gallery-viewer";',
  ],
  example: figma.code`<GalleryViewer.MediaListItem id="TODO: add image/video ID">
      {/* TODO: Use Video from @reapit/elements/utils/video for displaying video
     * items using the native browser video player */}
      <Image alt="TODO: add alt text if available" width="TODO: add image width" height="TODO: add image height" objectFit="contain" src="TODO: add image source"/>
    </GalleryViewer.MediaListItem>`,
};
