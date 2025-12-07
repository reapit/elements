import { isHeightTruncated } from './is-height-truncated'
import { useLayoutEffect, useState } from 'react'

/**
 * Determines if the element with the given ID is truncated. Accepts dependencies for
 * re-calculating whether the element's content is truncated.
 */
export function useIsHeightTruncated(truncationTargetId: string, dependencies: unknown[] = []): boolean {
  const [isTruncated, setIsTruncated] = useState(false)

  useLayoutEffect(
    function observeElementForTruncation() {
      const element = document.getElementById(truncationTargetId)

      if (element) {
        // Determine initial truncation state
        setIsTruncated(isHeightTruncated(element))

        // Observe element for size changes to ensure we update our truncation state
        const observer = new ResizeObserver(() => {
          setIsTruncated(isHeightTruncated(element))
        })

        observer.observe(element)

        return () => {
          observer.disconnect()
        }
      }
    },
    [...dependencies, truncationTargetId],
  )

  return isTruncated
}
