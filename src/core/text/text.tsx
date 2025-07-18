import { ElText } from './styles'

import type { FontSize, FontWeight, TextColour } from './types'
import type { HTMLAttributes, QuoteHTMLAttributes, TimeHTMLAttributes } from 'react'

interface BaseTextProps {
  colour?: TextColour
  size?: FontSize
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
export function Text({ as = 'span', colour = 'inherit', size = 'base', weight = 'regular', ...props }: TextProps) {
  return <ElText as={as} data-colour={colour} data-font-size={size} data-font-weight={weight} {...props} />
}
