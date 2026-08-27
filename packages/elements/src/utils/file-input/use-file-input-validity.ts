import { useEffect } from "react";

import { getInputElement } from "./get-input-element";
import { syncInputFiles } from "./sync-input-files";
import { validateFiles } from "./validate-files";

/**
 * Keeps the native input's raw `.files`, and its custom validity, in sync with `files`;
 * whichever changed it (a browse round, a drop, a controlled consumer updating `value`, or the
 * initial mount for a `defaultValue`). React's `files` state itself holds exactly what was
 * picked, valid or not, so a consumer (e.g. `FileUploadQueue`) can still report per-file
 * validation errors of its own, but the native `.files` synced here deliberately diverges from
 * it: a file that fails a per-file rule (`accept`/`maxFileSize`) is dropped from `.files` rather
 * than invalidating the input, so it's silently excluded from a native form submission instead of
 * blocking it. Only a violation of a selection-level rule (`minFiles`/`maxFiles`/`maxTotalSize`):
 * a fact about the selection as a whole, not any one file; sets custom validity, the same way
 * `useRangeValidation` validates `NumberInput`'s current value (`src/core/number-input/use-range-validation.ts`).
 * An invalid selection stays invalid until it's superseded: browsing or dropping again replaces
 * it entirely (uncontrolled), or a controlled consumer removes the offending file from `value`
 * itself (e.g. via a queue item's own remove button).
 *
 * `minFiles`/`maxFiles` are already resolved by the caller (`FileInput`'s `effectiveMinFiles`/
 * `effectiveMaxFiles`) from `multiple`/`required`; this hook only ever sees the final numbers, not
 * those flags.
 */
export function useFileInputValidity({
  inputId,
  files,
  accept,
  maxFileSize,
  minFiles,
  maxFiles,
  maxTotalSize,
}: {
  inputId: string;
  files: File[];
  accept: string | undefined;
  maxFileSize: number | undefined;
  minFiles: number | undefined;
  maxFiles: number | undefined;
  maxTotalSize: number | undefined;
}): void {
  useEffect(() => {
    const input = getInputElement(inputId);
    if (!input) return;

    const { rejected, selectionError } = validateFiles(files, {
      accept,
      maxFileSize,
      minFiles,
      maxFiles,
      maxTotalSize,
    });

    // Only a file failing a per-file rule (`accept`/`maxFileSize`) is dropped from the native
    // input's own `.files`; a file excluded solely by a selection-level rule stays put, since
    // `selectionError` below is what invalidates the input in that case.
    const fileErrors = new Set(rejected.map((rejection) => rejection.file));
    syncInputFiles(
      input,
      files.filter((file) => !fileErrors.has(file)),
    );

    input.setCustomValidity(selectionError ?? "");
  }, [inputId, files, accept, maxFileSize, minFiles, maxFiles, maxTotalSize]);
}
