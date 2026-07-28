/**
 * File validation for FileInput.
 *
 * Deliberately separate from native `accept`/`multiple` attribute enforcement:
 * the browser only enforces those against the OS file picker, not against
 * drag-and-drop or programmatic `FileList` assignment, so `validateFiles`
 * re-checks them itself rather than assuming the caller's entry point already did.
 */

export namespace validateFiles {
  /**
   * Custom constraints to validate files against. All fields are optional. `multiple` isn't one of
   * these rules — a caller maps it to `minFiles`/`maxFiles` before calling `validateFiles`; see
   * `FileInput`'s `effectiveMinFiles`/`effectiveMaxFiles`.
   */
  export interface Rules {
    /** Native `accept` attribute syntax: comma-separated extensions (`.pdf`), MIME types (`image/png`), or MIME wildcards (`image/*`). */
    accept?: string;
    /** Maximum size, in bytes, for any single file. */
    maxFileSize?: number;
    /** Minimum number of files total. */
    minFiles?: number;
    /** Maximum number of files total. */
    maxFiles?: number;
    /** Maximum cumulative size, in bytes, of all files total. */
    maxTotalSize?: number;
  }

  /** Which per-file rule a file fails, named after the DOM's `ValidityState` convention — a fact about that one file, independent of any other file in the selection. */
  export type FileValidationError = "typeMismatch" | "fileSizeOverflow";

  /**
   * Which rule the selection as a whole fails, named after the DOM's `ValidityState` convention —
   * a fact about the selection, not about any one file.
   */
  export type SelectionValidationError = "filesOverflow" | "filesUnderflow" | "totalSizeOverflow";

  export interface Rejection {
    file: File;
    validationError: FileValidationError;
  }

  export interface Result {
    /** Files that satisfy every per-file and selection-wide rule. */
    accepted: File[];
    /** Files rejected for a per-file reason — wrong type, too large. */
    rejected: Rejection[];
    /**
     * The selection-wide rule the current selection fails, if any — too many files, or too much
     * cumulative size. Reported once, rather than pinned to whichever file happened to cross the
     * limit, since it's a fact about the selection as a whole.
     */
    selectionError?: SelectionValidationError;
  }
}

/**
 * Validates `files` against `rules`.
 *
 * `accept` and `maxFileSize` are checked per file, independently of order — a file failing either
 * is reported in `rejected`. `maxFiles` and `maxTotalSize` are checked by walking the remaining
 * files in order, accumulating count/size as it goes; the first one that would cross a limit, and
 * every file after it, are excluded from `accepted` without being added to `rejected` — that
 * condition is reported once, as `selectionError`, since it's a fact about the selection as a
 * whole rather than about any one of those files. `minFiles` can only be evaluated once every file
 * has been walked — it's a fact about the final accepted count, not about crossing a limit
 * mid-walk — so it's checked once, after the loop, and only when no overflow rule already fired.
 *
 * A file that fails more than one per-file rule is reported with the first rule that rejected it,
 * in the order above.
 */
export function validateFiles(files: File[], rules: validateFiles.Rules): validateFiles.Result {
  const accepted: File[] = [];
  const rejected: validateFiles.Rejection[] = [];
  let selectionError: validateFiles.SelectionValidationError | undefined;

  let count = 0;
  let totalSize = 0;

  for (const file of files) {
    const fileError = fileValidationError(file, rules);
    if (fileError) {
      rejected.push({ file, validationError: fileError });
      continue;
    }

    const error = selectionOverflowError(rules, count, totalSize, file.size);
    if (error) {
      selectionError ??= error;
      continue;
    }

    accepted.push(file);
    count += 1;
    totalSize += file.size;
  }

  if (!selectionError && rules.minFiles !== undefined && accepted.length < rules.minFiles) {
    selectionError = "filesUnderflow";
  }

  return { accepted, rejected, selectionError };
}

function fileValidationError(
  file: File,
  rules: validateFiles.Rules,
): validateFiles.FileValidationError | undefined {
  if (rules.accept && !matchesAccept(file, rules.accept)) return "typeMismatch";
  if (rules.maxFileSize !== undefined && file.size > rules.maxFileSize) return "fileSizeOverflow";
  return undefined;
}

function selectionOverflowError(
  rules: validateFiles.Rules,
  countSoFar: number,
  totalSizeSoFar: number,
  fileSize: number,
): validateFiles.SelectionValidationError | undefined {
  if (rules.maxFiles !== undefined && countSoFar >= rules.maxFiles) return "filesOverflow";
  if (rules.maxTotalSize !== undefined && totalSizeSoFar + fileSize > rules.maxTotalSize)
    return "totalSizeOverflow";
  return undefined;
}

/**
 * Filters `dropped` files down to what a native OS file picker would have already delivered by
 * the time `change` fires — the browser filters the picker's dialog by `accept` and, without
 * `multiple`, only ever returns one file. Drag-and-drop bypasses both: the dropped `DataTransfer`
 * is exactly what the OS gave, unfiltered. Applying that same pre-filtering here, before the
 * dropped files are ever assigned to the input, keeps `change` events from browsing and dropping
 * indistinguishable downstream — no bespoke second contract for consumers to handle.
 *
 * This filter is deliberately separate from `validateFiles`'s `accept`/`multiple` checks, which
 * run afterwards against whatever files actually landed in the selection (`FileInput`'s post-hoc,
 * non-filtering `setCustomValidity` step). It's the pre-hoc filter step that a native picker
 * performs for free, and that drag-and-drop has to do for itself instead.
 */
export function filterDroppedFiles(
  dropped: File[],
  rules: { accept?: string; multiple?: boolean },
): File[] {
  const { accept, multiple } = rules;
  const matchingAccept = accept ? dropped.filter((file) => matchesAccept(file, accept)) : dropped;
  return multiple ? matchingAccept : matchingAccept.slice(0, 1);
}

/** Matches `file` against native `accept` attribute syntax: comma-separated extensions, MIME types, or MIME wildcards. */
function matchesAccept(file: File, accept: string): boolean {
  const patterns = accept
    .split(",")
    .map((pattern) => pattern.trim())
    .filter(Boolean);

  if (patterns.length === 0) return true;

  return patterns.some((pattern) => matchesAcceptPattern(file, pattern));
}

function matchesAcceptPattern(file: File, pattern: string): boolean {
  if (pattern.startsWith(".")) {
    return file.name.toLowerCase().endsWith(pattern.toLowerCase());
  }

  if (pattern.endsWith("/*")) {
    const type = pattern.slice(0, -1).toLowerCase();
    return file.type.toLowerCase().startsWith(type);
  }

  return file.type.toLowerCase() === pattern.toLowerCase();
}
