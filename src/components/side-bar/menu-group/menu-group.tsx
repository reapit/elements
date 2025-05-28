import { cx } from '@linaria/core'
import { elSideBarMenuGroup } from './styles'
import { SideBarMenuGroupLabelIdContext } from './menu-group-label-id-context'
import { SideBarMenuGroupSummary } from './menu-group-summary'
import { useId } from 'react'
import { useSideBarContext } from '../side-bar-context'
import { useSideBarMenuGroupController } from './use-menu-group-controller'

import type { DetailsHTMLAttributes, ReactNode } from 'react'

export interface SideBarMenuGroupProps extends DetailsHTMLAttributes<HTMLDetailsElement> {
  /**
   * Typically a single `SideBar.Submenu` component that contains any number of submenu items
   */
  children: ReactNode
  /**
   * Indicates whether the menu group's contents---that is, the submenu of items---are currently visible.
   *
   * Typically, the open state of menu groups can remain uncontrolled. If this state is controlled, it is important for
   * consumers to listen for [toggle](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details#events)
   * events fired after the underlying `<details>` element's `open` state changes. This is because the `SideBar` will,
   * at times, imperatively control child `<details>` elements.
   */
  open?: boolean
  /**
   * The summary/main item for the menu group. Will typically be a `SideBar.MenuGroupSummary`. If a custom element is
   * rendered, it should be a `<summary>` element.
   */
  summary: ReactNode
}

/**
 * A menu group that can contain a submenu of items for use in a `SideBar`. The group leverages a `<details>` element
 * to provide a native disclosure widget for showing and hiding the submenu. The group is styled to look like a
 * traditional menu item, but the submenu is hidden by default.
 */
export function SideBarMenuGroup({ children, className, summary, ...props }: SideBarMenuGroupProps) {
  const labelId = useId()
  const sideBar = useSideBarContext()
  const ref = useSideBarMenuGroupController(sideBar.state)
  return (
    <details {...props} className={cx(elSideBarMenuGroup, className)} aria-labelledby={labelId} ref={ref}>
      <SideBarMenuGroupLabelIdContext.Provider value={labelId}>{summary}</SideBarMenuGroupLabelIdContext.Provider>
      {children}
    </details>
  )
}

SideBarMenuGroup.Summary = SideBarMenuGroupSummary
