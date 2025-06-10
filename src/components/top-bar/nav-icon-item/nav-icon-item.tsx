import { TopBarNavIconItemButton } from './nav-icon-item-button'
import { TopBarNavIconItemAnchor } from './nav-icon-item-anchor'

import type { TopBarNavIconItemButtonProps } from './nav-icon-item-button'
import type { TopBarNavIconItemAnchorProps } from './nav-icon-item-anchor'

export interface TopBarNavIconItemAsButtonProps extends TopBarNavIconItemButtonProps {
  as: 'button'
}

export interface TopBarNavIconItemAsAnchorProps extends TopBarNavIconItemAnchorProps {
  as?: 'a'
}

export type TopBarNavIconItemProps = TopBarNavIconItemAsButtonProps | TopBarNavIconItemAsAnchorProps

/**
 * A simple icon-only navigation item for use in the Top Bar's secondary navigation region. It
 * can be rendered as a button or an link depending on the desired behaviour. Links should be
 * preferred over buttons where possible, especially when navigating to a new page in the product.
 *
 * Typically, a button will be used when the item has a dropdown menu.
 *
 * **Important:** ⚠️ This component should rarely be used directly. Instead, use `TopBar.NavIconItem` as it wraps the
 * item in a list item (`<li>`) to ensure good semantics and accessibility when used with `SideBar.SecondaryNav`.
 *
 * To integrate this component with React Router, simply wrap `TopBar.NavIconItem`. For example, with React Router 6,
 * you would do:
 *
 * ```tsx
 * function MyTopBarNavIconItem({ to, ...rest}) {
 *   const href = useHref(to)
 *   const isCurrentPage = useMatch(to)
 *   return (
 *     <TopBar.NavIconItem {...rest} aria-current={isCurrentPage ? 'page' : false} as="a" href={href} />
 *   )
 * }
 * ```
 */
export function TopBarNavIconItem(props: TopBarNavIconItemProps) {
  if (props.as === 'button') {
    return <TopBarNavIconItemButton {...props} />
  }
  return <TopBarNavIconItemAnchor {...props} />
}
