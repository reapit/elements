import React, { FC, HTMLAttributes } from 'react'
import { cx } from '@linaria/core'
import { ElDeprecatedBadge, ElDeprecatedBadgeGroup, ElDeprecatedBadgeGroupInner } from './__styles__'
import { Intent, getIntentClassName } from '../../helpers/intent'

/** @deprecated */
export interface DeprecatedBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  intent?: Intent
}

/** @deprecated */
export const DeprecatedBadge: FC<DeprecatedBadgeProps> = ({ children, intent, className, ...rest }) => (
  <ElDeprecatedBadge role="status" className={cx(className, intent && getIntentClassName(intent))} {...rest}>
    {children}
  </ElDeprecatedBadge>
)

/** @deprecated */
export const DeprecatedBadgeGroup: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
  <ElDeprecatedBadgeGroup className={cx(className)} {...rest}>
    <ElDeprecatedBadgeGroupInner>{children}</ElDeprecatedBadgeGroupInner>
  </ElDeprecatedBadgeGroup>
)
