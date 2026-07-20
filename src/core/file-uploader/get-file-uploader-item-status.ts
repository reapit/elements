import { formatFileSize, getIntlNumberFormat } from '#src/utils/number-format'

import { clampPercentage } from './clamp-percentage'

export namespace getFileUploaderItemStatus {
  export interface Input {
    /** The item's lifecycle status. */
    status: 'queued' | 'uploading' | 'processing' | 'uploaded' | 'error'
    /**
     * Upload progress as a percentage between `0` and `100`. Only meaningful while `status` is `'uploading'`.
     * Omit when the upload mechanism can't report progress (e.g. `fetch`) — the status text falls back to a plain
     * "Uploading" with no percentage.
     */
    progress?: number
    /** The file's size in bytes, used to derive `sizeText`. Omit to skip rendering a size. */
    fileSize?: number
    /** The error message to surface. Only meaningful while `status` is `'error'`. */
    errorMessage?: string
    /**
     * BCP 47 locale tag, forwarded to `formatFileSize` and used to format the upload percentage. Defaults to the
     * runtime locale when omitted.
     */
    locale?: string
  }

  export interface Output {
    /** The formatted file size (e.g. `"3.6 MB"`), or `undefined` if no `fileSize` was given. */
    sizeText?: string
    /** The status text to display (e.g. `"Uploading: 45%"`, or the error message while `status` is `'error'`). */
    statusText: string
    /** Whether `statusText` represents an error, so callers can apply error styling. */
    isError: boolean
  }
}

/**
 * Derives the display text for a file item row, shared by `FileUploader.FileCard` and `FileUploader.MediaCard`.
 * Deliberately typed against a minimal inline shape rather than `FileUploadQueue`'s item type, since the queue
 * doesn't exist yet at this point in the dependency chain.
 */
export function getFileUploaderItemStatus({
  status,
  progress,
  fileSize,
  errorMessage,
  locale,
}: getFileUploaderItemStatus.Input): getFileUploaderItemStatus.Output {
  const sizeText = fileSize === undefined ? undefined : formatFileSize(fileSize, locale)

  if (status === 'error') {
    return { sizeText, statusText: errorMessage?.trim() || 'Error', isError: true }
  }

  const statusText = (() => {
    switch (status) {
      case 'queued':
        return 'Queued'
      case 'uploading':
        return typeof progress === 'number' && Number.isFinite(progress)
          ? `Uploading: ${getIntlNumberFormat(locale, { style: 'percent' }).format(clampPercentage(progress) / 100)}`
          : 'Uploading'
      case 'processing':
        return 'Processing…'
      case 'uploaded':
        return 'Uploaded'
    }
  })()

  return { sizeText, statusText, isError: false }
}
