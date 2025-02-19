import { useSideBarContext } from '../side-bar/side-bar-context'
import {
  ElCollapseIcon,
  ElSideBarCollapseButton,
  ElSideBarCollapseButtonContainer,
  ElSideBarCollapseText,
  elSideBarMenuItemAnchor,
} from './styles'

export const SideBarCollapse = () => {
  const { getTriggerProps, isOpen } = useSideBarContext()
  return (
    <ElSideBarCollapseButtonContainer data-is-expanded={isOpen}>
      <ElSideBarCollapseButton className={elSideBarMenuItemAnchor} {...getTriggerProps()}>
        <ElCollapseIcon data-is-expanded={isOpen} />
        {isOpen && <ElSideBarCollapseText>Collapse</ElSideBarCollapseText>}
      </ElSideBarCollapseButton>
    </ElSideBarCollapseButtonContainer>
  )
}
