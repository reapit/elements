import { useEffect, useState } from 'react'

export const useIsMobileNavItemExpanded = (isActive: boolean) => {
  const [isExpanded, setIsExpanded] = useState(isActive)

  // NOTE: make the internal state to always tailor to the external isActive state
  useEffect(() => {
    setIsExpanded(isActive)
  }, [isActive])

  return [isExpanded, setIsExpanded] as const
}
