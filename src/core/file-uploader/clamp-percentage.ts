/**
 * Clamps `value` to a finite percentage between `0` and `100`, shared by `FileUploaderCircularProgress` and
 * `getFileUploaderItemStatus` so `NaN`/`Infinity`/out-of-range progress values can't reach either.
 */
export function clampPercentage(value: number): number {
  return Math.min(100, Math.max(0, Number.isFinite(value) ? value : 0))
}
