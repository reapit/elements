import type { MutableRefObject } from 'react'

export interface CreateIntersectionCallbackOptions {
  container: HTMLElement
  activeItemRef: MutableRefObject<string | undefined>
  isObserverChangeRef: MutableRefObject<boolean>
  onChange?: (id: string) => void
}

/**
 * Returns an `IntersectionObserverCallback` that:
 * - Removes `inert` from the item that has scrolled into view and adds it to
 *   all other items (direct children of `container`).
 * - Fires `onChange` when a new item becomes visible, but only once a previous
 *   active item is known (`activeItemRef.current !== undefined`). This suppresses
 *   the initial observation on mount — where `activeItemRef` is seeded with the
 *   initial target — from triggering a spurious change event in the fully
 *   uncontrolled case (no `value` and no `defaultValue`).
 * - Sets `isObserverChangeRef.current = true` before calling `onChange` so
 *   the scroll effect in `useCarouselScroll` can skip the redundant
 *   `scrollIntoView` that would otherwise fight the snap animation. The flag
 *   is only set when `onChange` is provided — without it there is no
 *   observer-driven re-render that could cause a scroll conflict.
 */
export function createIntersectionCallback({
  container,
  activeItemRef,
  isObserverChangeRef,
  onChange,
}: CreateIntersectionCallbackOptions): IntersectionObserverCallback {
  return (entries) => {
    for (const entry of entries) {
      const target = entry.target as HTMLElement

      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        // Mark all items: remove inert from the visible one, add to the rest.
        // TODO: replace with CSS `interactivity: inert` / `interactivity: auto` once
        // browser support is sufficient (currently Chrome/Edge 135+ only, no Firefox/Safari).
        // https://caniuse.com/mdn-css_properties_interactivity
        const allItems = Array.from(container.children) as HTMLElement[]
        for (const item of allItems) {
          if (item === target) {
            item.removeAttribute('inert')
          } else {
            item.inert = true
          }
        }

        if (target.id && target.id !== activeItemRef.current) {
          // hadPreviousItem distinguishes a genuine swipe (where a previous item
          // was known) from the initial observation in the fully uncontrolled case
          // (where activeItemRef starts as undefined). onChange is only fired in
          // the former case.
          const hadPreviousItem = activeItemRef.current !== undefined
          activeItemRef.current = target.id
          if (hadPreviousItem && onChange) {
            isObserverChangeRef.current = true
            onChange(target.id)
          }
        }
      }
    }
  }
}
