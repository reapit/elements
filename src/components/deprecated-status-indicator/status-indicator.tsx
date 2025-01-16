import React, { FC, HTMLAttributes } from 'react'
import { cx } from '@linaria/core'
import { elDeprecatedShapeTag, ElDeprecatedStatusIndicator } from './__styles__'
import { Intent, getIntentClassName } from '../../helpers/intent'

/**
 * replaced with StatusIndicatorProps
 * @deprecated
 */
export interface DeprecatedStatusIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  intent?: Intent
  shape?: 'circle' | 'tag'
}

/**
 * replaced with StatusIndicator
 * @deprecated
 */
export const DeprecatedStatusIndicator: FC<DeprecatedStatusIndicatorProps> = ({
  intent = 'primary',
  shape,
  className,
  ...rest
}) => (
  <ElDeprecatedStatusIndicator
    className={cx(intent && getIntentClassName(intent), shape && shape === 'tag' && elDeprecatedShapeTag, className)}
    {...rest}
  />
)
