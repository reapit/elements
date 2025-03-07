import { useState, type FC, type HTMLAttributes } from 'react'
import { SideBarCollapseButton } from '../side-bar-collapse-button'
import { IsSideBarExpandedContext, useIsSideBarExpandedContext } from './is-side-bar-expanded-context'
import { ElSideBar, ELSideBarMenuList } from './styles'

type SideBarFC = FC<HTMLAttributes<HTMLElement>> & {
  CollapseButon: typeof SideBarCollapseButton
  MenuList: FC<HTMLAttributes<HTMLUListElement>>
}

const SideBar: SideBarFC = ({ children, ...props }) => {
  const [isExpanded, setIsExpanded] = useState(true)
  return (
    <IsSideBarExpandedContext.Provider value={{ isExpanded, setIsExpanded }}>
      <ElSideBar aria-label="Sidebar Navigation" {...props}>
        {children}
      </ElSideBar>
    </IsSideBarExpandedContext.Provider>
  )
}

SideBar.MenuList = ({ children }) => {
  const { isExpanded } = useIsSideBarExpandedContext()

  return <ELSideBarMenuList data-is-expanded={isExpanded}>{children}</ELSideBarMenuList>
}

SideBar.CollapseButon = SideBarCollapseButton

export { SideBar }
