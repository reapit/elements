import type { FC, ReactNode } from 'react'
import { MenuItemContainer, type MenuItemContainerProps } from './menu.atoms'
import { ElMenuItemContent, ElMenuItemIcon, ElMenuItemLabel, elMenuItemLeftIcon } from './styles'

export interface MenuItemProps extends Omit<MenuItemContainerProps, 'children'> {
  label: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export const MenuItem: FC<MenuItemProps> = ({ label, leftIcon, rightIcon, ...props }) => {
  return (
    <MenuItemContainer {...(props as MenuItemContainerProps)}>
      {leftIcon && <ElMenuItemIcon className={elMenuItemLeftIcon}>{leftIcon}</ElMenuItemIcon>}
      <ElMenuItemContent>
        <ElMenuItemLabel>{label}</ElMenuItemLabel>
      </ElMenuItemContent>
      {rightIcon && <ElMenuItemIcon>{rightIcon}</ElMenuItemIcon>}
    </MenuItemContainer>
  )
}
