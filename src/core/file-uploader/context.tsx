import { createContext, useContext } from 'react'

import type { FileUploadQueue } from './file-upload-queue'

export namespace FileUploaderContext {
  export interface Value {
    /** Whether the uploader is disabled. */
    disabled?: boolean
    /** The locale used when formatting file sizes/status text. */
    locale?: string
    /** The queue that `FileUploader.Input`/`FileUploader.FileList` drive and render from. */
    queue: FileUploadQueue<any>
  }
}

/**
 * Shares `FileUploader`'s queue instance (and `disabled`/`locale`) with its `Control`/`Input`/
 * `Files` descendants, so a consumer doesn't have to thread them through explicit props. Validation
 * constraints are deliberately not here — see `FileUploader`'s own doc comment.
 */
export const FileUploaderContext = createContext<FileUploaderContext.Value | null>(null)

/**
 * Returns the current FileUploaderContext value.
 *
 * @returns The file uploader context
 * @throws {Error} when used outside a FileUploader
 */
export function useFileUploaderContext(callee = 'useFileUploaderContext'): FileUploaderContext.Value {
  const context = useContext(FileUploaderContext)
  if (!context) {
    throw new Error(`${callee} must be used within a FileUploader`)
  }
  return context
}
