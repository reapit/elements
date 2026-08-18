import { createContext, useContext } from "react";

export namespace AtAGlanceCardContext {
  export interface Value {
    /** The element type the card uses */
    as: "a" | "article" | "button";
  }
}

/**
 * AtAGlance.Card context for descendants.
 * Provides the element type so subcomponents render appropriate semantic elements.
 */
export const AtAGlanceCardContext = createContext<AtAGlanceCardContext.Value | null>(null);

/**
 * Returns AtAGlanceCardContext.Value from the nearest AtAGlance.Card ancestor.
 * @throws Error when called outside an AtAGlance.Card component.
 */
export function useAtAGlanceCardContext(): AtAGlanceCardContext.Value {
  const context = useContext(AtAGlanceCardContext);
  if (!context) {
    throw new Error("useAtAGlanceCardContext requires an AtAGlance.Card ancestor");
  }
  return context;
}
