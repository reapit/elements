import { useEffect, useId, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { FileUploaderButtonControl, FileUploaderButtonInput } from "./button-input";
import { FileUploaderContext } from "./context";
import { FileUploaderDropzoneControl, FileUploaderDropzoneInput } from "./dropzone-input";
import { FileUploaderFileList } from "./file-list";
import { FileUploadQueue } from "./file-upload-queue";
import {
  FileUploaderSingleSelectMediaControl,
  FileUploaderSingleSelectMediaInput,
} from "./single-select-media-input";
import { ElFileUploader, ElFileUploaderAnnouncer } from "./styles";
import { useFileUploaderAnnouncements } from "./use-file-uploader-announcements";

export namespace FileUploader {
  interface BaseProps<TResult extends unknown = string> {
    /** Typically a `FileUploader.ButtonControl`/`FileUploader.DropzoneControl` and/or `FileUploader.FileList`. */
    children?: ReactNode;
    /** Whether the uploader is disabled. */
    disabled?: boolean;
    /** BCP 47 locale tag. Used to format file sizes and upload percentages. Defaults to the runtime locale when omitted. */
    locale?: string;
    /** The maximum width of the uploader. */
    maxWidth?: string;
    /**
     * How long an item must stay uploading/processing before its loading indicator appears, so
     * fast uploads never flash a spinner. Only meaningful when `queue` isn't supplied — an
     * externally-created queue owns this itself.
     *
     * @default 300
     */
    minLoadingIndicatorDelayMs?: FileUploadQueue.Options<TResult>["minLoadingIndicatorDelayMs"];
  }

  interface WithQueue<TResult extends unknown = string> extends BaseProps<TResult> {
    onUpload?: never;
    getFileId?: never;
    /**
     * An externally-created `FileUploadQueue` instance. Defaults to creating one
     * internally. Passing your own lets a submit handler read the same instance directly —
     * e.g. to look up richer per-file data by ID after collecting IDs from `FormData` —
     * without any form-library-specific integration.
     */
    queue: FileUploadQueue<TResult>;
  }

  interface WithOnUpload<TResult extends unknown = string> extends BaseProps<TResult> {
    /**
     * Derives the server-assigned file ID to submit as part of the form from `onUpload`'s
     * resolved result. Provide this whenever that result isn't itself the ID string — e.g.
     * `onUpload` resolves a richer object containing metadata alongside the ID. See
     * `FileUploadQueue.Options.getFileId`.
     */
    getFileId?: FileUploadQueue.Options<TResult>["getFileId"];
    /**
     * Uploads `file`, resolving with whatever the consumer's backend returns. There is no default
     * implementation — every consumer's upload endpoint and response shape differ — so this is
     * required. Use `helpers` to report progress, flip the item to `processing` for a post-upload
     * server-side step, or record the file ID as soon as it's known rather than waiting for this
     * promise to settle.
     */
    onUpload: FileUploadQueue.Options<TResult>["onUpload"];
    queue?: never;
  }

  export type Props<TResult extends unknown = string> = WithQueue<TResult> | WithOnUpload<TResult>;
}

/**
 * A compound file uploader. Children will typically be some combination of a control (button or dropzone) and
 * a file list. The queue is either supplied via the `queue` prop or created internally. Validation constraints
 * are applied to the controls and determine how many files, and of which type and size, can be uploaded.
 */
export function FileUploader<TResult extends unknown = string>(props: FileUploader.Props<TResult>) {
  const { children, disabled, locale, maxWidth, minLoadingIndicatorDelayMs } = props;

  const [internalQueue] = useState(
    () =>
      // Use queue from prop if it exists so that internalQueue is always typed as a FileUploadQueue
      props.queue ||
      new FileUploadQueue<TResult>({
        onUpload: props.onUpload,
        getFileId: props.getFileId,
        minLoadingIndicatorDelayMs,
      }),
  );
  const queue = props.queue ?? internalQueue;
  const isUsingOwnQueue = !props.queue;

  // Only destroy a queue this component created itself — an externally-supplied `queue` prop is
  // owned by the caller, who may keep using it (e.g. reading it from a submit handler) after this
  // component unmounts.
  useEffect(() => {
    if (!isUsingOwnQueue) return undefined;
    return () => queue.destroy();
  }, [queue, isUsingOwnQueue]);

  const triggerId = useId();
  const announcements = useFileUploaderAnnouncements(queue);

  const contextValue = useMemo<FileUploaderContext.Value>(
    () => ({
      queue,
      disabled,
      locale,
      triggerId,
    }),
    [disabled, locale, queue, triggerId],
  );

  return (
    <ElFileUploader style={{ maxWidth }}>
      <ElFileUploaderAnnouncer aria-atomic="false" aria-live="polite">
        {announcements.map((message, index) => (
          // Each announcement is its own element so the live region accumulates messages
          // rather than replacing them — `aria-atomic="false"` ensures only the new span
          // is read, not the whole region.
          // eslint-disable-next-line react/no-array-index-key
          <span key={index}>{message}</span>
        ))}
      </ElFileUploaderAnnouncer>
      <FileUploaderContext.Provider value={contextValue}>{children}</FileUploaderContext.Provider>
    </ElFileUploader>
  );
}

FileUploader.ButtonControl = FileUploaderButtonControl;
FileUploader.ButtonInput = FileUploaderButtonInput;
FileUploader.DropzoneControl = FileUploaderDropzoneControl;
FileUploader.DropzoneInput = FileUploaderDropzoneInput;
FileUploader.File = FileUploaderFileList.File;
FileUploader.FileList = FileUploaderFileList;
FileUploader.SingleSelectMediaControl = FileUploaderSingleSelectMediaControl;
FileUploader.SingleSelectMediaInput = FileUploaderSingleSelectMediaInput;
