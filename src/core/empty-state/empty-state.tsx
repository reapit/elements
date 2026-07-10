import { EmptyStateAction, EmptyStateActionButton } from './action'
import { EmptyStateDescription } from './description'
import { ElEmptyState } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace EmptyState {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** The background of the empty state. Defaults to neutral-lightest. */
    background?: 'neutral-lightest' | 'transparent' | 'white'
    /** The content of the empty state. Typically an action, description, or both. */
    children: ReactNode
    /**
     * The height of the empty state. By default, the height will be determined by the content,
     * but a fixed height can be specified via this prop. Care should be taken to ensure the content
     * is not clipped.
     *
     * @deprecated Use `style` instead
     */
    height?: `--size-${string}`
    /** The size of the empty state. Defaults to small. */
    size?: 'small' | 'large'
  }
}

/**
 * Used to communicate that no data could be found, typically in the context of a list or table.
 * At minimum, either an action or description ([EmptyState.Description](?path=/docs/core-emptystate-description--docs))
 * should be provided.
 */
export function EmptyState({
  background = 'neutral-lightest',
  children,
  height,
  size = 'small',
  style,
  ...rest
}: EmptyState.Props) {
  return (
    <ElEmptyState
      {...rest}
      data-background={background}
      data-size={size}
      style={height ? { ...style, height: `var(${height})` } : style}
    >
      {children}
    </ElEmptyState>
  )
}

/** @deprecated Use AnchorButton directly */
EmptyState.Action = EmptyStateAction
/** @deprecated Use Button directly */
EmptyState.ActionButton = EmptyStateActionButton
EmptyState.Description = EmptyStateDescription
