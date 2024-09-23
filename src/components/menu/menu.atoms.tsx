import { FC } from 'react'
import {
  ElMenu,
  ElMenuItemButton,
  ElMenuItemContainer,
  ElMenuItemGroup,
  ElMenuItemGroupTitle,
  ElMenuItemLink,
} from '.'
import { MenuBaseProps, MenuGroupContainerProps, MenuItemButtonProps, MenuItemLinkProps } from './types'
import { cx } from '@linaria/core'

export const MenuContainer: FC<MenuBaseProps> = ({ children, top, ...rest }) => {
  return (
    <ElMenu {...rest} style={{ top }}>
      {children}
    </ElMenu>
  )
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

export const MenuItemGroupTitle: FC<MenuBaseProps> = ({ children, ...rest }) => {
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
