import { formatFileSize } from '#src/utils/number-format'
import { validateFiles } from '#src/utils/file-input/validate-files'
import { clampPercentage } from './clamp-percentage'

export namespace FileUploadQueue {
  export type Status = 'queued' | 'uploading' | 'processing' | 'uploaded' | 'error'

  /**
   * Item lifecycle: `queued -> uploading (progress?) -> processing? -> uploaded`, with `error`
   * reachable only from `uploading`/`processing` — a genuine upload failure. There is no retry:
   * an `error` item must be removed and the file re-added from scratch. Modelled as a
   * discriminated union on `status` so each variant only carries the fields meaningful to it —
   * e.g. `result` doesn't exist before `uploaded`, `errorMessage` doesn't exist outside `error`.
   *
   * `validationError` is deliberately outside the union: whether an item currently satisfies the
   * running validation constraints (`accept`/`maxFiles`/`maxFileSize`/`maxTotalSize`) is a
   * separate, orthogonal projection — recomputed on every `addFiles`/`removeItem`/
   * `updateConstraints` call, not a lifecycle state. It can be set or cleared on an item in any
   * status, including `uploaded`, without affecting that status. See "Validation as a
   * projection, not a status" in `src/core/file-uploader/ARCHITECTURE.md`.
   */
  export type Item<TResult = unknown> = { id: string; file: File; validationError?: string } & (
    | { status: 'queued' }
    | { status: 'uploading'; progress?: number; isLoadingIndicatorVisible: boolean; fileId?: string }
    | { status: 'processing'; isLoadingIndicatorVisible: boolean; fileId?: string }
    | { status: 'uploaded'; fileId: string; result: TResult }
    | { status: 'error'; errorMessage: string }
  )

  export interface UploadHelpers {
    /** Aborted when the item is removed from the queue while its upload is in flight. */
    signal: AbortSignal
    /** Reports upload progress as a percentage between `0` and `100`. Snapshots are throttled internally. */
    onProgress: (progress: number) => void
    /** Transitions the item to `processing`, for backends with a post-upload server-side step (virus scan, transcoding, etc.). */
    setProcessing: () => void
    /**
     * Records the server-assigned entity ID as soon as it's known — before the upload itself
     * resolves. Covers the common "create a file entity, get a pre-signed upload URL + ID back,
     * then upload the bytes to that URL" flow (e.g. S3 pre-signed URLs), where the ID exists well
     * before the transfer finishes. If never called, `fileId` is instead derived from the resolved
     * result once `onUpload` settles (via `getFileId`, below).
     */
    setFileId: (fileId: string) => void
  }

  /**
   * Validation constraints for the current selection. Passed fresh to `addFiles` and
   * `updateConstraints` rather than fixed at construction, since they may legitimately depend on
   * render-time state (e.g. a form whose effective `maxFiles` depends on which files are already
   * in the queue) — see "Reactive validation constraints" in
   * `src/core/file-uploader/ARCHITECTURE.md`.
   */
  export type Constraints = {
    /** Native `accept` attribute syntax, forwarded to `validateFiles`. */
    accept?: string
    /** The maximum number of files allowed. `1` enables single-select replace semantics (see `addFiles`). */
    maxFiles?: number
    /** The maximum size, in bytes, allowed for any single file. */
    maxFileSize?: number
    /** The maximum cumulative size, in bytes, allowed across all files. */
    maxTotalSize?: number
  }

  export type Options<TResult = string> = {
    /**
     * How long an item must stay `uploading`/`processing` before its `isLoadingIndicatorVisible`
     * flag flips `true`, so fast uploads never flash a spinner.
     *
     * @default 300
     */
    minLoadingIndicatorDelayMs?: number
  } & (
    | { onUpload?: undefined; getFileId?: undefined }
    | ({ onUpload: (file: File, helpers: UploadHelpers) => Promise<TResult> } & (TResult extends string
        ? { getFileId?: (result: TResult) => string }
        : { getFileId: (result: TResult) => string }))
  )
}

const DEFAULT_MIN_LOADING_INDICATOR_DELAY_MS = 300
const PROGRESS_THROTTLE_MS = 100

/**
 * An external store class — mutable state + pub/sub + `getSnapshot`/`subscribe`, for
 * `useSyncExternalStore` — that owns the upload lifecycle for a set of files (status, progress,
 * abort) and the running validation projection for each of them, reactive to both new files and
 * constraint changes. No DOM knowledge, no rendering. Instantiated per `FileUploader`, not as a
 * global singleton (uploads are scoped to one form instance). See
 * `src/core/file-uploader/ARCHITECTURE.md`.
 */
