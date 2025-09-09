/**
 * Returns true if the given input has `data-exclusive="true"` and false otherwise.
 */
export function isExclusiveOption(option: HTMLInputElement): boolean {
  return option.dataset.exclusive === 'true'
}
