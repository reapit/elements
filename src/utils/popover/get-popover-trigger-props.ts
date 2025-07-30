interface GetPopoverTriggerPropsInput {
  popoverTarget: string
  popoverTargetAction: 'hide' | 'show' | 'toggle'
}

interface GetPopoverTriggerPropsOutput {
  popovertarget: string
  popovertargetaction: 'hide' | 'show' | 'toggle'
}

/**
 * React 18 does not support the HTML attributes involved in the
 * [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API). This helper
 * provides a way for consumers to use them without incurring TS prop type errors or React
 * development runtime errors.
 *
 * The input properties match React 19's type definitions for the popover attributes. See
 * [@types/react](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/69670/files#diff-d0d8d4879e505e2bd1813a8e662eeedbdf85c1fae8b76c4dff609bb5bcfe3a98R128)
 *
 * The output properties are all lowercase so that React 18 will pass them through to the
 * underlying DOM element without throwing a runtime error about unrecognised attributes.
 *
 * @returns popover trigger attributes for use in React 18 consumers.
 */
export function getPopoverTriggerProps({
  popoverTarget,
  popoverTargetAction,
}: GetPopoverTriggerPropsInput): GetPopoverTriggerPropsOutput {
  return {
    popovertarget: popoverTarget,
    popovertargetaction: popoverTargetAction,
  }
}
