import { HTMLAttributes } from 'react'
import { Intent } from '../../helpers/intent'

export interface BaseContainerProps extends HTMLAttributes<HTMLDivElement> {}

export interface MenuGroupContainerProps extends HTMLAttributes<HTMLUListElement> {
  title?: string
}
export interface MenuItemProps extends HTMLAttributes<HTMLLIElement> {}

export type MenuItemGroupProps = {
  title?: string
  items: MenuItemProps[]
  intent?: Intent
}

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  groups: MenuItemGroupProps[]
}
