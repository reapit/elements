import { useEffect, useState } from 'react'

/**
 * A hook to manage the state of a top nav menu item
 * internal state always tailor to the external isActive state
 *
 * @param isActive - The initial state of the top nav item
 * @returns A tuple of [isExpanded, setIsExpanded]
 */
export const useTopNavMenuExpandableState = (isActive: boolean) => {
  const [isExpanded, setIsExpanded] = useState(isActive)

  // NOTE: make the internal state to always tailor to the external isActive state
  useEffect(() => {
    setIsExpanded(isActive)
  }, [isActive])

  return [isExpanded, setIsExpanded] as const
}
