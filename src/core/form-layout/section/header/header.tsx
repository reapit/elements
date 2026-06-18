import { cx } from '@linaria/core'
import { elFormLayoutSectionHeader } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace FormLayoutSectionHeader {
  export interface Props extends HTMLAttributes<HTMLElement> {
    /** The header content. Typically `FormLayout.SectionTitle` and `FormLayout.SectionDescription`. */
    children?: ReactNode
  }
}

/**
 * Groups the form section title and description. Renders as a `<header>` element.
 */
export function FormLayoutSectionHeader({ children, className, ...rest }: FormLayoutSectionHeader.Props) {
  return (
    <header {...rest} className={cx(elFormLayoutSectionHeader, className)}>
      {children}
    </header>
  )
}

FormLayoutSectionHeader.displayName = 'FormLayout.SectionHeader'