export class FileUploadQueue<TResult = string> {
  #items: FileUploadQueue.Item<TResult>[] = []
  #constraints: FileUploadQueue.Constraints = {}
  readonly #listeners = new Set<() => void>()

  /** Per-in-flight-item bookkeeping, keyed by item id — created in `#upload`, torn down as a unit in `removeItem`/resolve/reject. */
  readonly #resources = new Map<
    string,
    {
      abortController: AbortController
      loadingIndicatorTimer?: ReturnType<typeof globalThis.setTimeout>
      progressThrottle?: { lastNotifiedAt: number; timer?: ReturnType<typeof globalThis.setTimeout> }
    }
  >()

  constructor(private readonly options: FileUploadQueue.Options<TResult> = {}) {}

  getSnapshot = (): FileUploadQueue.Item<TResult>[] => this.#items

  subscribe = (listener: () => void): (() => void) => {
    this.#listeners.add(listener)
    return () => {
      this.#listeners.delete(listener)
    }
  }

  #filesSnapshot: File[] = []

  /**
   * The current selection, in order — what `FileInput`'s controlled `value` should be driven
   * from, and suitable as a `useSyncExternalStore` `getSnapshot` in its own right. Includes
   * invalid items. Memoised against the previous call: progress/status updates replace `#items`
   * without changing any item's `file`, so this returns the same `File[]` reference in that case
   * rather than a fresh one, letting `useSyncExternalStore` bail out of re-rendering a subscriber
   * that only cares about the file list.
   */
  getFiles = (): File[] => {
    const files = this.#items.map((item) => item.file)
    const unchanged =
      files.length === this.#filesSnapshot.length && files.every((file, index) => file === this.#filesSnapshot[index])
    if (!unchanged) this.#filesSnapshot = files
    return this.#filesSnapshot
  }

