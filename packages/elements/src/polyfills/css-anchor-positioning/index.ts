/**
 * Main exports for CSS Anchor Positioning polyfill utilities.
 *
 * - Use `applyCSSAnchorPositioningPolyfill()` to apply the polyfill to elements
 * - Use `isCSSAnchorPositioningSupported()` to check for native browser support
 * - For preloading the polyfill module, see `preload.ts` (exported separately as a build entry point)
 */
export * from "./is-css-anchor-positioning-supported";
export * from "./polyfill";
