import { cx } from "@linaria/core";
import { useRef } from "react";
import type { HTMLAttributes } from "react";

import { GalleryViewerCarouselButton } from "./carousel-button";
import { GalleryViewerCarouselItem } from "./carousel-item";
import { GalleryViewerCarouselTrack } from "./carousel-track";
import { GalleryViewerCarouselContext } from "./context";
import { elGalleryViewerCarousel } from "./styles";
import { useCarouselScroll } from "./use-carousel-scroll";

export namespace GalleryViewerCarousel {
  export interface ButtonProps extends GalleryViewerCarouselButton.Props {}
  export interface ItemProps extends GalleryViewerCarouselItem.Props {}
  export interface TrackProps extends GalleryViewerCarouselTrack.Props {}

  export interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    /**
     * Accessible label for the carousel region announced by screen readers.
     *
     * Use a short, descriptive phrase that identifies the purpose of the carousel,
     * e.g. `"Property photos"`.
     */
    "aria-label": string;
    /**
     * The `id` of the item to display on first render (uncontrolled mode).
     * When omitted, the first item is shown. Ignored if `value` is provided.
     */
    defaultValue?: string;
    /**
     * Called when the visible item changes: either by swipe or programmatic navigation.
     * Receives the `id` of the newly visible item.
     */
    onChange?: (id: string) => void;
    /**
     * The `id` of the currently visible item (controlled mode).
     * When provided, the carousel scrolls to this item whenever the value changes.
     * Pair with `onChange` to respond to swipe gestures.
     */
    value?: string;
  }
}

/**
 * A carousel component for the gallery viewer that displays a collection of images and videos.
 */
export function GalleryViewerCarousel({
  children,
  className,
  defaultValue,
  onChange,
  value,
  ...rest
}: GalleryViewerCarousel.Props) {
  const activeItemRef = useRef<string | undefined>(value ?? defaultValue);
  const trackRef = useRef<HTMLDivElement>(null);

  // Read-only mode: value is controlled but there is no onChange handler, so the
  // user cannot update state via swipe. The track disables scrolling to prevent
  // the carousel drifting away from the controlled value.
  const isReadOnly = value !== undefined && onChange === undefined;

  useCarouselScroll(trackRef, { activeItemRef, defaultValue, onChange, value });

  return (
    <div
      {...rest}
      aria-roledescription="carousel"
      className={cx(elGalleryViewerCarousel, className)}
      data-value={value}
      role="region"
    >
      <GalleryViewerCarouselContext.Provider value={{ activeItemRef, isReadOnly, trackRef }}>
        {children}
      </GalleryViewerCarouselContext.Provider>
    </div>
  );
}

GalleryViewerCarousel.displayName = "GalleryViewer.Carousel";

GalleryViewerCarousel.Track = GalleryViewerCarouselTrack;
GalleryViewerCarousel.Item = GalleryViewerCarouselItem;
GalleryViewerCarousel.Button = GalleryViewerCarouselButton;
