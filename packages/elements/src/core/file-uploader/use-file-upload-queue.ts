import { useEffect, useRef } from "react";

import { FileUploadQueue } from "./file-upload-queue";

/**
 * Creates a `FileUploadQueue` scoped to the calling component, and destroys it on unmount,
 * aborting any in-flight uploads. The queue is not reactive itself. If you need a component
 * to re-render when the queue's state changes, use `useSyncExternalStore` with `queue.subscribe`
 * and the desired `queue.get*Snapshot` method.
 *
 * @param options Passed once, at mount, to the `FileUploadQueue` constructor.
 */
export function useFileUploadQueue<TResult = string>(
  options: FileUploadQueue.Options<TResult>,
): FileUploadQueue<TResult> {
  const queue = useRef(new FileUploadQueue<TResult>(options)).current;

  useEffect(() => () => queue.destroy(), [queue]);

  return queue;
}
