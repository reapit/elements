import { useComboboxDefaultOptionsContext } from '../default-options-context'
import { useComboboxSelectedOptions } from '../use-selected-options'

import type { ReactNode } from 'react'

type Option = useComboboxSelectedOptions.Option

export namespace ComboboxSelectedContent {
  export interface Props {
    /** Render-prop function to customise selected content rendering. */
    children?: (option: Option) => ReactNode
    /**
     * Selected option to be displayed on first render. Necessary when the initial selected option
     * is not present in the DOM.
     */
    defaultOptions?: readonly Option[]
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

  if (!hasOptions(options)) return null

  return children?.(options[0]) ?? options[0].label
}

/** Validates the given options array has at least one option. */
function hasOptions(options: readonly Option[]): options is [Option, ...Option[]] {
  return options.length > 0
}
