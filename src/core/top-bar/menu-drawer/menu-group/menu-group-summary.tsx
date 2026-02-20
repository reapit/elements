import { ChevronDownIcon } from '#src/icons/chevron-down'
import { cx } from '@linaria/core'
import {
  elTopBarMenuDrawerMenuGroupSummary,
  ElTopBarMenuDrawerMenuGroupSummaryBadge,
  ElTopBarMenuDrawerMenuGroupSummaryDropdownIcon,
  ElTopBarMenuDrawerMenuGroupSummaryLabel,
} from './styles'
import { elTopBarMenuDrawerMenuItem } from '../menu-item'
import { shouldTopBarMenuGroupBeOpen } from './should-be-open'
import { useTopBarMenuDrawerMenuGroupLabelIdContext } from './menu-group-label-id-context'
import { useCallback } from 'react'

import type { HTMLAttributes, MouseEventHandler, ReactNode } from 'react'

export namespace TopBarMenuDrawerMenuGroupSummary {
  export interface Props extends HTMLAttributes<HTMLElement> {
    /**
     * The label for the menu group.
     */
    children: ReactNode
    /**
     * Whether the menu group has a badge.
     */
    hasBadge?: boolean
  }
}

/**
 * A summary element for the MenuGroup. Designed for use within a `<details>` element,
 * relying on its `open` state to determine the orientation of the chevron icon.
 *
 * ⚠️ **Important**: `<summary>` elements are not interactive outside of a parent
 * `<details>` element. This component should only be used as the summary for a
 * MenuGroup component.
 */
export function TopBarMenuDrawerMenuGroupSummary({
  children,
  className,
  hasBadge,
  id,
  onClick,
  ...props
}: TopBarMenuDrawerMenuGroupSummary.Props) {
  const labelId = useTopBarMenuDrawerMenuGroupLabelIdContext()

  // We need to prevent the parent menu group from closing if it is currently active (i.e. one of its descendants
  // represents the current page).
  //
  // NOTE: We don't add a click handler to the <details> element itself because that would be called for any
  // click event that propagates from _any_ descendants, which would include this <summary> element.
  const handleClick = useCallback<MouseEventHandler<HTMLElement>>(
    (event) => {
      onClick?.(event)

      const detailsElement = event.currentTarget.closest('details')

      if (detailsElement && shouldTopBarMenuGroupBeOpen(detailsElement)) {
        event.preventDefault()
      }
    },
    [onClick],
  )

  return (
    <summary
      {...props}
      id={id ?? labelId}
      className={cx(elTopBarMenuDrawerMenuItem, elTopBarMenuDrawerMenuGroupSummary, className)}
      onClick={handleClick}
    >
      <ElTopBarMenuDrawerMenuGroupSummaryLabel>{children}</ElTopBarMenuDrawerMenuGroupSummaryLabel>
      {hasBadge && <ElTopBarMenuDrawerMenuGroupSummaryBadge aria-hidden />}
      <ElTopBarMenuDrawerMenuGroupSummaryDropdownIcon aria-hidden>
        <ChevronDownIcon />
      </ElTopBarMenuDrawerMenuGroupSummaryDropdownIcon>
    </summary>
  )
}

TopBarMenuDrawerMenuGroupSummary.displayName = 'TopBar.MenuGroupSummary'
