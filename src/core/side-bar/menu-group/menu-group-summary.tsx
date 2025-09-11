import { ChevronDownIcon } from '#src/icons/chevron-down'
import { cx } from '@linaria/core'
import {
  elSideBarMenuGroupSummary,
  ElSideBarMenuGroupSummaryIcon,
  ElSideBarMenuGroupSummaryLabel,
  ElSideBarMenuGroupSummaryDropdownIcon,
} from './styles'
import { elSideBarMenuItem } from '../menu-item'
import { shouldBeOpen } from './should-be-open'
import { Tooltip } from '#src/core/tooltip'
import { useCallback, useId } from 'react'
import { useSideBarMenuGroupLabelIdContext } from './menu-group-label-id-context'

import type { HTMLAttributes, MouseEventHandler, ReactNode } from 'react'

export namespace SideBarMenuGroupSummary {
  export interface Props extends HTMLAttributes<HTMLElement> {
    /**
     * The label for the menu group.
     */
    children: ReactNode
    /**
     * The icon to display next to the label.
     */
    icon: ReactNode
  }
}

/**
 * @deprecated Use `SideBarMenuGroupSummary.Props` instead
 */
export type SideBarMenuGroupSummaryProps = SideBarMenuGroupSummary.Props

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
}: SideBarMenuGroupSummary.Props) {
  const tooltipId = useSideBarMenuGroupLabelIdContext()
  const triggerId = id ?? useId()
  const truncationTargetId = useId()

  // We need to prevent the parent menu group from closing if it is currently active (i.e. one of its descendants
  // represents the current page).
  //
  // NOTE: We don't add a click handler to the <details> element itself because that would be called for any
  // click event that propogates from _any_ descendants, which would include this <summary> element.
  const handleClick: MouseEventHandler<HTMLElement> = useCallback(
    (event) => {
      onClick?.(event)

      const detailsElement = event.currentTarget.closest('details')

      if (detailsElement && shouldBeOpen(detailsElement)) {
        event.preventDefault()
      }
    },
    [onClick],
  )

  return (
    <summary
      {...props}
      {...Tooltip.getTriggerProps({ id: triggerId, tooltipId, tooltipPurpose: 'label' })}
      className={cx(elSideBarMenuItem, elSideBarMenuGroupSummary, className)}
      onClick={handleClick}
    >
      <ElSideBarMenuGroupSummaryIcon aria-hidden>{icon}</ElSideBarMenuGroupSummaryIcon>
      <ElSideBarMenuGroupSummaryLabel id={truncationTargetId}>{children}</ElSideBarMenuGroupSummaryLabel>
      <ElSideBarMenuGroupSummaryDropdownIcon aria-hidden>
        <ChevronDownIcon />
      </ElSideBarMenuGroupSummaryDropdownIcon>
      <Tooltip id={tooltipId} placement="right" triggerId={triggerId} truncationTargetId={truncationTargetId}>
        {children}
      </Tooltip>
    </summary>
  )
}
