import { useFileUploaderContext } from './context'
import { useSyncExternalStore } from 'react'
import { validateFiles } from '#src/utils/file-input'

import type { ChangeEventHandler } from 'react'

export namespace useFileUploaderInput {
  // Does not accept all the supported validation constraints, because we only care about reporting
  // validity to the queue for file-level constraints (accept, maxFileSize). The only selection-level
  // constraint we need here is maxFiles, as that determines whether we replace files in the queue or
  // add to it.
  export interface Options {
    accept?: string
    maxFiles?: number
    maxFileSize?: number
    onChange?: ChangeEventHandler<HTMLInputElement>
  }
}

/**
 * Shared queue wiring for every file input trigger (`FileUploaderButtonInput`,
 * `FileUploaderDropzoneInput`, and any future trigger built the same way): reads the current
 * selection from `FileUploaderContext`'s queue, and returns a `change`
 * handler that enqueues newly picked files, validates them, and reports the result back to the
 * queue.
 */
export function useFileUploaderInput({ accept, maxFiles, maxFileSize, onChange }: useFileUploaderInput.Options): {
  files: File[]
  handleChange: ChangeEventHandler<HTMLInputElement>
} {
  const { queue } = useFileUploaderContext('useFileUploaderInput')
  const files = useSyncExternalStore(queue.subscribe, queue.getFilesSnapshot)

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newFiles = Array.from(event.currentTarget.files ?? [])
    if (maxFiles === 1) queue.replaceFiles(newFiles)
    else queue.addFiles(newFiles)
    queue.reportValidity(validateFiles(newFiles, { accept, maxFileSize }).rejected)
    onChange?.(event)
  }

  return { files, handleChange }
}
