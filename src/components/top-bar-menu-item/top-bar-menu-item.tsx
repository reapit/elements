import type { FC, MouseEventHandler, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

import {
  ElTopBarMenuItemAnchor,
  ElTopBarMenuItemBadge,
  ElTopBarMenuItemButton,
  ElTopBarMenuItemListItem,
} from './styles'

type CommonTopBarMenuItemProps = {
  label: string
  isActive?: boolean
  hasBadge?: boolean
}

interface TopBarMenuItemAsButtonElementProps
  extends CommonTopBarMenuItemProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: MouseEventHandler<HTMLButtonElement>
  href?: never
  children?: never
}

interface TopBarMenuItemAsAnchorElementProps
  extends CommonTopBarMenuItemProps,
    AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  onClick?: never
  children?: never
}

export type TopBarMenuItemProps = TopBarMenuItemAsButtonElementProps | TopBarMenuItemAsAnchorElementProps

const isTopBarMenuItemButtonElement = (props: TopBarMenuItemProps): props is TopBarMenuItemAsButtonElementProps => {
  return 'onClick' in props
}

export const TopBarMenuItem: FC<TopBarMenuItemProps> = (props) => {
  if (isTopBarMenuItemButtonElement(props)) {
    const { isActive, label, hasBadge, 'aria-label': ariaLabel, ...rest } = props ?? {}

    return (
      <ElTopBarMenuItemListItem>
        <ElTopBarMenuItemButton {...rest} aria-label={ariaLabel ?? label} aria-current={isActive ? 'true' : undefined}>
          {label}
          {hasBadge && <ElTopBarMenuItemBadge />}
        </ElTopBarMenuItemButton>
      </ElTopBarMenuItemListItem>
    )
  } else {
    const { isActive, label, hasBadge, 'aria-label': ariaLabel, ...rest } = props ?? {}

    return (
      <ElTopBarMenuItemListItem>
        <ElTopBarMenuItemAnchor {...rest} aria-label={ariaLabel ?? label} aria-current={isActive ? 'page' : undefined}>
          {label}
          {hasBadge && <ElTopBarMenuItemBadge />}
        </ElTopBarMenuItemAnchor>
      </ElTopBarMenuItemListItem>
    )
  }
}
