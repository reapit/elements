import { HTMLAttributes, HtmlHTMLAttributes } from 'react'
import { Intent } from '../../helpers/intent'

export interface MenuBaseProps extends HTMLAttributes<HTMLDivElement> {
  top?: number
}
export interface MenuGroupContainerProps extends HTMLAttributes<HTMLUListElement> {
  title?: string
}
export interface MenuItemLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string
}
export interface MenuItemButtonProps extends HTMLAttributes<HTMLButtonElement> {}

export interface MenuItemProps extends HtmlHTMLAttributes<HTMLAnchorElement | HTMLButtonElement> {
  href?: string
  onClick?: VoidFunction
  intent?: Intent
}

export type MenuItemGroupProps = {
  title?: string
  items: MenuItemProps[]
  intent?: Intent
}

export interface MenuProps extends MenuBaseProps {
  top?: number
  groups?: MenuItemGroupProps[]
  intent?: Intent
}
