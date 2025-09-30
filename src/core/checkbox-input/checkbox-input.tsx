import { CheckboxIcon } from '#src/icons/checkbox'
import { CheckboxIndeterminateIcon } from '#src/icons/checkbox-indeterminate'
import { CheckboxSelectedIcon } from '#src/icons/checkbox-selected'
import { ElCheckboxInput, ElCheckboxInputContainer, elCheckboxInputIcon } from './styles'
import { forwardRef } from 'react'

import type { InputHTMLAttributes } from 'react'

export namespace CheckboxInput {
  export interface Props extends InputHTMLAttributes<HTMLInputElement> {
    /**
     * Whether the select has been touched, meaning it has received focus, then been blurred. The select
     * must be touched for it's validity to be visually communicated.
     */
    isTouched?: boolean
    /** The type of input. If supplied, it must be "checkbox". */
    type?: 'checkbox'
  }
}

/** @deprecated use InputCheckbox.Props instead */
export type CheckboxInputProps = CheckboxInput.Props

/**
 * A basic `<input type="checkbox">` component. Used internally by `Input`; not intended for direct use.
 */
export const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInput.Props>(
  ({ className, isTouched, style, type = 'checkbox', ...rest }, ref) => {
    return (
      // Consumer-supplied class names and inline styles are applied to the root "container" element,
      // not the input. This is because we don't want consumers to _easily_ override the input's styles
      // as they're specific to the correct functioning of the component.
      <ElCheckboxInputContainer className={className} style={style}>
        <ElCheckboxInput {...rest} data-is-touched={!!isTouched} ref={ref} type={type} />
        <CheckboxIndeterminateIcon aria-hidden className={elCheckboxInputIcon} data-show-when="indeterminate" />
        <CheckboxSelectedIcon aria-hidden className={elCheckboxInputIcon} data-show-when="checked" />
        <CheckboxIcon aria-hidden className={elCheckboxInputIcon} data-show-when="unchecked" />
      </ElCheckboxInputContainer>
    )
  },
)

CheckboxInput.displayName = 'CheckboxInput'
