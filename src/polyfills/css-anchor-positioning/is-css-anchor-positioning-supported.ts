/**
 * Detects whether the browser supports CSS anchor positioning natively.
 * @returns true if supported, false otherwise
 */
export function isCSSAnchorPositioningSupported() {
  return CSS.supports('anchor-name', '--myanchor')
}
