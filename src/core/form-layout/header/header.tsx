import { cx } from '@linaria/core'
import { elFormLayoutHeader } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace FormLayoutHeader {
  export interface Props extends HTMLAttributes<HTMLElement> {
    /** The header content, typically a `FormLayout.Title` and an optional `FormLayout.Description`. */
    children: ReactNode
  }
}

export function FormLayoutHeader({ children, className, ...rest }: FormLayoutHeader.Props) {
  return (
    <header {...rest} className={cx(elFormLayoutHeader, className)}>
      {children}
    </header>
  )
}

FormLayoutHeader.displayName = 'FormLayout.Header'
