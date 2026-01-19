import { createPortal } from 'react-dom'
import { DEFAULT_OUTLET_ID } from '../outlet'
import { useEffect, useState } from 'react'

export namespace AlertBannerPortal {
  export interface Props {
    /** The ID of the AlertBannerOutlet to render children into. Defaults to the default outlet ID. */
    outletId?: string
    /** The content to render through the portal */
    children: React.ReactNode
  }
}

/**
 * Renders children into an AlertBannerOutlet via a React portal.
 *
 * The portal looks up the outlet by ID and renders children into it.
 * If no matching outlet exists, nothing renders, even if a matching outlet
 * becomes available in future.
 *
 * @example
 * <AlertBannerOutlet id="my-outlet" />
 * <AlertBannerPortal outletId="my-outlet">
 *   <AlertBanner variant="info">Message</AlertBanner>
 * </AlertBannerPortal>
 */
export function AlertBannerPortal({ children, outletId: id = DEFAULT_OUTLET_ID }: AlertBannerPortal.Props) {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    // Check if the outlet exists by ID lookup
    const outlet = document.getElementById(id)
    setPortalElement(outlet)
  }, [id])

  // Don't render anything if the outlet doesn't exist
  if (!portalElement) {
    return null
  }

  return createPortal(children, portalElement)
}
