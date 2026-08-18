import { createContext, useContext } from "react";

export namespace FormLayoutContext {
  export interface Value {
    /** The ID used to label the section via `aria-labelledby`. */
    titleId: string;
    /** The ID used to describe the section via `aria-describedby`. */
    descriptionId: string;
  }
}

/**
 * Context that `FormLayout` and `FormLayout.Section` provide to descendants.
 * Exposes `titleId` and `descriptionId` for automatic accessibility wiring
 * between the section element, its title, and its description.
 */
export const FormLayoutContext = createContext<FormLayoutContext.Value | null>(null);

/**
 * Returns the current `FormLayoutContext` value.
 * @throws Error when called outside a `FormLayout` or `FormLayout.Section` component.
 */
export function useFormLayoutContext(): FormLayoutContext.Value {
  const context = useContext(FormLayoutContext);
  if (!context) {
    throw new Error("useFormLayoutContext requires a FormLayout or FormLayout.Section ancestor");
  }
  return context;
}
