import { Button } from '#src/core/button'

import type { AttributesToOmit } from './common'
import type { ComponentProps, MouseEventHandler, ReactNode } from 'react'

export namespace EmptyDataActionButton {
  export interface Props extends Omit<ComponentProps<typeof Button>, AttributesToOmit> {
    /** The action's label. */
    children: ReactNode
    /** The action to perform. */
    onClick?: MouseEventHandler<HTMLButtonElement>
  }
}

/**
 * @deprecated Use `EmptyDataActionButton.Props` instead.
 */
export type EmptyDataActionButtonProps = EmptyDataActionButton.Props

export function EmptyDataActionButton(props: EmptyDataActionButton.Props) {
  return <Button {...props} size="medium" variant="tertiary" useLinkStyle />
}

EmptyDataActionButton.displayName = 'EmptyData.ActionButton'
