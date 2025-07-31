import { ElTopBarSecondaryNavListItem } from './styles'
import { Menu } from '#src/core/menu'
import { TopBarNavIconItemButton } from '../nav-icon-item/nav-icon-item-button'
import { useId } from 'react'

import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface TopBarSecondaryNavMenuListItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
  id,
  ...rest
}: TopBarSecondaryNavMenuListItemProps) {
  const triggerId = id ?? useId()
  const menuId = useId()

  return (
    <ElTopBarSecondaryNavListItem>
      <TopBarNavIconItemButton
        {...rest}
        {...Menu.getMenuTriggerProps({ id: triggerId, popoverTarget: menuId, popoverTargetAction: 'toggle' })}
        aria-label={ariaLabel}
        icon={icon}
      />
      <Menu aria-labelledby={triggerId} id={menuId} placement="bottom-end">
        {children}
      </Menu>
    </ElTopBarSecondaryNavListItem>
  )
}
