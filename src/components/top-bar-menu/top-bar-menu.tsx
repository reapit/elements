import { FC, ReactNode, useRef } from 'react'

import { useToggleDialogVisibilityEffect } from '../dialog'
import { TopBarMenuItem } from '../top-bar-menu-item'
import { TopBarMenuItemGroup } from '../top-bar-menu-item-group'

import { TopBarMenuHeader } from './top-bar-menu.atoms'
import { ElTopBarMenu, ElTopBarMenuBody, ElTopBarMenuList } from './styles'
import { TopBarMenuProvider } from './top-bar-menu-context'

export interface TopBarMenuProps {
  isOpen: boolean
  children: ReactNode
  onClose?: VoidFunction
}

type TopBarMenuFC = FC<TopBarMenuProps> & {
  Header: typeof TopBarMenuHeader
  Body: typeof ElTopBarMenuBody
  List: typeof ElTopBarMenuList
  Group: typeof TopBarMenuItemGroup
  Item: typeof TopBarMenuItem
}

const TopBarMenu: TopBarMenuFC = ({ children, isOpen, onClose }) => {
  const ref = useRef<HTMLDialogElement>(null)

  useToggleDialogVisibilityEffect({ isOpen, ref, onClose })

  return (
    <TopBarMenuProvider onClose={onClose}>
      <ElTopBarMenu ref={ref}>{children}</ElTopBarMenu>
    </TopBarMenuProvider>
  )
}

TopBarMenu.Header = TopBarMenuHeader
TopBarMenu.Body = ElTopBarMenuBody
TopBarMenu.List = ElTopBarMenuList
TopBarMenu.Group = TopBarMenuItemGroup
TopBarMenu.Item = TopBarMenuItem

export { TopBarMenu }
