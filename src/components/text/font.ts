import type { FontSize, FontWeight } from './types'

/**
 * A helper function for generating a collection of font-related CSS properties for a given font size and
 * weight. The generated string is self-terminating, so there's no need to add a semicolon after interpolating
 * the result into a `css` or `styled` template literal.
 *
 * Importantly, this function intentionally avoids support for text colour. This is because Design System
 * components should have component-specific CSS variables for their text colour. This is not the case for
 * font styles.
 *
 * @param size - The size of the text
 * @param weight - The weight of the text
 * @returns A string of CSS properties for the text
 */
export function font(size: FontSize, weight: FontWeight) {
  const fontFamily = `var(--font-${size}-${weight}-family)`
  const fontSize = `var(--font-${size}-${weight}-size)`
  const fontWeight = `var(--font-${size}-${weight}-weight)`
  const letterSpacing = `var(--font-${size}-${weight}-letter_spacing)`
  const lineHeight = `var(--font-${size}-${weight}-line_height)`

  return `
    /* text-${size}/${weight} */
    font: ${fontWeight} ${fontSize}/${lineHeight} ${fontFamily};
    letter-spacing: ${letterSpacing};
  `
}
