/**
 * Returns true when at least one chip option in `container` other than `currentTarget` is
 * currently checked. Scoped to inputs that carry `data-exclusive` (regardless of value) so
 * unrelated checkboxes in the container are ignored — single-select chips carry
 * `data-exclusive="true"` and multi-select chips carry `data-exclusive="false"`.
 */
export function hasOtherCheckedOption(container: HTMLElement, currentTarget: HTMLInputElement): boolean {
  return Array.from(container.querySelectorAll<HTMLInputElement>('input[data-exclusive][type="checkbox"]')).some(
    (sibling) => sibling !== currentTarget && sibling.checked,
  )
}
