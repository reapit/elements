import { createContext, useContext } from "react";

export namespace ChipGroupContext {
  export interface Value {
    /** Whether the chip group is disabled for assistive technology */
    ariaDisabled?: boolean;
    /** Whether the chip group is disabled for user interaction */
    disabled?: boolean;
    /** The visual and functional variant of the chip group */
    variant: "filter" | "selection";
  }
}

/**
 * Context that ChipGroup provides to descendants. Exposes configuration
 * for chip behavior including disabled state and variant type.
 */
export const ChipGroupContext = createContext<ChipGroupContext.Value | null>(null);

/**
 * Returns ChipGroupContext.Value from the nearest ChipGroup ancestor.
 * @throws Error when called outside a ChipGroup component.
 */
export function useChipGroupContext(): ChipGroupContext.Value {
  const context = useContext(ChipGroupContext);
  if (!context) {
    throw new Error("useChipGroupContext requires a ChipGroup ancestor");
  }
  return context;
}
