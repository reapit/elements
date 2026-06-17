import { createContext, useContext } from 'react'

export namespace FormLayoutContext {
  export interface Value {
    /** The ID used to label the section via `aria-labelledby`. */
    titleId: string
    /** The ID used to describe the section via `aria-describedby`. */
    descriptionId: string
  }
}

/**
 * Context that FormLayout provides to descendants. Exposes `titleId` and
 * `descriptionId` for automatic accessibility wiring between the section
 * element, its title, and its description.
 */
export const FormLayoutContext = createContext<FormLayoutContext.Value | null>(null)

/**
 * Returns the current `FormLayoutContext` value, or `null` if no `FormLayout`
 * ancestor provides the context.
 */
export function useFormLayoutContext(): FormLayoutContext.Value | null {
  return useContext(FormLayoutContext)
}
