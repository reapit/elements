import { cx } from '@linaria/core'
import { useFormLayoutContext } from '../context'
import { elFormLayoutTitle } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace FormLayoutTitle {
  export interface Props extends HTMLAttributes<HTMLHeadingElement> {
    /** The form title text. */
    children: ReactNode
  }
}

export function FormLayoutTitle({ children, className, id, ...rest }: FormLayoutTitle.Props) {
  const context = useFormLayoutContext()

  return (
    <h2 {...rest} id={id ?? context?.titleId} className={cx(elFormLayoutTitle, className)}>
      {children}
    </h2>
  )
}

FormLayoutTitle.displayName = 'FormLayout.Title'
