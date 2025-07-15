import React, { FC, HTMLAttributes } from 'react'
import { cx } from '@linaria/core'
import { ElInputAddOn } from './__styles__'
import { Intent, getIntentClassName } from '../../helpers/intent'

/** @deprecated */
export interface InputAddOnProps extends HTMLAttributes<HTMLSpanElement> {
  intent?: Intent
  className?: string
}

/** @deprecated */
export const InputAddOn: FC<InputAddOnProps> = ({ intent, className, children, ...rest }) => {
  const intentClassName = intent && getIntentClassName(intent)
  const combinedClassName = cx(intentClassName, className)

  return (
    <ElInputAddOn className={combinedClassName} {...rest}>
      {children}
    </ElInputAddOn>
  )
}
