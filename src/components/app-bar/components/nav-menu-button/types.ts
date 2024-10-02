import { HTMLAttributes } from 'react'
import { MenuItemProps } from '../../../menu/types'
import { IconNames } from '../../../icon'
import { ButtonProps } from '../../../button'

export interface NavMenuButtonContainerBaseProps extends HTMLAttributes<HTMLDivElement> {}
export interface NavMenuButtonBaseProps extends HTMLAttributes<HTMLDivElement> {}

export interface NavMenuTogglerButtonProps extends ButtonProps {
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
  top?: number
  alignment?: 'left' | 'right'
}

export interface NavMenuButtonMenuProps extends HTMLAttributes<HTMLDivElement> {
  top?: number
}
