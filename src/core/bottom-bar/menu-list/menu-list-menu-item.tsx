import { BottomBarItemButton } from '../item'
import { ElBottomBarMenuListItem, ElBottomBarMenu } from './styles'
import { DeprecatedMenu } from '#src/deprecated/menu'
import { MoreIcon } from '#src/icons/more'

import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface BottomBarMenuListItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  icon?: ReactNode
  label?: string
  maxWidth?: `--size-${string}`
  maxHeight?: `--size-${string}`
}

/**
 * A combination of a `BottomBar.ItemButton` and `Menu` that is contained within a list item (`<li>`) for
 * correct semantics and accessibility when used with `BottomBar.MenuList`.
 *
 * All props are passed through to `BottomBar.ItemButton`.
 */
export function BottomBarMenuListItem({
  children,
  icon = <MoreIcon />,
  label = 'More',
  ...rest
}: BottomBarMenuListItemProps) {
  return (
    <ElBottomBarMenuListItem>
      <ElBottomBarMenu data-alignment="right">
        <DeprecatedMenu.Trigger>
          {({ getTriggerProps }) => (
            <BottomBarItemButton {...getTriggerProps(rest)} icon={icon}>
              {label}
            </BottomBarItemButton>
          )}
        </DeprecatedMenu.Trigger>
        <DeprecatedMenu.Popover>
          <DeprecatedMenu.List>{children}</DeprecatedMenu.List>
        </DeprecatedMenu.Popover>
      </ElBottomBarMenu>
    </ElBottomBarMenuListItem>
  )
}
