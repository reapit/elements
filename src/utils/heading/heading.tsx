import { cx } from '@linaria/core'
import { parseFont } from '../font'
import { elHeading } from './styles'

import type { FontStyle, TextColour } from './types'
import type { HTMLAttributes } from 'react'

export namespace Heading {
  interface BaseProps {
    /**
     * The text colour. Defaults to `inherit` when not provided.
     */
    colour?: TextColour
    /**
     * Defines the font style the heading should use. Defaults to `inherit` when not provided.
     */
    font?: FontStyle
  }

  interface AsH1Props extends BaseProps, HTMLAttributes<HTMLHeadingElement> {
    as: 'h1'
  }

  interface AsH2Props extends BaseProps, HTMLAttributes<HTMLHeadingElement> {
    as?: 'h2'
  }

  interface AsH3Props extends BaseProps, HTMLAttributes<HTMLHeadingElement> {
    as: 'h3'
  }

  interface AsH4Props extends BaseProps, HTMLAttributes<HTMLHeadingElement> {
    as: 'h4'
  }

  interface AsH5Props extends BaseProps, HTMLAttributes<HTMLHeadingElement> {
    as: 'h5'
  }

  interface AsH6Props extends BaseProps, HTMLAttributes<HTMLHeadingElement> {
    as: 'h6'
  }

  export type Props = AsH1Props | AsH2Props | AsH3Props | AsH4Props | AsH5Props | AsH6Props
}

/**
 * A simple component that can be used to display headings with particular font styles and colours.
 *
 * **Important:** Direct use of this component is strongly discouraged. It is primarily intended as an
 * escape hatch when prototyping UI that is not yet supported by the Design System. Within the Design
 * System, the `font` helper function is the preferred way to apply font styles to styled elements.
 */
export function Heading({
  as: Element = 'h2',
  className,
  colour = 'inherit',
  font = 'inherit',
  ...rest
}: Heading.Props) {
  const { size, weight } = parseFont(font)

  return (
    <Element
      className={cx(elHeading, className)}
      data-colour={colour}
      data-font-size={size}
      data-font-weight={weight}
      {...(rest as HTMLAttributes<HTMLHeadingElement>)}
    />
  )
}
