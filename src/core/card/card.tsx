import { cx } from '@linaria/core'
import { elCard } from './styles'

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

export namespace Card {
  export interface Props extends HTMLAttributes<HTMLElement> {
    /** Card content. */
    children?: ReactNode
    /**
     * The HTML element to render as the card's root.
     * Use `'article'` for self-contained content, `'aside'` for complementary content,
     * and `'section'` for thematic groupings. Defaults to `'div'`.
     */
    as?: 'article' | 'aside' | 'div' | 'section'
    /**
     * Removes the card's border.
     */
    isBorderless?: boolean
    /**
     * Overrides the card's border-radius using a design token reference.
     * Defaults to `--border-radius-xl`.
     */
    borderRadius?: `--border-radius-${string}`
    /**
     * Overrides the card's padding using a spacing design token reference.
     * Defaults to `--spacing-4`.
     */
    padding?: `--spacing-${string}`
  }
}

/**
 * A card surface for grouping related content.
 *
 * `Card` renders as a `<div>` by default. Use the `as` prop to choose a
 * semantically appropriate element.
 *
 * For interactive cards that trigger an action on click, use `ButtonCard`.
 * For interactive cards that navigate to a URL, use `AnchorCard`.
 */
export function Card({
  as: Element = 'div',
  isBorderless,
  borderRadius,
  children,
  className,
  padding,
  style,
  ...rest
}: Card.Props) {
  const overrides = {
    ...(borderRadius !== undefined && { borderRadius: `var(${borderRadius})` }),
    ...(padding !== undefined && { '--card-padding': `var(${padding})` }),
  } as const satisfies CSSProperties & { '--card-padding'?: string }

  return (
    <Element
      {...rest}
      className={cx(elCard, className)}
      data-is-borderless={isBorderless || undefined}
      style={{ ...style, ...overrides }}
    >
      {children}
    </Element>
  )
}
