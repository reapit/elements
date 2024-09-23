import { HTMLAttributes } from 'react'
import { Intent } from '../../helpers/intent'
import { ButtonProps } from '../button'
import { IconNames } from '../icon'
import { MenuItemProps } from '../menu/types'

export interface MenuButtonContainerBaseProps extends HTMLAttributes<HTMLDivElement> {}
export interface MenuButtonBaseProps extends HTMLAttributes<HTMLDivElement> {}

export interface MenuTogglerButtonProps extends ButtonProps {
  label: string
  isExpanded: boolean
  onClick: VoidFunction
  hasBorder?: boolean
  intent?: Intent
  icon?: IconNames
}

export interface MenuButtonProps extends Pick<MenuTogglerButtonProps, 'label' | 'intent' | 'icon' | 'hasBorder'> {
  menuGroups: {
    items: MenuItemProps[]
    title?: string
    intent?: Intent
  }[]
  top?: number
  alignment?: 'left' | 'right'
}

export interface MenuButtonMenuProps extends HTMLAttributes<HTMLDivElement> {
  top?: number
}
