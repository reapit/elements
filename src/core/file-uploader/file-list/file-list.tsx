import { ElFileUploaderFileList } from './styles'
import { FileUploaderFile } from './file'
import { FileUploaderFileListContext } from './context'
import { useRef, useSyncExternalStore } from 'react'
import { useFileUploaderContext } from '../context'

import type { FileUploadQueue } from '../file-upload-queue'
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

export namespace FileUploaderFileList {
  export interface Props extends Omit<HTMLAttributes<HTMLUListElement>, 'children'> {
    /**
     * How to render the current queue's items. Either a fixed subtree, or a function receiving the
     * current items and the queue itself (e.g. to wire up `onRemove` via `queue.removeItem`).
     */
    children: ReactNode | ((items: FileUploadQueue.Item[], queue: FileUploadQueue<any>) => ReactNode)
    /**
     * Minimum block size of each item. Defaults to min-content.
     */
    minItemHeight?: string
    /**
     * Minimum inline size of each item. Defaults to 0.
     */
    minItemWidth?: string
    /**
     * Used by each item's `FileUploader.File` to render its own hidden input, for a
     * successfully-uploaded, currently-valid item. Each hidden input's value is the `fileId` of
     * the item it represents. A `name` passed directly to a `FileUploader.File` instance
     * overrides this.
     */
    name?: string
    /**
     * Whether items render as `FileCard` rows or `MediaCard` tiles. Applies to every item — there's
     * no per-item mixing, so pick `'media'` only when every file the uploader accepts is an image
     * or video.
     *
     * @default 'file'
     */
    variant?: 'file' | 'media'
  }
}

/**
 * Subscribes to the current queue and shares `variant`/`name` with `FileUploader.File`
 * descendants via context. Expects `children` to be list items.
 */
export function FileUploaderFileList({
  children,
  minItemHeight,
  minItemWidth,
  name,
  variant = 'file',
  ...rest
}: FileUploaderFileList.Props) {
  const { queue } = useFileUploaderContext('FileUploader.FileList')
  const items = useSyncExternalStore(queue.subscribe, queue.getItemsSnapshot)
  const listRef = useRef<HTMLUListElement>(null)

  return (
    <FileUploaderFileListContext.Provider value={{ variant, name, listRef }}>
      <ElFileUploaderFileList
        {...rest}
        data-layout={variant === 'media' ? 'grid' : 'list'}
        ref={listRef}
        style={
          {
            ...rest.style,
            '--file-uploader-min-item-height': minItemHeight,
            '--file-uploader-min-item-width': minItemWidth,
          } as CSSProperties
        }
      >
        {typeof children === 'function' ? children(items, queue) : children}
      </ElFileUploaderFileList>
    </FileUploaderFileListContext.Provider>
  )
}

FileUploaderFileList.displayName = 'FileUploader.FileList'

FileUploaderFileList.File = FileUploaderFile
