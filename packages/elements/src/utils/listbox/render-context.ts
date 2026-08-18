import { createContext, useContext } from "react";

export namespace ListboxRenderContext {
  /** How descendants render: as custom display elements or native select elements */
  export type Value = "custom" | "native";
}

/**
 * Tells Listbox descendants whether to render as native select elements or
 * custom display elements.
 */
export const ListboxRenderContext = createContext<ListboxRenderContext.Value | null>(null);

/**
 * Returns the current ListboxRenderContext value.
 * @returns The render context value ('display' or 'native')
 * @throws {Error} when used outside a Listbox
 */
export function useListboxRenderContext(): ListboxRenderContext.Value {
  const context = useContext(ListboxRenderContext);
  if (!context) {
    throw new Error("useListboxRenderContext must be used within a Listbox");
  }
  return context;
}
