import { cx } from "@linaria/core";
import type { HTMLAttributes, ReactNode } from "react";

import { useGalleryViewerDialogContext } from "../context";
import { GalleryViewerDialogHeaderCloseButton } from "./close-button";
import {
  elGalleryViewerDialogHeader,
  elGalleryViewerDialogHeaderAction,
  elGalleryViewerDialogHeaderTitle,
} from "./styles";

export namespace GalleryViewerDialogHeader {
  export interface Props extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    /** The title of the dialog. */
    children: ReactNode;
  }
}

/**
 * A header for the gallery viewer dialog. Contains the dialog's title and the close button.
 */
export function GalleryViewerDialogHeader({
  children,
  className,
  ...rest
}: GalleryViewerDialogHeader.Props) {
  const { titleId } = useGalleryViewerDialogContext();
  return (
    <header {...rest} className={cx(elGalleryViewerDialogHeader, className)}>
      <h2 className={elGalleryViewerDialogHeaderTitle} id={titleId}>
        {children}
      </h2>
      <div className={elGalleryViewerDialogHeaderAction}>
        <GalleryViewerDialogHeaderCloseButton />
      </div>
    </header>
  );
}

GalleryViewerDialogHeader.displayName = "GalleryViewer.Header";
