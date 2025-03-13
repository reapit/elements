import { useState, type FC, type ReactNode } from 'react'
import { Icon } from '../icon'
import { useIsSideBarExpandedContext } from '../side-bar/is-side-bar-expanded-context'
import {
  IsSideBarMenuGroupExpandedContext,
  useIsSideBarMenuGroupExpandedContext,
} from './is-side-bar-menu-group-expanded-context'
import {
  elDropdownIcon,
  ElSideBarMenuGroupItemTrigger,
  ElSideBarMenuGroup,
  ElSideBarMenuGroupTriggerIcon,
  ElSideBarMenuGroupItemText,
  ElSideBarMenuGroupList,
} from './styles'

interface SideBarMenuGroupItemProps {
  icon: ReactNode
  isActive?: boolean
  children: ReactNode
}

export const SideBarMenuGroupItemTrigger: FC<SideBarMenuGroupItemProps> = ({ icon, isActive, children }) => {
  const { isExpanded: isSideBarExpanded, setIsExpanded: setIsSideBarExpanded } = useIsSideBarExpandedContext()
  const { isExpanded, setIsExpanded } = useIsSideBarMenuGroupExpandedContext()

  const handleClick = () => {
    setIsSideBarExpanded(true)
    // always open menu when SideBar is not expanded otherwise do toggle
    setIsExpanded(!isSideBarExpanded ? true : !isExpanded)
  }

  return (
    <ElSideBarMenuGroupItemTrigger
      aria-current={isActive ? 'page' : undefined}
      data-expanded={isExpanded}
      onClick={handleClick}
      data-expandable="true"
    >
      <ElSideBarMenuGroupTriggerIcon>{icon}</ElSideBarMenuGroupTriggerIcon>
      {isSideBarExpanded && (
        <>
          <ElSideBarMenuGroupItemText>{children}</ElSideBarMenuGroupItemText>
          {isExpanded ? (
            <Icon className={elDropdownIcon} icon="chevronUp" />
          ) : (
            <Icon className={elDropdownIcon} icon="chevronDown" />
          )}
        </>
      )}
    </ElSideBarMenuGroupItemTrigger>
  )
}

interface SideBarMenuGroupContainerProps {
  children: ReactNode
  isActive?: boolean
}
export const SideBarMenuGroupContainer: FC<SideBarMenuGroupContainerProps> = ({ children, isActive = false }) => {
  const [isExpanded, setIsExpanded] = useState(isActive)

  return (
    <IsSideBarMenuGroupExpandedContext.Provider value={{ isExpanded, setIsExpanded }}>
      <ElSideBarMenuGroup>{children}</ElSideBarMenuGroup>
    </IsSideBarMenuGroupExpandedContext.Provider>
  )
}

export const SideBarMenuGroupList: FC<{ children: ReactNode }> = ({ children }) => {
  const { isExpanded } = useIsSideBarMenuGroupExpandedContext()
  const { isExpanded: isSideBarExpanded } = useIsSideBarExpandedContext()

  if (!isExpanded || !isSideBarExpanded) return null
  return <ElSideBarMenuGroupList>{children}</ElSideBarMenuGroupList>
}
