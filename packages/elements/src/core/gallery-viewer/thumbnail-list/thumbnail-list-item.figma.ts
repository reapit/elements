// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=17644-6036&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/gallery-viewer/gallery-viewer.tsx
// component=GalleryViewer.ThumbnailButton

import figma from "figma";

export default {
  id: "GalleryViewer.ThumbnailButton",
  imports: ['import { GalleryViewer } from "@reapit/elements/core/gallery-viewer";'],
  example: figma.code`// TODO: Use GalleryViewer.Thumbnail instead if using URLSearchParam navigation to control
// the active image in the carousel. */}
<GalleryViewer.ThumbnailButton aria-label="TODO: Add label" aria-pressed={false /* TODO: wire up state so this is true when displayed in the carousel */} src="TODO: add image source"/>`,
};
