import { cx } from '@linaria/core'
import { parseFont } from '../font'
import { elText } from './styles'

import type { FontStyle, FontSize, FontWeight, TextColour } from './types'
import type { HTMLAttributes, QuoteHTMLAttributes, TimeHTMLAttributes } from 'react'

export namespace Text {
  interface BaseProps {
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

  interface AsAbbrProps extends BaseProps, HTMLAttributes<HTMLElement> {
    as: 'abbr'
  }

  interface AsEmProps extends BaseProps, HTMLAttributes<HTMLElement> {
    as: 'em'
  }

  interface AsMarkProps extends BaseProps, HTMLAttributes<HTMLElement> {
    as: 'mark'
  }

  interface AsParagraphProps extends BaseProps, HTMLAttributes<HTMLParagraphElement> {
    as: 'p'
  }

  interface AsQuoteProps extends BaseProps, QuoteHTMLAttributes<HTMLQuoteElement> {
    as: 'q'
  }

  interface AsStrikethroughProps extends BaseProps, HTMLAttributes<HTMLElement> {
    as: 's'
  }

  interface AsSpanProps extends BaseProps, HTMLAttributes<HTMLSpanElement> {
    as?: 'span'
  }

  interface AsStrongProps extends BaseProps, HTMLAttributes<HTMLElement> {
    as: 'strong'
  }

  interface AsTimeProps extends BaseProps, TimeHTMLAttributes<HTMLTimeElement> {
    as: 'time'
  }

  export type Props =
    | AsAbbrProps
    | AsEmProps
    | AsMarkProps
    | AsParagraphProps
    | AsQuoteProps
    | AsStrikethroughProps
    | AsSpanProps
    | AsStrongProps
    | AsTimeProps
}

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
 * elements focused on inline text semantics (with the exception of `<p>`). This is because we want this
 * component to be minimally useful.
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
}: Text.Props) {
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
      data-font-size={useDeprecatedProps ? (deprecatedSizeProp ?? 'base') : size}
      data-font-weight={useDeprecatedProps ? (deprecatedWeightProp ?? 'regular') : weight}
      {...(rest as HTMLAttributes<HTMLElement>)}
    />
  )
}
