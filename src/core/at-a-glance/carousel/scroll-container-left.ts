/**
 * Scrolls a container element to the left by its visible width.
 *
 * This function finds an element by its ID and scrolls it left by the element's
 * `clientWidth` using smooth scrolling behavior. If the element is not found,
 * the function does nothing.
 *
 * @param containerId - The ID of the container element to scroll
 *
 * @example
 * ```tsx
 * <button onClick={() => scrollContainerLeft('my-carousel')}>
 *   Previous
 * </button>
 * <div id="my-carousel">...</div>
 * ```
 */
export function scrollContainerLeft(containerId: string): void {
  const element = document.getElementById(containerId)
  if (element) {
    element.scrollBy({ left: -element.clientWidth, behavior: 'smooth' })
  }
}
