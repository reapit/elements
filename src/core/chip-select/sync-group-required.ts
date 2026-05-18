/**
 * Synchronises the `required` attribute on every chip option in `container`. When the group is
 * required and no chip is currently checked, every chip carries `required` so native form
 * validation reports the group as invalid. When at least one chip is checked, no chip carries
 * `required` — the group constraint is satisfied.
 */
export function syncGroupRequired(container: HTMLElement, groupRequired: boolean): void {
  const chips = container.querySelectorAll<HTMLInputElement>('input[data-exclusive][type="checkbox"]')
  const anyChecked = Array.from(chips).some((chip) => chip.checked)
  chips.forEach((chip) => {
    chip.required = groupRequired && !anyChecked
  })
}
