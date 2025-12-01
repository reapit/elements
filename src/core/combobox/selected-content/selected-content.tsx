import { useComboboxDefaultOptionsContext } from '../default-options-context'
import { useComboboxSelectedOptions } from '../use-selected-options'

import type { HTMLAttributes, ReactNode } from 'react'

// We omit `children` because we use it as a render-prop
type AttributesToOmit = 'children'

export namespace ComboboxSelectedContent {
  export interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, AttributesToOmit> {
    /** Render-prop function to customise selected content rendering. */
    children?: (options: readonly useComboboxSelectedOptions.Option[]) => ReactNode
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
export function ComboboxSelectedContent({
  children,
  defaultOptions: defaultOptionsProp,
  listboxId,
}: ComboboxSelectedContent.Props) {
  const defaultOptions = useComboboxDefaultOptionsContext()
  const options = useComboboxSelectedOptions(listboxId, defaultOptionsProp ?? defaultOptions)
  return children?.(options) ?? options.at(0)?.label
}