  /**
   * Queues `files` — always, even if they fail validation against `constraints` — then
   * re-projects `validationError` across every item in the queue (see "Validation as a
   * projection, not a status" in ARCHITECTURE.md). `constraints` is supplied fresh on every call
   * rather than read from constructor options, since it may change across renders. A newly
   * queued item that's valid starts uploading immediately if `onUpload` was provided.
   *
   * Accepts a `FileList` as well as a plain `File[]` — a native `onChange`'s
   * `event.target.files` is a `FileList`, so callers can pass it straight through without
   * converting it first; tests and other non-DOM callers pass a plain array instead, since
   * `FileList` has no public constructor outside a real `<input>`.
   */
  addFiles = (files: File[] | FileList, constraints: FileUploadQueue.Constraints = {}): void => {
    const fileArray = Array.from(files)
    this.#constraints = constraints

    // Single-select replace: a new pick while the one slot is already occupied replaces the
    // existing item (aborting it if mid-upload) rather than being rejected by `maxFiles`
    // validation — see "Single-select composition" in ARCHITECTURE.md.
    if (constraints.maxFiles === 1 && this.#items.length > 0 && fileArray.length > 0) {
      this.removeItem(this.#items[0].id)
    }

    const previousItems = this.#items
    const newItems: FileUploadQueue.Item<TResult>[] = fileArray.map((file) => ({
      status: 'queued',
      id: crypto.randomUUID(),
      file,
    }))

    this.#items = [...this.#items, ...newItems]
    this.#validateAndUploadQueued(previousItems)
  }

  /**
   * Re-projects `validationError` across every item in the queue against `constraints`, without
   * adding any files — for when a constraint changes independently of a new file being picked
   * (e.g. a prop change alone). See "Reactive validation constraints" in ARCHITECTURE.md.
   */
  updateConstraints = (constraints: FileUploadQueue.Constraints): void => {
    this.#constraints = constraints
    this.#validateAndUploadQueued(this.#items)
  }

  /** Aborts the item's upload if in flight, clears its timers, removes it from the queue, and re-projects validity onto what remains. */
  removeItem = (id: string): void => {
    this.#resources.get(id)?.abortController.abort()
    this.#clearResources(id)

    const previousItems = this.#items
    this.#items = this.#items.filter((item) => item.id !== id)
    this.#validateAndUploadQueued(previousItems)
  }

  /**
   * Re-projects `validationError` across the full, ordered item list against `this.#constraints`
   * — earlier items in the queue get priority for a limited resource (`maxFiles`/`maxTotalSize`),
   * so once a limit is reached every later item is invalid, regardless of which one it is (see
   * "Validation as a projection, not a status" in ARCHITECTURE.md). Pure: never touches uploads,
   * timers, or subscribers — callers combine it with `#validateAndUploadQueued` below to also act
   * on the result.
   */
  #validateItems(): FileUploadQueue.Item<TResult>[] {
    const { rejected } = validateFiles(
      this.#items.map((item) => item.file),
      [],
      {
        accept: this.#constraints.accept,
        multiple: this.#constraints.maxFiles !== 1,
        maxFileSize: this.#constraints.maxFileSize,
        maxFiles: this.#constraints.maxFiles,
        maxTotalSize: this.#constraints.maxTotalSize,
      },
    )
    const rejectionReasons = new Map(rejected.map(({ file, reason }) => [file, reason]))

    return this.#items.map((item) => {
      const reason = rejectionReasons.get(item.file)
      return { ...item, validationError: reason ? this.#getRejectionMessage(reason) : undefined }
    })
  }

  /**
   * Applies `#validateItems`'s validation projection, notifies subscribers, then starts uploading
   * any still-`queued`, never-attempted item that flipped from invalid (or didn't exist yet, in
   * `previousItems`) to valid. Never aborts an in-flight upload or undoes a completed one itself.
   */
  #validateAndUploadQueued(previousItems: FileUploadQueue.Item<TResult>[]): void {
    this.#items = this.#validateItems()
    this.#notify()

    if (!this.options.onUpload) return

    for (const item of this.#items) {
      if (item.status !== 'queued' || item.validationError) continue
      const previous = previousItems.find((prev) => prev.id === item.id)
      if (!previous || previous.validationError) this.#upload(item)
    }
  }

  #upload(item: { id: string; file: File; validationError?: string }): void {
    if (!this.options.onUpload) return

    const abortController = new AbortController()
    this.#resources.set(item.id, { abortController })

    this.#replaceItem({ ...this.#baseFields(item), status: 'uploading', isLoadingIndicatorVisible: false })
    this.#startLoadingIndicatorTimer(item.id)

    void this.#runUpload(item, abortController)
  }

  /**
   * Runs `onUpload` and routes the outcome to the resolve/reject handlers. `try`/`catch` around
   * the `await` — rather than `.then(onResolve, onReject)` on the returned promise — also catches
   * a consumer's `onUpload` throwing synchronously instead of returning a rejected promise, since
   * that throw happens inside this `try` block regardless of whether `await` was ever reached.
   */
  async #runUpload(item: { id: string; file: File }, abortController: AbortController): Promise<void> {
    try {
      const result = await this.options.onUpload!(item.file, {
        signal: abortController.signal,
        onProgress: (progress) => this.#handleProgress(item.id, progress),
        setProcessing: () => this.#handleSetProcessing(item.id),
        setFileId: (fileId) => this.#handleSetFileId(item.id, fileId),
      })
      this.#handleUploadResolve(item.id, result)
    } catch (error) {
      this.#handleUploadReject(item.id, error, abortController.signal)
    }
  }

  #handleProgress(id: string, progress: number): void {
    const item = this.#items.find((i) => i.id === id)
    const resource = this.#resources.get(id)
    if (!item || item.status !== 'uploading' || !resource) return

    const nextItem: FileUploadQueue.Item<TResult> = { ...item, progress: clampPercentage(progress) }

    const throttle = resource.progressThrottle ?? { lastNotifiedAt: -Infinity }
    const now = Date.now()
    const elapsed = now - throttle.lastNotifiedAt

    if (elapsed >= PROGRESS_THROTTLE_MS) {
      if (throttle.timer !== undefined) globalThis.clearTimeout(throttle.timer)
      this.#replaceItem(nextItem)
      resource.progressThrottle = { lastNotifiedAt: now }
      return
    }

    // Mutate the item in place so the eventual trailing notify reflects the latest progress,
    // without notifying subscribers on every high-frequency progress event.
    this.#items = this.#items.map((i) => (i.id === id ? nextItem : i))

    if (!throttle.timer) {
      const timer = globalThis.setTimeout(() => {
        const current = this.#resources.get(id)
        if (current?.progressThrottle) current.progressThrottle.lastNotifiedAt = Date.now()
        this.#notify()
      }, PROGRESS_THROTTLE_MS - elapsed)
      resource.progressThrottle = { ...throttle, timer }
    }
  }

  #handleSetProcessing(id: string): void {
    const item = this.#items.find((i) => i.id === id)
    if (!item || item.status !== 'uploading') return

    this.#replaceItem({
      ...this.#baseFields(item),
      status: 'processing',
      isLoadingIndicatorVisible: item.isLoadingIndicatorVisible,
      fileId: item.fileId,
    })
  }

  #handleSetFileId(id: string, fileId: string): void {
    const item = this.#items.find((i) => i.id === id)
    if (!item || (item.status !== 'uploading' && item.status !== 'processing')) return

    this.#replaceItem({ ...item, fileId })
  }

  #handleUploadResolve(id: string, result: TResult): void {
    const item = this.#items.find((i) => i.id === id)
    if (!item) return // removed while in flight — removeItem already cleaned up

    this.#clearResources(id)

    const existingFileId = 'fileId' in item ? item.fileId : undefined
    const fileId =
      existingFileId ?? this.options.getFileId?.(result) ?? (typeof result === 'string' ? result : undefined)

    if (!fileId) {
      this.#replaceItem({
        ...this.#baseFields(item),
        status: 'error',
        errorMessage: 'Upload succeeded but no file ID could be determined',
      })
      return
    }

    this.#replaceItem({ ...this.#baseFields(item), status: 'uploaded', fileId, result })
  }

  #handleUploadReject(id: string, error: unknown, signal: AbortSignal): void {
    const item = this.#items.find((i) => i.id === id)
    if (!item) return // removed while in flight — removeItem already cleaned up

    this.#clearResources(id)

    if (signal.aborted) return

    const errorMessage = error instanceof Error ? error.message : 'Upload failed'
    this.#replaceItem({ ...this.#baseFields(item), status: 'error', errorMessage })
  }

  #baseFields(item: { id: string; file: File; validationError?: string }): {
    id: string
    file: File
    validationError?: string
  } {
    return { id: item.id, file: item.file, validationError: item.validationError }
  }

  #startLoadingIndicatorTimer(id: string): void {
    const delay = this.options.minLoadingIndicatorDelayMs ?? DEFAULT_MIN_LOADING_INDICATOR_DELAY_MS
    const timer = globalThis.setTimeout(() => {
      const resource = this.#resources.get(id)
      if (resource) resource.loadingIndicatorTimer = undefined
      const item = this.#items.find((i) => i.id === id)
      if (!item || (item.status !== 'uploading' && item.status !== 'processing')) return
      this.#replaceItem({ ...item, isLoadingIndicatorVisible: true })
    }, delay)
    const resource = this.#resources.get(id)
    if (resource) resource.loadingIndicatorTimer = timer
  }

  /** Clears any pending timers for `id` and drops its resource entry — used once an item's upload settles or is removed. */
  #clearResources(id: string): void {
    const resource = this.#resources.get(id)
    if (resource?.loadingIndicatorTimer !== undefined) globalThis.clearTimeout(resource.loadingIndicatorTimer)
    if (resource?.progressThrottle?.timer !== undefined) globalThis.clearTimeout(resource.progressThrottle.timer)
    this.#resources.delete(id)
  }

  #replaceItem(item: FileUploadQueue.Item<TResult>): void {
    this.#items = this.#items.map((i) => (i.id === item.id ? item : i))
    this.#notify()
  }

  #notify(): void {
    for (const listener of this.#listeners) listener()
  }

  #getRejectionMessage(reason: validateFiles.RejectionReason): string {
    switch (reason) {
      case 'accept':
        return 'File type not accepted'
      case 'multiple':
        return 'Only one file may be selected'
      case 'maxFiles':
        return `Maximum number of files exceeded${this.#constraints.maxFiles ? ` (${this.#constraints.maxFiles})` : ''}`
      case 'maxFileSize':
        return this.#constraints.maxFileSize
          ? `File exceeds the maximum size of ${formatFileSize(this.#constraints.maxFileSize)}`
          : 'File exceeds the maximum size'
      case 'maxTotalSize':
        return this.#constraints.maxTotalSize
          ? `Total selection size exceeds the maximum of ${formatFileSize(this.#constraints.maxTotalSize)}`
          : 'Total selection size exceeds the maximum'
    }
  }
}
