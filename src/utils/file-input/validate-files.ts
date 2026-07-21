/**
 * File validation for FileInput.
 *
 * Deliberately separate from native `accept`/`multiple` attribute enforcement:
 * the browser only enforces those against the OS file picker, not against
 * drag-and-drop or programmatic `FileList` assignment, so `validateFiles`
 * re-checks them itself rather than assuming the caller's entry point already
 * did. See `src/core/file-uploader/ARCHITECTURE.md`.
 */

export namespace validateFiles {
  /** Custom constraints to validate `incoming` files against. All fields are optional; omitting `multiple` defaults to single-file enforcement rather than no constraint. */
  export interface Rules {
    /** Native `accept` attribute syntax: comma-separated extensions (`.pdf`), MIME types (`image/png`), or MIME wildcards (`image/*`). */
    accept?: string
    /** When falsy, at most one file total (existing + incoming) is accepted. */
    multiple?: boolean
    /** Maximum size, in bytes, for any single file. */
    maxFileSize?: number
    /** Maximum number of files total (existing + incoming). */
    maxFiles?: number
    /** Maximum cumulative size, in bytes, of all files total (existing + incoming). */
    maxTotalSize?: number
  }

  /** Which rule rejected a file. Matches the corresponding key on `validateFiles.Rules`. */
  export type RejectionReason = 'accept' | 'multiple' | 'maxFileSize' | 'maxFiles' | 'maxTotalSize'

  export interface Rejection {
    file: File
    reason: RejectionReason
  }

  export interface Result {
    accepted: File[]
    rejected: Rejection[]
  }
}

/**
 * Validates `incoming` files against `rules`, treating `existing` files as
 * an already-accepted baseline for the count/size rules (`multiple`,
 * `maxFiles`, `maxTotalSize`).
 *
 * `accept` and `maxFileSize` are checked per file, independently of order.
 * `multiple`, `maxFiles`, and `maxTotalSize` are checked by walking `incoming`
 * in order, accumulating against `existing`'s count/size — so which files
 * land in `accepted` vs `rejected` depends on their position in `incoming`
 * once a limit is reached.
 *
 * A file that fails more than one rule is reported with the first rule that
 * rejected it, in the order above.
 */
export function validateFiles(incoming: File[], existing: File[], rules: validateFiles.Rules): validateFiles.Result {
  const accepted: File[] = []
  const rejected: validateFiles.Rejection[] = []

  let count = existing.length
  let totalSize = sumSize(existing)

  for (const file of incoming) {
    const reason = rejectionReason(file, rules, count, totalSize)
    if (reason) {
      rejected.push({ file, reason })
      continue
    }

    accepted.push(file)
    count += 1
    totalSize += file.size
  }

  return { accepted, rejected }
}

function rejectionReason(
  file: File,
  rules: validateFiles.Rules,
  countSoFar: number,
  totalSizeSoFar: number,
): validateFiles.RejectionReason | undefined {
  if (rules.accept && !matchesAccept(file, rules.accept)) return 'accept'
  if (rules.maxFileSize !== undefined && file.size > rules.maxFileSize) return 'maxFileSize'
  if (!rules.multiple && countSoFar >= 1) return 'multiple'
  if (rules.maxFiles !== undefined && countSoFar >= rules.maxFiles) return 'maxFiles'
  if (rules.maxTotalSize !== undefined && totalSizeSoFar + file.size > rules.maxTotalSize) return 'maxTotalSize'
  return undefined
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
export function filterDroppedFiles(dropped: File[], rules: { accept?: string; multiple?: boolean }): File[] {
  const { accept, multiple } = rules
  const matchingAccept = accept ? dropped.filter((file) => matchesAccept(file, accept)) : dropped
  return multiple ? matchingAccept : matchingAccept.slice(0, 1)
}

function sumSize(files: File[]): number {
  return files.reduce((total, file) => total + file.size, 0)
}

/** Matches `file` against native `accept` attribute syntax: comma-separated extensions, MIME types, or MIME wildcards. */
function matchesAccept(file: File, accept: string): boolean {
  const patterns = accept
    .split(',')
    .map((pattern) => pattern.trim())
    .filter(Boolean)

  if (patterns.length === 0) return true

  return patterns.some((pattern) => matchesAcceptPattern(file, pattern))
}

function matchesAcceptPattern(file: File, pattern: string): boolean {
  if (pattern.startsWith('.')) {
    return file.name.toLowerCase().endsWith(pattern.toLowerCase())
  }

  if (pattern.endsWith('/*')) {
    const type = pattern.slice(0, -1).toLowerCase()
    return file.type.toLowerCase().startsWith(type)
  }

  return file.type.toLowerCase() === pattern.toLowerCase()
}
