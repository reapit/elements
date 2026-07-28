import { createContext, useContext } from "react";

export namespace GalleryViewerDialogContext {
  export interface Value {
    /** The ID used for accessibility labelling of the dialog title */
    titleId: string;
  }
}

/**
 * Context that GalleryViewerDialog provides to its descendants. Exposes `titleId`
 * so that sub-components (such as the header) can link to the dialog's accessible name
 * via `aria-labelledby`.
 */
export const GalleryViewerDialogContext = createContext<GalleryViewerDialogContext.Value | null>(
  null,
);

/**
 * Returns the current `GalleryViewerDialogContext` value from the nearest
 * `GalleryViewerDialog` ancestor.
 * @throws an error when called outside a `GalleryViewerDialog`.
 */
export function useGalleryViewerDialogContext(): GalleryViewerDialogContext.Value {
  const context = useContext(GalleryViewerDialogContext);
  if (!context) {
    throw new Error("useGalleryViewerDialogContext requires a GalleryViewerDialog ancestor");
  }
  return context;
}
