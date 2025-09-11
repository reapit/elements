import { useTheme } from './use-theme'

import type { ReactNode } from 'react'
import type { Theme } from '#src/tokens'

export namespace ThemeProvider {
  export interface Props {
    children: ReactNode
    theme: Theme
  }
}

/**
 * Used to apply a specific theme to the current document.
 *
 * Theming is facilitated via a `data-theme` attribute on the document's root element (the `<html>` element for
 * HTML documents). This attribute influences the values applied to the CSS variables used by components within
 * Elements.
 *
 * This component should be used once at the root of the application and will only have an effect if a theme is not
 * already configured via a `data-theme` attribute on the document's root element.
 *
 * It is also possible to use the `useTheme` hook directly if you'd prefer to interact with a hook-based API, or to
 * manually set the `data-theme` attribute on the document's root element in HTML document.
 */
export function ThemeProvider({ children, theme }: ThemeProvider.Props) {
  useTheme(theme)
  return children
}
