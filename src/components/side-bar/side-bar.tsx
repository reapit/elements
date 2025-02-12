import type { FC, HTMLAttributes } from 'react'
import { ElSideBar, ELSideBarMenuList } from './styles'

type SideBarFC = FC<HTMLAttributes<HTMLElement>> & {
  MenuList: typeof ELSideBarMenuList
}

const SideBar: SideBarFC = ({ children, ...props }) => (
  <ElSideBar aria-label="Sidebar Navigation" {...props}>
    {children}
  </ElSideBar>
)

SideBar.MenuList = ELSideBarMenuList

export { SideBar }
