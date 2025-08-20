import { Button } from '#src/core/button'

import type { AttributesToOmit } from './common'
import type { ComponentProps, MouseEventHandler, ReactNode } from 'react'

interface EmptyDataActionButtonProps extends Omit<ComponentProps<typeof Button>, AttributesToOmit> {
  /** The action's label. */
  children: ReactNode
  /** The action to perform. */
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export function EmptyDataActionButton(props: EmptyDataActionButtonProps) {
  return <Button {...props} size="medium" variant="tertiary" useLinkStyle />
}
