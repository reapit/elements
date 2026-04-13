import { useEffect, useRef } from 'react'
import { createIntersectionCallback } from './create-intersection-callback'
import { onScrollEnd } from './on-scroll-end'
import { scrollToItem } from './scroll-to-item'

import type { MutableRefObject, RefObject } from 'react'

export namespace useCarouselScroll {
  export interface Options {
    /** The `id` of the controlled active item. When provided, the carousel scrolls to this item on change. */
    value?: string
    /** The `id` of the item to scroll to on mount in uncontrolled mode. When omitted, the first item is visible via CSS scroll-snap but no `onChange` fires on mount. */
    defaultValue?: string
    /** Called when the visible item changes — either by swipe or programmatic navigation. */
    onChange?: (id: string) => void
    /**
     * Shared ref that this hook keeps up to date with the `id` of the currently visible item.
     * Buttons read this ref to find the sibling to scroll to without requiring a state update.
     */
    activeItemRef: MutableRefObject<string | undefined>
  }
}

/**
 * Manages scroll-snap-based carousel behaviour for a horizontally scrolling container.
 *
 * Responsibilities:
 * - Scrolls to `value` on mount (instant) and when `value` changes (smooth).
 * - Uses `IntersectionObserver` to track which item is in view, manage `inert`,
 *   and keep `activeItemRef` current.
 * - Fires `onChange` via a `scrollend` listener once the scroll settles, naturally
 *   skipping intermediate items without any flag management.
 * - Uses `ResizeObserver` to re-snap the container to the correct item after a resize.
 */
