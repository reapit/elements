import type { FC, HTMLAttributes, ReactNode, RefObject } from 'react'

import { BottomBarItem } from '../bottom-bar-item'

import { BottomBarMoreMenu, BottomBarMoreMenuItem } from './bottom-bar.atoms'
import { ElBottomBar } from './styles'
import { useBottomBarVisibility } from './use-bottom-bar-visibility'

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
  const { isOpen } = useBottomBarVisibility(parentRef)

  return (
    <ElBottomBar {...rest} data-is-open={isOpen}>
      {children}
    </ElBottomBar>
  )
}

BottomBar.Item = BottomBarItem
BottomBar.MoreMenu = BottomBarMoreMenu
BottomBar.MoreMenuItem = BottomBarMoreMenuItem

export { BottomBar }
