import syncTextAreaHeight from './sync-textarea-height'
import { useLayoutEffect } from 'react'

import type { RefObject } from 'react'

type UseResizeTextAreaEffectConfig = {
  isEnabled: boolean
  shadowTextAreaRef: RefObject<HTMLTextAreaElement>
  textAreaRef: RefObject<HTMLTextAreaElement>
  value?: unknown
}

export default function useResizeTextAreaEffect({
  isEnabled,
  shadowTextAreaRef,
  textAreaRef,
  value,
}: UseResizeTextAreaEffectConfig): void {
  useLayoutEffect(
    function syncTextAreaHeightEffect() {
      if (isEnabled && textAreaRef.current && shadowTextAreaRef.current) {
        syncTextAreaHeight(shadowTextAreaRef.current, textAreaRef.current)
      }
    },
    // NOTE: We include `value` here to ensure this effect runs every time it changes. This allows
    // us to handle resizing of the text area when its value is controlled.
    [isEnabled, shadowTextAreaRef, textAreaRef, value],
  )
}
