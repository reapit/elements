import { ElTopBarMainNavListItem } from './styles'
import { Menu } from '#src/deprecated/menu'
import { TopBarNavDropdownButton } from '../nav-dropdown-button'

import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface TopBarMainNavMenuListItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  label: string
  maxWidth?: `--size-${string}`
  maxHeight?: `--size-${string}`
}

/**
 * A combination of a `TopBar.NavDropdownButton` and `Menu` that is contained within a list item (`<li>`) for
 * correct semantics and accessibility when used with `TopBar.MainNav`.
 */
export function TopBarMainNavMenuListItem({ children, label, ...rest }: TopBarMainNavMenuListItemProps) {
  return (
    <ElTopBarMainNavListItem>
      <Menu>
        <Menu.Trigger>
          {({ getTriggerProps }) => (
            <TopBarNavDropdownButton {...getTriggerProps(rest)}>{label}</TopBarNavDropdownButton>
          )}
        </Menu.Trigger>
        <Menu.Popover>
          <Menu.List>{children}</Menu.List>
        </Menu.Popover>
      </Menu>
    </ElTopBarMainNavListItem>
  )
}
