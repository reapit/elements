import { createContext, useContext } from 'react'

export namespace CheckboxGroupControlContext {
  export interface Value {
    /** Whether all checkboxes in the group are disabled by default */
    disabled: boolean | undefined
    /**
     * The form ID all checkboxes should be related to. Only applicable if the checkboxes are not a
     * descendant of a form element.
     */
    form: string | undefined
    /** The name each option in the checkbox group should use */
    name: string | undefined
    /** Whether all checkboxes in the group are required by default */
    required: boolean | undefined
    /** Whether all checkboxes should visually communicate their validity */
    showValidity: boolean | undefined
  }
}

/**
 * The context available to a CheckboxGroupControl's descendants. Provides access to
 * shared state including disabled, required, and validity display settings.
 */
export const CheckboxGroupControlContext = createContext<CheckboxGroupControlContext.Value | null>(null)

/**
 * Returns the current CheckboxGroupControlContext value.
 * @throws an error if the context is not defined.
 */
export function useCheckboxGroupControlContext(): CheckboxGroupControlContext.Value {
  const context = useContext(CheckboxGroupControlContext)
  if (!context) {
    throw new Error('useCheckboxGroupControlContext must be used within a CheckboxGroupControl')
  }
  return context
}
