import { Button } from '#src/core/button'
import { CalendarIcon } from '#src/icons/calendar'
import { getPickerButtonAriaLabel } from './get-aria-label'
import { TimeIcon } from '#src/icons/time'

import type { ButtonHTMLAttributes, MouseEventHandler } from 'react'

// NOTE: we omit...
// - type, because we want it pinned to "button" to prevent form submission
type AttributesToOmit = 'type'

export namespace DateTimeInputPickerButton {
  export interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, AttributesToOmit> {
    /** The ID of the date/time input to show the picker for */
    'aria-controls': string
    /** The type of picker we're going to show */
    variant: 'date' | 'datetime-local' | 'time'
  }
}

/**
 * A simple button used to trigger the picker for a `DateTimeInput`.
 */
export function DateTimeInputPickerButton({
  'aria-controls': ariaControls,
  onClick,
  variant,
  ...rest
}: DateTimeInputPickerButton.Props) {
  const icon = variant === 'time' ? <TimeIcon /> : <CalendarIcon />

  const showPicker: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick?.(event)

    // We allow consumer-supplied click handlers to prevent the default action of showing the picker.
    // This would be necessary if, for example, they want to show a custom picker.
    if (!event.defaultPrevented) {
      const inputElement = document.getElementById(ariaControls)
      if (inputElement instanceof HTMLInputElement) {
        // We need to focus the input first, because some browsers (like Safari on mobile) only show
        // the picker if the input is focused.
        inputElement.focus()
        inputElement.showPicker()
      }
    }
  }

  return (
    <Button
      {...rest}
      aria-controls={ariaControls}
      aria-label={getPickerButtonAriaLabel(variant)}
      hasNoPadding
      iconLeft={icon}
      onClick={showPicker}
      size="medium"
      type="button"
      variant="tertiary"
    />
  )
}
