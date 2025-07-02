import { ElTag } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /** The content of the tag. */
  children: ReactNode
}

/**
 * The tag component is used to label, categorise or organise items using keywords.
 */
export function Tag({ children, ...rest }: TagProps) {
  return <ElTag {...rest}>{children}</ElTag>
}
