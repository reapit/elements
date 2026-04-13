import type { MutableRefObject } from 'react'

export interface CreateIntersectionCallbackOptions {
  container: HTMLElement
  activeItemRef: MutableRefObject<string | undefined>
}

/**
 * Returns an `IntersectionObserverCallback` that:
 * - Removes `inert` from the item that has scrolled into view and adds it to
 *   all other items (direct children of `container`).
 * - Keeps `activeItemRef` current so that button navigation and the resize
 *   re-snap always operate on the correct item.
 *
 * `onChange` is intentionally absent from this callback. It is fired by the
 * `scrollend` listener in `useCarouselScroll` once the scroll settles, which
 * naturally skips intermediate items without any flag management.
 */
export function createIntersectionCallback({
  container,
  activeItemRef,
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

        if (target.id) {
          activeItemRef.current = target.id
        }
      }
    }
  }
}
