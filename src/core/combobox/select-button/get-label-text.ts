import type { ComboboxSelectedOption } from '../use-selected-options'

export namespace getComboboxSelectButtonLabelText {
  export interface Input {
    /** Whether the combobox supports multiple selections. */
    multiple: boolean
    /** The placeholder text to display when no options or multiple options are selected */
    placeholder: string
    /** The selected options, if any. */
    selections: ComboboxSelectedOption[]
  }
}

/**
 * Returns the label text for a combobox select button.
 *
 * For single-select comboboxes with one selection, returns the selected option's label.
 * Otherwise, returns the placeholder.
 *
 * @returns The button label text.
 */
export function getComboboxSelectButtonLabelText({
  multiple,
  placeholder,
  selections,
}: getComboboxSelectButtonLabelText.Input): string {
  if (!multiple && selections.length === 1) {
    return selections[0].label
  } else {
    return placeholder
  }
}
