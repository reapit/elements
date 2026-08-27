import { createContext, useContext } from "react";
import type { MutableRefObject, RefObject } from "react";

export namespace GalleryViewerCarouselContext {
  export interface Value {
    /** Ref tracking the `id` of the currently visible item. Updated by the scroll hook without causing re-renders. */
    activeItemRef: MutableRefObject<string | undefined>;
    /**
     * `true` when `value` is provided but `onChange` is not: the carousel is in
     * read-only controlled mode. The track disables scrolling so the user cannot
     * swipe away from the controlled value.
     */
    isReadOnly: boolean;
    /** Ref to the scrollable track container. Shared with buttons so they can scroll and observe edges. */
    trackRef: RefObject<HTMLDivElement>;
  }
}

/**
 * Context that GalleryViewerCarousel provides to descendants.
 * Provides refs to the track container and currently visible item for Button sub-components.
 */
export const GalleryViewerCarouselContext =
  createContext<GalleryViewerCarouselContext.Value | null>(null);

/**
 * Returns GalleryViewerCarouselContext.Value from the nearest GalleryViewerCarousel ancestor.
 * @throws Error when called outside a GalleryViewerCarousel component.
 */
export function useGalleryViewerCarouselContext(): GalleryViewerCarouselContext.Value {
  const context = useContext(GalleryViewerCarouselContext);
  if (!context) {
    throw new Error("useGalleryViewerCarouselContext requires a GalleryViewerCarousel ancestor");
  }
  return context;
}
