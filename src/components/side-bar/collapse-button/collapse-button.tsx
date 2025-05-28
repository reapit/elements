import { ElCollapseIcon, ElSideBarCollapseButton, ElSideBarCollapseText } from './styles'
import { useSideBarContext } from '../side-bar-context'

import type { ComponentProps, MouseEventHandler } from 'react'

type AttributesToOmit = 'aria-controls' | 'aria-expanded' | 'children' | 'id'

interface SideBarCollapseButtonProps extends Omit<ComponentProps<typeof ElSideBarCollapseButton>, AttributesToOmit> {}

/**
 * A button that toggles the `SideBar` between `expanded` and `collapsed`. Should be placed within the `SideBar`
 * footer.
 */
export function SideBarCollapseButton({ onClick, ...props }: SideBarCollapseButtonProps) {
  const sideBar = useSideBarContext()

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick?.(event)
    if (event.defaultPrevented) {
      return
    }
    sideBar.toggle()
  }

  return (
    <ElSideBarCollapseButton
      {...props}
      aria-controls={sideBar.id}
      aria-expanded={sideBar.state === 'expanded'}
      onClick={handleClick}
    >
      <ElCollapseIcon />
      <ElSideBarCollapseText>{sideBar.state === 'expanded' ? 'Collapse' : 'Expand'}</ElSideBarCollapseText>
    </ElSideBarCollapseButton>
  )
}
