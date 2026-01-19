import { prioritiseByVariantAndDOMOrder } from './prioritiseByVariantAndDOMOrder'
import { useCallback, useEffect, useRef } from 'react'
import { useMutationObserver } from '#src/utils/mutation-observer'

import type { AlertBannerPrioritiser } from './prioritiseByVariantAndDOMOrder'
import type { HTMLAttributes } from 'react'

type AttributesToOmit = never

export namespace AlertBannerOutlet {
  /** A function that determines which banner should be displayed when multiple banners are present. */
  export type Prioritiser = AlertBannerPrioritiser

  export interface Props extends Omit<HTMLAttributes<HTMLDivElement>, AttributesToOmit> {
    /** Unique identifier for this outlet */
    id?: string
    /** Callback function to determine which banner to show from all available banners */
    prioritise?: Prioritiser
  }
}

export const DEFAULT_OUTLET_ID = 'alert-banner-outlet'

/**
 * An outlet container that manages the visibility of multiple AlertBanner components,
 * showing only the highest priority banner at any given time.
 *
 * When multiple banners are present, the outlet uses a priority function to determine
 * which banner to display. By default, error banners have highest priority, followed
 * by warning, then info. For banners of the same variant, the last one in DOM order wins.
 *
 * @example
 * <AlertBannerOutlet>
 *   <AlertBanner variant="info">Info message</AlertBanner>
 *   <AlertBanner variant="error">Error message</AlertBanner>
 * </AlertBannerOutlet>
 * // Only the error banner will be visible
 */
export function AlertBannerOutlet({
  'aria-live': ariaLive = 'polite',
  children,
  id = DEFAULT_OUTLET_ID,
  prioritise = prioritiseByVariantAndDOMOrder,
  ...rest
}: AlertBannerOutlet.Props) {
  const ref = useRef<HTMLDivElement>(null)

  const showMostImportantAlert = useCallback(() => {
    if (ref.current) {
      showMostImportantByPriority(ref.current, prioritise)
    }
  }, [prioritise])

  useEffect(
    function immediatelyShowMostImportantOnMount() {
      if (ref.current) {
        showMostImportantAlert()
      }
    },
    [showMostImportantAlert],
  )

  useMutationObserver(ref, showMostImportantAlert, observerOptions)

  return (
    <div {...rest} aria-live={ariaLive} id={id} ref={ref}>
      {children}
    </div>
  )
}

const observerOptions: MutationObserverInit = {
  childList: true,
}

function showMostImportantByPriority(outlet: HTMLElement, prioritise: AlertBannerOutlet.Prioritiser) {
  const banners = Array.from(outlet.children).filter((x): x is HTMLElement => x instanceof HTMLElement)

  const mostImportant = prioritise(banners)

  for (const banner of banners) {
    banner.toggleAttribute('hidden', banner !== mostImportant)
  }
}
