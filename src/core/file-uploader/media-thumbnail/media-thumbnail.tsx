import {
  ElFileUploaderMediaThumbnail,
  ElFileUploaderMediaThumbnailOverlay,
  ElFileUploaderMediaThumbnailActionContainer,
  ElFileUploaderMediaThumbnailDuration,
  ElFileUploaderMediaThumbnailStatusIcon,
  ElFileUploaderMediaThumbnailErrorBadge,
} from './styles'
import { FileUploaderCircularProgress } from './circular-progress/circular-progress'
import { FileUploaderSpinner } from './spinner/spinner'
import { Image } from '#src/utils/image'
import { PhotoIcon } from '#src/icons/photo'
import { WarningCircleOutlineIcon } from '#src/icons/warning-circle-outline'

import type { ReactNode } from 'react'

export namespace FileUploaderMediaThumbnail {
  export type Status = 'queued' | 'uploading' | 'processing' | 'uploaded' | 'error'

  export interface Props {
    /** Called when the remove button is clicked. Omit to render a read-only thumbnail with no remove button. */
    action?: ReactNode
    /** Alt text for the thumbnail image. Defaults to an empty string, since the surrounding card already labels the item. */
    alt?: string
    /** Aspect ratio of the thumbnail. Useful when you want the height to scale proportionally to the width. */
    aspectRatio?: string
    /**
     * A formatted duration (e.g. `"15:39"`), shown as an overlay badge on the thumbnail. Only meaningful for video
     * files — omit for images.
     */
    duration?: string
    /**
     * Upload progress as a percentage between `0` and `100`. Only meaningful while `status` is `'uploading'`.
     * Omit to render an indeterminate spinner while uploading.
     */
    progress?: number
    /** The thumbnail image URL. */
    src: string
    /** The item's lifecycle status. */
    status: Status
  }
}

/**
 * The media thumbnail shared by `FileUploader.MediaCard` (list-item, caption below) and
 * `FileUploader.SingleSelectMediaCard` (full-bleed, no caption): image, upload-status dimming
 * overlay, progress ring/spinner, error badge, duration badge and a generic action slot.
 */
export function FileUploaderMediaThumbnail({
  action,
  aspectRatio = '4 / 3',
  alt,
  duration,
  progress,
  src,
  status,
}: FileUploaderMediaThumbnail.Props) {
  const showOverlay = status !== 'uploaded'

  const progressIndicator = (() => {
    if (status === 'uploading') {
      return typeof progress === 'number' && Number.isFinite(progress) ? (
        <FileUploaderCircularProgress value={progress} />
      ) : (
        <FileUploaderSpinner />
      )
    }
    if (status === 'processing') {
      return <FileUploaderSpinner />
    }
    return null
  })()

  return (
    <ElFileUploaderMediaThumbnail data-status={status} style={{ aspectRatio }}>
      <Image
        alt={alt ?? ''}
        fallback={<Image.Fallback icon={<PhotoIcon />} />}
        objectFit="cover"
        src={src}
        width="100%"
        height="100%"
      />
      {showOverlay && <ElFileUploaderMediaThumbnailOverlay />}
      {action && <ElFileUploaderMediaThumbnailActionContainer>{action}</ElFileUploaderMediaThumbnailActionContainer>}
      {duration && <ElFileUploaderMediaThumbnailDuration>{duration}</ElFileUploaderMediaThumbnailDuration>}
      {progressIndicator && (
        <ElFileUploaderMediaThumbnailStatusIcon>{progressIndicator}</ElFileUploaderMediaThumbnailStatusIcon>
      )}
      {status === 'error' && (
        <ElFileUploaderMediaThumbnailErrorBadge>
          <WarningCircleOutlineIcon aria-hidden color="error" size="lg" />
        </ElFileUploaderMediaThumbnailErrorBadge>
      )}
    </ElFileUploaderMediaThumbnail>
  )
}
