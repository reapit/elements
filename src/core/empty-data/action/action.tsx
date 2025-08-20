import { AnchorButton } from '#src/core/button'

import type { AttributesToOmit } from './common'
import type { ComponentProps, ReactNode } from 'react'

interface EmptyDataActionProps extends Omit<ComponentProps<typeof AnchorButton>, AttributesToOmit> {
  /** The action's label. */
  children: ReactNode
  /** The URL to navigate to; will typically be an entity creation page or drawer. */
  href: string
}

/**
 * A simple action component. Comes in two varieties: `EmptyData.Action`, which renders as an
 * anchor element, and `EmptyData.ActionButton`, which renders as an anchor element.
 *
 * Use `EmptyData.Action` when you need button-like styling but want to navigate to a URL. Use
 * `EmptyData.ActionButton` when the action needs to occur on click.
 */
export function EmptyDataAction(props: EmptyDataActionProps) {
  return <AnchorButton {...props} size="medium" variant="tertiary" useLinkStyle />
}
