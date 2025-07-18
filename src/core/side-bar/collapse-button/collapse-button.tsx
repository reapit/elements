import CollapseIcon from './icons/collapse.svg?react'
import { ElSideBarCollapseButton, ElSideBarCollapseButtonIcon, ElSideBarCollapseLabel } from './styles'
import { useSideBarContext } from '../side-bar-context'
import { useCallback } from 'react'

import type { ComponentProps, MouseEventHandler } from 'react'

// We don't want:
// - `aria-expanded` because it is always derived from the state of the SideBar.
// - `aria-controls` because it is always set to the `id` of the SideBar.
// - `children` because the button text is always "Collapse" or "Expand" based on the state of the SideBar.
type AttributesToOmit = 'aria-expanded' | 'aria-controls' | 'children'

interface SideBarCollapseButtonProps extends Omit<ComponentProps<typeof ElSideBarCollapseButton>, AttributesToOmit> {}

/**
 * A button used to collapse or expand the `SideBar`. Should be placed within the `SideBar` footer. To help communicate
 * the side bar's state to assistive technologies, it uses `aria-controls` to reference the side bar's `id`
 * and `aria-expanded` to indicate whether the side bar is currently expanded or collapsed.
 *
 * When the side bar is collapsed, the button's accessible name will be "Expand" (though this will not be visible), and
 * when the side bar is expanded, the button's accessible name will be "Collapse".
 */
export function SideBarCollapseButton({ onClick, ...props }: SideBarCollapseButtonProps) {
  const sideBar = useSideBarContext()

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      onClick?.(event)
      if (event.defaultPrevented) {
        return
      }
      sideBar.toggle()
    },
    [onClick, sideBar.toggle],
  )

  return (
    <ElSideBarCollapseButton
      {...props}
      aria-controls={sideBar.id}
      aria-expanded={sideBar.state === 'expanded'}
      onClick={handleClick}
    >
      <ElSideBarCollapseButtonIcon aria-hidden>
        <CollapseIcon />
      </ElSideBarCollapseButtonIcon>
      <ElSideBarCollapseLabel>{sideBar.state === 'expanded' ? 'Collapse' : 'Expand'}</ElSideBarCollapseLabel>
    </ElSideBarCollapseButton>
  )
}
