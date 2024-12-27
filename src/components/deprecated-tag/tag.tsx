import React, { FC, HTMLAttributes } from 'react'
import { cx } from '@linaria/core'
import { ElDeprecatedTag, ElDeprecatedTagGroup, ElDeprecatedTagGroupInner } from './__styles__'
import { Intent, getIntentClassName } from '../../helpers/intent'

/** @deprecated will be replaced by new v5 TagProps */
export interface DeprecatedTagProps extends HTMLAttributes<HTMLSpanElement> {
  intent?: Intent
}

/** @deprecated will be replaced by new v5 Tag */
export const DeprecatedTag: FC<DeprecatedTagProps> = ({ intent = 'primary', children, className, ...rest }) => (
  <ElDeprecatedTag className={cx(intent && getIntentClassName(intent), className)} {...rest}>
    {children}
  </ElDeprecatedTag>
)

/** @deprecated will be replaced by new v5 TagGroup */
export const DeprecatedTagGroup: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
  <ElDeprecatedTagGroup className={cx(className)} {...rest}>
    <ElDeprecatedTagGroupInner>{children}</ElDeprecatedTagGroupInner>
  </ElDeprecatedTagGroup>
)
