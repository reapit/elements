import { CheckboxIcon } from '#src/icons/checkbox'
import { CheckboxIndeterminateIcon } from '#src/icons/checkbox-indeterminate'
import { CheckboxSelectedIcon } from '#src/icons/checkbox-selected'
import { ElInputCheckbox, ElInputCheckboxContainer, elInputCheckboxIcon } from './styles'
import { forwardRef } from 'react'

import type { InputHTMLAttributes } from 'react'

// NOTE: we omit...
// - type, because this should always be a checkbox-type input.
type AttributesToOmit = 'type'

export namespace InputCheckbox {
  export interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, AttributesToOmit> {}
}

// Backward compatibility
export type CheckboxInputProps = InputCheckbox.Props

/**
 * A basic `<input type="checkbox">` component. Used internally by `Input`; not intended for direct use.
 */
export const InputCheckbox = forwardRef<HTMLInputElement, InputCheckbox.Props>(({ className, style, ...rest }, ref) => {
  return (
    // Consumer-supplied class names and inline styles are applied to the root "container" element,
    // not the input. This is because we don't want consumers to _easily_ override the input's styles
    // as they're specific to the correct functioning of the component.
    <ElInputCheckboxContainer className={className} style={style}>
      <ElInputCheckbox {...rest} ref={ref} type="checkbox" />
      <CheckboxIndeterminateIcon aria-hidden className={elInputCheckboxIcon} data-show-when="indeterminate" />
      <CheckboxSelectedIcon aria-hidden className={elInputCheckboxIcon} data-show-when="checked" />
      <CheckboxIcon aria-hidden className={elInputCheckboxIcon} data-show-when="unchecked" />
    </ElInputCheckboxContainer>
  )
})

InputCheckbox.displayName = 'CheckboxInput'
