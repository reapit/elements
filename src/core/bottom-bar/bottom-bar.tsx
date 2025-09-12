import { BottomBarContext, useBottomBarContext } from './context'
import { BottomBarItemButton } from './item'
import { BottomBarMenuList } from './menu-list'
import { ElBottomBarContainer, ElBottomBarNav } from './styles'
import { useBottomBarObserver } from './use-bottom-bar-observer'

import type { HTMLAttributes, ReactNode, RefObject } from 'react'

export namespace BottomBar {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
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
}

/**
 * A bottom bar component for use on mobile-first applications or small screen sizes (XS breakpoint).
 * Does not display on SM screens or above. Should only have a maximum of five (5) items. The fifth item can be an
 * overflow menu.
 */
export function BottomBar({
  'aria-label': ariaLabel = 'Bottom navigation',
  children,
  scrollContainerRef,
  ...rest
}: BottomBar.Props) {
  const isOpen = useBottomBarObserver(scrollContainerRef)

  return (
    <ElBottomBarContainer>
      <ElBottomBarNav {...rest} aria-label={ariaLabel} data-is-open={isOpen}>
        <BottomBarContext.Provider value={{ isOpen }}>{children}</BottomBarContext.Provider>
      </ElBottomBarNav>
    </ElBottomBarContainer>
  )
}

BottomBar.Item = BottomBarMenuList.Item
BottomBar.ItemButton = BottomBarItemButton
BottomBar.MenuItem = BottomBarMenuList.MenuItem
BottomBar.MenuList = BottomBarMenuList

BottomBar.Context = BottomBarContext
BottomBar.useContext = useBottomBarContext

/** @deprecated Use BottomBar.Props instead */
export type BottomBarProps = BottomBar.Props
