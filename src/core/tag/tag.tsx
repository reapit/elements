import { ElTag, ElTagLabel } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace Tag {
  export interface Props extends HTMLAttributes<HTMLSpanElement> {
    /** The content of the tag. */
    children: ReactNode
    /** The maximum width of the tag. If not provided, the tag will be as wide as its content. */
    maxWidth?: `--size-${string}`
    /** Whether the label of the tag should be truncated if it is too long */
    overflow?: 'truncate'
  }
}

/** @deprecated Use Tag.Props instead */
export type TagProps = Tag.Props

/**
 * The tag component is used to label, categorise or organise items using keywords.
 */
export function Tag({ children, maxWidth, overflow, style, ...rest }: Tag.Props) {
  return (
    <ElTag
      {...rest}
      // NOTE: We'd prefer --tag-max_width to be a data attribute, but browsers do not support CSS' advanced
      // attr() function syntax yet. Thus, we use a CSS variable instead.
      style={{ ...style, ...(maxWidth && { '--tag-max_width': `var(${maxWidth})` }) }}
    >
      {/* A maxWidth implies overflow="truncate" */}
      <ElTagLabel data-overflow={maxWidth ? 'truncate' : overflow}>{children}</ElTagLabel>
    </ElTag>
  )
}
