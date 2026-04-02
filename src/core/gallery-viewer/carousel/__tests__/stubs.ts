// JSDOM does not implement IntersectionObserver, ResizeObserver, or MutationObserver.
// Call setupBrowserStubs() at the top level of any test file that needs them.
// It installs beforeEach/afterEach hooks and returns accessors for the mocks.
export function setupBrowserStubs() {
  let intersectionCallback: IntersectionObserverCallback | undefined
  let observedElements: Element[] = []
  let unobservedElements: Element[] = []

  let mutationCallback: MutationCallback | undefined

  const OriginalIntersectionObserver = globalThis.IntersectionObserver
  const OriginalResizeObserver = globalThis.ResizeObserver
  const OriginalMutationObserver = globalThis.MutationObserver

  beforeEach(() => {
    intersectionCallback = undefined
    observedElements = []
    unobservedElements = []
    mutationCallback = undefined

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
  })

  afterEach(() => {
    globalThis.IntersectionObserver = OriginalIntersectionObserver
    globalThis.ResizeObserver = OriginalResizeObserver
    globalThis.MutationObserver = OriginalMutationObserver
  })

  return {
    getIntersectionCallback: () => intersectionCallback,
    getMutationCallback: () => mutationCallback,
    getObservedElements: () => observedElements,
    getUnobservedElements: () => unobservedElements,
  }
}
