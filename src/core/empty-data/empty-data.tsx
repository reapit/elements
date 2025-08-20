import { EmptyDataAction, EmptyDataActionButton } from './action'
import { EmptyDataDescription } from './description'
import { ElEmptyData } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

interface EmptyDataProps extends HTMLAttributes<HTMLDivElement> {
  /** The content of the empty data. Typically an action, description, or both. */
  children: ReactNode
  /**
   * The height of the empty data. By default, the height will be determined by the content,
   * but a fixed height can be specified via this prop. Care should be taken to ensure the content
   * is not clipped.
   */
  height?: `--size-${string}`
}

/**
 * Used to communicate that no data could be found, typically in the context of a list or table.
 * At minimum, either an action ([EmptyData.Action](?path=/docs/core-emptydata-action--docs)) or description
 * ([EmptyData.Description](?path=/docs/core-emptydata-description--docs)) should be provided.
 */
export function EmptyData({ children, height, style, ...rest }: EmptyDataProps) {
  return (
    <ElEmptyData {...rest} style={{ ...style, height: height ? `var(${height})` : undefined }}>
      {children}
    </ElEmptyData>
  )
}

EmptyData.Action = EmptyDataAction
EmptyData.ActionButton = EmptyDataActionButton
EmptyData.Description = EmptyDataDescription
