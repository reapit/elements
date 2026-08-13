import { useRef, useState } from "react";
import type { ReactEventHandler } from "react";

export namespace useImage {
  export interface Input {
    /**
     * Optional callback invoked when the image fails to load.
     */
    onError?: ReactEventHandler<HTMLImageElement>;
    /**
     * Optional callback invoked when the image loads successfully.
     */
    onLoad?: ReactEventHandler<HTMLImageElement>;
    /**
     * The image's `src`. When this changes, `hasError` is reset so a new `src` gets a chance to load.
     */
    src?: string;
  }

  export interface Output {
    /**
     * Whether the current image is in an error state.
     */
    hasError: boolean;
    /**
     * Handler for image load events.
     */
    handleLoad: ReactEventHandler<HTMLImageElement>;
    /**
     * Handler for image error events.
     */
    handleError: ReactEventHandler<HTMLImageElement>;
  }
}

/**
 * Tracks image load/error state and returns event handlers for `img` elements.
 */
export function useImage({ onError, onLoad, src }: useImage.Input = {}): useImage.Output {
  const [hasError, setHasError] = useState(false);
  const previousSrc = useRef(src);

  if (previousSrc.current !== src) {
    previousSrc.current = src;
    if (hasError) setHasError(false);
  }

  const handleLoad: ReactEventHandler<HTMLImageElement> = (event) => {
    setHasError(false);
    onLoad?.(event);
  };

  const handleError: ReactEventHandler<HTMLImageElement> = (event) => {
    setHasError(true);
    onError?.(event);
  };

  return { handleError, handleLoad, hasError };
}
