import { ElSplitButton } from './styles'
import { SplitButtonAction, SplitButtonAnchorAction } from './action'
import { SplitButtonContext } from './context'
import { SplitButtonMenu } from './split-button-menu'
import { SplitButtonMenuButton } from './menu-button'

import type { HTMLAttributes, ReactNode } from 'react'

interface SplitButtonProps extends HTMLAttributes<HTMLDivElement> {
  /** The main action for the `SplitButton` */
  action: ReactNode
  /** The menu to display in the split button */
  menu: ReactNode
  /** The size of the button */
  size: 'small' | 'medium' | 'large'
  /** The visual variant of the button */
  variant: 'primary' | 'secondary'
}

/**
 * A split button lets users perform an action or choose from a small group of other related actions.
 */
export function SplitButton({ action, menu, size, variant, ...rest }: SplitButtonProps) {
  return (
    <ElSplitButton {...rest}>
      <SplitButtonContext.Provider value={{ size, variant }}>
        {action}
        {menu}
      </SplitButtonContext.Provider>
    </ElSplitButton>
  )
}

SplitButton.Action = SplitButtonAction
SplitButton.AnchorAction = SplitButtonAnchorAction
SplitButton.Menu = SplitButtonMenu
SplitButton.MenuButton = SplitButtonMenuButton
