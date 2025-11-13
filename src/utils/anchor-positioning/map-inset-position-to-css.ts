/**
 * CSS inset property value that uses the anchor() function or any valid CSS length.
 * Examples: `anchor(top)`, `anchor(bottom)`, `10px`, `var(--spacing-2)`
 */
export type InsetProperty = `anchor(${string})` | (string & {})

/**
 * CSS self-alignment property value for anchor positioning.
 * Currently supports 'anchor-center' to center the element relative to its anchor.
 */
export type SelfAlignmentProperty = 'anchor-center'

export namespace mapInsetPositionToCSS {
  export interface Input {
    /** Aligns the positioned element vertically relative to the anchor. */
    alignSelf?: SelfAlignmentProperty
    /** Distance from the bottom edge. Accepts anchor() function or CSS length. */
    bottom?: InsetProperty
    /** Aligns the positioned element horizontally relative to the anchor. */
    justifySelf?: SelfAlignmentProperty
    /** Distance from the left edge. Accepts anchor() function or CSS length. */
    left?: InsetProperty
    /** Distance from the right edge. Accepts anchor() function or CSS length. */
    right?: InsetProperty
    /** Distance from the top edge. Accepts anchor() function or CSS length. */
    top?: InsetProperty
  }
}

/**
 * Generates CSS positioning properties from inset and alignment values.
 * Use this when predefined placements are insufficient and custom positioning is required.
 */
export function mapInsetPositionToCSS({
  alignSelf,
  top,
  right,
  bottom,
  left,
  justifySelf,
}: mapInsetPositionToCSS.Input): string {
  return [
    alignSelf && `align-self: ${alignSelf};`,
    bottom && `bottom: ${bottom};`,
    justifySelf && `justify-self: ${justifySelf};`,
    left && `left: ${left};`,
    right && `right: ${right};`,
    top && `top: ${top};`,
  ]
    .filter(Boolean)
    .join('\n')
}
