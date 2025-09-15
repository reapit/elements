import { BottomBarItemButton } from '../item'
import { ElBottomBarMenuListItem } from './styles'
import { Menu } from '#src/core/menu'
import { MoreIcon } from '#src/icons/more'
import { useBottomBarContext } from '../context'
import { useEffect, useId, useRef } from 'react'

import type { ButtonHTMLAttributes, ReactNode } from 'react'

export namespace BottomBarMenuListItem {
  export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    hasBadge?: boolean
    icon?: ReactNode
    label?: string
    maxWidth?: `--size-${string}`
    maxHeight?: `--size-${string}`
  }
}

/**
 * A combination of a `BottomBar.ItemButton` and `Menu` that is contained within a list item (`<li>`) for
 * correct semantics and accessibility when used with `BottomBar.MenuList`.
 *
 * All props are passed through to `BottomBar.ItemButton`.
 */
export function BottomBarMenuListItem({
  children,
  hasBadge,
  icon = <MoreIcon />,
  id,
  label = 'More',
  maxHeight,
  maxWidth,
  ...rest
}: BottomBarMenuListItem.Props) {
  const menuId = useId()
  const triggerId = id ?? useId()

  const listItemRef = useRef<HTMLLIElement>(null)

  const { isOpen } = useBottomBarContext()

  useEffect(
    function closePopoverWhenBottomBarCloses() {
      // TODO: We are attaching a ref to the list item instead of the menu because we want to avoid the
      // complexity of using `forwardRef` in Menu. Once we're on React 19 and refs are a normal prop, we'll
      // be able to pass a ref directly to Menu without any extra cost.
      //
      // Until then, we simply get the menu element via it's parent.
      const menuElement = listItemRef.current?.lastElementChild

      if (!isOpen && menuElement instanceof HTMLElement) {
        menuElement.hidePopover()
      }
    },
    [isOpen],
  )

  return (
    <ElBottomBarMenuListItem ref={listItemRef}>
      <BottomBarItemButton
        {...rest}
        {...Menu.getTriggerProps({ id: triggerId, popoverTarget: menuId, popoverTargetAction: 'toggle' })}
        hasBadge={hasBadge}
        icon={icon}
      >
        {label}
      </BottomBarItemButton>
      <Menu aria-labelledby={triggerId} id={menuId} maxHeight={maxHeight} maxWidth={maxWidth} placement="top-end">
        {children}
      </Menu>
    </ElBottomBarMenuListItem>
  )
}

BottomBarMenuListItem.displayName = 'BottomBar.MenuItem'
