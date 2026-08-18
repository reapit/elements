import { isExclusiveOption } from "./is-exclusive-option";

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
  const value = option.value;

  if (option.checked) {
    // If the chip select option has just been checked, its value needs to be added to the
    // controlled state. For exclusive options, their value replaces the current one.
    // For non-exclusive options, their value is appended.
    if (isExclusiveOption(option)) {
      return [value];
    } else {
      return [...currentValue, value];
    }
  } else {
    // If the chip select option has just been unchecked, its value needs to be removed from
    // the controlled state. Leave the state unchanged when the group is required and this is the
    // last selected option. Applies to both exclusive and non-exclusive options.
    if (option.required && currentValue.length === 1) {
      return currentValue;
    }

    // For exclusive options, the new controlled state is an empty array.
    // For non-exclusive options, their value is simply removed from the controlled state.
    if (isExclusiveOption(option)) {
      return [];
    } else {
      return currentValue.filter((v) => v !== value);
    }
  }
}
