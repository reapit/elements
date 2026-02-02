import { cx } from '@linaria/core'
import { elAtAGlanceCardDescription } from './styles'
import { useAtAGlanceCardContext } from '../context'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace AtAGlanceCardDescription {
  export interface Props extends HTMLAttributes<HTMLElement> {
    /** Description content. */
    children: ReactNode
  }
}

/**
 * Description subcomponent for AtAGlance.Card primitive.
 * Renders as p for article cards, span for interactive cards.
 */
export function AtAGlanceCardDescription({ children, className, ...rest }: AtAGlanceCardDescription.Props) {
  const { as } = useAtAGlanceCardContext()
  const Element = as === 'article' ? 'p' : 'span'

  return (
    <Element {...rest} className={cx(className, elAtAGlanceCardDescription)}>
      {children}
    </Element>
  )
}

AtAGlanceCardDescription.displayName = 'AtAGlance.CardDescription'
