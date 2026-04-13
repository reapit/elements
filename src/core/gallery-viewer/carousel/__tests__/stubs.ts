// JSDOM does not implement IntersectionObserver, ResizeObserver, or MutationObserver.
// Call setupBrowserStubs() at the top level of any test file that needs them.
// It installs beforeEach/afterEach hooks and returns accessors for the mocks.
export function setupBrowserStubs() {
  let intersectionCallback: IntersectionObserverCallback | undefined
  let observedElements: Element[] = []
  let unobservedElements: Element[] = []

  let mutationCallback: MutationCallback | undefined

  // All elements that register a 'scroll' or 'scrollend' listener during the test.
  // Tests call fireScrollEnd() which dispatches a synthetic event on all of them.
  // We collect all targets (not just the first) because React's event delegation
  // registers a 'scroll' listener on the RTL root container before onScrollEnd
  // registers its own listener on the carousel track — we must fire to both.
  const scrollEndTargets = new Set<HTMLElement>()

  const OriginalIntersectionObserver = globalThis.IntersectionObserver
  const OriginalResizeObserver = globalThis.ResizeObserver
  const OriginalMutationObserver = globalThis.MutationObserver
  const originalAddEventListener = HTMLElement.prototype.addEventListener

  beforeEach(() => {
    intersectionCallback = undefined
    observedElements = []
    unobservedElements = []
    mutationCallback = undefined
    scrollEndTargets.clear()

    globalThis.IntersectionObserver = class MockIntersectionObserver {
      constructor(callback: IntersectionObserverCallback) {
        intersectionCallback = callback
      }
      observe(el: Element) {
        observedElements.push(el)
      }
      disconnect() {}
      unobserve(el: Element) {
        unobservedElements.push(el)
      }
    } as unknown as typeof IntersectionObserver

    globalThis.ResizeObserver = class MockResizeObserver {
      observe() {}
      disconnect() {}
      unobserve() {}
    } as unknown as typeof ResizeObserver

    globalThis.MutationObserver = class MockMutationObserver {
      constructor(callback: MutationCallback) {
        mutationCallback = callback
      }
      observe() {}
      disconnect() {}
      takeRecords() {
        return []
      }
    } as unknown as typeof MutationObserver

    // Collect every element that registers a 'scroll' or 'scrollend' listener.
    // Tests call fireScrollEnd() which dispatches a synthetic scroll event on all
    // of them. This catches both React's event-delegation listener (on the RTL
    // root container) and the onScrollEnd listener (on the carousel track) — we
    // need the event to reach the track's debounce handler. All listeners are
    // forwarded to the real addEventListener so they fire normally.
    HTMLElement.prototype.addEventListener = function (
      type: string,
      listener: EventListenerOrEventListenerObject,
      ...rest: unknown[]
    ) {
      if (type === 'scrollend' || type === 'scroll') {
        scrollEndTargets.add(this)
      }
      return originalAddEventListener.call(this, type, listener, ...(rest as []))
    }
  })

  afterEach(() => {
    globalThis.IntersectionObserver = OriginalIntersectionObserver
    globalThis.ResizeObserver = OriginalResizeObserver
    globalThis.MutationObserver = OriginalMutationObserver
    HTMLElement.prototype.addEventListener = originalAddEventListener
  })

  return {
    getIntersectionCallback: () => intersectionCallback,
    getMutationCallback: () => mutationCallback,
    getObservedElements: () => observedElements,
    getUnobservedElements: () => unobservedElements,
    /**
     * Dispatch a synthetic scroll event on every element that registered a
     * scroll or scrollend listener. This reaches both React's event-delegation
     * container and the carousel track's onScrollEnd debounce handler.
     *
     * Note: JSDOM / happy-dom use the 'scroll' fallback (no native scrollend
     * support), so the event type is 'scroll'. The 50 ms debounce in onScrollEnd
     * means tests that use this helper also need vi.useFakeTimers() and
     * vi.runAllTimers() (or vi.advanceTimersByTime(60)) to advance past the
     * debounce.
     */
    fireScrollEnd: () => {
      for (const target of scrollEndTargets) {
        target.dispatchEvent(new Event('scroll', { bubbles: false }))
      }
    },
  }
}
