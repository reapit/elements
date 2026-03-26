import { ElAccordionGroup } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace AccordionGroup {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** The `Accordion` components to display in the group. */
    children: ReactNode
  }
}

/**
 * A layout wrapper that groups multiple `Accordion` components together in a vertical stack.
 */
export function AccordionGroup({ children, ...rest }: AccordionGroup.Props) {
  return <ElAccordionGroup {...rest}>{children}</ElAccordionGroup>
}

/** @deprecated Use `AccordionGroup.Props` instead. */
export type AccordionGroupProps = AccordionGroup.Props
