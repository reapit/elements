import { HTMLAttributes } from 'react'
import { MenuItemProps } from '../menu/types'
import { ButtonGroupAlignment, ButtonProps } from '../button'
import { Intent } from '../../helpers/intent'
import { IconNames } from '../icon'

export interface MenuButtonContainerBaseProps extends HTMLAttributes<HTMLDivElement> {}
export interface MenuButtonBaseProps extends HTMLAttributes<HTMLDivElement> {}
export interface MenuLinkBaseProps extends HTMLAttributes<HTMLAnchorElement> {}

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
    alignment?: ButtonGroupAlignment
    intent?: Intent
  }[]
  top?: number
}
