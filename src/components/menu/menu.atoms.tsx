import { FC } from 'react'
import { ElMenu, ElMenuItemGroup, ElMenuItemGroupTitle } from '.'
import { BaseContainerProps, MenuGroupContainerProps } from './types'

export const MenuContainer: FC<BaseContainerProps> = ({ children, ...rest }) => {
  return <ElMenu {...rest}>{children}</ElMenu>
}

export const MenuItemGroupTitle: FC<BaseContainerProps> = ({ children, ...rest }) => {
  return (
    <li>
      <ElMenuItemGroupTitle {...rest}>{children}</ElMenuItemGroupTitle>
    </li>
  )
}

export const MenuItemGroup: FC<MenuGroupContainerProps> = ({ children, title, ...rest }) => {
  return (
    <ElMenuItemGroup {...rest}>
      {!!title && <MenuItemGroupTitle>{title}</MenuItemGroupTitle>}
      {children}
    </ElMenuItemGroup>
  )
}
