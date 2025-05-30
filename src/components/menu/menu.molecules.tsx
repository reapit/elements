import type { FC, ReactNode } from 'react'
import { MenuItemContainer, type MenuItemContainerProps } from './menu.atoms'
import {
  ElMenuItemContent,
  ElMenuItemIcon,
  ElMenuItemLabel,
  elMenuItemLeftIcon,
  ElMenuItemSupplementaryInfo,
} from './styles'

export interface MenuItemProps extends Omit<MenuItemContainerProps, 'children'> {
  label: string
  supplementaryInfo?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export const MenuItem: FC<MenuItemProps> = ({ label, supplementaryInfo, leftIcon, rightIcon, ...props }) => {
  return (
    <MenuItemContainer {...(props as MenuItemContainerProps)}>
      {leftIcon && <ElMenuItemIcon className={elMenuItemLeftIcon}>{leftIcon}</ElMenuItemIcon>}
      <ElMenuItemContent>
        <ElMenuItemLabel>{label}</ElMenuItemLabel>
        {supplementaryInfo && <ElMenuItemSupplementaryInfo>{supplementaryInfo}</ElMenuItemSupplementaryInfo>}
      </ElMenuItemContent>
      {rightIcon && <ElMenuItemIcon>{rightIcon}</ElMenuItemIcon>}
    </MenuItemContainer>
  )
}
