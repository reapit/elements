import { FC } from 'react'
import { ElMenu, ElMenuItemContainer, ElMenuItemGroup, ElMenuItemGroupTitle, ElMenuRadioItem } from './styles'
import { BaseContainerProps, MenuGroupContainerProps, MenuItemProps, MenuRadioItemProps } from './types'
import { Icon } from '../icon'

export const MenuContainer: FC<BaseContainerProps> = ElMenu

export const MenuItem: FC<MenuItemProps> = ElMenuItemContainer

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

export const MenuRadioItem: FC<MenuRadioItemProps> = ({ children, checked, ...rest }) => {
  return (
    <ElMenuRadioItem role="option" aria-selected={checked} data-selected={checked} {...rest}>
      {checked && <Icon intent="primary" icon="check" aria-hidden="true" />}
      {children}
    </ElMenuRadioItem>
  )
}
