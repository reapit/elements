import { FC, ReactNode, useRef } from 'react'
import { MobileNavItem } from '../mobile-nav-item'
import { MobileNavMenuHeader } from './mobile-nav-menu.atoms'
import { ElMobileNavMenu, ElMobileNavMenuItemGroup } from './styles'
import { useToggleDialogVisibilityEffect } from '../dialog'

interface MobileNavMenuProps {
  isOpen: boolean
  children: ReactNode
  onClose?: VoidFunction
}

export type MobileNavMenuFC = FC<MobileNavMenuProps> & {
  ItemGroup: typeof ElMobileNavMenuItemGroup
  Item: typeof MobileNavItem
  Header: typeof MobileNavMenuHeader
}

const MobileNavMenu: MobileNavMenuFC = ({ children, isOpen, onClose }) => {
  const ref = useRef<HTMLDialogElement>(null)

  useToggleDialogVisibilityEffect({ isOpen, ref, onClose })

  return <ElMobileNavMenu ref={ref}>{children}</ElMobileNavMenu>
}

MobileNavMenu.ItemGroup = ElMobileNavMenuItemGroup
MobileNavMenu.Item = MobileNavItem
MobileNavMenu.Header = MobileNavMenuHeader

export { MobileNavMenu }
