import { FileUploaderFileCard } from '../file-card/file-card'
import { FileUploaderFileCardLeadingElement } from '../file-card/leading-element/leading-element'
import { FileUploaderMediaCard } from '../media-card/media-card'
import { forwardRef, useEffect, useMemo } from 'react'
import { useFileUploaderContext } from '../context'
import { useFileUploaderFileListContext } from './context'

import type { FileUploadQueue } from '../file-upload-queue'
import type { InputHTMLAttributes, MouseEventHandler } from 'react'

export namespace FileUploaderFile {
  export interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'children' | 'type' | 'value'> {
    /** The error text to display on the file card. */
    errorText?: string
    /** The item to render — typically one yielded by `FileUploader.FileList`'s `children` render prop. */
    item: FileUploadQueue.Item
    /** Called when the remove button is clicked. Omit to render a read-only card with no remove button. */
    onRemove?: MouseEventHandler<HTMLButtonElement>
  }
}

/**
 * Renders one queue item as a `FileCard` row or, when the parent `FileUploader.FileList`'s
 * `variant` is `'media'`, a `MediaCard` tile — including its own thumbnail object URL lifecycle.
 * Must be rendered inside a `FileUploader.FileList`, which it reads `variant`/`name` from, and a
 * `FileUploader`, which it reads `locale` from.
 *
 * Also renders its own hidden `<input type="hidden">`, valued at the item's `fileId`, whenever a
 * `name` is available, the item is a successfully-uploaded, currently-valid one, and it actually has
 * a `fileId`. If a `fileId` is not provided (e.g. the `FileUploader`'s `getFileId` fails), the item
 * still counts as uploaded but contributes nothing to `FormData`. The rest of the input's attributes
 * are forwarded onto the hidden input to allow integration with form libraries.
 */
export const FileUploaderFile = forwardRef<HTMLInputElement, FileUploaderFile.Props>(function FileUploaderFile(
  { errorText: errorMessage, item, name, onRemove, ...inputProps },
  ref,
) {
  const { locale } = useFileUploaderContext('FileUploader.File')
  const { name: contextName, variant } = useFileUploaderFileListContext('FileUploader.File')
  const isMedia = variant === 'media'
  const isImage = item.file.type.startsWith('image/')
  const objectUrl = useObjectUrl(item.file, isMedia || isImage)

  const inputName = name ?? contextName
  const hiddenInput =
    inputName && item.status === 'uploaded' && !item.validationError && item.fileId ? (
      <input {...inputProps} ref={ref} name={inputName} type="hidden" value={item.fileId} />
    ) : null

  if (isMedia) {
    return (
      <li>
        {hiddenInput}
        <FileUploaderMediaCard
          errorMessage={errorMessage}
          fileName={item.file.name}
          fileSize={item.file.size}
          locale={locale}
          onRemove={onRemove}
          progress={item.status === 'uploading' ? item.progress : undefined}
          src={objectUrl ?? ''}
          status={item.status}
        />
      </li>
    )
  }

  return (
    <li>
      {hiddenInput}
      <FileUploaderFileCard
        errorMessage={errorMessage}
        fileName={item.file.name}
        fileSize={item.file.size}
        leadingElement={
          isImage ? (
            <FileUploaderFileCardLeadingElement src={objectUrl ?? ''} type="image" />
          ) : (
            <FileUploaderFileCardLeadingElement type="icon" />
          )
        }
        locale={locale}
        onRemove={onRemove}
        progress={item.status === 'uploading' ? item.progress : undefined}
        status={item.status}
      />
    </li>
  )
})

FileUploaderFile.displayName = 'FileUploader.File'

/** Creates an object URL for `file` while `enabled`, revoking it on cleanup or when it's no longer needed. */
function useObjectUrl(file: File, enabled: boolean): string | undefined {
  const url = useMemo(() => (enabled ? URL.createObjectURL(file) : undefined), [file, enabled])

  useEffect(() => {
    return () => {
      if (url) URL.revokeObjectURL(url)
    }
  }, [url])

  return url
}
