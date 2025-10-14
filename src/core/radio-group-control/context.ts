import { createContext, useContext } from 'react'

export namespace RadioGroupControlContext {
  export interface Value {
    /** Whether all radio buttons in the group are disabled by default */
    disabled: boolean | undefined
    /**
     * The form ID all radio buttons should be related to. Only applicable if the radio buttons are not a
     * descendant of a form element.
     */
    form: string | undefined
    /** The name each option in the radio button group should use */
    name: string | undefined
    /** Whether all radio buttons in the group are required by default */
    required: boolean | undefined
    /** Whether all radio buttons should visually communicate their validity */
    showValidity: boolean | undefined
  }
}

/**
 * The context available to a RadioGroup's descendants. Provides access to
 * shared state including disabled, required, and validity display settings.
 */
export const RadioGroupControlContext = createContext<RadioGroupControlContext.Value | null>(null)

/**
 * Returns the current RadioGroupContext value.
 * @throws an error if the context is not defined.
 */
export function useRadioGroupContext(): RadioGroupControlContext.Value {
  const context = useContext(RadioGroupControlContext)
  if (!context) {
    throw new Error('useRadioGroupContext must be used within a RadioGroup')
  }
  return context
}
