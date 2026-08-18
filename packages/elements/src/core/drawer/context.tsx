import { createContext, useContext } from "react";

export namespace DrawerContext {
  export interface Value {
    /** The ID used for accessibility labeling of the drawer title */
    titleId: string;
  }
}

/**
 * The context available to a Drawer's descendants. Provides access to titleId
 * for proper accessibility labeling.
 */
export const DrawerContext = createContext<DrawerContext.Value | null>(null);

/**
 * Returns the current `DrawerContext` value, or `null` if no `Drawer` ancestor
 * provides the context.
 */
export function useDrawerContext(): DrawerContext.Value | null {
  return useContext(DrawerContext);
}
