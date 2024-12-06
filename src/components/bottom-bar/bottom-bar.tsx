import type { FC, HTMLAttributes, ReactNode, RefObject } from 'react'

import { BottomBarItem } from '../bottom-bar-item'

import { ElBottomBar } from './styles'
import { useVerticalScrollDirection } from './use-vertical-scroll-direction'
import { BottomBarMoreMenu, BottomBarMoreMenuItem } from './bottom-bar.atoms'

export interface BottomBarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The children of the bottom bar
   **/
  children: ReactNode

  /**
   * The reference of the parent element that the bottom bar is attached to
   *
   * @description see the story for an example
   */
  parentRef: RefObject<HTMLElement> | null
}

type BottomBarFC = FC<BottomBarProps> & {
  Item: typeof BottomBarItem
  MoreMenu: typeof BottomBarMoreMenu
  MoreMenuItem: typeof BottomBarMoreMenuItem
}

const BottomBar: BottomBarFC = ({ children, parentRef, ...rest }) => {
  const { isScrollTop, isScrollBottom } = useVerticalScrollDirection(parentRef)

  return (
    <ElBottomBar {...rest} data-is-open={isScrollTop ? 'up' : isScrollBottom ? 'down' : undefined}>
      {children}
    </ElBottomBar>
  )
}

BottomBar.Item = BottomBarItem
BottomBar.MoreMenu = BottomBarMoreMenu
BottomBar.MoreMenuItem = BottomBarMoreMenuItem

export { BottomBar }
