import { useSyncExternalStore } from "react";
import type { ChangeEventHandler } from "react";

import { validateFiles } from "#src/utils/file-input";

import { useFileUploaderContext } from "./context";

export namespace useFileUploaderInput {
  // Note: Does not accept all the supported validation constraints, because we only care about reporting
  // validity to the queue for file-level constraints (e.g. accept, maxFileSize) and deciding whether to
  // append to or replace the current selection (which only cares about the maximum number of files
  // permitted, not the minimum).
  export interface Options {
    accept?: string;
    maxFiles?: number;
    maxFileSize?: number;
    multiple?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
  }
}

/**
 * Shared queue wiring for every file input trigger (`FileUploaderButtonInput`,
 * `FileUploaderDropzoneInput`, and any future trigger built the same way): reads the current
 * selection from `FileUploaderContext`'s queue, and returns a `change`
 * handler that enqueues newly picked files, validates them, and reports the result back to the
 * queue.
 */
export function useFileUploaderInput({
  accept,
  maxFiles,
  maxFileSize,
  multiple,
  onChange,
}: useFileUploaderInput.Options): {
  files: File[];
  handleChange: ChangeEventHandler<HTMLInputElement>;
} {
  const { queue } = useFileUploaderContext("useFileUploaderInput");
  const files = useSyncExternalStore(queue.subscribe, queue.getFilesSnapshot);

  const effectiveMaxFiles = maxFiles ?? (multiple ? Infinity : 1);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newFiles = Array.from(event.currentTarget.files ?? []);
    if (effectiveMaxFiles === 1) queue.replaceFiles(newFiles);
    else queue.addFiles(newFiles);
    queue.reportValidity(validateFiles(newFiles, { accept, maxFileSize }).rejected);
    onChange?.(event);
  };

  return { files, handleChange };
}
