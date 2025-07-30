import { ElMenuDivider } from './styles'

import type { HTMLAttributes } from 'react'

// NOTE: We omit...
// - role, because the divider's role should always be "separator".
type AttributesToOmit = 'role'

interface MenuDividerProps extends Omit<HTMLAttributes<HTMLHRElement>, AttributesToOmit> {}

/**
 * Used to separate groups of menu items in a menu. Will typically be used via `Menu.Divider`.
 */
export function MenuDivider(props: MenuDividerProps) {
  return <ElMenuDivider {...props} role="separator" />
}
