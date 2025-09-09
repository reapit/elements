import { isExclusiveOption } from './is-exclusive-option'

/**
 * Returns the next controlled state value given the current value and an option whose checked
 * state has changed.
 */
export function determineNextControlledState(
  /** The current controlled state for the chip select. */
  currentValue: string[],
  /** The chip select option whose checked state has changed. */
  option: HTMLInputElement,
): string[] {
  const value = option.value

  if (option.checked) {
    // If the chip select option has just been checked, it's value needs to be added to the
    // controlled state. For exclusive options, they're value replaces the current one.
    // For non-exclusive options, their value is appended.
    if (isExclusiveOption(option)) {
      return [value]
    } else {
      return [...currentValue, value]
    }
  } else {
    // If the chip select option has just been unchecked, it's value needs to be removed from
    // the controlled state. For exclusive options, the new controlled state is an empty array.
    // For non-exclusive options, their value is simply removed from the controlled state.
    if (option.dataset.exclusive === 'true') {
      return []
    } else {
      return currentValue.filter((v) => v !== value)
    }
  }
}
