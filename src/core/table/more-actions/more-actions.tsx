import { Menu } from '#src/core/menu'
import { TableRowMoreActionsButton } from './more-actions-button'
import { useId } from 'react'

import type { ComponentProps, ReactNode } from 'react'

interface TableRowMoreActionsProps extends ComponentProps<typeof TableRowMoreActionsButton> {
  /**
   * Whether the button is disabled. This can be used to make the button appear disabled to users, but
   * still be focusable. When ARIA disabled, the button will ignore click events. Using `aria-disabled`
   * is preferred when the button should still be focusable while it's disabled; for example, to allow
   * a tooltip to be displayed that explains why the button is disabled.
   */
  'aria-disabled': boolean
  /**
   * The accessible name for this button. Take care to ensure it is descriptive of the table row
   * to which it's related.
   */
  'aria-label': string
  /** The secondary actions for the table row. */
  children: ReactNode
  /**
   * Whether the button is disabled or not. Unlike `aria-disabled`, buttons disabled with this prop will
   * not be focusable or interactive.
   */
  disabled: boolean
}

/**
 * A "more actions" button and menu for use in table rows.
 */
export function TableRowMoreActions({ children, id, ...rest }: TableRowMoreActionsProps) {
  const triggerId = id ?? useId()
  const menuId = useId()
  return (
    <>
      <TableRowMoreActionsButton
        {...rest}
        {...Menu.getTriggerProps({ id: triggerId, popoverTarget: menuId, popoverTargetAction: 'toggle' })}
      />
      <Menu aria-labelledby={triggerId} id={menuId} placement="top-end">
        {children}
      </Menu>
    </>
  )
}
