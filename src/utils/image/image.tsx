import { cx } from "@linaria/core";
import type { CSSProperties, ReactNode } from "react";

import { PhotoIcon } from "../../icons/photo";
import { MediaFallback } from "../media-fallback";
import { elMediaFallbackOverlay } from "../media-fallback/styles";
import { ResponsiveImage } from "./responsive-image";
import { elImage, elImageContainer } from "./styles";
import { useImage } from "./use-image";

export namespace Image {
  export interface Props extends ResponsiveImage.Props {
    /**
     * Alternative text for the image.
     *
     * Provide a concise description for informative images. Use an empty string
     * (`""`) for decorative images so assistive technology can ignore them.
     *
     * @see https://www.w3.org/WAI/tutorials/images/decision-tree/
     */
    alt: string;
    /**
     * Custom fallback UI shown if the image fails to load.
     */
    fallback?: ReactNode;
    /**
     * The image's height.
     */
    height: string;
    /**
     * The image's width.
     */
    width: string;
  }
}

/**
 * A utility component that renders a standard `img` element styled to fill its
 * container according to the CSS `object-fit` behaviour. By default
 * (`objectFit="contain"`), the image preserves its aspect ratio within the
 * container, whilst other `objectFit` values may crop or stretch the image. It
 * supports a fallback UI if the image fails to load.
 */
export function Image({
  alt,
  className,
  fallback,
  height,
  objectFit = "contain",
  onError,
  onLoad,
  src,
  width,
  ...rest
}: Image.Props) {
  const { handleError, handleLoad, hasError } = useImage({ onError, onLoad, src });
  const isDecorative = alt === "";
  const shouldAnnounceDefaultFallback = !isDecorative && !fallback;
  const defaultFallbackMessage = alt
    ? `The image could not be loaded: ${alt}`
    : "The image could not be loaded";

  return (
    <div
      className={elImageContainer}
      style={{ "--image-width": width, "--image-height": height } as CSSProperties}
    >
      <ResponsiveImage
        {...rest}
        alt={alt}
        aria-hidden={hasError ? "true" : undefined}
        className={cx(elImage, className)}
        objectFit={objectFit}
        onError={handleError}
        onLoad={handleLoad}
        src={src}
      />
      {hasError && (
        <div className={elMediaFallbackOverlay}>
          {fallback ?? (
            <MediaFallback
              aria-atomic={shouldAnnounceDefaultFallback ? "true" : undefined}
              aria-live={shouldAnnounceDefaultFallback ? "polite" : undefined}
              icon={<PhotoIcon aria-hidden color="primary" size="lg" />}
              role={shouldAnnounceDefaultFallback ? "status" : undefined}
            >
              {defaultFallbackMessage}
            </MediaFallback>
          )}
        </div>
      )}
    </div>
  );
}

Image.Fallback = MediaFallback;
