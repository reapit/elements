/**
 * Scrolls a carousel item into view with the correct scroll behaviour.
 *
 * - First mount (`isMounted: false`): instant, so the initial position is set
 *   without a visible scroll animation.
 * - Subsequent programmatic changes (`isMounted: true`): smooth, unless the
 *   user has requested reduced motion.
 *
 * Returns `false` when `targetId` is not found inside `container`.
 */
export function scrollToItem(
  container: HTMLElement,
  targetId: string,
  { isMounted }: { isMounted: boolean },
): boolean {
  const itemEl = container.querySelector(`#${CSS.escape(targetId)}`);
  if (!itemEl) return false;

  let behavior: ScrollBehavior = "instant";

  if (isMounted) {
    behavior = "smooth";
    if (globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      behavior = "instant";
    }
  }

  itemEl.scrollIntoView({ behavior, block: "nearest", inline: "start" });
  return true;
}
