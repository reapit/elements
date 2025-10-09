/**
 * Returns the string that should be used to accessibly label the picker button.
 * @param variant the type of picker being labelled
 */
export function getPickerButtonAriaLabel(variant: 'date' | 'datetime-local' | 'time') {
  switch (variant) {
    case 'date':
      return 'Show date picker'
    case 'datetime-local':
      return 'Show date and time picker'
    case 'time':
      return 'Show time picker'
  }
}
