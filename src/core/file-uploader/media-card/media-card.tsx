import {
  ElFileUploaderMediaCard,
  ElFileUploaderMediaCardThumbnail,
  ElFileUploaderMediaCardOverlay,
  ElFileUploaderMediaCardRemoveButtonSlot,
  ElFileUploaderMediaCardDuration,
  ElFileUploaderMediaCardStatusIcon,
  ElFileUploaderMediaCardErrorBadge,
  ElFileUploaderMediaCardContent,
  ElFileUploaderMediaCardFileName,
  ElFileUploaderMediaCardSecondaryInfo,
  ElFileUploaderMediaCardStatusText,
} from './styles'
import { FileUploaderRemoveButton } from '../remove-button/remove-button'
import { FileUploaderCircularProgress } from './circular-progress/circular-progress'
import { FileUploaderSpinner } from './spinner/spinner'
import { getFileUploaderItemStatus } from '../get-file-uploader-item-status'
import { SeparatorDotIcon } from '#src/icons/separator-dot'
import { WarningCircleOutlineIcon } from '#src/icons/warning-circle-outline'

import type { MouseEventHandler } from 'react'

export namespace FileUploaderMediaCard {
  export type Status = 'queued' | 'uploading' | 'processing' | 'uploaded' | 'error'

  export interface Props {
    /** The file's name, rendered with end-truncation. */
    fileName: string
    /** The file's size in bytes. Omit to skip rendering a size. */
    fileSize?: number
    /** The item's lifecycle status. */
    status: Status
    /**
     * Upload progress as a percentage between `0` and `100`. Only meaningful while `status` is `'uploading'`.
     * Omit to render an indeterminate spinner while uploading.
     */
    progress?: number
    /** The error message to surface. Only meaningful while `status` is `'error'`. */
    errorMessage?: string
    /** The thumbnail image URL. */
    src: string
    /** Alt text for the thumbnail image. Defaults to an empty string, since the filename already labels the item. */
    alt?: string
    /**
     * A formatted duration (e.g. `"15:39"`), shown as an overlay badge on the thumbnail. Only meaningful for video
     * files — omit for images.
     */
    duration?: string
    /**
     * BCP 47 locale tag. Use to format the file size and upload percentage. Defaults to the runtime locale
     * when omitted.
     */
    locale?: string
    /** Called when the remove button is clicked. Omit to render a read-only card with no remove button. */
    onRemove?: MouseEventHandler<HTMLButtonElement>
  }
}

/**
 * A thumbnail-forward tile for `FileUploader`, matching Figma's `Media card [multi select]` component — the
 * list-item variant, used inside `FileUploader.Files`. Not independently exported — see
 * `src/core/file-uploader/ARCHITECTURE.md`.
 */
export function FileUploaderMediaCard({
  fileName,
  fileSize,
  status,
  progress,
  errorMessage,
  src,
  alt,
  duration,
  onRemove,
  locale,
}: FileUploaderMediaCard.Props) {
  const { sizeText, statusText, isError } = getFileUploaderItemStatus({
    status,
    progress,
    fileSize,
    errorMessage,
    locale,
  })
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
    <ElFileUploaderMediaCard>
      <ElFileUploaderMediaCardThumbnail data-status={status}>
        <img alt={alt ?? ''} src={src} />
        {showOverlay && <ElFileUploaderMediaCardOverlay />}
        {onRemove && (
          <ElFileUploaderMediaCardRemoveButtonSlot>
            <FileUploaderRemoveButton aria-label={`Remove ${fileName}`} onClick={onRemove} />
          </ElFileUploaderMediaCardRemoveButtonSlot>
        )}
        {duration && <ElFileUploaderMediaCardDuration>{duration}</ElFileUploaderMediaCardDuration>}
        {progressIndicator && (
          <ElFileUploaderMediaCardStatusIcon>{progressIndicator}</ElFileUploaderMediaCardStatusIcon>
        )}
        {status === 'error' && (
          <ElFileUploaderMediaCardErrorBadge>
            <WarningCircleOutlineIcon aria-hidden color="error" size="lg" />
          </ElFileUploaderMediaCardErrorBadge>
        )}
      </ElFileUploaderMediaCardThumbnail>
      <ElFileUploaderMediaCardContent>
        <ElFileUploaderMediaCardFileName title={fileName}>{fileName}</ElFileUploaderMediaCardFileName>
        <ElFileUploaderMediaCardSecondaryInfo data-wrap={isError || undefined}>
          {sizeText && (
            <>
              <ElFileUploaderMediaCardStatusText>{sizeText}</ElFileUploaderMediaCardStatusText>
              <SeparatorDotIcon aria-hidden color="secondary" size="xs" />
            </>
          )}
          <ElFileUploaderMediaCardStatusText data-error={isError || undefined}>
            {statusText}
          </ElFileUploaderMediaCardStatusText>
        </ElFileUploaderMediaCardSecondaryInfo>
      </ElFileUploaderMediaCardContent>
    </ElFileUploaderMediaCard>
  )
}
