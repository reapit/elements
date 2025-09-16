import { ElPageHeaderLeadingElement } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace PageHeaderLeadingElement {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * The actual leading element to display. Will typically be an image or product icon.
     */
    children: ReactNode
    /**
     * The type of leading element being displayed. This impacts the amount of space available to the element
     * on different screen/container sizes.
     */
    type: 'icon' | 'image'
  }
}

/**
 * Allows for a leading element to be displayed in the page header. Used to display a child image or product icon.
 * Typically used via `PageHeader.LeadingElement`. This component does not render the leading element itself, rather
 * it provides a correctly sized container, based on the `type` prop, for the leading element.
 */
export function PageHeaderLeadingElement({ children, type, ...rest }: PageHeaderLeadingElement.Props) {
  return (
    <ElPageHeaderLeadingElement {...rest} data-type={type}>
      {children}
    </ElPageHeaderLeadingElement>
  )
}

PageHeaderLeadingElement.displayName = 'PageHeader.LeadingElement'
