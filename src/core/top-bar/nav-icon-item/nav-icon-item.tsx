import { TopBarNavIconItemBase } from './nav-icon-item-base'

import type { AnchorHTMLAttributes, ReactNode } from 'react'

interface TopBarNavIconItemProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  /** Whether the nav item represents the current page. */
  'aria-current': 'page' | false
  /** The accessible name of the nav icon item. */
  'aria-label': string
  /** Optional badge to be displayed on the nav item */
  hasBadge?: boolean
  /** The URL to navigate to when the nav item is clicked. */
  href: string
  /** The nav item's icon. */
  icon: ReactNode
}

/**
 * A simple icon-only navigation item for use in the Top Bar's secondary navigation region. Is always an anchor
 * element because Top Bar navigation items should always navigate users to another page in the product.
 *
 * **Important:** ⚠️ Ensure you use this component via `TopBar.NavIconItem` as it wraps the anchor element in a list
 * item (`<li>`) to ensure good semantics and accessibility when used with `TopBar.SecondaryNav`.
 *
 * To integrate this component with React Router, simply wrap `TopBar.NavIconItem`. For example, with React Router 6,
 * you would do:
 *
 * ```tsx
 * function MyTopBarNavIconItem({ to, ...rest}) {
 *   const href = useHref(to)
 *   const isCurrentPage = useMatch(to)
 *   return (
 *     <TopBar.NavIconItemAnchor {...rest} aria-current={isCurrentPage ? 'page' : false} as="a" href={href} />
 *   )
 * }
 * ```
 */
export function TopBarNavIconItem(props: TopBarNavIconItemProps) {
  return <TopBarNavIconItemBase {...props} as="a" />
}
