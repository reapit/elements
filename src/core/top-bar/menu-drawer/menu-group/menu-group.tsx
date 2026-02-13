import { cx } from '@linaria/core'
import { elTopBarMenuDrawerMenuGroup } from './styles'
import { TopBarMenuDrawerMenuGroupLabelIdContext } from './menu-group-label-id-context'
import { TopBarMenuDrawerMenuGroupSummary } from './menu-group-summary'
import { useId } from 'react'
import { useTopBarMenuDrawerMenuGroupController } from './use-menu-group-controller'

import type { DetailsHTMLAttributes, ReactNode } from 'react'

export namespace TopBarMenuDrawerMenuGroup {
  export interface SummaryProps extends TopBarMenuDrawerMenuGroupSummary.Props {}

  export interface Props extends DetailsHTMLAttributes<HTMLDetailsElement> {
    /**
     * The ID of the element that labels this menu group. If not provided, a generated ID will be used.
     */
    'aria-labelledby'?: string
    /**
     * Typically a single `TopBar.MenuDrawer.Submenu` component that contains submenu items
     */
    children: ReactNode
    /**
     * Allows consumers to "force" the menu group to appear active. Being active means
     * the menu group will have the expanded background colour.
     */
    isActive?: boolean
    /**
     * Indicates whether the menu group's contents (the submenu) are currently visible.
     * Can be controlled or uncontrolled.
     */
    open?: boolean
    /**
     * The summary/main item for the menu group. Will typically be a `TopBar.MenuDrawer.MenuGroupSummary`.
     */
    summary: ReactNode
  }
}

/**
 * An expandable menu group for use in TopBar MenuDrawer. The group uses a `<details>` element
 * to provide a native disclosure widget for showing and hiding the submenu.
 *
 * The open state can be controlled or uncontrolled. The `isActive` prop can force the visual
 * "active" state (expanded background colour) even when closed.
 */
export function TopBarMenuDrawerMenuGroup({
  'aria-labelledby': ariaLabelledBy,
  children,
  className,
  isActive,
  summary,
  ...rest
}: TopBarMenuDrawerMenuGroup.Props) {
  const labelId = ariaLabelledBy ?? useId()
  const ref = useTopBarMenuDrawerMenuGroupController()
  return (
    <details
      {...rest}
      aria-labelledby={labelId}
      className={cx(elTopBarMenuDrawerMenuGroup, className)}
      data-is-active={isActive}
      ref={ref}
    >
      <TopBarMenuDrawerMenuGroupLabelIdContext.Provider value={labelId}>
        {summary}
      </TopBarMenuDrawerMenuGroupLabelIdContext.Provider>
      {children}
    </details>
  )
}

TopBarMenuDrawerMenuGroup.Summary = TopBarMenuDrawerMenuGroupSummary
