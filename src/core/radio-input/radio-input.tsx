import { RadioIcon } from '#src/icons/radio'
import { RadioSelectedIcon } from '#src/icons/radio-selected'
import { ElRadioInput, ElRadioInputContainer, elRadioInputIcon } from './styles'
import { forwardRef } from 'react'

import type { InputHTMLAttributes } from 'react'

// NOTE: We omit...
// - size, because we don't support it for radio buttons
type AttributesToOmit = 'size'

export namespace RadioInput {
  export interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, AttributesToOmit> {
    /**
     * Whether the control's validity should be visually communicated or not. Typically, validity will only be shown
     * when the control has been touched (i.e. the user has interacted with it).
     */
    showValidity?: boolean
    /** The type of input. If supplied, it must be "radio". */
    type?: 'radio'
  }
}

/** @deprecated use RadioInput.Props instead */
export type RadioInputProps = RadioInput.Props

/**
 * A basic `<input type="radio">` component. Like all input components, the label, help text and error
 * messages are BYO.
 */
export const RadioInput = forwardRef<HTMLInputElement, RadioInput.Props>(
  ({ className, showValidity, style, type = 'radio', ...rest }, ref) => {
    return (
      // Consumer-supplied class names and inline styles are applied to the root "container" element,
      // not the input. This is because we don't want consumers to _easily_ override the input's styles
      // as they're specific to the correct functioning of the component.
      <ElRadioInputContainer className={className} style={style}>
        <ElRadioInput {...rest} data-show-validity={!!showValidity} ref={ref} type={type} />
        <RadioSelectedIcon aria-hidden className={elRadioInputIcon} data-show-when="checked" />
        <RadioIcon aria-hidden className={elRadioInputIcon} data-show-when="unchecked" />
      </ElRadioInputContainer>
    )
  },
)

RadioInput.displayName = 'RadioInput'
