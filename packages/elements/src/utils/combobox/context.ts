import { createContext, useContext } from "react";

// NOTE: This context shares attributes between multiple Combobox subcomponents
// (e.g., disabled affects both ComboboxButton and ComboboxListbox). Define
// attributes used by only one subcomponent on that subcomponent's interface instead.

export namespace ComboboxContext {
  export interface Value {
    /** ID of element(s) describing the combobox */
    ariaDescribedBy?: string;
    /** ID of element providing error message for the combobox */
    ariaErrorMessage?: string;
    /** Whether the combobox value is invalid */
    ariaInvalid?: boolean | "false" | "true" | "grammar" | "spelling";
    /** ID of element(s) labelling the combobox */
    ariaLabelledBy?: string;
    /** Combobox element ID */
    comboboxId: string;
    /** Whether the combobox is disabled */
    disabled: boolean;
    /** Listbox element ID */
    listboxId: string;
    /** Whether multiple selections are allowed */
    multiple: boolean;
    /** Popup element ID */
    popupId: string;
    /** Whether the combobox is required */
    required: boolean;
    /** ID of the Combobox.SearchInput element, if rendered */
    searchInputId: string;
    /** Size of the combobox */
    size: "small" | "medium" | "large";
  }
}

/**
 * Context that Combobox provides to descendants. Exposes configuration for
 * managing shared state across button, listbox, and popup components.
 */
export const ComboboxContext = createContext<ComboboxContext.Value | null>(null);

/**
 * Returns the current ComboboxContext value.
 * @returns The combobox context
 * @throws {Error} when used outside a Combobox
 */
export function useComboboxContext(): ComboboxContext.Value {
  const context = useContext(ComboboxContext);
  if (!context) {
    throw new Error("useComboboxContext requires a Combobox ancestor");
  }
  return context;
}
