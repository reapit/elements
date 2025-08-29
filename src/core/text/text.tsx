import { cx } from '@linaria/core'
import { elText } from './styles'

import type { FontSize, FontWeight, TextColour } from './types'
import type { HTMLAttributes, QuoteHTMLAttributes, TimeHTMLAttributes } from 'react'

type FontStyle = `text-${FontSize}/${FontWeight}` | 'inherit'

interface BaseTextProps {
  colour?: TextColour
  /**
   * Defines the font style the text should use. Defaults to `inherit` when not provided.
   * When both `font` and `size`/`weight` are provided, `font` takes precedence.
   */
  font?: FontStyle
  overflow?: 'truncate'
  /** @deprecated Use `font` prop instead */
  size?: FontSize
  /** @deprecated Use `font` prop instead */
  weight?: FontWeight
}

interface TextAsAbbrProps extends BaseTextProps, HTMLAttributes<HTMLElement> {
  as: 'abbr'
}

interface TextAsEmProps extends BaseTextProps, HTMLAttributes<HTMLElement> {
  as: 'em'
}

interface TextAsMarkProps extends BaseTextProps, HTMLAttributes<HTMLElement> {
  as: 'mark'
}

interface TextAsQuoteProps extends BaseTextProps, QuoteHTMLAttributes<HTMLQuoteElement> {
  as: 'q'
}

interface TextAsStrikethroughProps extends BaseTextProps, HTMLAttributes<HTMLElement> {
  as: 's'
}

interface TextAsSpanProps extends BaseTextProps, HTMLAttributes<HTMLSpanElement> {
  as?: 'span'
}

interface TextAsStrongProps extends BaseTextProps, HTMLAttributes<HTMLElement> {
  as: 'strong'
}

interface TextAsTimeProps extends BaseTextProps, TimeHTMLAttributes<HTMLTimeElement> {
  as: 'time'
}

type TextProps =
  | TextAsAbbrProps
  | TextAsEmProps
  | TextAsMarkProps
  | TextAsQuoteProps
  | TextAsStrikethroughProps
  | TextAsSpanProps
  | TextAsStrongProps
  | TextAsTimeProps

/**
 * A simple component that can be used to display text in a particular size, weight and colour. If
 * you're just looking to apply appropriate font styles to a styled element based on a particular
 * combination of font size and/or weight, the [font](/docs/core-text-font--docs) helper
 * is preferable.
 *
 * **Important:** Direct use of this component is strongly discouraged. It is primarily intended as an
 * escape hatch when prototyping UI that is not yet supported by the Design System. Within the Design
 * System, the `font` helper function exported alongside this component is the preferred way to apply
 * font styles to styled elements. As such, it currently supports an intentionally limited set of HTML
 * elements focused on inline text semantics. This is because we want this component to be minimally
 * useful.
 */
export function Text({
  as: Element = 'span',
  className,
  colour = 'inherit',
  font,
  overflow,
  size: deprecatedSizeProp,
  weight: deprecatedWeightProp,
  ...rest
}: TextProps) {
  // We use the deprecated props if neither font, size nor weight are specified, OR if no font is specified
  // but at least one of size or weight are.
  const useDeprecatedProps =
    (!font && !deprecatedSizeProp && !deprecatedWeightProp) || (!font && (deprecatedSizeProp || deprecatedWeightProp))

  // NOTE: we default `font` to "inherit" here, instead of in our props destructuring above, because
  // we need to know when `font` is explicitly provided vs when it's not so we can know whether we
  // should be using the size and weight derived from it versus using the deprecated size/weight props.
  const { size, weight } = parseFont(font ?? 'inherit')

  return (
    <Element
      className={cx(elText, className)}
      data-colour={colour}
      data-overflow={overflow}
      data-font-size={useDeprecatedProps ? deprecatedSizeProp ?? 'base' : size}
      data-font-weight={useDeprecatedProps ? deprecatedWeightProp ?? 'regular' : weight}
      {...(rest as HTMLAttributes<HTMLElement>)}
    />
  )
}

type InferFontSize<T extends FontStyle> = T extends `text-${infer Size}/${string}` ? Size : 'inherit'
type InferFontWeight<T extends FontStyle> = T extends `text-${string}/${infer Weight}` ? Weight : 'inherit'

interface ParseFontResult<T extends FontStyle> {
  size: InferFontSize<T>
  weight: InferFontWeight<T>
}

/**
 * Parses a font style string like "text-base/regular" into its size and weight components.
 *
 * @example
 * const { size, weight } = parseFont('text-base/regular')
 * // size === 'base' and weight === 'regular'
 */
function parseFont<T extends FontStyle>(font: T): ParseFontResult<T> {
  if (font === 'inherit') {
    return { size: 'inherit', weight: 'inherit' } as ParseFontResult<T>
  }

  const [textSize, weight] = font.split('/')
  const size = textSize.replace('text-', '')

  return { size, weight } as ParseFontResult<T>
}
