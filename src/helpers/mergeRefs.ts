import type { MutableRefObject, Ref, RefCallback } from 'react'

/**
 * Assigns a value to a ref function or object
 */
function assignRef<T = unknown>(ref: Ref<T> | RefCallback<T>, value: T) {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref) {
    ;(ref as MutableRefObject<T>).current = value
  }
}

/**
 * Combine multiple React refs into a single ref function. This is used mostly when you
 * need to allow consumers to forward refs to an internal component that is already
 * receiving a ref.
 */
export default function mergeRefs<T = unknown>(...refs: Array<Ref<T> | RefCallback<T>>): RefCallback<T> {
  return (node) => {
    refs.forEach((ref) => assignRef(ref, node))
  }
}
