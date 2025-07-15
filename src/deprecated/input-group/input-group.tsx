import React, { forwardRef } from 'react'
import { ElInputGroup } from './__styles__'
import { Input } from '../input'
import { DeprecatedIcon, IconNames } from '../icon'
import { DeprecatedLabel } from '../label'
import { InputAddOn } from '../input-add-on'
import { Intent } from '../../helpers/intent'
import { useId } from '../../storybook/random-id'
import { InputError } from '../input-error'

/** @deprecated */
export interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: IconNames | null
  label?: string
  inputAddOnText?: string
  hasError?: boolean
  /**
   * This is passed down and added directly to the `Icon` and `InputAddOn`
   *components (if in use)
   */
  intent?: Intent
  /**
   * This gets added to the Input as an ID and the Label as an `htmlFor` prop,
   * so that clicking on the label focusses the input. Generates a random ID if
   * one isn't supplied
   */
  id?: string
  /**
   * Added to the InputGroup `div`
   */
  className?: string
  errorMessage?: string
}

/** @deprecated */
export type InputGroupWrapped = React.ForwardRefExoticComponent<
  InputGroupProps & React.RefAttributes<React.InputHTMLAttributes<HTMLInputElement>>
>

/** @deprecated */
export const InputGroup: InputGroupWrapped = forwardRef(
  (
    { icon, label, className, id, intent, inputAddOnText, children, errorMessage, hasError, ...rest }: InputGroupProps,
    ref: React.ForwardedRef<React.InputHTMLAttributes<HTMLInputElement>>,
  ) => {
    const groupId = useId(id)
    const errorState = Boolean(hasError || errorMessage)

    if (!children)
      return (
        <ElInputGroup className={className}>
          <Input hasError={errorState} id={groupId} {...rest} ref={ref} />
          {icon && <DeprecatedIcon fontSize="1rem" intent={errorState ? 'danger' : intent} icon={icon} />}
          {label && <DeprecatedLabel htmlFor={groupId}>{label}</DeprecatedLabel>}
          {inputAddOnText && <InputAddOn intent={errorState ? 'danger' : intent}>{inputAddOnText}</InputAddOn>}
          {errorMessage && <InputError message={errorMessage} />}
        </ElInputGroup>
      )

    return (
      <ElInputGroup className={className} {...rest}>
        {children}
      </ElInputGroup>
    )
  },
)
