import { EmptyStateAction, EmptyStateActionButton } from './action'
import { EmptyStateDescription } from './description'
import { ElEmptyState } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace EmptyState {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** The content of the empty state. Typically an action, description, or both. */
    children: ReactNode
    /**
     * The height of the empty state. By default, the height will be determined by the content,
     * but a fixed height can be specified via this prop. Care should be taken to ensure the content
     * is not clipped.
     */
    height?: `--size-${string}`
  }
}

/**
 * Used to communicate that no data could be found, typically in the context of a list or table.
 * At minimum, either an action ([EmptyState.Action](?path=/docs/core-emptystate-action--docs)) or description
 * ([EmptyState.Description](?path=/docs/core-emptystate-description--docs)) should be provided.
 */
export function EmptyState({ children, height, style, ...rest }: EmptyState.Props) {
  return (
    <ElEmptyState {...rest} style={{ ...style, height: height ? `var(${height})` : undefined }}>
      {children}
    </ElEmptyState>
  )
}

EmptyState.Action = EmptyStateAction
EmptyState.ActionButton = EmptyStateActionButton
EmptyState.Description = EmptyStateDescription
