import {
  ElFileUploaderFileCard,
  ElFileUploaderFileCardContent,
  ElFileUploaderFileCardName,
  ElFileUploaderFileCardProgressBar,
  ElFileUploaderFileCardSecondaryInfo,
  ElFileUploaderFileCardStatusText,
} from './styles'
import { FileUploaderRemoveButton } from '../remove-button/remove-button'
import { getFileUploaderItemStatus } from '../get-file-uploader-item-status'
import { SeparatorDotIcon } from '#src/icons/separator-dot'

import type { MouseEventHandler, ReactNode } from 'react'

export namespace FileUploaderFileCard {
  export type Status = 'queued' | 'uploading' | 'processing' | 'uploaded' | 'error'

  export interface Props {
    /** The file's name, truncated with an ellipsis if it overflows. */
    fileName: string
    /** The file's size in bytes. Omit to skip rendering a size. */
    fileSize?: number
    /** The item's lifecycle status. */
    status: Status
    /**
     * Upload progress as a percentage between `0` and `100`. Only meaningful while `status` is `'uploading'`.
     * Omit to render an indeterminate progress bar while uploading.
     */
    progress?: number
    /** The error message to surface. Only meaningful while `status` is `'error'`. */
    errorMessage?: string
    /**
     * The leading thumbnail/icon/badge, typically a `FileUploader.FileCardLeadingElement`.
     */
    leadingElement: ReactNode
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
 * A compact, generic file item for `FileUploader`. Use via `FileUploader.File`.
 */
export function FileUploaderFileCard({
  fileName,
  fileSize,
  status,
  progress,
  errorMessage,
  leadingElement,
  onRemove,
  locale,
}: FileUploaderFileCard.Props) {
  const { sizeText, statusText, isError } = getFileUploaderItemStatus({
    status,
    progress,
    fileSize,
    errorMessage,
    locale,
  })
  const showProgressBar = status === 'uploading' || status === 'processing'

  return (
    <ElFileUploaderFileCard data-status={status}>
      {leadingElement}
      <ElFileUploaderFileCardContent>
        <ElFileUploaderFileCardName title={fileName}>{fileName}</ElFileUploaderFileCardName>
        <ElFileUploaderFileCardSecondaryInfo data-wrap={isError || undefined}>
          {sizeText && (
            <>
              <ElFileUploaderFileCardStatusText>{sizeText}</ElFileUploaderFileCardStatusText>
              <SeparatorDotIcon aria-hidden color="secondary" size="xs" />
            </>
          )}
          <ElFileUploaderFileCardStatusText data-error={isError || undefined}>
            {statusText}
          </ElFileUploaderFileCardStatusText>
        </ElFileUploaderFileCardSecondaryInfo>
      </ElFileUploaderFileCardContent>
      {onRemove && <FileUploaderRemoveButton aria-label={`Remove ${fileName}`} onClick={onRemove} />}
      {showProgressBar && (
        <ElFileUploaderFileCardProgressBar
          aria-label={status === 'uploading' ? `Uploading ${fileName}` : `Processing ${fileName}`}
          value={
            status === 'uploading' && typeof progress === 'number' && Number.isFinite(progress) ? progress : undefined
          }
        />
      )}
    </ElFileUploaderFileCard>
  )
}
