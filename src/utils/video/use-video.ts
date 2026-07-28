import { useState } from "react";
import type { ReactEventHandler } from "react";

export namespace useVideo {
  export interface Input {
    /** Callback fired when the video fails to load. */
    onError?: ReactEventHandler<HTMLVideoElement>;
    /** Callback fired when the video has loaded enough to begin playback. */
    onLoadedData?: ReactEventHandler<HTMLVideoElement>;
  }

  export interface Output {
    /** Whether the video encountered a loading error. */
    hasError: boolean;
    /** Handler to attach to the video element's `onLoadedData` event. */
    handleLoadedData: ReactEventHandler<HTMLVideoElement>;
    /** Handler to attach to the video element's `onError` event. */
    handleError: ReactEventHandler<HTMLVideoElement>;
  }
}

export function useVideo({ onError, onLoadedData }: useVideo.Input = {}): useVideo.Output {
  const [hasError, setHasError] = useState(false);

  const handleLoadedData: ReactEventHandler<HTMLVideoElement> = (event) => {
    setHasError(false);
    onLoadedData?.(event);
  };

  const handleError: ReactEventHandler<HTMLVideoElement> = (event) => {
    setHasError(true);
    onError?.(event);
  };

  return { handleError, handleLoadedData, hasError };
}
