import { createContext, useContext } from "react";

export namespace ButtonGroupContext {
  export interface Value {
    /** The size of buttons in the button group */
    size?: "small" | "medium" | "large";
  }
}

/**
 * Context that ButtonGroup provides to descendants. Exposes configuration
 * for button behaviour including size.
 */
export const ButtonGroupContext = createContext<ButtonGroupContext.Value | null>(null);

/**
 * Returns ButtonGroupContext.Value from the nearest ButtonGroup ancestor.
 * @throws Error when called outside a ButtonGroup component.
 */
export function useButtonGroupContext(): ButtonGroupContext.Value {
  const context = useContext(ButtonGroupContext);
  if (!context) {
    throw new Error("useButtonGroupContext requires a ButtonGroup ancestor");
  }
  return context;
}
