import type { FC, HTMLAttributes } from 'react'
import { useIsSideBarExpandedContext } from '../side-bar'
import {
  ElCollapseIcon,
  ElSideBarCollapseButton,
  ElSideBarCollapseButtonContainer,
  ElSideBarCollapseText,
} from './styles'

export const SideBarCollapseButton: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { setIsExpanded, isExpanded } = useIsSideBarExpandedContext()
  const onClick = () => {
    setIsExpanded((prev) => !prev)
  }

  return (
    <ElSideBarCollapseButtonContainer data-is-expanded={isExpanded} {...props}>
      <ElSideBarCollapseButton aria-expanded={isExpanded} onClick={onClick}>
        <ElCollapseIcon data-is-expanded={isExpanded} />
        {isExpanded && <ElSideBarCollapseText>Collapse</ElSideBarCollapseText>}
      </ElSideBarCollapseButton>
    </ElSideBarCollapseButtonContainer>
  )
}
