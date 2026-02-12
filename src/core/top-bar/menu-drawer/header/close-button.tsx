import { Button } from '#src/core/button'
import { CloseIcon } from '#src/icons/close'
import { getClosestDialogElement } from '#src/utils/dialog'

import type { ComponentProps } from 'react'

export namespace TopBarMenuDrawerHeaderCloseButton {
  export interface Props extends ComponentProps<typeof Button> {}
}

/**
 * A close button for the TopBarMenuDrawer header. When clicked, it closes the nearest ancestor dialog element.
 */
export function TopBarMenuDrawerHeaderCloseButton(props: TopBarMenuDrawerHeaderCloseButton.Props) {
  return (
    <Button
      {...props}
      aria-label="Close menu"
      iconLeft={<CloseIcon aria-hidden />}
      onClick={(event) => {
        const dialog = getClosestDialogElement(event.currentTarget)
        dialog?.close()
        props.onClick?.(event)
      }}
      size="large"
      type="button"
      variant="tertiary"
    />
  )
}
