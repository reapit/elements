import { getReactMajor } from '#src/utils/react-version'
import type { IsReact19 } from '#src/utils/react-version'

/**
 * Adapts Popover API trigger attributes for the installed React version.
 *
 * React 19 added first-class support for the
 * [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
 * and expects camelCase attribute names (`popoverTarget`, `popoverTargetAction`).
 * React 18 lacks these types and requires lowercase names (`popovertarget`,
 * `popovertargetaction`) so the attributes are passed through to the DOM without
 * runtime warnings.
 *
 * This function detects the installed React version at runtime and returns the
 * appropriately cased attributes. The return type also adjusts at the type level
 * based on which version of `@types/react` the consumer has installed.
 *
 * Input properties match React 19's type definitions for popover attributes. See
 * [@types/react](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/69670/files#diff-d0d8d4879e505e2bd1813a8e662eeedbdf85c1fae8b76c4dff609bb5bcfe3a98R128)
 */
export function getPopoverTriggerProps({
  id,
  popoverTarget,
  popoverTargetAction,
}: getPopoverTriggerProps.Input): getPopoverTriggerProps.Output {
  if (getReactMajor() >= 19) {
    return { id, popoverTarget, popoverTargetAction } as unknown as getPopoverTriggerProps.Output
  }

  return {
    id,
    popovertarget: popoverTarget,
    popovertargetaction: popoverTargetAction,
  } as getPopoverTriggerProps.Output
}

export namespace getPopoverTriggerProps {
  export interface Input {
    id: string
    popoverTarget: string
    popoverTargetAction: 'hide' | 'show' | 'toggle'
  }

  /**
   * Returns camelCase attributes for React 19 consumers (`popoverTarget`,
   * `popoverTargetAction`) and lowercase attributes for React 18 consumers
   * (`popovertarget`, `popovertargetaction`).
   */
  export type Output = IsReact19 extends true
    ? {
        id: string
        popoverTarget: string
        popoverTargetAction: 'hide' | 'show' | 'toggle'
      }
    : {
        id: string
        popovertarget: string
        popovertargetaction: 'hide' | 'show' | 'toggle'
      }
}
