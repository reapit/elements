import { TopBarNavIconItemBase } from './nav-icon-item-base'

import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react'

export interface TopBarNavIconItemButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** The accessible name of the nav icon item. */
  'aria-label': string
  /** Optional badge to be displayed on the nav item */
  hasBadge?: boolean
  /** The nav item's icon. */
  icon: ReactNode
  /** The click handler for the nav item. */
  onClick: MouseEventHandler<HTMLButtonElement>
}

/**
 * A simple icon-only button for use in the Top Bar's secondary navigation region. It will typically be used
 * with a `Menu` to facilitate a grouping of related items, but it can also be used to launch other kinds of overlays
 * like the product's search experience (as per `TopBar.NavSearchIconButton`).
 *
 * Button-based nav icon items do currently support an "active" state like their anchor-based counterparts.
 *
 * **Important:** ⚠️ This component should rarely be used directly. Instead, use `TopBar.NavIconMenuItem` as it wraps
 * the item in a list item (`<li>`) to ensure good semantics and accessibility when used with `SideBar.SecondaryNav`.
 */
export function TopBarNavIconItemButton(props: TopBarNavIconItemButtonProps) {
  return <TopBarNavIconItemBase as="button" {...props} />
}
