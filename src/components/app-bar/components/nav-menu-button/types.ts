import { HTMLAttributes } from 'react'
import { IconNames } from '../../../icon'
import { MenuItemProps } from '../../../menu'

export interface NavMenuButtonContainerBaseProps extends HTMLAttributes<HTMLDivElement> {}

export interface NavMenuTogglerButtonProps extends HTMLAttributes<HTMLButtonElement> {
  label: string
  isExpanded: boolean
  onClick: VoidFunction
  icon?: IconNames
}

export interface NavMenuButtonProps extends Pick<NavMenuTogglerButtonProps, 'label' | 'icon'> {
  menuGroups: {
    items: MenuItemProps[]
    title?: string
  }[]
  alignment?: 'left' | 'right'
}
