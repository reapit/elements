import { ComboboxButtonClearButton } from '../button'
import { ElComboboxCard, ElComboboxCardActionContainer, ElComboboxContent } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace ComboboxCard {
  export interface Props extends HTMLAttributes<HTMLElement> {
    /** ID of the listbox element controlled by the card's clear button. */
    'aria-controls': string
    /**
     * Content representing the combobox's selected option. Typically rendered using
     * `Combobox.SelectedContent`.
     */
    children?: ReactNode
    /** Whether the card and clear button are disabled. */
    disabled?: boolean
  }
}

/**
 * Card component for combobox controls. Used to display structured content about the combobox's currently
 * selected value, typically with `Combobox.SelectedContent`.
 *
 * This is a low-level component and should only be used when building a more complete combobox button
 * experience like `Autocomplete.Button` and `Select.Button`.
 */
export function ComboboxCard({ 'aria-controls': ariaControls, children, disabled, ...rest }: ComboboxCard.Props) {
  return (
    <ElComboboxCard {...rest}>
      <ElComboboxContent>{children}</ElComboboxContent>
      <ElComboboxCardActionContainer>
        <ComboboxButtonClearButton aria-controls={ariaControls} disabled={disabled} />
      </ElComboboxCardActionContainer>
    </ElComboboxCard>
  )
}
