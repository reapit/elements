import React, { FC, HTMLAttributes } from 'react'
import { cx } from '@linaria/core'
import { ElSecondaryNav, ElSecondaryNavItem } from './__styles__'
import { elIsActive } from '../../styles/states'
import { handleKeyboardEvent } from '../../storybook/handle-keyboard-event'

export interface SecondaryNavProps extends HTMLAttributes<HTMLDivElement> {}

export const SecondaryNav: FC<SecondaryNavProps> = ({ children, ...rest }) => {
  return <ElSecondaryNav {...rest}>{children}</ElSecondaryNav>
}

export interface SecondaryNavItemProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean
  className?: string
}

export const SecondaryNavItem: FC<SecondaryNavItemProps> = ({ active, className, onClick, children, ...rest }) => {
  const combinedClassName = cx(className, active && elIsActive)

  return (
    <ElSecondaryNavItem
      className={combinedClassName}
      tabIndex={0}
      role="button"
      onKeyDown={onClick ? handleKeyboardEvent('Enter', onClick as () => void) : undefined}
      onClick={onClick}
      {...rest}
    >
      {children}
    </ElSecondaryNavItem>
  )
}
