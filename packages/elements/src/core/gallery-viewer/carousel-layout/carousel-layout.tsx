import { cx } from "@linaria/core";
import type { HTMLAttributes, ReactNode } from "react";

import {
  elGalleryViewerCarouselLayout,
  elGalleryViewerCarouselLayoutMain,
  elGalleryViewerCarouselLayoutSidebar,
} from "./styles";

export namespace GalleryViewerCarouselLayout {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** The main content area, typically a carousel. */
    main: ReactNode;
    /** The sidebar area, typically filters and a thumbnail list. */
    sidebar: ReactNode;
  }
}

/**
 * A two-column layout for the gallery viewer at large breakpoints (LG+). Places a
 * main content area (typically a carousel) alongside a fixed-width sidebar (typically
 * filters and a thumbnail list).
 *
 * This component is breakpoint-agnostic. Use `MatchMedia` or `useMatchMedia` to
 * conditionally render it at the appropriate breakpoint.
 */
export function GalleryViewerCarouselLayout({
  className,
  main,
  sidebar,
  ...rest
}: GalleryViewerCarouselLayout.Props) {
  return (
    <div className={cx(elGalleryViewerCarouselLayout, className)} {...rest}>
      <div className={elGalleryViewerCarouselLayoutMain}>{main}</div>
      <div className={elGalleryViewerCarouselLayoutSidebar}>{sidebar}</div>
    </div>
  );
}

GalleryViewerCarouselLayout.displayName = "GalleryViewer.CarouselLayout";
