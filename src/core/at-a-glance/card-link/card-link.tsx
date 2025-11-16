import { ElAtAGlanceCardLink } from './styles'

import type { AnchorHTMLAttributes } from 'react'

export namespace AtAGlanceCardLink {
  export interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    /** The URL to link to */
    href: string
  }
}

/**
 * A link styled for use within AtAGlance.Card as a value. The link expands to make the
 * entire card clickable.
 */
export function AtAGlanceCardLink(props: AtAGlanceCardLink.Props) {
  return <ElAtAGlanceCardLink {...props} />
}
