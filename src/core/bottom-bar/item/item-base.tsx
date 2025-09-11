import { cx } from '@linaria/core'
import { ElBottomBarItemBadge, ElBottomBarItemIcon, ElBottomBarItemLabel, elBottomBarItem } from './styles'

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

export namespace BottomBarItemBase {
  interface CommonProps {
    hasBadge?: boolean
    icon: ReactNode
  }

  export interface AsAnchorProps extends CommonProps, AnchorHTMLAttributes<HTMLAnchorElement> {
    as: 'a'
    children: ReactNode
  }

  export interface AsButtonProps extends CommonProps, ButtonHTMLAttributes<HTMLButtonElement> {
    as: 'button'
    children: ReactNode
  }

  export type Props = AsAnchorProps | AsButtonProps
}

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
}: BottomBarItemBase.Props) {
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

/** @deprecated Use BottomBarItemBase.AsAnchorProps instead */
export type BottomBarItemAsAnchorProps = BottomBarItemBase.AsAnchorProps

/** @deprecated Use BottomBarItemBase.AsButtonProps instead */
export type BottomBarItemAsButtonProps = BottomBarItemBase.AsButtonProps

/** @deprecated Use BottomBarItemBase.Props instead */
export type BottomBarItemBaseProps = BottomBarItemBase.Props
