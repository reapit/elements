import { BottomBarItemButton } from '../item'
import { ElBottomBarMenuListItem, ElBottomBarMenu } from './styles'
import { Menu } from '../../menu'
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
        <Menu.Trigger>
          {({ getTriggerProps }) => (
            <BottomBarItemButton {...getTriggerProps(rest)} icon={icon}>
              {label}
            </BottomBarItemButton>
          )}
        </Menu.Trigger>
        <Menu.Popover>
          <Menu.List>{children}</Menu.List>
        </Menu.Popover>
      </ElBottomBarMenu>
    </ElBottomBarMenuListItem>
  )
}
