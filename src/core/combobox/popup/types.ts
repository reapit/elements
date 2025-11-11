import type { HTMLAttributes } from 'react'

// NOTE: this interface is shared by multiple components, so we don't use the namespace pattern
/** Base props for combobox popup components. */
export interface BaseComboboxPopupProps extends HTMLAttributes<HTMLElement> {
  /** ID of the element that labels the popup. */
  'aria-labelledby': string
  /** ID of the popup element. */
  id: string
}
