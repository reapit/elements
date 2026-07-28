import figma from "@figma/code-connect";

import { GalleryViewer } from "./gallery-viewer";

// XS and SM-MD breakpoint variants in Figma implicitly covered by this connection
figma.connect(GalleryViewer, "<GALLERY_VIEWER_URL>", {
  variant: { View: "Gallery" },
  props: {
    filters: figma.boolean("Show filters", {
      true: figma.children("Filters"),
      false: undefined,
    }),
    mediaItems: figma.children("Image *"),
    title: figma.string("Gallery title"),
  },
  example: (props) => (
    <GalleryViewer title={props.title}>
      <GalleryViewer.MediaListLayout>
        {props.filters}
        <GalleryViewer.MediaList>{props.mediaItems}</GalleryViewer.MediaList>
      </GalleryViewer.MediaListLayout>
    </GalleryViewer>
  ),
});

figma.connect(GalleryViewer, "<GALLERY_VIEWER_URL>", {
  variant: { Breakpoint: "LG-2XL", View: "Gallery" },
  props: {
    carousel: figma.children("Image carousel"),
    filters: figma.boolean("Show filters", {
      true: figma.children("Filters"),
      false: undefined,
    }),
    thumbnailItems: figma.children("Gallery thumbnail"),
    title: figma.string("Gallery title"),
  },
  example: (props) => (
    <GalleryViewer title={props.title}>
      <GalleryViewer.CarouselLayout
        main={props.carousel}
        sidebar={
          <>
            {props.filters}
            <GalleryViewer.ThumbnailList>{props.thumbnailItems}</GalleryViewer.ThumbnailList>
          </>
        }
      />
    </GalleryViewer>
  ),
});
