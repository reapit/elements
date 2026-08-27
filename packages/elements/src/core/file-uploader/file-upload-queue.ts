import type { validateFiles } from "#src/utils/file-input/validate-files";

import { clampPercentage } from "./clamp-percentage";

export namespace FileUploadQueue {
  /**
   * Which per-item constraint an item currently fails, named after the DOM's `ValidityState`
   * convention. Reported by a consumer via `reportValidity`; the queue never computes this
   * itself; see `reportValidity`'s doc comment.
   */
  export type ValidationError = validateFiles.FileValidationError;

  /**
   * Item lifecycle: `queued -> uploading (progress?) -> processing? -> uploaded`, with `error`
   * reachable only from `uploading`/`processing`. There's no retry; an `error` item must be
   * removed and the file re-added from scratch.
   *
   * `validationError` is independent of `status`: it reflects whether a consumer has reported
   * this item as failing validation via `reportValidity`, and can be set on an item in any status,
   * including terminal states like `uploaded` and `error`.
   */
  export type Item<TResult extends unknown = unknown> = {
    id: string;
    file: File;
    validationError?: ValidationError;
  } & (
    | { status: "queued" }
    | { status: "uploading"; progress?: number; isLoadingIndicatorVisible: boolean }
    | { status: "processing"; isLoadingIndicatorVisible: boolean }
    | { status: "uploaded"; fileId?: string; result: TResult }
    | { status: "error"; errorMessage: string }
  );

  export interface ItemResources {
    abortController: AbortController;
    loadingIndicatorTimer?: ReturnType<typeof globalThis.setTimeout>;
    progressThrottle?: { lastNotifiedAt: number; timer?: ReturnType<typeof globalThis.setTimeout> };
  }

  export interface UploadHelpers {
    /** Aborted when the item is removed from the queue while its upload is in flight. */
    signal: AbortSignal;
    /** Reports upload progress as a percentage between `0` and `100`. Snapshots are throttled internally. */
    onProgress: (progress: number) => void;
    /** Transitions the item to `processing`, for backends with a post-upload server-side step (virus scan, transcoding, etc.). */
    setProcessing: () => void;
  }

  export type Options<TResult extends unknown = string> = {
    /**
     * How long an item must stay `uploading`/`processing` before its `isLoadingIndicatorVisible`
     * flag flips `true`, so fast uploads never flash a spinner.
     *
     * @default 300
     */
    minLoadingIndicatorDelayMs?: number;
    /**
     * Uploads `file`, resolving with whatever the consumer's backend returns. Use `helpers` to
     * report progress or flip the item to `processing` for a post-upload server-side step.
     */
    onUpload: (file: File, helpers: UploadHelpers) => Promise<TResult>;
    /**
     * Derives the server-assigned file ID to submit as part of the form from `onUpload`'s
     * resolved result. Provide this whenever that result isn't itself the ID string; for example:
     * `onUpload` resolves a richer object containing metadata alongside the ID. If omitted,
     * `onUpload` is expected to resolve the ID directly, as a `string`.
     */
    getFileId?: (result: TResult) => string;
  };
}

const DEFAULT_MIN_LOADING_INDICATOR_DELAY_MS = 300;
const PROGRESS_THROTTLE_MS = 100;

/**
 * An external store (`getSnapshot`/`subscribe`, for `useSyncExternalStore`) that owns the upload
 * lifecycle for a set of files: status, progress, abort. Validation is not the queue's concern:
 * a consumer runs `validateFiles` itself and reports the result via `reportValidity`, which is
 * also what starts uploading a newly-valid item. No DOM knowledge, no rendering.
 */
export class FileUploadQueue<TResult extends unknown = string> {
  #items: FileUploadQueue.Item<TResult>[] = [];
  #files: File[] = [];

  readonly #listeners = new Set<() => void>();

  /**
   * Per-in-flight-item bookkeeping, keyed by item id. Created in `#upload`, torn down
   * by `#clearResources`
   */
  readonly #resources = new Map<string, FileUploadQueue.ItemResources>();

  constructor(private readonly options: FileUploadQueue.Options<TResult>) {}

  subscribe = (listener: () => void): (() => void) => {
    this.#listeners.add(listener);
    return () => {
      this.#listeners.delete(listener);
    };
  };

  /**
   * The files being uploaded, in order, with progress and status metadata. Can be used as a
   * `useSyncExternalStore`'s snapshot. Useful when a subscriber is interested in each file's
   * upload progress/status.
   */
  getItemsSnapshot = (): FileUploadQueue.Item<TResult>[] => this.#items;

