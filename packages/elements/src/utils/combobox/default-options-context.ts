import { createContext, useContext } from "react";

import type { useComboboxSelectedOptions } from "./use-selected-options";

export namespace ComboboxDefaultOptionsContext {
  export type Value = readonly useComboboxSelectedOptions.Option[];
}

/**
 * Provides the default options for the combobox. Has a default value of an empty array.
 */
export const ComboboxDefaultOptionsContext = createContext<ComboboxDefaultOptionsContext.Value>([]);

/**
 * Returns the current ComboboxDefaultOptionsContext value.
 * @returns The combobox's default options.
 */
export function useComboboxDefaultOptionsContext(): ComboboxDefaultOptionsContext.Value {
  return useContext(ComboboxDefaultOptionsContext);
}
