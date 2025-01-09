import React, { FC, LabelHTMLAttributes } from 'react'
import { ElDeprecatedLabel } from './__styles__'

/** @deprecated */
export interface DeprecatedLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

/** @deprecated */
export const DeprecatedLabel: FC<DeprecatedLabelProps> = ({ children, ...rest }) => {
  return <ElDeprecatedLabel {...rest}>{children}</ElDeprecatedLabel>
}
