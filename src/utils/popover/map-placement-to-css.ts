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

/**
 * Returns a CSS string that defines the necessary CSS properties for a positioned element
 * to be placed according to the specified `placement` value.
 *
 * @param placement the placement of the positioned element w.r.t. to its anchor
 */
export function mapPlacementToCSS(placement: PopoverPlacement, gap: string): string {
  // NOTE: We do not use logical properties (like `inset-block-start`) because the polyfill
  // we're currently relying on in some browsers doesn't work nicely with them. Likewise for
  // our lack of use of the `position-area` property. In future, when all browsers natively
  // support CSS anchor positioning, `position-area` will match quite easily to our `placement`
  // options (such that we may want to simply expose `position-area` directly).
  //
  // For now, we map our `placement` value to inset properties (top, left etc) and the
  // `align-self`/`justify-self` properties with the special `anchor-center` value.
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
