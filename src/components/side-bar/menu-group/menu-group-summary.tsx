import { cx } from '@linaria/core'
import {
  elSideBarMenuGroup,
  elSideBarMenuGroupSummary,
  ElSideBarMenuGroupSummaryIcon,
  ElSideBarMenuGroupSummaryLabel,
  ElSideBarMenuGroupSummaryDropdownIcon,
} from './styles'
import { elSideBarMenuItem } from '../menu-item'
import { DeprecatedIcon } from '../../deprecated-icon'
import { useCallback } from 'react'
import { useSideBarMenuGroupLabelIdContext } from './menu-group-label-id-context'

import type { HTMLAttributes, MouseEventHandler, ReactNode } from 'react'
import { shouldBeOpen } from './should-be-open'

interface SideBarMenuGroupSummaryProps extends HTMLAttributes<HTMLElement> {
  /**
   * The label for the menu group.
   */
  children: ReactNode
  /**
   * The icon to display next to the label.
   */
  icon: ReactNode
}

/**
 * A summary element for the `SideBar.MenuGroup`. It is explicitly designed for use within a `<details>` element,
 * relying on its `open` state to determine the orientation of the summary's dropdown indicator.
 *
 * ⚠️ **Important**: `<summary> elements are not interactive outside of a parent `<details>` element. This component
 * should only be used as the summary for a `SideBar.MenuGroup` component.
 */
export function SideBarMenuGroupSummary({
  children,
  className,
  icon,
  id,
  onClick,
  ...props
}: SideBarMenuGroupSummaryProps) {
  const labelId = id ?? useSideBarMenuGroupLabelIdContext()

  // We need to prevent the parent menu group from closing if it is currently active (i.e. one of its descendants
  // represents the current page).
  //
  // NOTE: We don't add a click handler to the <details> element itself because that would be called for any
  // click event that propogates from _any_ descendants, which would include this <summary> element.
  const handleClick: MouseEventHandler<HTMLElement> = useCallback(
    (event) => {
      onClick?.(event)

      const detailsElement = event.currentTarget.closest(`details.${elSideBarMenuGroup}`)

      if (detailsElement instanceof HTMLDetailsElement && shouldBeOpen(detailsElement)) {
        event.preventDefault()
      }
    },
    [onClick],
  )

  return (
    <summary
      {...props}
      className={cx(elSideBarMenuItem, elSideBarMenuGroupSummary, className)}
      id={labelId}
      onClick={handleClick}
    >
      <ElSideBarMenuGroupSummaryIcon aria-hidden>{icon}</ElSideBarMenuGroupSummaryIcon>
      <ElSideBarMenuGroupSummaryLabel>{children}</ElSideBarMenuGroupSummaryLabel>
      <ElSideBarMenuGroupSummaryDropdownIcon aria-hidden>
        <DeprecatedIcon icon="chevronDown" />
      </ElSideBarMenuGroupSummaryDropdownIcon>
    </summary>
  )
}
