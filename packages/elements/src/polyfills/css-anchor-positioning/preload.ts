/**
 * Preload entry point for the CSS Anchor Positioning polyfill.
 *
 * **Note:** This module is for preloading only. To apply the polyfill, use
 * `applyCSSAnchorPositioningPolyfill()` from the main export.
 *
 * Preload via HTML `<link>` tag (recommended for first-render components):
 *
 * @example
 * ```html
 * <link rel="modulepreload" href="@reapit/elements/polyfills/css-anchor-positioning/preload.js" />
 * ```
 *
 * Or preload via dynamic import at app initialization:
 *
 * @example
 * ```ts
 * // Early in your app
 * import('@reapit/elements/polyfills/css-anchor-positioning/preload')
 *
 * // Later, in components
 * import { applyCSSAnchorPositioningPolyfill } from '@reapit/elements'
 * await applyCSSAnchorPositioningPolyfill({ elements: [myElement] })
 * ```
 */
export { default as polyfill } from "@oddbird/css-anchor-positioning/fn";
