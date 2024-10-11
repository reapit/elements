import { HTMLAttributes } from 'react'

export interface BaseContainerProps extends HTMLAttributes<HTMLDivElement> {}

export interface MenuGroupContainerProps extends HTMLAttributes<HTMLUListElement> {
  title?: string
}

export interface MenuItemProps extends HTMLAttributes<HTMLLIElement> {}
export interface MenuRadioItemProps extends HTMLAttributes<HTMLLIElement> {
  checked?: boolean
}

type ListType = 'default' | 'radio'

export type MenuItemGroupProps<T extends ListType = 'default' | 'radio'> = T extends 'radio'
  ? {
      items: (MenuItemProps & { label: string; defaultChecked?: boolean })[]
      type: T
      onChange: (selectedItems: string[] | string) => void
      title?: string
    }
  : {
      items: MenuItemProps[]
      type?: 'default'
      title?: string
    }

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  groups: MenuItemGroupProps[]
}
