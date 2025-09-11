import { TopBarNavIconItemBase } from './nav-icon-item-base'

import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react'

export namespace TopBarNavIconItemButton {
  export interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    /** The accessible name of the nav icon item. */
    'aria-label': string
    /** Optional badge to be displayed on the nav item */
    hasBadge?: boolean
    /** The nav item's icon. */
    icon: ReactNode
    /** The click handler for the nav item. */
    onClick?: MouseEventHandler<HTMLButtonElement>
  }
}

/** @deprecated Use TopBarNavIconItemButton.Props instead */
export type TopBarNavIconItemButtonProps = TopBarNavIconItemButton.Props

/**
 * A simple icon-only button for use in the Top Bar's secondary navigation region. It will typically be used
 * with a `Menu` to facilitate a grouping of related items, but it can also be used to launch other kinds of overlays
 * like the product's search experience (as per `TopBar.NavSearchIconButton`).
 *
 * Button-based nav icon items do currently support an "active" state like their anchor-based counterparts.
 *
 * **Important:** ⚠️ Ensure you use this component via `TopBar.NavIconMenuItem` as it wraps the button element in a
 * list item (`<li>`) to ensure good semantics and accessibility when used with `TopBar.SecondaryNav`.
 */
export function TopBarNavIconItemButton(props: TopBarNavIconItemButton.Props) {
  return <TopBarNavIconItemBase as="button" {...props} />
}
