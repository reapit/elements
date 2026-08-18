import { createContext, useContext } from "react";

export namespace PageLayoutContext {
  export interface Value {
    /** ID of the root app layout element */
    rootId: string;
    /**
     * Which region should scroll.
     * - `self`, means the `PageLayout` element will scroll
     * - `body`, means the `PageLayout.BodyRegion` will scroll
     */
    scroll: "self" | "body";
  }
}

/**
 * Context available to descendants. Provides scroll region configuration
 * to determine where scrolling behavior should be applied.
 */
export const PageLayoutContext = createContext<PageLayoutContext.Value | null>(null);

/**
 * Returns the current PageLayoutContext value.
 * @throws if context is undefined.
 */
export function usePageLayoutContext(): PageLayoutContext.Value {
  const context = useContext(PageLayoutContext);
  if (!context) {
    throw new Error("usePageLayoutContext requires an PageLayout ancestor");
  }
  return context;
}
