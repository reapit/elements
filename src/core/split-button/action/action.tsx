import { SplitButtonActionBase } from './action-base'

import type { ButtonHTMLAttributes } from 'react'

export namespace SplitButtonAction {
  export interface Props extends SplitButtonActionBase.CommonProps, ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Whether the button is disabled or not. Unlike `aria-disabled`, buttons disabled with this prop will not be
     * focusable or interactive.
     */
    disabled?: boolean
  }
}

/**
 * The `SplitButton.Action` component is used to represent the primary action in a `SplitButton`. An anchor-based
 * version is available via `SplitButton.AnchorAction`.
 */
export function SplitButtonAction(props: SplitButtonAction.Props) {
  return <SplitButtonActionBase as="button" {...props} />
}

SplitButtonAction.displayName = 'SplitButton.Action'
