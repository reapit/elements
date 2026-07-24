import { createContext, useContext } from 'react'

export namespace FileUploaderFileListContext {
  export interface Value {
    /** Whether `FileUploader.File` renders each item as a `FileCard` row or a `MediaCard` tile. */
    variant: 'file' | 'media'
    /**
     * `FileUploader.FileList`'s `name`, used by `FileUploader.File` to render its own hidden input.
     * A `name` passed directly to a `FileUploader.File` instance takes precedence over this.
     */
    name?: string
  }
}

/**
 * Shares `FileUploader.FileList`'s `variant`/`name` with its `FileUploader.File` descendants, so
 * every item renders consistently — all `FileCard` rows or all `MediaCard` tiles, never a mix —
 * and so a custom `children` render function doesn't have to re-pass `name` to every item.
 */
export const FileUploaderFileListContext = createContext<FileUploaderFileListContext.Value | null>(null)

/**
 * Returns the current FileUploaderFileListContext value.
 *
 * @returns The file list context
 * @throws {Error} when used outside a FileUploader.FileList
 */
export function useFileUploaderFileListContext(
  callee = 'useFileUploaderFileListContext',
): FileUploaderFileListContext.Value {
  const context = useContext(FileUploaderFileListContext)
  if (!context) {
    throw new Error(`${callee} must be used within a FileUploader.FileList`)
  }
  return context
}
