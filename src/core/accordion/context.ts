import { createContext, useContext } from 'react'

export namespace AccordionContext {
  export interface Value {
    /** The ID used for accessibility labeling of the accordion's summary element */
    labelId: string
  }
}

/**
 * Simple context object to allow the Accordion to automatically wire-up an `aria-labelledby` attribute
 * on the `<details>` element that references the `id` attribute of the `<summary>` element's title text.
 */
export const AccordionContext = createContext<AccordionContext.Value | null>(null)

/**
 * Returns the current AccordionContext value.
 * @throws an error if the context is not defined.
 */
export function useAccordionContext(): AccordionContext.Value {
  const accordionContext = useContext(AccordionContext)
  if (!accordionContext) {
    throw new Error('useAccordionContext must be used within an AccordionContext.Provider')
  }
  return accordionContext
}
