/**
 * Scrolls the carousel track to the sibling of the currently active item.
 *
 * @param trackEl - The scrollable track container element.
 * @param activeItemId - The `id` of the currently visible carousel item.
 * @param direction - Which direction to scroll.
 * @returns `true` if a sibling was found and scrolled to, `false` otherwise.
 */
export function scrollToSibling(
  trackEl: HTMLElement,
  activeItemId: string,
  direction: "previous" | "next",
): boolean {
  const activeEl = trackEl.querySelector(`#${CSS.escape(activeItemId)}`);
  if (!activeEl) return false;

  const sibling =
    direction === "next" ? activeEl.nextElementSibling : activeEl.previousElementSibling;

  if (!sibling) return false;

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  sibling.scrollIntoView({
    behavior: prefersReducedMotion ? "instant" : "smooth",
    block: "nearest",
    inline: "start",
  });

  return true;
}
