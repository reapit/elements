import { isCSSAnchorPositioningSupported } from './is-css-anchor-positioning-supported'

// This matches the `AnchorPositioningPolyfillOptions` type accepted by `@oddbird/css-anchor-positioning/fn`
// JS Doc content copied from https://github.com/oddbird/css-anchor-positioning?tab=readme-ov-file#configuration
interface ApplyCSSAnchorPositioningPolyfillOptions {
  /**
   * If set, the polyfill will only be applied to the specified elements instead of to all styles.
   * This works by polyfilling each elements inline styles, if any. Any specified `<link>` and `<style>`
   * elements will also be polyfilled.
   */
  elements?: HTMLElement[]
  /**
   * When not defined or set to false, the polyfill will be applied to all elements that have eligible
   * inline styles, regardless of whether the elements option is defined. When set to true (the default),
   * elements with eligible inline styles listed in the elements option will still be polyfilled, but no
   * other elements in the document will be implicitly polyfilled.
   *
   * @default true
   */
  excludeInlineStyles?: boolean
  /**
   * Determines whether anchor calculations should update on every animation frame (e.g. when the anchor
   * element is animated using transforms), in addition to always updating on scroll/resize. While this
   * option is optimized for performance, it should be used sparingly.
   *
   * @default false
   */
  useAnimationFrame?: boolean
}

/**
 * Applies the CSS anchor positioning polyfill, but only if the browser lacks native support.
 */
export async function applyCSSAnchorPositioningPolyfill({
  elements,
  // By default, we only want to polyfill inline styles on elements explicitly specified in the `elements`
  // option. This is the opposite of the polyfill's default behaviour.
  excludeInlineStyles = true,
  // By default, we don't want to recalculate on every animation frame because we don't typically
  // animate anchors.
  useAnimationFrame = false,
}: ApplyCSSAnchorPositioningPolyfillOptions = {}): Promise<void> {
  if (!isCSSAnchorPositioningSupported()) {
    // Dynamic import is cached by browser's module system - no repeated network requests
    const { default: polyfillFn } = await import('@oddbird/css-anchor-positioning/fn')

    await polyfillFn({
      elements,
      excludeInlineStyles,
      useAnimationFrame,
    })
  }
}
