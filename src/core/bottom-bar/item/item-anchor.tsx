import { BottomBarItemBase } from './item-base'

import type { AnchorHTMLAttributes, ReactNode } from 'react'

export namespace BottomBarItemAnchor {
  export interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    /** Whether the item represents the current page. */
    'aria-current': 'page' | false
    /** The visible name of the item. */
    children: string
    /** Optional badge to be displayed on the nav item */
    hasBadge?: boolean
    /** The URL to navigate to when the item is clicked. */
    href: string
    /** The item's icon. */
    icon: ReactNode
  }
}

/**
 * A simple navigation item for use in the Bottom Bar's secondary navigation region. Is always an anchor element
 * because Bottom Bar navigation items should always navigate users to another page in the product.
 *
 * **Important:** ⚠️ Typically you will use this component via `BottomBar.Item` as it wraps the anchor element in a
 * list item (`<li>`) to ensure good semantics and accessibility when used with `BottomBar`.
 */
export function BottomBarItemAnchor(props: BottomBarItemAnchor.Props) {
  return <BottomBarItemBase {...props} as="a" />
}
