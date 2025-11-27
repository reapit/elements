import { useComboboxSelectedOptions } from '../use-selected-options'

import type { HTMLAttributes } from 'react'

export namespace ComboboxSelectedContent {
  export interface Props extends HTMLAttributes<HTMLSpanElement> {
    /**
     * Selected option to be displayed on first render. Necessary when the initial selected option
     * is not present in the DOM.
     */
    defaultOptions?: readonly useComboboxSelectedOptions.Option[]
    /** ID of the combobox listbox */
    listboxId: string
  }
}

/**
 * Renders the label text of the selected option. Renders nothing when no option is selected.
 *
 * **Intended for use in single-select combobox experiences.**
 */
export function ComboboxSelectedContent({ defaultOptions, listboxId }: ComboboxSelectedContent.Props) {
  const options = useComboboxSelectedOptions(listboxId, defaultOptions)
  return options.at(0)?.label
}
