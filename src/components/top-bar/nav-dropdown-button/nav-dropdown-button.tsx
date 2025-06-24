import { ElTopBarNavDropdownButton, ElTopBarNavDropdownButtonIcon, ElTopBarNavDropdownButtonLabel } from './styles'
import { DeprecatedIcon } from '../../deprecated-icon'

import type { HTMLAttributes, ReactNode } from 'react'

export interface TopBarNavDropdownButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * Whether the dropdown is expanded or not. This will typically be controlled by a `Menu.Trigger` component.
   */
  'aria-expanded': boolean
  /**
   * The label of the dropdown button.
   */
  children: ReactNode
}

/**
 * A simple dropdown button for use in the Top Bar's main navigation region. It can be used as an overflow menu when
 * there is not enough space in the main navigation region to fit all the items.
 *
 * Currently, it does not visually or accessibly communicate if one of it's menu items represents the current page.
 * A menu item that does represent the current page should have an `aria-current="page"` attribute.
 *
 * **Important:** ⚠️ Ensure you use this component via `TopBar.NavMenuItem` as it comes with an integrated `Menu` and
 * is correctly wrapped by a list item (`<li>`) to ensure good semantics and accessibility when used with
 * `TopBar.MainNav`.
 */
export function TopBarNavDropdownButton({
  'aria-expanded': ariaExpanded,
  children,
  ...rest
}: TopBarNavDropdownButtonProps) {
  return (
    <ElTopBarNavDropdownButton {...rest} aria-expanded={ariaExpanded}>
      <ElTopBarNavDropdownButtonLabel>{children}</ElTopBarNavDropdownButtonLabel>
      <ElTopBarNavDropdownButtonIcon>
        <DeprecatedIcon aria-hidden="true" intent="default" icon="chevronDown" fontSize="1rem" />
      </ElTopBarNavDropdownButtonIcon>
    </ElTopBarNavDropdownButton>
  )
}
