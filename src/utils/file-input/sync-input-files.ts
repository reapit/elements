/**
 * Reassigns `input.files` to exactly `files`, via a `DataTransfer` — the only mechanism a browser
 * allows for programmatically setting a file input's `.files` (assigning a `FileList` obtained any
 * other way is rejected). Never fires a `change` event by itself.
 *
 * Used to keep the native input's raw `.files` in sync with `FileInput`'s own derived truth: after
 * `handleChange` or a controlled `value` update sets a new selection, and after the initial mount
 * for a `defaultValue`. `useFileInputValidity` is the caller that decides what `files` to pass —
 * the full selection, or a subset with per-file-invalid entries dropped; this function itself has
 * no opinion on that, it just performs the reassignment. The same reassignment technique is also
 * what `FileUploaderButtonInput`/`FileUploaderDropzoneInput` use to resync `FileInput` after
 * `FileUploadQueue` removes an item.
 */
export function syncInputFiles(input: HTMLInputElement, files: File[]): void {
  const dataTransfer = new DataTransfer()
  for (const file of files) dataTransfer.items.add(file)
  input.files = dataTransfer.files
}
