import { ElAtAGlanceCardLink } from './styles'

import type { AnchorHTMLAttributes } from 'react'

export namespace AtAGlanceCardLink {
  export interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    /** The URL to link to */
    href: string
  }
}

/**
 * A link styled for use within `AtAGlance.Card`. Wrap `AtAGlance.CardContent` with this
 * component to make the entire card clickable.
 *
 * @example
 * <AtAGlance.Card>
 *   <AtAGlance.CardLink href="/details">
 *     <AtAGlance.CardContent
 *       label="Total Sales"
 *       value="$12,345"
 *       description="Last 30 days"
 *     />
 *   </AtAGlance.CardLink>
 * </AtAGlance.Card>
 */
export function AtAGlanceCardLink(props: AtAGlanceCardLink.Props) {
  return <ElAtAGlanceCardLink {...props} />
}
