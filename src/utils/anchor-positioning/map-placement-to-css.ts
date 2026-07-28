/**
 * Predefined placement positions for positioning an element relative to an anchor.
 * Each placement specifies a side (top, right, bottom, left) with optional alignment (start, end).
 */
export const placements = [
  "top",
  "top-start",
  "top-end",
  "right",
  "right-start",
  "right-end",
  "bottom",
  "bottom-start",
  "bottom-end",
  "left",
  "left-start",
  "left-end",
] as const;

/** A position relative to an anchor element. */
export type Placement = (typeof placements)[number];

export namespace mapPlacementToCSS {
  export interface Input {
    /** Gap between positioned element and anchor. */
    gap?: string;
    /** Placement relative to anchor */
    placement?: Placement;
  }
}

/**
 * Generates CSS properties to position an element using the specified placement.
 */
export function mapPlacementToCSS({ gap = "0", placement }: mapPlacementToCSS.Input): string {
  // NOTE: The polyfill incompatibility prevents using logical properties like `inset-block-start`
  // and `position-area`. Once browsers support CSS anchor positioning natively, `position-area`
  // will map directly to our placement options.
  //
  // Currently, placement maps to inset properties (top, left, etc.) and `align-self`/`justify-self`
  // with the `anchor-center` value.
  //
  // IMPORTANT: The `position-area` polyfill is incompatible with React's reconciliation algorithm
  // as it results in web components being added to the DOM without React being aware of them. This
  // is why we are not using `position-area` here.
  switch (placement) {
    case "bottom":
      return `
        justify-self: anchor-center;
        top: anchor(bottom);
        margin-block: ${gap};
      `;
    case "bottom-end":
      return `
        top: anchor(bottom);
        right: anchor(right);
        margin-block: ${gap};
      `;
    case "bottom-start":
      return `
        top: anchor(bottom);
        left: anchor(left);
        margin-block: ${gap};
      `;
    case "left":
      return `
        align-self: anchor-center;
        right: anchor(left);
        margin-inline: ${gap};
      `;
    case "left-end":
      return `
        bottom: anchor(bottom);
        right: anchor(left);
        margin-inline: ${gap};
      `;
    case "left-start":
      return `
        top: anchor(top);
        right: anchor(left);
        margin-inline: ${gap};
      `;
    case "right":
      return `
        align-self: anchor-center;
        left: anchor(right);
        margin-inline: ${gap};
      `;
    case "right-end":
      return `
        bottom: anchor(bottom);
        left: anchor(right);
        margin-inline: ${gap};
      `;
    case "right-start":
      return `
        top: anchor(top);
        left: anchor(right);
        margin-inline: ${gap};
      `;
    case "top":
      return `
        bottom: anchor(top);
        justify-self: anchor-center;
        margin-block: ${gap};
      `;
    case "top-end":
      return `
        bottom: anchor(top);
        right: anchor(right);
        margin-block: ${gap};
      `;
    case "top-start":
      return `
        bottom: anchor(top);
        left: anchor(left);
        margin-block: ${gap};
      `;
    default:
      return "";
  }
}
