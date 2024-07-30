import syncTextAreaHeight from './sync-textarea-height'

import type { ChangeEvent, ChangeEventHandler, RefObject } from 'react'

type UseResizeTextAreaOnChangeConfig = {
  isEnabled: boolean
  shadowTextAreaRef: RefObject<HTMLTextAreaElement>
  textAreaRef: RefObject<HTMLTextAreaElement>
}

type UseResizeTextAreaOnChangeDecorator = (onChange?: ChangeEventHandler) => ChangeEventHandler

export default function useResizeTextAreaOnChange({
  isEnabled,
  shadowTextAreaRef,
  textAreaRef,
}: UseResizeTextAreaOnChangeConfig): UseResizeTextAreaOnChangeDecorator {
  return function decorateTextAreaChangeHandler(onChange?: ChangeEventHandler) {
    return function syncTextAreaHeightAfterOnChange(event: ChangeEvent) {
      onChange?.(event)
      // We sync the height _after_ calling the text area's own change handler because we want
      // to allow the handler to prevent this default auto-sizing behaviour.
      if (isEnabled && !event.defaultPrevented && textAreaRef.current && shadowTextAreaRef.current) {
        // NOTE: Since the text area's are uncontrolled, we need to manually sync the current value to
        // the shadow text area.
        shadowTextAreaRef.current.value = textAreaRef.current.value
        syncTextAreaHeight(shadowTextAreaRef.current, textAreaRef.current)
      }
    }
  }
}
