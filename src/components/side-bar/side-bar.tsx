import type { FC, HTMLAttributes } from 'react'
import { SideBarCollapse } from '../side-bar-menu-item'
import { SideBarProvider, useSideBarContext } from './side-bar-context'
import { ElSideBar, ELSideBarMenuList } from './styles'

type SideBarFC = FC<HTMLAttributes<HTMLElement>> & {
  CollapseButon: typeof SideBarCollapse
  MenuList: FC<HTMLAttributes<HTMLUListElement>>
}

const SideBar: SideBarFC = ({ children, ...props }) => (
  <SideBarProvider>
    <ElSideBar aria-label="Sidebar Navigation" {...props}>
      {children}
    </ElSideBar>
  </SideBarProvider>
)

SideBar.MenuList = ({ children }) => {
  const { isOpen } = useSideBarContext()

  return <ELSideBarMenuList data-is-expanded={isOpen}>{children}</ELSideBarMenuList>
}

SideBar.CollapseButon = SideBarCollapse

export { SideBar }
