import React, { forwardRef, LegacyRef } from 'react'
import { ElSelect } from './__styles__'

/** @deprecated */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

/** @deprecated */
export type SelectWrapped = React.ForwardRefExoticComponent<
  SelectProps & React.RefAttributes<React.SelectHTMLAttributes<HTMLSelectElement>>
>

/** @deprecated */
export const Select: SelectWrapped = forwardRef(
  ({ children, ...rest }, ref: React.ForwardedRef<React.SelectHTMLAttributes<HTMLSelectElement>>) => {
    return (
      <ElSelect
        aria-label="Select an item from the dropdown list"
        {...rest}
        ref={ref as unknown as LegacyRef<HTMLSelectElement>}
      >
        {children}
      </ElSelect>
    )
  },
)
