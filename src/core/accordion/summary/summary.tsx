import { ChevronDownIcon } from '../../../icons/chevron-down'
import { useAccordionContext } from '../context'
import {
  ElAccordionSummary,
  ElAccordionSummaryTitle,
  ElAccordionSummaryAccessory,
  ElAccordionSummaryIcon,
} from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace AccordionSummary {
  export interface Props extends HTMLAttributes<HTMLElement> {
    /**
     * Optional information to display as part of the summary
     */
    accessory?: ReactNode
    /**
     * The accordion's title. This will also serve as the accessible label for the accordion.
     */
    children: ReactNode
    /**
     * Optional information to display on the right side of the summary
     * @deprecated use `accessory` instead
     */
    rightInfo?: ReactNode
  }
}

/**
 * A summary component designed to be used within an Accordion. It displays a title with optional accessory
 * and a chevron icon that visually indicates the accordion's open state. It is explicitly designed for
 * use within a `<details>` element, with its `open` state remaining uncontrolled.
 *
 * ⚠️ **Important**: `<summary>` elements are not interactive outside of a parent `<details>` element.
 * This component should only be used as the summary for an Accordion component.
 */
export function AccordionSummary({ accessory, children, rightInfo, ...rest }: AccordionSummary.Props) {
  const { labelId } = useAccordionContext()
  const content = accessory !== undefined && accessory !== null && accessory !== false ? accessory : rightInfo
  return (
    <ElAccordionSummary {...rest}>
      <ElAccordionSummaryTitle id={labelId}>{children}</ElAccordionSummaryTitle>
      {content !== undefined && content !== null && content !== false && (
        <ElAccordionSummaryAccessory>{content}</ElAccordionSummaryAccessory>
      )}
      <ElAccordionSummaryIcon aria-hidden>
        <ChevronDownIcon />
      </ElAccordionSummaryIcon>
    </ElAccordionSummary>
  )
}

AccordionSummary.displayName = 'Accordion.Summary'
