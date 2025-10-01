interface HandleSelectAllOptions {
  rowCheckboxName: string
}

export function handleSelectAll(target: HTMLInputElement, { rowCheckboxName }: HandleSelectAllOptions): void {
  if (!target.form) {
    throw new Error(
      ' select all checkboxes must be associated with a form. Add a `form` attribute to the checkbox that matches the `id` of the bulk action form it should be submitted with.',
    )
  }

  // NOTE: we are blindly assuming the input elements are checkboxes, but this may not be the case.
  // All we have are input elements that all have a particular `name`; this does not necessarily mean
  // they are actually checkbox-type inputs.
  const rowCheckboxes = target.form.elements.namedItem(rowCheckboxName)

  // Make all row checkboxes have the same checked state as the select all checkbox.
  if (rowCheckboxes instanceof RadioNodeList) {
    rowCheckboxes.forEach((rowCheckbox) => {
      rowCheckbox.checked = target.checked
    })
  } else if (rowCheckboxes instanceof HTMLInputElement) {
    rowCheckboxes.checked = target.checked
  }
}

interface HandleSelectRowOptions {
  rowCheckboxName: string
  selectAllCheckboxName: string
}

function handleSelectRow(
  target: HTMLInputElement,
  { rowCheckboxName, selectAllCheckboxName }: HandleSelectRowOptions,
): void {
  if (!target.form) {
    throw new Error(
      ' row checkboxes must be associated with a form. Add a `form` attribute to the checkbox that matches the `id` of the bulk action form it should be submitted with.',
    )
  }

  // NOTE: we are blindly assuming the input element is a checkbox, but this may not be the case.
  // All we have is an input element that has a particular `name`; this does not necessarily mean
  // it is actually checkbox-type input.
  const selectAllCheckbox = target.form.elements.namedItem(selectAllCheckboxName)
  const rowCheckboxes = target.form.elements.namedItem(rowCheckboxName)

  if (rowCheckboxes instanceof RadioNodeList) {
    // There's many row checkboxes, so the select all's checked state will need to be checked if and only
    // if all rows are selected. If some, but not all, rows are selected, the select all checkbox should
    // be indeterminate but unchecked. This is important because clicking the select all checkbox when it
    // is indeterminate should result in all rows being selected, not deselected.
    const rowCheckboxArray = Array.from(rowCheckboxes)

    const areAllRowsSelected = rowCheckboxArray.every((row) => row.checked)
    const areSomeRowsSelected = rowCheckboxArray.some((row) => row.checked)

    if (selectAllCheckbox instanceof HTMLInputElement) {
      selectAllCheckbox.checked = areAllRowsSelected
      selectAllCheckbox.indeterminate = !areAllRowsSelected && areSomeRowsSelected
    }
  } else if (rowCheckboxes instanceof HTMLInputElement && selectAllCheckbox instanceof HTMLInputElement) {
    // There's only one row checkbox, so the select all's checked state just needs to match it.
    selectAllCheckbox.checked = target.checked
  }
}
