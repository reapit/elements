export function shouldBeOpen(detailsElement: HTMLDetailsElement): boolean {
  // If the details element is active or has a descendant representing the current page, it should be open.
  return isActive(detailsElement) || hasCurrentPageElement(detailsElement)
}

/** Returns true if data-is-active="true" attribute is present  */
function isActive(detailsElement: HTMLDetailsElement): boolean {
  return detailsElement.dataset.isActive === 'true'
}

/** Returns true if a descendant represents the current page  */
function hasCurrentPageElement(detailsElement: HTMLDetailsElement): boolean {
  return !!detailsElement.querySelector('[aria-current="page"]')
}
