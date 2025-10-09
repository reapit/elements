import { createContext, useContext } from 'react'

/**
 * Represents an item that can be selected in the custom select component.
 */
export interface SelectedItem {
  /** The value of the selected item */
  value: string
  /** The label displayed for the selected item */
  label: string
}

export namespace SelectCustomContext {
  export interface Value {
    /** Currently selected items */
    selectedValues: SelectedItem[]
    /** Function to select or deselect an item */
    onSelect: (item: SelectedItem) => void
    /** Determines if multiple selections are allowed */
    isMultiple: boolean
  }
}

/**
 * Context provided to `Option` and `Group` components within `SelectCustom`.
 * Manages selection state and behavior for the custom select component.
 */
export const SelectCustomContext = createContext<SelectCustomContext.Value>({
  selectedValues: [],
  onSelect: () => {},
  isMultiple: false,
})

/**
 * Returns the current SelectCustomContext value.
 */
export function useSelectCustomContext(): SelectCustomContext.Value {
  return useContext(SelectCustomContext)
}
