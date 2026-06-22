import { useLayoutEffect } from 'react'
import type { Theme } from '#src/tokens'

/**
 * Sets the theme for the current document. Note, this will override any `data-theme` value
 * that may already exist on the document's root element.
 *
 * @param theme The theme the current document should use.
 */
export function useTheme(theme: Theme) {
  useLayoutEffect(
    function setThemeForDocument() {
      const rootElement = globalThis.document.documentElement
      rootElement.setAttribute('data-theme', theme)
    },
    [theme],
  )
}
