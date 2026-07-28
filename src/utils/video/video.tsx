import { cx } from "@linaria/core";
import type { CSSProperties, ReactNode, VideoHTMLAttributes } from "react";

import { PropertyIcon } from "#src/icons/property";

import { MediaFallback } from "../media-fallback";
import { elMediaFallbackOverlay } from "../media-fallback/styles";
import { elVideo, elVideoContainer } from "./styles";
import { useVideo } from "./use-video";

export namespace Video {
  export interface Props extends Omit<VideoHTMLAttributes<HTMLVideoElement>, "height" | "width"> {
    /** Custom fallback content displayed when the video fails to load. */
    fallback?: ReactNode;
    /** CSS height of the video container. */
    height: string;
    /** How the video should be resized to fit its container. */
    objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
    /**
     * Source URL of the video. Optional when `<source>` elements are provided as `children`
     * instead. When all sources fail to load, an error event fires on the `<video>` element
     * and the fallback UI is shown.
     */
    src?: string;
    /** CSS width of the video container. */
    width: string;
  }
}

export function Video({
  children,
  className,
  controls,
  fallback,
  height,
  objectFit = "contain",
  onError,
  onLoadedData,
  src,
  style,
  tabIndex,
  width,
  ...rest
}: Video.Props) {
  const { handleError, handleLoadedData, hasError } = useVideo({ onError, onLoadedData });

  return (
    <div
      className={elVideoContainer}
      style={{ "--video-width": width, "--video-height": height } as CSSProperties}
    >
      <video
        {...rest}
        aria-hidden={hasError ? "true" : undefined}
        className={cx(elVideo, className)}
        controls={hasError ? false : controls}
        data-object-fit={objectFit}
        onError={handleError}
        onLoadedData={handleLoadedData}
        {...(src !== undefined && { src })}
        style={{ ...style, pointerEvents: hasError ? "none" : style?.pointerEvents }}
        tabIndex={hasError ? -1 : tabIndex}
      >
        {children}
      </video>
      {hasError && (
        <div className={elMediaFallbackOverlay}>
          {fallback ?? (
            <MediaFallback
              aria-atomic="true"
              aria-live="polite"
              icon={<PropertyIcon aria-hidden color="primary" size="lg" />}
              role="status"
            >
              The video could not be loaded
            </MediaFallback>
          )}
        </div>
      )}
    </div>
  );
}

Video.Fallback = MediaFallback;
