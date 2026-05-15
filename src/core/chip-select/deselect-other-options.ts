/**
 * Unchecks every exclusive chip option in `container` other than `currentTarget`. Scoped to
 * inputs that carry `data-exclusive="true"` so unrelated checkboxes in the container are left
 * alone. The caller decides whether deselection should run (typically: single-select mode, when
 * a chip has just been checked).
 */
export function deselectOtherOptions(container: HTMLElement, currentTarget: HTMLInputElement): void {
  container.querySelectorAll<HTMLInputElement>('input[data-exclusive="true"][type="checkbox"]').forEach((sibling) => {
    if (sibling !== currentTarget && sibling.checked) {
      sibling.checked = false
    }
  })
}
