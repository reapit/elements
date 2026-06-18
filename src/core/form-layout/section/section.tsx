import { cx } from '@linaria/core'
import { useId } from 'react'
import { FormLayoutContext } from '../context'
import { FormLayoutSectionDescription } from './description'
import { FormLayoutSectionHeader } from './header'
import { FormLayoutSectionTitle } from './title'
import { elFormLayoutSection } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace FormLayoutSection {
  export interface HeaderProps extends FormLayoutSectionHeader.Props {}
  export interface TitleProps extends FormLayoutSectionTitle.Props {}
  export interface DescriptionProps extends FormLayoutSectionDescription.Props {}

  export interface Props extends HTMLAttributes<HTMLElement> {
    /** The section content. */
    children?: ReactNode
  }
}

/**
 * A layout container that groups a labelled section within a `FormLayout`. Use
 * `FormLayout.SectionHeader`, `FormLayout.SectionTitle`, and `FormLayout.SectionDescription`
 * to provide a heading and description above the section's form controls.
 */
export function FormLayoutSection({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  children,
  className,
  ...rest
}: FormLayoutSection.Props) {
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
      className={cx(elFormLayoutSection, className)}
    >
      <FormLayoutContext.Provider value={{ titleId, descriptionId }}>{children}</FormLayoutContext.Provider>
    </section>
  )
}

FormLayoutSection.displayName = 'FormLayout.Section'
FormLayoutSection.Header = FormLayoutSectionHeader
FormLayoutSection.Title = FormLayoutSectionTitle
FormLayoutSection.Description = FormLayoutSectionDescription
