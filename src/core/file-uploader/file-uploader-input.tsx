import { FileInput } from '#src/utils/file-input'
import { useEffect, useSyncExternalStore } from 'react'
import type { FileUploadQueue } from './file-upload-queue'

export namespace FileUploaderInput {
  export interface Props extends Omit<FileInput.Props, 'value' | 'defaultValue' | 'onChange'> {
    /**
     * The queue this input drives and is driven by. Externally created — this component never
     * constructs its own, and never assumes a `FileUploader` compound component exists to own one.
     */
    // `any` rather than `unknown`: this component never reads `Item.result`, but `FileUploadQueue`
    // is invariant in `TResult`, so `unknown` would reject any concrete queue a consumer passes.
    // Threading `TResult` through as a `Props` generic instead breaks Storybook's `meta()` type
    // inference for the `component:` reference.
    queue: FileUploadQueue<any>
  }
}

/**
 * The only place allowed to know about both `FileInput` and `FileUploadQueue` — see "Wiring" in
 * `src/core/file-uploader/ARCHITECTURE.md`. Renders `FileInput` **controlled** by the queue's own
 * snapshot rather than resyncing it imperatively: `FileInput`'s own effect already recomputes
 * native validity as a pure function of whatever `value` currently is, so driving it with
 * `queue.getFiles()` keeps the raw input in sync with the queue's true accumulated state for free,
 * whether files were added, removed, or replaced.
 *
 * `accept`/`maxFiles`/`maxFileSize`/`maxTotalSize` are passed to both `FileInput` (native
 * `setCustomValidity`-based validity) and the queue (the accept/reject decision for the running
 * selection) — intentional duplication, not redundancy; see "Reactive validation constraints" in
 * the architecture doc.
 */
export function FileUploaderInput({
  accept,
  maxFileSize,
  maxFiles,
  maxTotalSize,
  queue,
  ...rest
}: FileUploaderInput.Props) {
  const files = useSyncExternalStore(queue.subscribe, queue.getFiles)

  useEffect(() => {
    // Only re-projects existing items against a constraint change — a new pick is handled by
    // `onChange` below, which always supplies the current constraints itself.
    queue.updateConstraints({ accept, maxFiles, maxFileSize, maxTotalSize })
  }, [accept, maxFiles, maxFileSize, maxTotalSize, queue])

  return (
    <FileInput
      {...rest}
      accept={accept}
      maxFileSize={maxFileSize}
      maxFiles={maxFiles}
      maxTotalSize={maxTotalSize}
      value={files}
      onChange={(event) => queue.addFiles(event.target.files ?? [], { accept, maxFiles, maxFileSize, maxTotalSize })}
    />
  )
}
