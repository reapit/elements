import { createContext, useContext } from "react";
import type { ComponentProps, RefObject } from "react";

import type { ChipSelectChip } from "./chip";

export namespace ChipSelectContext {
  export interface Value {
    /** Ref to the container element, used to query sibling options. */
    containerRef: RefObject<HTMLElement>;
    /** The ID of the form to associate chip select options with. */
    form?: string;
    /** Whether the chip select allows multiple selections. */
    multiple: boolean;
    /** The name each chip select option should have. */
    name?: string;
    /** The size of options in the chip select. */
    size: ComponentProps<typeof ChipSelectChip>["size"];
    /**
     * Whether at least one option must remain selected. Used to silently prevent deselection of
     * the last selected chip and to drive the group's HTML `required` attribute.
     */
    required?: boolean;
  }
}

/**
 * The context available to a ChipSelect's descendants. Provides access to shared
 * configuration including form association, selection mode, and sizing.
 */
export const ChipSelectContext = createContext<ChipSelectContext.Value | null>(null);

/**
 * Returns the current ChipSelectContext value.
 * @throws when called outside a ChipSelect provider.
 */
export function useChipSelectContext(): ChipSelectContext.Value {
  const context = useContext(ChipSelectContext);
  if (!context) {
    throw new Error("useChipSelectContext must be used within a ChipSelect");
  }
  return context;
}
