import { InteractiveCardBase } from './interactive-card-base'

import type { AnchorHTMLAttributes } from 'react'

export namespace AnchorCard {
  export interface Props extends InteractiveCardBase.CommonProps, AnchorHTMLAttributes<HTMLAnchorElement> {
    /**
     * Indicates that this card represents the current item within a navigation context.
     * Use `'page'` when the card represents the current page or URL. Other values (`'step'`,
     * `'location'`, `'date'`, `'time'`) apply in more specific contexts such as wizards or
     * calendars. Set to `false` to render `aria-current="false"` in the DOM, which communicates
     * a non-current state to assistive technologies. Omit the prop entirely to exclude the
     * attribute from the DOM.
     */
    'aria-current'?: boolean | 'false' | 'true' | 'page' | 'step' | 'location' | 'date' | 'time'
    /** The URL the card navigates to. */
    href: string
  }
}

/**
 * An interactive card that navigates to a URL when clicked.
 *
 * `AnchorCard` renders as an `<a>` element. Use `aria-current="page"` to communicate
 * that this card represents the current page or location. For cards that trigger an action
 * rather than navigate, use `ButtonCard` instead.
 */
export function AnchorCard(props: AnchorCard.Props) {
  return <InteractiveCardBase as="a" {...props} />
}
