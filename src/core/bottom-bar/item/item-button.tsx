import { BottomBarItemBase } from './item-base'

import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react'

export namespace BottomBarItemButton {
  export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** The accessible name of the nav icon item. */
    children: ReactNode
    /** Optional badge to be displayed on the nav item */
    hasBadge?: boolean
    /** The nav item's icon. */
    icon: ReactNode
    /** The click handler for the nav item. */
    onClick?: MouseEventHandler<HTMLButtonElement>
  }
}

/**
 * A simple navigation item for use in the Bottom Bar's secondary navigation region. It will typically be used
 * with a `Menu` to facilitate a grouping of related items.
 *
 * **Important:** ⚠️ Typically you will use this component via `BottomBar.MenuItem` as it wraps the button element
 * in a list item (`<li>`) to ensure good semantics and accessibility when used with `BottomBar`.
 */
export function BottomBarItemButton(props: BottomBarItemButton.Props) {
  return <BottomBarItemBase as="button" {...props} />
}

/** @deprecated Use BottomBarItemButton.Props instead */
export type BottomBarItemButtonProps = BottomBarItemButton.Props
