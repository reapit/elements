import { cx } from '@linaria/core'
import { useFormLayoutContext } from '../../context'
import { elFormLayoutSectionTitle } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace FormLayoutSectionTitle {
  export interface Props extends HTMLAttributes<HTMLHeadingElement> {
    /** The heading level to render as. Defaults to `'h2'`. */
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    /** The section title text. */
    children: ReactNode
  }
}

/**
 * The title of a form section. Renders as an `<h2>` by default; use the `as` prop to adjust
 * the heading level to fit the document outline.
 */
export function FormLayoutSectionTitle({
  as: Element = 'h2',
  children,
  className,
  id,
  ...rest
}: FormLayoutSectionTitle.Props) {
  const { titleId } = useFormLayoutContext()

  return (
    <Element {...rest} id={id ?? titleId} className={cx(elFormLayoutSectionTitle, className)}>
      {children}
    </Element>
  )
}

FormLayoutSectionTitle.displayName = 'FormLayout.SectionTitle'
