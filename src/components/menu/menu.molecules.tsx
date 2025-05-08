import type { FC } from 'react'
import { MenuItemContainer, type MenuItemContainerProps } from './menu.atoms'
import { ElMenuItemContent, ElMenuItemLabel } from './styles'

interface MenuItemProps extends Omit<MenuItemContainerProps, 'children'> {
  label?: string
}

export const MenuItem: FC<MenuItemProps> = ({ label, ...props }) => {
  return (
    <MenuItemContainer {...(props as MenuItemContainerProps)}>
      <ElMenuItemContent>
        <ElMenuItemLabel>{label}</ElMenuItemLabel>
      </ElMenuItemContent>
    </MenuItemContainer>
  )
}
