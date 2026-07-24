import { FileInput, validateFiles } from '#src/utils/file-input'
import { useFileUploaderContext } from '../context'
import { useSyncExternalStore } from 'react'

import type { ChangeEventHandler } from 'react'

export namespace FileUploaderInput {
  export interface Props extends Omit<FileInput.Props, 'defaultValue' | 'value'> {
    /** The variant of the input. */
    variant?: 'button' | 'compact' | 'large'
  }
}

/**
 * A file input that queues picked or dropped files for upload. Queued files are validated against
 * the constraints passed directly to this component.
 */
export function FileUploaderInput({
  accept,
  maxFiles,
  maxFileSize,
  onChange,
  variant = 'button',
  ...rest
}: FileUploaderInput.Props) {
  const { queue } = useFileUploaderContext('FileUploader.Input')
  const files = useSyncExternalStore(queue.subscribe, queue.getFilesSnapshot)

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newFiles = Array.from(event.currentTarget.files ?? [])
    if (maxFiles === 1) queue.replaceFiles(newFiles)
    else queue.addFiles(newFiles)
    queue.reportValidity(validateFiles(newFiles, { accept, maxFileSize }).rejected)
    onChange?.(event)
  }

  return (
    <FileInput
      {...rest}
      accept={accept}
      data-variant={variant}
      maxFiles={maxFiles}
      maxFileSize={maxFileSize}
      onChange={handleChange}
      value={files}
    />
  )
}

FileUploaderInput.displayName = 'FileUploader.Input'
