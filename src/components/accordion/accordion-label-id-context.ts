import { createContext, useContext } from 'react'

/**
 * Simple context object to allow the Accordion to automatically wire-up an `aria-labelledby` attribute
 * on the `<details>` element that references the `id` attribute of the `<summary>` element's title text.
 */
export const AccordionLabelIdContext = createContext<string | null>(null)

export function useAccordionLabelIdContext(): string {
  const accordionLabelId = useContext(AccordionLabelIdContext)
  if (!accordionLabelId) {
    throw new Error('useAccordionLabelIdContext must be used within a AccordionLabelIdContext.Provider')
  }
  return accordionLabelId
}
