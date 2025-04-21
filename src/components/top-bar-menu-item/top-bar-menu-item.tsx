import type { FC, MouseEventHandler, AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

import {
  ElTopBarMenuItemAnchor,
  ElTopBarMenuItemBadge,
  ElTopBarMenuItemButton,
  ElTopBarMenuItemListItem,
} from './styles'

type CommonTopBarMenuItemProps = {
  children: ReactNode
  isActive?: boolean
  hasBadge?: boolean
}

interface TopBarMenuItemAsButtonElementProps
  extends CommonTopBarMenuItemProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  onClick: MouseEventHandler<HTMLButtonElement>
  href?: never
}

interface TopBarMenuItemAsAnchorElementProps
  extends CommonTopBarMenuItemProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  href: string
  onClick?: never
}

export type TopBarMenuItemProps = TopBarMenuItemAsButtonElementProps | TopBarMenuItemAsAnchorElementProps

const isTopBarMenuItemButtonElement = (props: TopBarMenuItemProps): props is TopBarMenuItemAsButtonElementProps => {
  return 'onClick' in props
}

export const TopBarMenuItem: FC<TopBarMenuItemProps> = (props) => {
  if (isTopBarMenuItemButtonElement(props)) {
    const { isActive, children, hasBadge, ...rest } = props ?? {}

    return (
      <ElTopBarMenuItemListItem>
        <ElTopBarMenuItemButton {...rest} aria-current={isActive ? 'true' : undefined}>
          {children}
          {hasBadge && <ElTopBarMenuItemBadge />}
        </ElTopBarMenuItemButton>
      </ElTopBarMenuItemListItem>
    )
  } else {
    const { isActive, children, hasBadge, ...rest } = props ?? {}

    return (
      <ElTopBarMenuItemListItem>
        <ElTopBarMenuItemAnchor {...rest} aria-current={isActive ? 'page' : undefined}>
          {children}
          {hasBadge && <ElTopBarMenuItemBadge />}
        </ElTopBarMenuItemAnchor>
      </ElTopBarMenuItemListItem>
    )
  }
}
