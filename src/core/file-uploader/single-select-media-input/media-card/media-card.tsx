import {
  ElFileUploaderSingleSelectMediaCard,
  elFileUploaderSingleSelectMediaCardRemoveButton,
  ElFileUploaderSingleSelectMediaCardReplaceOverlay,
  ElFileUploaderSingleSelectMediaCardReplaceLabel,
} from './styles'
import { FileUploaderMediaThumbnail } from '../../media-thumbnail'
import { FileUploaderRemoveButton } from '../../remove-button'

import type { KeyboardEventHandler, MouseEventHandler } from 'react'

export namespace FileUploaderSingleSelectMediaCard {
  export type Status = FileUploaderMediaThumbnail.Status

  export interface Props {
    /** The thumbnail image URL. */
    src: string
    /** Alt text for the thumbnail image. Defaults to an empty string, since the filename already labels the item. */
    alt?: string
    /** The item's lifecycle status. */
    status: Status
    /**
     * Upload progress as a percentage between `0` and `100`. Only meaningful while `status` is `'uploading'`.
     * Omit to render an indeterminate spinner while uploading.
     */
    progress?: number
    /** Disables both the replace and remove affordances without hiding the selected file. */
    disabled?: boolean
    /**
     * A formatted duration (e.g. `"15:39"`), shown as an overlay badge on the thumbnail. Only meaningful for video
     * files — omit for images.
     */
    duration?: string
    /** The file's name, used only for the remove/replace buttons' accessible names. */
    fileName: string
    /** Whether a file is currently being dragged over the trigger — reveals the Replace affordance, matching hover/focus. */
    isDraggingOver?: boolean
    /** Called when the remove button is clicked. Omit to render a card with no remove button. */
    onRemove?: MouseEventHandler<HTMLButtonElement>
    /** Called when the card itself — anywhere other than the remove button — is activated, to trigger picking a replacement file. */
    onReplace: () => void
  }
}

/**
 * `FileUploader`'s single-select trigger's filled state: a full-bleed `FileUploaderMediaThumbnail` with no
 * caption, plus a hover/focus/drag-revealed "Replace" affordance covering the whole card. Kept separate from
 * `FileUploader.MediaCard` — despite sharing `FileUploaderMediaThumbnail` — because it's a distinct Figma
 * component with different interaction: the whole card (not just a dedicated button) triggers replacing the
 * file, which a list-item `MediaCard` has no equivalent for. Not exported from the top-level `FileUploader`
 * namespace — only used internally by `FileUploaderSingleSelectMediaInput`.
 */
export function FileUploaderSingleSelectMediaCard({
  src,
  alt,
  status,
  progress,
  duration,
  fileName,
  isDraggingOver,
  disabled,
  onRemove,
  onReplace,
}: FileUploaderSingleSelectMediaCard.Props) {
  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.target !== event.currentTarget) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onReplace()
    }
  }

  const handleRemove: MouseEventHandler<HTMLButtonElement> = (event) => {
    // We don't want the click to bubble up to the card and trigger a replace, so stop propagation here.
    event.stopPropagation()
    onRemove?.(event)
  }

  return (
    <ElFileUploaderSingleSelectMediaCard
      aria-disabled={disabled || undefined}
      aria-label={`Replace ${fileName}`}
      data-disabled={disabled || undefined}
      data-is-dragging-over={isDraggingOver || undefined}
      onClick={disabled ? undefined : onReplace}
      onKeyDown={disabled ? undefined : handleKeyDown}
      role="button"
      tabIndex={disabled ? undefined : 0}
    >
      <FileUploaderMediaThumbnail
        action={
          onRemove && !disabled ? (
            <FileUploaderRemoveButton
              aria-label={`Remove ${fileName}`}
              className={elFileUploaderSingleSelectMediaCardRemoveButton}
              disabled={disabled}
              onClick={handleRemove}
            />
          ) : undefined
        }
        alt={alt}
        duration={duration}
        progress={progress}
        src={src}
        status={status}
      />
      {status === 'uploaded' && !disabled && (
        <ElFileUploaderSingleSelectMediaCardReplaceOverlay aria-hidden>
          <ElFileUploaderSingleSelectMediaCardReplaceLabel>Replace</ElFileUploaderSingleSelectMediaCardReplaceLabel>
        </ElFileUploaderSingleSelectMediaCardReplaceOverlay>
      )}
    </ElFileUploaderSingleSelectMediaCard>
  )
}