  /**
   * The selected files, in order. Includes files that have failed validation to allow consumers
   * to display them in the UI. Can be used as a `useSyncExternalStore`'s snapshot. Useful when a
   * subscriber only cares about the file list, not progress/status updates.
   */
  getFilesSnapshot = (): File[] => {
    const latestFiles = this.#items.map((item) => item.file);
    const changed =
      latestFiles.length !== this.#files.length ||
      latestFiles.some((file, index) => file !== this.#files[index]);
    if (changed) this.#files = latestFiles;
    return this.#files;
  };

  /**
   * Returns the current status of the queue. Can be used as a `useSyncExternalStore`'s snapshot.
   * Useful when a subscriber only cares about whether any file is currently uploading or processing.
   */
  getStatusSnapshot(): "idle" | "busy" {
    return this.#items.some((item) => item.status === "uploading" || item.status === "processing")
      ? "busy"
      : "idle";
  }

  /**
   * Queues `files` unconditionally. Files remain queued until `reportValidity` is called.
   *
   * Accepts a `FileList` as well as a plain `File[]`, so a native `onChange`'s
   * `event.currentTarget.files` can be passed straight through.
   */
  addFiles(files: File[] | FileList): void {
    const newItems = this.#toQueuedItems(files);
    this.#items = [...this.#items, ...newItems];
    this.#notify();
  }

  /**
   * Replaces the entire queue with `files`, aborting and discarding every existing item (mid-flight
   * uploads included) in a single notify. Files remain queued until `reportValidity` is called.
   *
   * Accepts a `FileList` as well as a plain `File[]`, so a native `onChange`'s
   * `event.currentTarget.files` can be passed straight through.
   */
  replaceFiles(files: File[] | FileList): void {
    for (const id of this.#resources.keys()) this.#cancelUpload(id);
    this.#items = this.#toQueuedItems(files);
    this.#notify();
  }

  /**
   * Records per-item validation failures. Valid, still-queued files start uploading. Never aborts
   * an in-flight upload or undoes a completed or errored one.
   *
   * `rejections` is only ever that round's freshly-picked files (see `useFileUploaderInput`); an
   * item outside it is left untouched deliberately, not revalidated or cleared. A previously
   * rejected item's `validationError` is only ever undone by removing and re-adding the file, not
   * by a later `reportValidity` call.
   */
  reportValidity(rejections: readonly validateFiles.Rejection[]): void {
    const validationErrors = new Map(
      rejections.map(({ file, validationError }) => [file, validationError]),
    );
    this.#items = this.#items.map((item) =>
      validationErrors.has(item.file)
        ? { ...item, validationError: validationErrors.get(item.file) }
        : item,
    );
    this.#notify();

    for (const item of this.#items) {
      if (item.status === "queued" && !item.validationError) this.#upload(item);
    }
  }

  /** Aborts the item's upload if in flight, clears its timers, and removes it from the queue. */
  removeItem(id: string): void {
    this.#cancelUpload(id);

    this.#items = this.#items.filter((item) => item.id !== id);
    this.#notify();
  }

  /**
   * Aborts every in-flight upload, clears all pending timers, and drops all listeners.
   * Call this from an owning component's unmount effect.
   */
  destroy(): void {
    for (const id of this.#resources.keys()) this.#cancelUpload(id);
    this.#listeners.clear();
  }

  #toQueuedItems(files: File[] | FileList): FileUploadQueue.Item<TResult>[] {
    return Array.from(files).map((file) => ({
      status: "queued",
      id: crypto.randomUUID(),
      file,
    }));
  }

  #upload(item: {
    id: string;
    file: File;
    validationError?: FileUploadQueue.ValidationError;
  }): void {
    const abortController = new AbortController();
    this.#resources.set(item.id, { abortController });

    this.#replaceItem({
      ...this.#baseFields(item),
      status: "uploading",
      isLoadingIndicatorVisible: false,
    });
    this.#startLoadingIndicatorTimer(item.id);

    this.#runUpload(item, abortController);
  }

  async #runUpload(
    item: { id: string; file: File },
    abortController: AbortController,
  ): Promise<void> {
    try {
      const result = await this.options.onUpload(item.file, {
        signal: abortController.signal,
        onProgress: (progress) => this.#handleProgress(item.id, progress),
        setProcessing: () => this.#handleSetProcessing(item.id),
      });
      this.#handleUploadResolve(item.id, result);
    } catch (error) {
      this.#handleUploadReject(item.id, error, abortController.signal);
    }
  }

  #handleProgress(id: string, progress: number): void {
    const item = this.#items.find((i) => i.id === id);
    const resource = this.#resources.get(id);
    if (!item || item.status !== "uploading" || !resource) return;

    const nextItem: FileUploadQueue.Item<TResult> = {
      ...item,
      progress: clampPercentage(progress),
    };

    const throttle = resource.progressThrottle ?? { lastNotifiedAt: -Infinity };
    const now = Date.now();
    const elapsed = now - throttle.lastNotifiedAt;

    if (elapsed >= PROGRESS_THROTTLE_MS) {
      if (throttle.timer !== undefined) globalThis.clearTimeout(throttle.timer);
      this.#replaceItem(nextItem);
      resource.progressThrottle = { lastNotifiedAt: now };
      return;
    }

    // Mutate the item in place so the eventual trailing notify reflects the latest progress,
    // without notifying subscribers on every high-frequency progress event.
    this.#items = this.#items.map((i) => (i.id === id ? nextItem : i));

    if (!throttle.timer) {
      const timer = globalThis.setTimeout(() => {
        const current = this.#resources.get(id);
        if (current?.progressThrottle) current.progressThrottle.lastNotifiedAt = Date.now();
        this.#notify();
      }, PROGRESS_THROTTLE_MS - elapsed);
      resource.progressThrottle = { ...throttle, timer };
    }
  }

  #handleSetProcessing(id: string): void {
    const item = this.#items.find((i) => i.id === id);
    if (!item || item.status !== "uploading") return;

    this.#replaceItem({
      ...this.#baseFields(item),
      status: "processing",
      isLoadingIndicatorVisible: item.isLoadingIndicatorVisible,
    });
  }

  #handleUploadResolve(id: string, result: TResult): void {
    const item = this.#items.find((i) => i.id === id);
    if (!item) return; // removed while in flight; removeItem already cleaned up

    this.#clearResources(id);

    const fileId = typeof result === "string" ? result : this.#getFileId(result);

    this.#replaceItem({ ...this.#baseFields(item), status: "uploaded", fileId, result });
  }

  // `getFileId` is consumer code, called after the upload itself already succeeded; a throw here
  // (e.g. `result` shaped unexpectedly) must not be mistaken for the upload having failed.
  #getFileId(result: TResult): string | undefined {
    try {
      return this.options.getFileId?.(result);
    } catch {
      return undefined;
    }
  }

  #handleUploadReject(id: string, error: unknown, signal: AbortSignal): void {
    const item = this.#items.find((i) => i.id === id);
    if (!item) return; // removed while in flight; removeItem already cleaned up

    const aborted = signal.aborted;
    this.#clearResources(id);

    if (aborted) return;

    const errorMessage = error instanceof Error ? error.message : "Upload failed";
    this.#replaceItem({ ...this.#baseFields(item), status: "error", errorMessage });
  }

  #baseFields(item: {
    id: string;
    file: File;
    validationError?: FileUploadQueue.ValidationError;
  }): {
    id: string;
    file: File;
    validationError?: FileUploadQueue.ValidationError;
  } {
    return {
      id: item.id,
      file: item.file,
      validationError: item.validationError,
    };
  }

  #startLoadingIndicatorTimer(id: string): void {
    const delay = this.options.minLoadingIndicatorDelayMs ?? DEFAULT_MIN_LOADING_INDICATOR_DELAY_MS;
    const timer = globalThis.setTimeout(() => {
      const resource = this.#resources.get(id);
      if (resource) resource.loadingIndicatorTimer = undefined;
      const item = this.#items.find((i) => i.id === id);
      if (!item || (item.status !== "uploading" && item.status !== "processing")) return;
      this.#replaceItem({ ...item, isLoadingIndicatorVisible: true });
    }, delay);
    const resource = this.#resources.get(id);
    if (resource) resource.loadingIndicatorTimer = timer;
  }

  /**
   * Aborts `id`'s in-flight upload, then clears its resources; see `#clearResources`. Used only
   * when the item is genuinely being cancelled (removed, or discarded by `replaceFiles`/`destroy`),
   * never when its upload settles: `signal` is documented as "aborted when the item is removed
   * from the queue while its upload is in flight", and aborting on a successful/failed settle
   * would fire a consumer's abort listeners for an upload that wasn't actually cancelled.
   */
  #cancelUpload(id: string): void {
    this.#resources.get(id)?.abortController.abort();
    this.#clearResources(id);
  }

  /** Clears `id`'s pending timers and drops its resource entry. Used once its upload settles. */
  #clearResources(id: string): void {
    const resource = this.#resources.get(id);
    if (resource?.loadingIndicatorTimer !== undefined)
      globalThis.clearTimeout(resource.loadingIndicatorTimer);
    if (resource?.progressThrottle?.timer !== undefined)
      globalThis.clearTimeout(resource.progressThrottle.timer);
    this.#resources.delete(id);
  }

  #replaceItem(item: FileUploadQueue.Item<TResult>): void {
    this.#items = this.#items.map((i) => (i.id === item.id ? item : i));
    this.#notify();
  }

  #notify(): void {
    for (const listener of this.#listeners) listener();
  }
}
