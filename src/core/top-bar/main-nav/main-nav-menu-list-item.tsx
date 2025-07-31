import { ElTopBarMainNavListItem } from './styles'
import { Menu } from '#src/core/menu'
import { TopBarNavDropdownButton } from '../nav-dropdown-button'
import { useId } from 'react'

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
export function TopBarMainNavMenuListItem({ children, id, label, ...rest }: TopBarMainNavMenuListItemProps) {
  const triggerId = id ?? useId()
  const menuId = useId()
  return (
    <ElTopBarMainNavListItem>
      <TopBarNavDropdownButton
        {...rest}
        {...Menu.getMenuTriggerProps({ id: triggerId, popoverTarget: menuId, popoverTargetAction: 'toggle' })}
      >
        {label}
      </TopBarNavDropdownButton>
      <Menu aria-labelledby={triggerId} id={menuId} placement="bottom-end">
        {children}
      </Menu>
    </ElTopBarMainNavListItem>
  )
}
