import { isExclusiveOption } from './is-exclusive-option'

/**
 * Deselects options related to the newly selected option, if any. Deselection will only occur if
 * the options are associated with the same form, share the same name, and the newly selected option
 * is "exclusive", meaning when it is selected, it should be the only selected option.
 *
 * @param newlySelectedOption the chip select option that has just been selected
 */
export function maybeDeselectOtherOptions(newlySelectedOption: HTMLInputElement): void {
  const form = newlySelectedOption.form
  const name = newlySelectedOption.name

  // We can only safely automate single-selection handling if the options are associated with a form
  // and they have been given the same name. Also, we only deselect other options if the newly selected
  // option is an "exclusive" option, meaning it has `data-exclusive="true"`.
  if (isExclusiveOption(newlySelectedOption) && form && name) {
    const formControlsWithSameName = form.elements.namedItem(name)
    // If we have an instance of RadioNodeList, we have more than one form control with the same
    // name (this is expected for a option select that has multiple options). We want to uncheck
    // each of these, except for `newlySelectedOption`.
    if (formControlsWithSameName instanceof RadioNodeList) {
      formControlsWithSameName.forEach((control) => {
        if (newlySelectedOption !== control && control.checked) {
          control.checked = false
        }
      })
    }
  }
}
