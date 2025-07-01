import { AccordionSummary } from './summary'
import { AccordionLabelIdContext } from './accordion-label-id-context'
import { ElAccordion, ElAccordionContent } from './styles'
import { useId } from 'react'

import type { DetailsHTMLAttributes, ReactNode } from 'react'

export interface AccordionProps extends DetailsHTMLAttributes<HTMLDetailsElement> {
  /**
   * The content to be shown/hidden when the accordion is toggled.
   */
  children: ReactNode
  /**
   * Whether the accordion is open or not. Even if this is provided, the accordion will be uncontrolled by default.
   * If you need to control this state, you will also need to handle click events on the accordion's summary element.
   */
  open?: boolean
  /**
   * The summary/header for the accordion. Will typically be an `Accordion.Summary`. If a custom element is
   * rendered, it should be a `<summary>` element.
   */
  summary: ReactNode
}

/**
 * A disclosure widget that can show and hide content. The component leverages a `<details>` element to provide
 * native disclosure functionality, with the summary/header being styled to look like a traditional accordion.
 *
 * **Note:** The open state of the accordion is uncontrolled by default. If you need to control this state,
 * you can do so via the `open` prop, but please surface your use-case with the Elements team first.
 */
export function Accordion({ 'aria-labelledby': ariaLabelledBy, children, summary, ...rest }: AccordionProps) {
  const labelId = ariaLabelledBy ?? useId()

  return (
    <ElAccordion {...rest} aria-labelledby={labelId}>
      <AccordionLabelIdContext.Provider value={labelId}>{summary}</AccordionLabelIdContext.Provider>
      <ElAccordionContent>{children}</ElAccordionContent>
    </ElAccordion>
  )
}

Accordion.Summary = AccordionSummary
