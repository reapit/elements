// url=https://www.figma.com/design/6CaivqdlTX0UkFYJkpBKDu/Reapit-DS?node-id=17644-21416&m=dev
// source=https://github.com/reapit-global/gbl-ds-elements/blob/main/src/core/gallery-viewer/gallery-viewer.tsx
// component=GalleryViewer

import figma from "figma";

// Branch per variant; no default, else first.

let template;
if (
  figma.selectedInstance.getPropertyValue("Breakpoint") !== "LG-2XL" &&
  figma.selectedInstance.getPropertyValue("View") === "Gallery"
) {
  const filters = figma.selectedInstance.getBoolean("Show filters", {
    true: figma.properties.children(["Filters"]),
    false: undefined,
  });
  const mediaItems = figma.properties.children(["Image *"]);
  const title = figma.selectedInstance.getString("Gallery title");

  template = {
    id: "GalleryViewer",
    imports: ['import { GalleryViewer } from "@reapit/elements/core/gallery-viewer";'],
    example: figma.code`<GalleryViewer${figma.helpers.react.renderProp("title", title)}>
      <GalleryViewer.MediaListLayout>
        ${figma.helpers.react.renderChildren(filters)}
        <GalleryViewer.MediaList>${figma.helpers.react.renderChildren(
          mediaItems,
        )}</GalleryViewer.MediaList>
      </GalleryViewer.MediaListLayout>
    </GalleryViewer>`,
    metadata: { nestable: true },
  };
} else if (
  figma.selectedInstance.getPropertyValue("Breakpoint") === "LG-2XL" &&
  figma.selectedInstance.getPropertyValue("View") === "Gallery"
) {
  const carousel = figma.properties.children(["Image carousel"]);
  const filters = figma.selectedInstance.getBoolean("Show filters", {
    true: figma.properties.children(["Filters"]),
    false: undefined,
  });
  const thumbnailItems = figma.properties.children(["Gallery thumbnail"]);
  const title = figma.selectedInstance.getString("Gallery title");

  template = {
    id: "GalleryViewer",
    imports: ['import { GalleryViewer } from "@reapit/elements/core/gallery-viewer";'],
    example: figma.code`<GalleryViewer${figma.helpers.react.renderProp("title", title)}>
      <GalleryViewer.CarouselLayout${figma.helpers.react.renderProp("main", carousel)} sidebar={<>
            ${figma.helpers.react.renderChildren(filters)}
            <GalleryViewer.ThumbnailList>${figma.helpers.react.renderChildren(
              thumbnailItems,
            )}</GalleryViewer.ThumbnailList>
          </>}/>
    </GalleryViewer>`,
    metadata: { nestable: true },
  };
} else {
  const carousel = figma.properties.children(["Image carousel"]);
  const filters = figma.selectedInstance.getBoolean("Show filters", {
    true: figma.properties.children(["Filters"]),
    false: undefined,
  });
  const thumbnailItems = figma.properties.children(["Gallery thumbnail"]);
  const title = figma.selectedInstance.getString("Gallery title");

  template = {
    id: "GalleryViewer",
    imports: ['import { GalleryViewer } from "@reapit/elements/core/gallery-viewer";'],
    example: figma.code`<GalleryViewer${figma.helpers.react.renderProp("title", title)}>
      <GalleryViewer.CarouselLayout${figma.helpers.react.renderProp("main", carousel)} sidebar={<>
            ${figma.helpers.react.renderChildren(filters)}
            <GalleryViewer.ThumbnailList>${figma.helpers.react.renderChildren(
              thumbnailItems,
            )}</GalleryViewer.ThumbnailList>
          </>}/>
    </GalleryViewer>`,
    metadata: { nestable: true },
  };
}

export default template;
