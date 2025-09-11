import { ElTag } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace Tag {
  export interface Props extends HTMLAttributes<HTMLSpanElement> {
    /** The content of the tag. */
    children: ReactNode
  }
}

/** @deprecated Use Tag.Props instead */
export type TagProps = Tag.Props

/**
 * The tag component is used to label, categorise or organise items using keywords.
 */
export function Tag({ children, ...rest }: Tag.Props) {
  return <ElTag {...rest}>{children}</ElTag>
}
