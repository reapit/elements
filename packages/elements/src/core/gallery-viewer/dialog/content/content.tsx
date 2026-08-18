import { cx } from "@linaria/core";
import type { HTMLAttributes, ReactNode } from "react";

import { elGalleryViewerDialogContent } from "./styles";

export namespace GalleryViewerDialogContent {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** The content of the gallery viewer dialog's body. */
    children: ReactNode;
  }
}

/**
 * The content area of the gallery viewer dialog.
 */
export function GalleryViewerDialogContent({
  children,
  className,
  ...rest
}: GalleryViewerDialogContent.Props) {
  return (
    <div className={cx(elGalleryViewerDialogContent, className)} {...rest}>
      {children}
    </div>
  );
}

GalleryViewerDialogContent.displayName = "GalleryViewer.Content";
