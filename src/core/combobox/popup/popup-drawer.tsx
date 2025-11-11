// TODO: Replace with custom drawer component when Figma designs are complete.
import { Drawer } from '#src/core/drawer'

import type { BaseComboboxPopupProps } from './types'
import type { ReactNode } from 'react'

export namespace ComboboxPopupDrawer {
  export interface Props extends BaseComboboxPopupProps {
    /** Popup content. */
    children: ReactNode
  }
}

/**
 * Combobox popup displayed as a drawer with a search input and close button.
 */
export function ComboboxPopupDrawer({ children, ...rest }: ComboboxPopupDrawer.Props) {
  return (
    <Drawer {...rest}>
      <Drawer.Header action={<Drawer.HeaderCloseButton />}>{null}</Drawer.Header>
      <Drawer.Body>{children}</Drawer.Body>
    </Drawer>
  )
}
