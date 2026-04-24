/**
 * Whether the duration represents a finite auto-dismiss countdown.
 * Returns `false` for `undefined` (no duration set) and `Infinity`
 * (explicitly persistent).
 */
export function isTimedDuration(duration: number | undefined): duration is number {
  return duration !== undefined && isFinite(duration)
}