export function useCarouselScroll(
  containerRef: RefObject<HTMLDivElement>,
  { activeItemRef, defaultValue, onChange, value }: useCarouselScroll.Options,
): void {
  // Capture defaultValue at mount time so later changes to the prop (e.g. via
  // Storybook controls) do not cause the carousel to scroll. This matches the
  // semantics of the HTML defaultValue / defaultChecked pattern: the prop only
  // determines the initial state, not the ongoing state.
  const initialDefaultValueRef = useRef(defaultValue)
  const targetValue = value ?? initialDefaultValueRef.current

  // When the MutationObserver fires onChange (active item removed), the parent
  // may call setState, which re-renders and changes `value`, which would trigger
  // the scroll effect below — fighting the already-in-progress instant snap.
  // This flag lets the scroll effect skip the redundant scrollIntoView.
  const isObserverChangeRef = useRef(false)

  // Refs that always hold the latest props without being effect dependencies.
  // Assigning during render (not in an effect) guarantees they are current before
  // any effect reads them. This keeps the detectItemInView effect dependency list
  // stable so the IntersectionObserver, MutationObserver, and scrollend listener
  // are not torn down and recreated on every controlled value change.
  const valueRef = useRef(value)
  valueRef.current = value

  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  // Tracks the last id reported via onChange. Seeded with the initial active
  // item id (targetValue) so that a snap-back to the starting item is correctly
  // suppressed in both uncontrolled (defaultValue) and controlled modes.
  // Updated whenever onChange fires to prevent redundant calls when scroll-snap
  // returns the user to an already-reported item.
  const lastEmittedRef = useRef<string | undefined>(targetValue)

  // Tracks whether the initial programmatic scroll has been performed.
  // - Starts false when there is a targetValue, so the first scroll is instant.
  // - Starts true when there is no targetValue (fully uncontrolled), because no
  //   initial scroll occurs and subsequent swipe-driven scrolls are not relevant.
  const hasScrolledToInitialValueRef = useRef(targetValue === undefined)

  // Scroll to item on mount (instant) and on controlled value change (smooth).
  useEffect(
    function scrollToValue() {
      const container = containerRef.current
      if (!container) return
      if (!targetValue) return

      // Keep activeItemRef current even on the isObserverChange early-return path,
      // so button navigation reads the correct active item after a swipe.
      activeItemRef.current = targetValue

      // Skip programmatic scroll when the value change was triggered by the
      // MutationObserver (active item removed). The instant snap is already done;
      // calling scrollIntoView would fight it.
      if (isObserverChangeRef.current) {
        isObserverChangeRef.current = false
        return
      }

      scrollToItem(container, targetValue, { isMounted: hasScrolledToInitialValueRef.current })
      hasScrolledToInitialValueRef.current = true
    },
    [containerRef, targetValue],
  )

  // IntersectionObserver — track which item is in view (inert + activeItemRef).
  // MutationObserver — keep the IntersectionObserver in sync when children are
  // added or removed (e.g. when the consumer filters the visible items).
  // scrollend — fire onChange once the scroll settles (skips intermediates naturally).
  useEffect(
    function detectItemInView() {
      const container = containerRef.current
      if (!container) return

      const callback = createIntersectionCallback({
        container,
        activeItemRef,
      })

      const observer = new IntersectionObserver(callback, { root: container, threshold: 0.5 })

      const items = Array.from(container.children)
      for (const item of items) {
        observer.observe(item)
      }

      // Fire onChange when the scroll settles. activeItemRef is kept current by
      // the IntersectionObserver callback, so reading it here gives the item that
      // is actually in view after the animation finishes — naturally skipping any
      // intermediate items that momentarily crossed the 0.5 threshold during a
      // programmatic smooth scroll.
      const removeScrollEndListener = onScrollEnd(container, () => {
        const settledId = activeItemRef.current
        if (settledId && settledId !== valueRef.current && settledId !== lastEmittedRef.current) {
          lastEmittedRef.current = settledId
          onChangeRef.current?.(settledId)
        }
      })

      const mutationObserver = new MutationObserver((mutations) => {
        let activeItemRemoved = false

        for (const mutation of mutations) {
          for (const node of mutation.removedNodes) {
            if (!(node instanceof Element)) continue
            observer.unobserve(node)
            if ((node as HTMLElement).id === activeItemRef.current) {
              activeItemRemoved = true
            }
          }

          for (const node of mutation.addedNodes) {
            if (!(node instanceof Element)) continue
            observer.observe(node)
          }
        }

        // When the active item is removed, snap instantly to the first remaining
        // child and treat it as the new active item.
        if (activeItemRemoved) {
          const firstChild = container.firstElementChild as HTMLElement | null
          if (!firstChild) {
            activeItemRef.current = undefined
            return
          }

          // Update inert state: all children except the first are inert.
          const allItems = Array.from(container.children) as HTMLElement[]
          for (const item of allItems) {
            if (item === firstChild) {
              item.removeAttribute('inert')
            } else {
              item.inert = true
            }
          }

          firstChild.scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'start' })

          const newId = firstChild.id
          if (newId && newId !== activeItemRef.current) {
            activeItemRef.current = newId
            lastEmittedRef.current = newId
            // Set the flag before calling onChange so that the scroll effect
            // triggered by the controlled value update skips its scrollIntoView
            // call and does not fight the instant snap already performed above.
            isObserverChangeRef.current = true
            onChangeRef.current?.(newId)
          }
        } else {
          // The active item is still present. Reconcile inert across all
          // children so that any newly added off-screen items are inert
          // immediately, rather than waiting for the IntersectionObserver to
          // process a non-intersecting entry.
          const activeId = activeItemRef.current
          if (activeId) {
            const allItems = Array.from(container.children) as HTMLElement[]
            for (const item of allItems) {
              if (item.id === activeId) {
                item.removeAttribute('inert')
              } else {
                item.inert = true
              }
            }
          }
        }
      })

      mutationObserver.observe(container, { childList: true })

      return () => {
        observer.disconnect()
        mutationObserver.disconnect()
        removeScrollEndListener()
      }
    },
    [containerRef, activeItemRef],
  )

  // ResizeObserver — re-snap to the current item after a container resize.
  useEffect(
    function snapToItemAfterResize() {
      const container = containerRef.current
      if (!container) return

      const resizeObserver = new ResizeObserver(() => {
        const currentId = activeItemRef.current
        if (!currentId) return
        const itemEl = container.querySelector(`#${CSS.escape(currentId)}`)
        itemEl?.scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'start' })
      })

      resizeObserver.observe(container)

      return () => {
        resizeObserver.disconnect()
      }
    },
    [containerRef, activeItemRef],
  )
}
