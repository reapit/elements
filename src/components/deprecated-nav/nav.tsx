import React, { AnchorHTMLAttributes, HTMLAttributes, FC } from 'react'
import { cx } from '@linaria/core'
import {
  ElDeprecatedNavContainer,
  ElDeprecatedNavItem,
  elDeprecatedNavItemSecondary,
  ElDeprecatedNavSubContainer,
  ElDeprecatedNavSubItem,
} from './__styles__'

/** @deprecated will be replaced by new v5 Navigation components props */
export interface DeprecatedNavItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  isSecondary?: boolean
}

/** @deprecated will be replaced by new v5 Navigation components props */
export interface DeprecatedNavProps extends HTMLAttributes<HTMLDivElement> {}

/** @deprecated will be replaced by new v5 Navigation components */
export const DeprecatedNavItem: FC<DeprecatedNavItemProps> = ({ isSecondary, children, className, ...rest }) => {
  const combinedClasses = cx(isSecondary && elDeprecatedNavItemSecondary, className)

  return (
    <ElDeprecatedNavItem className={combinedClasses} {...rest}>
      {children}
    </ElDeprecatedNavItem>
  )
}

/** @deprecated will be replaced by new v5 Navigation components */
export const DeprecatedNav: FC<DeprecatedNavProps> = ({ children, ...rest }) => (
  <ElDeprecatedNavContainer {...rest}>{children}</ElDeprecatedNavContainer>
)

/** @deprecated will be replaced by new v5 Navigation components */
export const DeprecatedNavSubNavItem: FC<DeprecatedNavItemProps> = ({ children, ...rest }) => (
  <ElDeprecatedNavSubItem {...rest}>{children}</ElDeprecatedNavSubItem>
)

/** @deprecated will be replaced by new v5 Navigation components */
export const DeprecatedNavSubNav: FC<DeprecatedNavProps> = ({ children, ...rest }) => (
  <ElDeprecatedNavSubContainer {...rest}>{children}</ElDeprecatedNavSubContainer>
)
