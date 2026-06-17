import { cx } from '@linaria/core'
import { useId } from 'react'
import { FormLayoutContext } from './context'
import { FormLayoutDescription } from './description'
import { FormLayoutFooter } from './footer'
import { FormLayoutHeader } from './header'
import { FormLayoutTitle } from './title'
import { elFormLayout } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace FormLayout {
  export interface Props extends HTMLAttributes<HTMLElement> {
    /** The form layout content. */
    children: ReactNode
  }

  export interface HeaderProps extends FormLayoutHeader.Props {}
  export interface TitleProps extends FormLayoutTitle.Props {}
  export interface DescriptionProps extends FormLayoutDescription.Props {}
  export interface FooterProps extends FormLayoutFooter.Props {}
}

/**
 * Handles the layout of a form section, providing consistent spacing between a
 * header, body content, and footer actions. Renders as a `<section>` element,
 * automatically wiring `aria-labelledby` and `aria-describedby` to
 * `FormLayout.Title` and `FormLayout.Description` respectively.
 */
export function FormLayout({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  children,
  className,
  ...rest
}: FormLayout.Props) {
  const titleId = useId()
  const descriptionId = useId()

  return (
    // NOTE: we do not wire-up aria-labelledby when aria-label is provided. By default, aria-labelledby takes
    // precedence. See https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-label#:~:text=aria%2Dlabelledby%20will%20take%20precedence%20over%20aria%2Dlabel%20if%20both%20are%20applied
    <section
      {...rest}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabel ? undefined : (ariaLabelledBy ?? titleId)}
      aria-describedby={ariaDescribedBy ?? descriptionId}
      className={cx(elFormLayout, className)}
    >
      <FormLayoutContext.Provider value={{ titleId, descriptionId }}>{children}</FormLayoutContext.Provider>
    </section>
  )
}

FormLayout.Header = FormLayoutHeader
FormLayout.Title = FormLayoutTitle
FormLayout.Description = FormLayoutDescription
FormLayout.Footer = FormLayoutFooter
