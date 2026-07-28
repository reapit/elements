import { cx } from "@linaria/core";
import type { HTMLAttributes } from "react";

import { elGalleryViewerMediaItemCaption } from "./styles";

export namespace GalleryViewerMediaItemCaption {
  export interface Props extends HTMLAttributes<HTMLElement> {}
}

/**
 * The caption for a gallery viewer media item. Typically used to display a title or description for the item.
 * Renders as a <figcaption>. Should only be used for image media items.
 */
export function GalleryViewerMediaItemCaption({
  className,
  ...rest
}: GalleryViewerMediaItemCaption.Props) {
  return <figcaption {...rest} className={cx(elGalleryViewerMediaItemCaption, className)} />;
}

GalleryViewerMediaItemCaption.displayName = "GalleryViewer.Caption";
