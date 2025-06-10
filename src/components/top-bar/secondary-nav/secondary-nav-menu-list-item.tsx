import { ElTopBarSecondaryNavListItem } from './styles'
import { Menu } from '../../menu'
import { TopBarNavIconItemButton } from '../nav-icon-item/nav-icon-item-button'

import type { ReactNode } from 'react'

interface TopBarSecondaryNavMenuListItemProps {
  'aria-label': string
  children: ReactNode
  icon: ReactNode
  maxWidth?: `--size-${string}`
  maxHeight?: `--size-${string}`
}

/**
 * A combination of a `TopBarNavIconItemButton` and `Menu` that is contained within a list item (`<li>`) for
 * correct semantics and accessibility when used with `TopBar.SecondaryNav`.
 */
export function TopBarSecondaryNavMenuListItem({
  'aria-label': ariaLabel,
  children,
  icon,
}: TopBarSecondaryNavMenuListItemProps) {
  return (
    <ElTopBarSecondaryNavListItem>
      <Menu>
        <Menu.Trigger>
          {({ getTriggerProps }) => (
            <TopBarNavIconItemButton {...getTriggerProps()} aria-label={ariaLabel} icon={icon} />
          )}
        </Menu.Trigger>
        <Menu.Popover>
          <Menu.List>{children}</Menu.List>
        </Menu.Popover>
      </Menu>
    </ElTopBarSecondaryNavListItem>
  )
}
