/**
 * Adapts Popover API attributes for React 18, which lacks support for the
 * [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API). Prevents
 * TypeScript errors and React runtime warnings.
 *
 * Input properties match React 19's type definitions for popover attributes. See
 * [@types/react](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/69670/files#diff-d0d8d4879e505e2bd1813a8e662eeedbdf85c1fae8b76c4dff609bb5bcfe3a98R128)
 *
 * Output properties use lowercase to allow React 18 to pass them through.
 *
 * @returns Popover trigger attributes for React 18.
 */
export function getPopoverTriggerProps({
  id,
  popoverTarget,
  popoverTargetAction,
}: getPopoverTriggerProps.Input): getPopoverTriggerProps.Output {
  return {
    id,
    popovertarget: popoverTarget,
    popovertargetaction: popoverTargetAction,
  }
}

export namespace getPopoverTriggerProps {
  export interface Input {
    id: string
    popoverTarget: string
    popoverTargetAction: 'hide' | 'show' | 'toggle'
  }

  export interface Output {
    id: string
    popovertarget: string
    popovertargetaction: 'hide' | 'show' | 'toggle'
  }
}
