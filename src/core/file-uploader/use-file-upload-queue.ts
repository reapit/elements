import { FileUploadQueue } from './file-upload-queue'
import { useEffect, useRef } from 'react'

/**
 * Creates a `FileUploadQueue` scoped to the calling component, and destroys it on unmount,
 * aborting any in-flight uploads.
 *
 * @param options Passed once, at mount, to the `FileUploadQueue` constructor.
 */
export function useFileUploadQueue<TResult = string>(
  options: FileUploadQueue.Options<TResult>,
): FileUploadQueue<TResult> {
  const queue = useRef(new FileUploadQueue<TResult>(options)).current

  useEffect(() => () => queue.destroy(), [queue])

  return queue
}
