/**
 * Returns the label text from a Combobox option element using its `aria-labelledby` attribute.
 */
export function getOptionLabel(optionElement: Element): string {
  // NOTE: `ariaLabelledByElements` is a Baseline 2025 "Newly Available" feature. We check for it before use.
  if ("ariaLabelledByElements" in Element.prototype) {
    return optionElement.ariaLabelledByElements?.at(0)?.textContent ?? optionElement.textContent;
  }

  // Fall back to `getElementById` with the `aria-labelledby` attribute. The ComboboxOption
  // component always specifies exactly one ID.
  const labelElement = document.getElementById(optionElement.getAttribute("aria-labelledby")!);

  return labelElement?.textContent ?? optionElement.textContent;
}
