import { InteractiveCardBase } from './interactive-card-base'

import type { ButtonHTMLAttributes } from 'react'

export namespace ButtonCard {
  export interface Props extends InteractiveCardBase.CommonProps, ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Communicates a pressed, toggled, or selected state to assistive technologies.
     * Use `'true'` when the card represents an active or selected item, and `'false'`
     * when it is not. Use `'mixed'` for a tri-state toggle. Omit when the card has no
     * toggled state.
     */
    'aria-pressed'?: boolean | 'false' | 'mixed' | 'true'
    /**
     * Whether the button is disabled. Unlike `aria-disabled`, a disabled button is not
     * focusable or interactive.
     */
    disabled?: boolean
  }
}

/**
 * An interactive card that triggers an action when clicked.
 *
 * `ButtonCard` renders as a `<button>` element. Use `aria-pressed` to communicate a
 * selected or toggled state to assistive technologies. For cards that navigate to a URL,
 * use `AnchorCard` instead.
 */
export function ButtonCard(props: ButtonCard.Props) {
  return <InteractiveCardBase as="button" type="button" {...props} />
}
