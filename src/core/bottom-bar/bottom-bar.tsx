import { BottomBarItemButton } from './item'
import { BottomBarMenuList } from './menu-list'
import { ElBottomBarContainer, ElBottomBarNav } from './styles'
import { useBottomBarObserver } from './use-bottom-bar-observer'

import type { HTMLAttributes, ReactNode, RefObject } from 'react'

export interface BottomBarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The children of the bottom bar
   **/
  children: ReactNode
  /**
   * The reference of the scroll container the bottom bar is rendered within
   *
   * @description see the story for an example
   */
  scrollContainerRef: RefObject<HTMLElement>
}

/**
 * A bottom bar component for use on mobile-first applications or small screen sizes (XS breakpoint).
 * Does not display on SM screens or above. Should only have a maximum of five (5) items. The fifth item can be an
 * overflow menu.
 *
 * **Note:** The `Menu` component does not currently support pinning it's placement above the bottom bar items. It
 * currently only renders above its trigger button if the viewport edge is close by.
 */
export function BottomBar({
  'aria-label': ariaLabel = 'Bottom navigation',
  children,
  scrollContainerRef,
  ...rest
}: BottomBarProps) {
  const isOpen = useBottomBarObserver(scrollContainerRef)

  return (
    <ElBottomBarContainer>
      <ElBottomBarNav {...rest} aria-label={ariaLabel} data-is-open={isOpen}>
        {children}
      </ElBottomBarNav>
    </ElBottomBarContainer>
  )
}

BottomBar.Item = BottomBarMenuList.Item
BottomBar.ItemButton = BottomBarItemButton
BottomBar.MenuItem = BottomBarMenuList.MenuItem
BottomBar.MenuList = BottomBarMenuList
