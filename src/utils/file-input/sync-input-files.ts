/**
 * Reassigns `input.files` to exactly `files`, via a `DataTransfer` — the only mechanism a browser
 * allows for programmatically setting a file input's `.files` (assigning a `FileList` obtained any
 * other way is rejected). Never fires a `change` event by itself.
 *
 * Used to keep the native input's raw `.files` in sync with `FileInput`'s own derived truth: after
 * `handleChange` or a controlled `value` update sets a new selection, and after the initial mount
 * for a `defaultValue`. `FileInput` passes the full selection here, valid or not — a plain
 * `<form>` submit or RHF `register()`, which read `.files` directly, see exactly what was picked;
 * rejection is signalled separately via `input.setCustomValidity`, not by trimming what's passed
 * to this function. The same reassignment technique is also what `FileUploader.Input` will use to
 * resync `FileInput` after `FileUploadQueue` removes an item — see
 * `src/core/file-uploader/ARCHITECTURE.md`.
 */
export function syncInputFiles(input: HTMLInputElement, files: File[]): void {
  const dataTransfer = new DataTransfer()
  for (const file of files) dataTransfer.items.add(file)
  input.files = dataTransfer.files
}
