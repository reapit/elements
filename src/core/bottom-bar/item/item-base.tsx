import { cx } from '@linaria/core'
import { ElBottomBarItemBadge, ElBottomBarItemIcon, ElBottomBarItemLabel, elBottomBarItem } from './styles'

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

interface BottomBarItemCommonProps {
  hasBadge?: boolean
  icon: ReactNode
}

export interface BottomBarItemAsAnchorProps extends BottomBarItemCommonProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  as: 'a'
  children: ReactNode
}

export interface BottomBarItemAsButtonProps extends BottomBarItemCommonProps, ButtonHTMLAttributes<HTMLButtonElement> {
  as: 'button'
  children: ReactNode
}

export type BottomBarItemBaseProps = BottomBarItemAsAnchorProps | BottomBarItemAsButtonProps

/**
 * A simple polymorphic item that can render as a button or link. It is used internally by the `BottomBar.ItemAnchor`
 * and `BottomBar.ItemButton` components and should not be used directly by consumers.
 */
export function BottomBarItemBase({
  as: Element,
  children,
  className,
  icon,
  hasBadge,
  ...rest
}: BottomBarItemBaseProps) {
  return (
    // NOTE: We use a type assertion here to avoid having to narrow the type of `rest` to the specific `Element` type.
    <Element {...(rest as HTMLAttributes<HTMLElement>)} className={cx(elBottomBarItem, className)}>
      <ElBottomBarItemIcon aria-hidden="true">
        {hasBadge && <ElBottomBarItemBadge />}
        {icon}
      </ElBottomBarItemIcon>
      <ElBottomBarItemLabel>{children}</ElBottomBarItemLabel>
    </Element>
  )
}
