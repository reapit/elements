import { Button } from '#src/core/button'

import type { AttributesToOmit } from './common'
import type { ComponentProps, MouseEventHandler, ReactNode } from 'react'

export namespace EmptyStateActionButton {
  export interface Props extends Omit<ComponentProps<typeof Button>, AttributesToOmit> {
    /** The action's label. */
    children: ReactNode
    /** The action to perform. */
    onClick?: MouseEventHandler<HTMLButtonElement>
  }
}

/**
 * @deprecated Use `EmptyStateActionButton.Props` instead.
 */
export type EmptyStateActionButtonProps = EmptyStateActionButton.Props

export function EmptyStateActionButton(props: EmptyStateActionButton.Props) {
  return <Button {...props} size="medium" variant="tertiary" useLinkStyle />
}

EmptyStateActionButton.displayName = 'EmptyState.ActionButton'
