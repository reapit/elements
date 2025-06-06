import type { FC, ReactNode } from 'react'
import { MenuItemContainer, type MenuItemContainerProps } from './menu.atoms'
import {
  ElMenuItemContent,
  ElMenuItemIcon,
  ElMenuItemLabel,
  ElMenuItemLabelContainer,
  elMenuItemLeftIcon,
  ElMenuItemSupplementaryInfo,
} from './styles'

export interface MenuItemProps extends Omit<MenuItemContainerProps, 'children'> {
  label: string
  supplementaryInfo?: string
  badge?: ReactNode
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export const MenuItem: FC<MenuItemProps> = ({ label, supplementaryInfo, badge, leftIcon, rightIcon, ...props }) => {
  return (
    <MenuItemContainer {...(props as MenuItemContainerProps)}>
      {leftIcon && <ElMenuItemIcon className={elMenuItemLeftIcon}>{leftIcon}</ElMenuItemIcon>}
      <ElMenuItemContent>
        <ElMenuItemLabelContainer>
          <ElMenuItemLabel>{label}</ElMenuItemLabel>
          {badge}
        </ElMenuItemLabelContainer>
        {supplementaryInfo && <ElMenuItemSupplementaryInfo>{supplementaryInfo}</ElMenuItemSupplementaryInfo>}
      </ElMenuItemContent>
      {rightIcon && <ElMenuItemIcon>{rightIcon}</ElMenuItemIcon>}
    </MenuItemContainer>
  )
}
