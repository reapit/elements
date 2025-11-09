export interface PopoverPlacementObject {
  alignSelf?: 'anchor-center' | 'start' | 'end'
  bottom?: `anchor(${string})` | (string & {})
  justifySelf?: 'anchor-center' | 'start' | 'end'
  left?: `anchor(${string})` | (string & {})
  right?: `anchor(${string})` | (string & {})
  top?: `anchor(${string})` | (string & {})
}

export type PopoverPlacement =
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'right-start'
  | 'right'
  | 'right-end'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'
  | 'left-start'
  | 'left'
  | 'left-end'
  | PopoverPlacementObject

export namespace mapPlacementToCSS {
  export interface Input {
    /** Gap between positioned element and anchor. Does not apply to custom placements */
    gap: string
    /** Placement relative to anchor */
    placement: PopoverPlacement
  }
}

/**
 * Generates CSS properties to position an element using the specified placement.
 */
export function mapPlacementToCSS({ gap, placement }: mapPlacementToCSS.Input): string {
  // NOTE: custom placements do not consider the specified gap, as it is not possible to
  // interpret which margin the gap should be applied to.
  if (typeof placement !== 'string') {
    const { alignSelf, top, right, bottom, left, justifySelf } = placement
    return [
      alignSelf && `align-self: ${alignSelf}`,
      bottom && `bottom: ${bottom}`,
      justifySelf && `justify-self: ${justifySelf}`,
      left && `left: ${left}`,
      right && `right: ${right}`,
      top && `top: ${top}`,
    ]
      .filter(Boolean)
      .join('; ')
  }

  // NOTE: The polyfill incompatibility prevents using logical properties like `inset-block-start`
  // and `position-area`. Once browsers support CSS anchor positioning natively, `position-area`
  // will map directly to our placement options.
  //
  // Currently, placement maps to inset properties (top, left, etc.) and `align-self`/`justify-self`
  // with the `anchor-center` value.
  switch (placement) {
    case 'bottom':
      return `
        top: anchor(bottom);
        justify-self: anchor-center;
        margin-block: ${gap};
      `
    case 'bottom-end':
      return `
        top: anchor(bottom);
        right: anchor(right);
        margin-block: ${gap};
      `
    case 'bottom-start':
      return `
        top: anchor(bottom);
        left: anchor(left);
        margin-block: ${gap};
      `
    case 'left':
      return `
        align-self: anchor-center;
        right: anchor(left);
        margin-inline: ${gap};
      `
    case 'left-end':
      return `
        bottom: anchor(bottom);
        right: anchor(left);
        margin-inline: ${gap};
      `
    case 'left-start':
      return `
        top: anchor(top);
        right: anchor(left);
        margin-inline: ${gap};
      `
    case 'right':
      return `
        align-self: anchor-center;
        left: anchor(right);
        margin-inline: ${gap};
      `
    case 'right-end':
      return `
        bottom: anchor(bottom);
        left: anchor(right);
        margin-inline: ${gap};
      `
    case 'right-start':
      return `
        top: anchor(top);
        left: anchor(right);
        margin-inline: ${gap};
      `
    case 'top':
      return `
        bottom: anchor(top);
        justify-self: anchor-center;
        margin-block: ${gap};
      `
    case 'top-end':
      return `
        bottom: anchor(top);
        right: anchor(right);
        margin-block: ${gap};
      `
    case 'top-start':
      return `
        bottom: anchor(top);
        left: anchor(left);
        margin-block: ${gap};
      `
  }
}
