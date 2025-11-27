import { getListboxSelectedOptions, getListboxValue } from './dom-helpers'
import { useCallback, useEffect, useRef } from 'react'
import { useMutationObserver } from '#src/utils/mutation-observer'
import { getListboxSelectId } from './get-select-id'

/**
 * Observes selection changes in a listbox and invokes a callback with the selected options.
 *
 * Uses a MutationObserver to watch `aria-checked` and `aria-selected` attributes within the
 * listbox, triggering the callback whenever selection state changes. Invokes the callback on
 * initial mount to capture the initial selection state.
 *
 * Also observes the native `<select>` element within the listbox, triggering the callback
 * whenever the selected option changes. This ensures changes to the select's value that don't
 * result in attribute changes to the listbox's visible options are observed.
 *
 * Handles unstable callback references with a ref, preventing unnecessary re-observation when
 * the callback reference changes but the listbox ID remains constant.
 */
export function useListboxSelectionObserver(
  listboxId: string,
  callback: (visibleOptions: HTMLButtonElement[], listboxState: readonly string[]) => void,
): void {
  const callbackRef = useRef(callback)

  // Syncs the callback to our ref to prevent `observeSelectedOptions` from being invalidated
  // too often when consumers provide unstable callbacks.
  // NOTE: The mutation observer fires before the callback syncs, because the DOM updates
  // before the effect runs.
  useEffect(
    function syncCallbackRef() {
      callbackRef.current = callback
    },
    [callback],
  )

  // Ignores the mutation records; we only need to know when a change occurs to update
  // the consumer with the new selected options.
  // TODO: Replace useCallback with useEffectEvent when we upgrade to React 19
  const observeSelectedOptions = useCallback(() => {
    const listboxElement = document.getElementById(listboxId)
    if (listboxElement) {
      const listboxState = getListboxValue(listboxId)
      const visibleOptions = getListboxSelectedOptions(listboxElement)
      callbackRef.current(visibleOptions, listboxState)
    }
  }, [listboxId])

  // The mutation observer fires only for changes after the initial render. We observe
  // the initially selected options to let consumers act on that state immediately.
  useEffect(function observeInitialSelection() {
    observeSelectedOptions()
    /* eslint-disable-next-line react-hooks/exhaustive-deps -- won't be necessary once we have useEffectEvent */
  }, [])

  useMutationObserver(listboxId, observeSelectedOptions, listboxObserverOptions)
  useMutationObserver(getListboxSelectId(listboxId), observeSelectedOptions, listboxSelectObserverOptions)
}

/**
 * Configuration for the MutationObserver that watches for attribute changes on listbox
 * descendants. Monitors only `aria-checked` and `aria-selected` attributes throughout
 * the listbox subtree.
 */
const listboxObserverOptions: MutationObserverInit = {
  // Observe attribute changes
  attributeFilter: ['aria-checked', 'aria-selected'],
  // Observe full subtree
  subtree: true,
}

/**
 * Configuration for the MutationObserver that watches for the addition or removal
 * of native options from the listbox's native <select> element.
 */
const listboxSelectObserverOptions: MutationObserverInit = {
  // Observe addition/removal of child elements (the native <option> elements)
  childList: true,
}
