/**
 * Feature detects whether CSS anchor positioning is supported by the browser or not.
 * @returns true if CSS anchor positioning is supported, false otherwise
 */
export function isCSSAnchorPositioningSupported() {
  return 'anchorName' in document.documentElement.style
}
