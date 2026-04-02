// JSDOM does not implement IntersectionObserver or ResizeObserver.
// Call setupBrowserStubs() at the top level of any test file that needs them.
// It installs beforeEach/afterEach hooks and returns accessors for the mocks.
export function setupBrowserStubs() {
  let intersectionCallback: IntersectionObserverCallback | undefined
  let observedElements: Element[] = []

  const OriginalIntersectionObserver = globalThis.IntersectionObserver
  const OriginalResizeObserver = globalThis.ResizeObserver

  beforeEach(() => {
    intersectionCallback = undefined
    observedElements = []

    globalThis.IntersectionObserver = class MockIntersectionObserver {
      constructor(callback: IntersectionObserverCallback) {
        intersectionCallback = callback
      }
      observe(el: Element) {
        observedElements.push(el)
      }
      disconnect() {}
      unobserve() {}
    } as unknown as typeof IntersectionObserver

    globalThis.ResizeObserver = class MockResizeObserver {
      observe() {}
      disconnect() {}
      unobserve() {}
    } as unknown as typeof ResizeObserver
  })

  afterEach(() => {
    globalThis.IntersectionObserver = OriginalIntersectionObserver
    globalThis.ResizeObserver = OriginalResizeObserver
  })

  return {
    getIntersectionCallback: () => intersectionCallback,
    getObservedElements: () => observedElements,
  }
}
