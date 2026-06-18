import { cx } from '@linaria/core'
import { useFormLayoutContext } from '../../context'
import { elFormLayoutSectionDescription } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace FormLayoutSectionDescription {
  export interface Props extends HTMLAttributes<HTMLParagraphElement> {
    /** The section description text. */
    children: ReactNode
  }
}

/**
 * An optional description below the form section title.
 */
export function FormLayoutSectionDescription({ children, className, id, ...rest }: FormLayoutSectionDescription.Props) {
  const { descriptionId } = useFormLayoutContext()

  return (
    <p {...rest} id={id ?? descriptionId} className={cx(elFormLayoutSectionDescription, className)}>
      {children}
    </p>
  )
}

FormLayoutSectionDescription.displayName = 'FormLayout.SectionDescription'
