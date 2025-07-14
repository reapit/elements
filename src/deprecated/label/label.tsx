import React, { FC, LabelHTMLAttributes } from 'react'
import { ElDeprecatedLabel } from './__styles__'

/** @deprecated will be replaced by new v5 LabelProps*/
export interface DeprecatedLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

/** @deprecated will be replaced by new v5 Label */
export const DeprecatedLabel: FC<DeprecatedLabelProps> = ({ children, ...rest }) => {
  return <ElDeprecatedLabel {...rest}>{children}</ElDeprecatedLabel>
}
