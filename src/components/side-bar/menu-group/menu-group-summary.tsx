import { cx } from '@linaria/core'
import {
  elSideBarMenuGroup,
  elSideBarMenuGroupSummary,
  ElSideBarMenuGroupSummaryIcon,
  ElSideBarMenuGroupSummaryLabel,
  ElSideBarMenuGroupSummaryDropdownIcon,
} from './styles'
import { elSideBarMenuItem } from '../menu-item'
import { elSideBarSubmenuItem } from '../submenu-item'
import { Icon } from '../../icon'
import { useCallback } from 'react'
import { useSideBarMenuGroupLabelIdContext } from './menu-group-label-id-context'

import type { HTMLAttributes, MouseEventHandler, ReactNode } from 'react'

interface SideBarMenuGroupSummaryProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  icon: ReactNode
}

/**
 * A summary element for the `SideBar.MenuGroup`. It is explicitly designed for use within a `<details>` element,
 * relying on its `open` state to determine the orientation of the summary's dropdown indicator.
 *
 * ⚠️ **Important**: The stories shown here do not reflect the complete behaviour of the component as the summary
 * element is not interactive outside of a parent `<details>` element. To see the full behaviour, please refer to the
 * `SideBar.MenuGroup` component documentation.
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

  // We need to prevent the menu group from closing if it is currently active (i.e. one of its descendants represents
  // the current page).
  //
  // NOTE: We don't add a click handler to the <details> element itself because that would be called for any
  // click event that propogates from any descendants, which would include the submenu items.
  const handleClick: MouseEventHandler<HTMLElement> = useCallback(
    (event) => {
      onClick?.(event)

      const detailsElement = event.currentTarget.closest(`details.${elSideBarMenuGroup}`)
      const hasCurrentPageElement = !!detailsElement?.querySelector(`.${elSideBarSubmenuItem}[aria-current="page"]`)

      if (hasCurrentPageElement) {
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
        <Icon icon="chevronDown" />
      </ElSideBarMenuGroupSummaryDropdownIcon>
    </summary>
  )
}

SideBarMenuGroupSummary.displayName = 'SideBarMenuGroupSummary'
