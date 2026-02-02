import { AtAGlanceCardContext } from './context'
import { cx } from '@linaria/core'
import { elAtAGlanceCard } from './styles'

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

export namespace AtAGlanceCard {
  interface BaseProps {
    /** Card content. Use AtAGlance.Icon, Label, Description, Value subcomponents. */
    children: ReactNode
    /**
     * CSS Grid shorthand for custom layouts.
     * Mutually exclusive with `layout` - if both are provided, `grid` takes precedence.
     */
    grid?: string
    /**
     * The layout for the card content.
     * Mutually exclusive with `grid` - if both are provided, `grid` takes precedence.
     */
    layout?: 'vertical' | 'horizontal' | 'compact'
    /** Maximum width of the card. */
    maxWidth?: string
    /** Minimum width of the card. */
    minWidth?: string
  }

  export interface AsArticleProps extends BaseProps, Omit<HTMLAttributes<HTMLElement>, 'children'> {
    /** Render as a static article element. */
    as?: 'article'
  }

  export interface AsAnchorProps extends BaseProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
    /** Render as an anchor element. */
    as: 'a'
    /** The URL to link to. */
    href: string
  }

  export interface AsButtonProps extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    /** Render as a button element. */
    as: 'button'
  }

  export type Props = AsArticleProps | AsAnchorProps | AsButtonProps
}

/**
 * A polymorphic card primitive for `AtAGlance` layouts.
 * Use this component with `AtAGlance.Icon`, `Label`, `Description`, and `Value` subcomponents
 * when you need custom layouts or full control over the card structure.
 * For standard layouts, prefer `AtAGlance.ArticleCard`, `AnchorCard`, or `ButtonCard`.
 */
export function AtAGlanceCard(props: AtAGlanceCard.Props) {
  if (props.as === 'a') {
    return <AtAGlanceCardAnchor {...props} />
  } else if (props.as === 'button') {
    return <AtAGlanceCardButton {...props} />
  } else {
    return <AtAGlanceCardArticle {...props} />
  }
}

function AtAGlanceCardArticle({
  children,
  className,
  grid,
  layout,
  maxWidth,
  minWidth,
  style,
  ...rest
}: AtAGlanceCard.AsArticleProps) {
  return (
    <AtAGlanceCardContext.Provider value={{ as: 'article' }}>
      <article
        {...rest}
        className={cx(className, elAtAGlanceCard)}
        data-layout={grid ? undefined : layout}
        style={{ ...style, maxWidth, minWidth, grid }}
      >
        {children}
      </article>
    </AtAGlanceCardContext.Provider>
  )
}

function AtAGlanceCardAnchor({
  children,
  className,
  grid,
  layout,
  maxWidth,
  minWidth,
  style,
  ...rest
}: AtAGlanceCard.AsAnchorProps) {
  return (
    <AtAGlanceCardContext.Provider value={{ as: 'a' }}>
      <a
        {...rest}
        className={cx(className, elAtAGlanceCard)}
        data-layout={grid ? undefined : layout}
        style={{ ...style, maxWidth, minWidth, grid }}
      >
        {children}
      </a>
    </AtAGlanceCardContext.Provider>
  )
}

function AtAGlanceCardButton({
  children,
  className,
  grid,
  layout,
  maxWidth,
  minWidth,
  style,
  type = 'button',
  ...rest
}: AtAGlanceCard.AsButtonProps) {
  return (
    <AtAGlanceCardContext.Provider value={{ as: 'button' }}>
      <button
        {...rest}
        className={cx(className, elAtAGlanceCard)}
        data-layout={grid ? undefined : layout}
        style={{ ...style, maxWidth, minWidth, grid }}
        type={type}
      >
        {children}
      </button>
    </AtAGlanceCardContext.Provider>
  )
}

AtAGlanceCard.displayName = 'AtAGlance.Card'
