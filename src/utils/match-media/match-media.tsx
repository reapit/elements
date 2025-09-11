import { useMatchMedia } from './use-match-media'

import type { ReactNode } from 'react'

export namespace MatchMedia {
  export interface Props {
    /** The media query condition to match against (e.g., "(min-width: 768px)", "(prefers-color-scheme: dark)") */
    condition: string
    /** The content to render when the media query matches */
    children: ReactNode
  }
}

/**
 * @deprecated Use `MatchMedia.Props` instead.
 */
export type MatchMediaProps = MatchMedia.Props

/**
 * A component that conditionally renders its children based on a media query condition. Uses the
 * [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) Web API to determine if the
 * condition matches the current viewport.
 *
 * `useMatchMedia` is also available if you want a hook API rather than a component.
 */
export function MatchMedia({ condition, children }: MatchMedia.Props) {
  const matches = useMatchMedia(condition)
  return matches ? children : null
}
