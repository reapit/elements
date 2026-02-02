import { cx } from '@linaria/core'
import { elAtAGlanceCardIcon } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace AtAGlanceCardIcon {
  export interface Props extends HTMLAttributes<HTMLSpanElement> {
    /** The icon to display. */
    children: ReactNode
  }
}

/**
 * Icon subcomponent for AtAGlance.Card primitive.
 * Renders in the icon grid area.
 */
export function AtAGlanceCardIcon({ children, className, ...rest }: AtAGlanceCardIcon.Props) {
  return (
    <span {...rest} className={cx(className, elAtAGlanceCardIcon)}>
      {children}
    </span>
  )
}

AtAGlanceCardIcon.displayName = 'AtAGlance.CardIcon'
