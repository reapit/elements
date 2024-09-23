import { FC } from 'react'
import { ElMenu, ElMenuItemButton, ElMenuItemContainer, ElMenuItemGroup, ElMenuItemGroupTitle, ElMenuItemLink } from '.'
import { MenuProps, MenuGroupContainerProps, MenuItemButtonProps, MenuItemLinkProps } from './types'

export const MenuContainer: FC<MenuProps> = ({ children, ...rest }) => {
  return <ElMenu {...rest}>{children}</ElMenu>
}

export const MenuItemLink: FC<MenuItemLinkProps> = ({ children, ...rest }) => {
  return (
    <ElMenuItemContainer>
      <ElMenuItemLink {...rest}>{children}</ElMenuItemLink>
    </ElMenuItemContainer>
  )
}

export const MenuItemButton: FC<MenuItemButtonProps> = ({ children, ...rest }) => {
  return (
    <ElMenuItemContainer>
      <ElMenuItemButton {...rest}>{children}</ElMenuItemButton>
    </ElMenuItemContainer>
  )
}

export const MenuItemGroupTitle: FC<MenuProps> = ({ children, ...rest }) => {
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
