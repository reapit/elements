import React, { forwardRef, LegacyRef } from 'react'
import { cx } from '@linaria/core'
import { ElInput, elHasInputError } from './__styles__'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

export type InputWrapped = React.ForwardRefExoticComponent<
  InputProps & React.RefAttributes<React.InputHTMLAttributes<HTMLInputElement>>
>

export const Input: InputWrapped = forwardRef(
  ({ hasError, ...rest }, ref: React.ForwardedRef<React.InputHTMLAttributes<HTMLInputElement>>) => {
    return (
      <ElInput
        className={cx(hasError && elHasInputError)}
        aria-label={`Input type ${rest.type}${rest.type === 'date' ? ' format dd/mm/yyy' : ''}${rest.max ? ` max date of ${rest.max}` : ''}${rest.min ? ` min date of ${rest.min}` : ''}`}
        {...rest}
        ref={ref as unknown as LegacyRef<HTMLInputElement>}
      />
    )
  },
)
