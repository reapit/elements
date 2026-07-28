import { createContext, useContext } from "react";

export namespace DescriptionListContext {
  export interface Value {
    /**
     * The layout variant for description list items. "tabular" uses CSS Grid subgrid to align columns, "inline"
     * displays label and description in a row, "stacked" displays them vertically.
     */
    layout?: "stacked" | "tabular" | "inline";
    /** The size of the description list items. */
    size?: "base" | "sm";
  }
}

/**
 * Context that DescriptionList provides to descendants. Exposes layout configuration that can be inherited by
 * DescriptionListItem components.
 */
export const DescriptionListContext = createContext<DescriptionListContext.Value | null>(null);

/**
 * Returns DescriptionListContext.Value from the nearest DescriptionList ancestor.
 * @throws Error when called outside a DescriptionList component.
 */
export function useDescriptionListContext(): DescriptionListContext.Value {
  const context = useContext(DescriptionListContext);
  if (!context) {
    throw new Error("useDescriptionListContext requires a DescriptionList ancestor");
  }
  return context;
}
