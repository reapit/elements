import { useCallback } from 'react'
import type { ReactEventHandler } from 'react'

export function useWithStopPropagation<TElement extends HTMLElement>(
  handler?: ReactEventHandler<TElement>,
): ReactEventHandler<TElement> {
  return useCallback<ReactEventHandler<TElement>>(
    (event) => {
      event.stopPropagation()
      handler?.(event)
    },
    [handler],
  )
}
