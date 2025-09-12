import { ElSplitButton } from './styles'
import { SplitButtonAction, SplitButtonAnchorAction } from './action'
import { SplitButtonContext, useSplitButtonContext } from './context'
import { SplitButtonMenu } from './split-button-menu'
import { SplitButtonMenuButton } from './menu-button'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace SplitButton {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** The main action for the `SplitButton` */
    action: ReactNode
    /** The part of the split button that is currently busy, if any. */
    busy?: 'action' | 'menu-item'
    /** The menu to display in the split button */
    menu: ReactNode
    /** The size of the button */
    size: 'small' | 'medium' | 'large'
    /** The visual variant of the button */
    variant: 'primary' | 'secondary'
  }
}

/**
 * A split button lets users perform an action or choose from a small group of other related actions.
 */
export function SplitButton({ action, menu, busy, size, variant, ...rest }: SplitButton.Props) {
  return (
    <ElSplitButton {...rest}>
      <SplitButtonContext.Provider value={{ busy, size, variant }}>
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

SplitButton.Context = SplitButtonContext
SplitButton.useContext = useSplitButtonContext
