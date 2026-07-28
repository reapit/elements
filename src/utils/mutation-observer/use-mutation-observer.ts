import { useEffect } from "react";
import type { RefObject } from "react";

/**
 * Creates a `MutationObserver` that invokes the supplied callback when DOM changes occur for the
 * referenced element. The observer will begin monitoring the DOM element immediately, and it will
 * automatically disconnect when the component (not the DOM element being observed) is unmounted.
 * It will also create a new `MutationObserver` and begin observing the specified DOM element whenever
 * the DOM element, callback, or options change.
 *
 * See MDN's [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
 * documentation for more information, as well as
 * [Smashing Magazine's guide](https://www.smashingmagazine.com/2019/04/mutationobserver-api-guide/).
 */
export function useMutationObserver(
  /** A mutable ref object attached to the DOM element that should be observed, or its ID. */
  refOrId: string | RefObject<HTMLElement>,
  /**
   * A _stable_ function which will be called on each DOM change that qualifies given the observed node or
   * subtree and options. The callback function takes as input two parameters:
   * - An array of [MutationRecord](https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord) objects,
   *   describing each change that occurred; and
   * - the [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
   *   that invoked the callback.
   */
  callback: MutationCallback,
  /**
   * A _stable_ object providing options that describe which DOM mutations should be reported to the observer's
   * callback. At a minimum, one of `childList`, `attributes`, and/or `characterData` must be `true`.
   * The full list of options available can be found
   * [here](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe#parameters)
   */
  options: MutationObserverInit,
) {
  useEffect(
    function observeElementWithMutationObserver() {
      const element =
        typeof refOrId === "string" ? document.getElementById(refOrId) : refOrId.current;

      if (element instanceof HTMLElement) {
        const observer = new MutationObserver(callback);

        observer.observe(element, options);

        // Any change to the element, callback or options requires that we process any pending
        // mutations that have not yet been passed to the observer's callback.
        return function disconnectMutationObserverFromElement() {
          const pendingMutations = observer.takeRecords();

          observer.disconnect();

          if (pendingMutations.length > 0) {
            callback(pendingMutations, observer);
          }
        };
      }
    },
    [refOrId, callback, options],
  );
}
