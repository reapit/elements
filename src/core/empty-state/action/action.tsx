import { AnchorButton } from '#src/core/button'

import type { AttributesToOmit } from './common'
import type { ComponentProps, ReactNode } from 'react'

export namespace EmptyStateAction {
  export interface Props extends Omit<ComponentProps<typeof AnchorButton>, AttributesToOmit> {
    /** The action's label. */
    children: ReactNode
    /** The URL to navigate to; will typically be an entity creation page or drawer. */
    href: string
  }
}

/**
 * @deprecated Use `EmptyStateAction.Props` instead.
 */
export type EmptyStateActionProps = EmptyStateAction.Props

/**
 * A simple action component. Comes in two varieties: `EmptyState.Action`, which renders as an
 * anchor element, and `EmptyState.ActionButton`, which renders as a button element.
 *
 * Use `EmptyState.Action` when you need button-like styling but want to navigate to a URL. Use
 * `EmptyState.ActionButton` when the action needs to occur on click.
 *
 * @deprecated Use AnchorButton directly
 */
export function EmptyStateAction(props: EmptyStateAction.Props) {
  return <AnchorButton {...props} size="medium" variant="tertiary" useLinkStyle />
}

EmptyStateAction.displayName = 'EmptyState.Action'
